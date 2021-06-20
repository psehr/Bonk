const { bonkOsuID, bonkOsuToken } = require("../../config.json");
const { V2, mods, tools } = require("osu-api-extended");
const v2 = new V2(`${bonkOsuID}`, bonkOsuToken);
const user = require("../../commands/user");

module.exports = {
  name: "user",

  async execute(id) {
    try {
      await v2.login();
      let user = await v2.user(id);
      return user; 
    } catch (error) {
      
    }
    
  },
};
