const { bonkOsuID, bonkOsuToken } = require("../../config.json");
const { V2 } = require("osu-api-extended");
const v2 = new V2(`${bonkOsuID}`, bonkOsuToken);

module.exports = {
    name: "user_recent",

    async execute(id, include_fails, mode, limit) {
        try {
            await v2.login();
            let userScores = await v2.user_scores(id, 2, {
                include_fails: include_fails,
                mode: mode,
                limit: limit
            });
            return userScores;
        } catch (error) { }
    },
};
