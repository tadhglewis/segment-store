const store = require("./store.json");
const { Octokit } = require("@octokit/action");

const schema = {
  name: "",
  url: "",
  author: "",
  description: "",
};

const main = (ttTransform) => {
  const data = ttTransform || process.env.TT_TRANSFORM;

  const result = {};

  result.data = data.trim().split("\n");
  result.data = result.data.reduce((result, row) => {
    result[row.split(":")[0].trim().toLowerCase().replace(" ", "")] = row
      .split(":")[1]
      .trim();
    return result;
  }, {});

  if (
    JSON.stringify(Object.keys(result.data)) !==
    JSON.stringify(Object.keys(schema))
  )
    throw Error("does not match schema");

  result.store = {
    ...store,
    items: [...store.items, result.data],
  };

  return result.store;
};

module.exports = main;

(async () => {
  main();
  const octokit = new Octokit();
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

  // See https://developer.github.com/v3/issues/#create-an-issue
  const { data } = await octokit.request("POST /repos/:owner/:repo/issues", {
    owner,
    repo,
    title: "My test issue",
  });
})();
