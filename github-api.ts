const baseUrl = 'https://api.github.com';

export type OwnerRepo = {
  owner: string
  repo: string
};

export type GetCommitsForBranchResponse = {
  commit: {
    tree: {
      sha: string;
    }
  }
}
export async function getCommitsForBranch({ owner, repo, branch }: OwnerRepo & { branch: string }): Promise<GetCommitsForBranchResponse> {
  const response = await fetch(`${baseUrl}/repos/${owner}/${repo}/commits/${branch}`);
  const json = await response.json();
  return json;
}

export type Tree = {
  path: string;
  sha: string;
  url: string;
  type: string;
}
export type GetTreeResponse = {
  tree: Tree[]
}
export async function getTree({ owner, repo, treeSha }: OwnerRepo & { treeSha: string }): Promise<GetTreeResponse> {
  const response = await fetch(`${baseUrl}/repos/${owner}/${repo}/git/trees/${treeSha}`);
  const json = await response.json();
  return json;
}

export type GetBlobResponse = {
  content: string;
  encoding: string;
}
export async function getBlob({ owner, repo, fileSha }: OwnerRepo & { fileSha: string }): Promise<GetBlobResponse> {
  const response = await fetch(`${baseUrl}/repos/${owner}/${repo}/git/blobs/${fileSha}`);
  const json = await response.json();
  return json;
}