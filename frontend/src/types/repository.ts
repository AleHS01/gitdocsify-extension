export type Repository = {
  name: string;
  clone_url: string;
  created_at: Date;
  language: string;
  visibility: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  default_branch: string;
  html_url: string;
  pushed_at: Date;
  owner: RepoOwner;
};

export type Collaborators = {
  login: string;
  html_url: string;
  avatar_url: string;
};

export type RepoOwner = {
  login: string;
  html_url: string;
  avatar_url: string;
};
