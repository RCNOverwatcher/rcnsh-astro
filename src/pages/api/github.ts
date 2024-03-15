import type { APIRoute } from "astro";
import { Octokit } from "@octokit/core";

interface Repo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
}

const octokit = new Octokit({
  auth: import.meta.env.GITHUB_TOKEN,
});

export async function getSpecificRepo(repoName: string) {
  const repoCall = await octokit.request(
    "GET /repos/RCNOverwatcher/" + repoName,
    {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
  return repoCall.data as Repo;
}

export const GET: APIRoute = async () => {
  const repoCall = await octokit.request("GET /users/RCNOverwatcher/repos", {
    username: "RCNOverwatcher",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const githubData = repoCall.data as Repo[];

  const repoNamesToInclude = [
    "rcnsh-astro",
    "RaspberryPyGame",
    "Edexcel-Large-Data-Set-Analysis",
    "rcn-api",
  ];

  const reposFilter = githubData
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
    }))
    .filter((repo: Repo) => repoNamesToInclude.includes(repo.name));

  reposFilter.push(await getSpecificRepo("virtue-gymnastics-website"));
  reposFilter.push(await getSpecificRepo("notes"));

  return new Response(JSON.stringify(reposFilter), {
    headers: {
      "content-type": "application/json",
    },
  });
};
