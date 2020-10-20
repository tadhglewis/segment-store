const store = require("./store.json");

const schema = {
  name: "",
  url: "",
  author: "",
  description: "",
};

module.exports = (ttTransform) => {
  const data = ttTransform || process.env.TT_TRANSFORM;

  const result = {};

  result.data = data.split("\n");
  result.data = result.data.reduce((result, row) => {
    result[row.split(":")[0].toLowerCase().replace(" ", "")] = row
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
