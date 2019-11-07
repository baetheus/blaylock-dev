export const repos = (count: number = 10) => `
{
  viewer {
    repositories(last: ${Math.max(1, Math.floor(count))}) {
      nodes {
        nameWithOwner
        description
        url
        updatedAt
      }
    }
  }
}
`;

export const gists = (count: number = 10) => `
{
  viewer {
    gists(last: ${Math.max(1, Math.floor(count))}) {
      nodes {
        name
        description
        updatedAt
        files {
          name
        }
        stargazers {
          totalCount
        }
      }
    }
  }
}
`;
