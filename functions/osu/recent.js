const { bonkOsuID, bonkOsuToken } = require("../../config.json"); // importing auth tokens (destructured)
const { V2 } = require("osu-api-extended"); // importing apiV2 manipulation package (destructured)
const v2 = new V2(`${bonkOsuID}`, bonkOsuToken); // creating the request instance (as a "V2" type, see doc)

module.exports = {
  name: "recent",

  async execute(id, score_amount) {
    // function needs a player id and the amount of scores to return
    try {
      await v2.login(); // connecting to the api
      let recent = await v2.user_scores(id, 2, { include_fails: 1, mode: "osu", limit: score_amount }); // retrieving the user_scores endpoint, including failed scores in std with the corresponding amount of scores to get
      return recent; // returning the scores
    } catch (error) {}
  },
};
