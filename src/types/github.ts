export type GithubUser = {
  id: number;
  login: string;
  avatar_url: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
};
