from pydantic import BaseModel
from .openai import open_ai_client
from .github import GitHub
import json
import os
import tiktoken

github = GitHub()


class MarkdownGenerator(BaseModel):
    markdown: str


class FileSelection(BaseModel):
    relevant_files: list[str]


class CodeExtraction(BaseModel):
    relevant_code_snippets: list[str]


class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        if hasattr(obj, "__dict__"):
            return obj.__dict__
        return super().default(obj)


class DocumentationGenerator:
    def __init__(self, user: dict, project: dict):
        self.user = user
        self.project = project
        self.file_selection_prompt = self.load_prompt(
            "prompts/file_selection_prompt.txt"
        )
        self.code_extraction_prompt = self.load_prompt(
            "prompts/code_extraction_prompt.txt"
        )
        self.documentation_generator_prompt = self.load_prompt(
            "prompts/documentation_generator_prompt.txt"
        )
        self.total_tokens = 0  # later will be use for pricing calculation
        self.tokenizer = tiktoken.get_encoding("cl100k_base")

    def load_prompt(self, filename: str):
        prompt_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), filename)
        with open(prompt_path, "r", encoding="utf-8") as file:
            return file.read()

    def call_openai(self, system_prompt: str, user_promt: str, format):
        completion = open_ai_client.beta.chat.completions.parse(
            model="gpt-4o-mini-2024-07-18",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_promt},
            ],
            temperature=0.2,
            response_format=format,
        )

        self.total_tokens += completion.usage.total_tokens

        return completion.choices[0].message.parsed

    async def get_relevant_files(self):
        files_paths = await github.get_files(
            self.user, self.project.project_name, self.project.branch_name
        )

        filtered_files = [
            {"path": file["path"], "type": file["type"]} for file in files_paths["tree"]
        ]

        response = self.call_openai(
            self.file_selection_prompt,
            json.dumps({"files": filtered_files}),
            FileSelection,
        )
        return response.relevant_files

    async def extract_important_code(self, file_paths: list[str]):
        extracted_data = []

        for file_path in file_paths:
            file_content = await github.get_file_content(
                self.user, self.project.project_name, file_path
            )

            chunks = self.__split_into_chunks(file_content, max_tokens=118000)

            for i, chunk in enumerate(chunks):
                response = self.call_openai(
                    self.code_extraction_prompt,
                    json.dumps(
                        {
                            "file_path": file_path,
                            "chunk_index": i,
                            "total_chunks": len(chunks),
                            "content": chunk,
                        }
                    ),
                    CodeExtraction,
                )

                extracted_data.append(response.relevant_code_snippets)

        return extracted_data

    def __split_into_chunks(self, text: str, max_tokens: int):
        words = text.split()
        chunks = []
        current_chunk = []

        for word in words:
            if (
                len(self.tokenizer.encode(" ".join(current_chunk + [word])))
                > max_tokens
            ):
                chunks.append(" ".join(current_chunk))
                current_chunk = [word]
            else:
                current_chunk.append(word)

        if current_chunk:
            chunks.append(" ".join(current_chunk))

        return chunks

    def generate_readme(self, extracted_code: str, sections: list[dict]):
        response = self.call_openai(
            self.documentation_generator_prompt,
            json.dumps(
                {
                    "project_name": self.project.project_name,
                    "extracted_code": extracted_code,
                    "user_selected_sections": sections,
                },
                cls=CustomJSONEncoder,
            ),
            MarkdownGenerator,
        )

        return response

    async def run_pipeline(self, sections: list[dict]) -> str:

        relevant_files = await self.get_relevant_files()

        extracted_code = await self.extract_important_code(relevant_files)

        readme_content = self.generate_readme(extracted_code, sections)

        return readme_content
