const store = require("./store.json");
const add = require("./add");
var assert = require("assert");

describe("add", () => {
  it("should get json from ", () => {
    const data = `name: All on the same street who are billionaires
url:tadhglewis.com
Author:Douglas Crockford
Description: tdd billionaires`;

    process.env.TT_TRANSFORM = data;

    assert.deepStrictEqual(add(), {
      ...store,
      items: [
        ...store.items,
        {
          name: "All on the same street who are billionaires",
          url: "tadhglewis.com",
          author: "Douglas Crockford",
          description: "tdd billionaires",
        },
      ],
    });
  });
});
