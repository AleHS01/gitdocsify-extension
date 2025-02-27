export type Repository = {
  name: string;
  clone_url: string;
  created_at: Date;
  main_language: string;
  visibility: string;
  description: string | null;
  stargazers_count: number;
  fork_count: number;
};
