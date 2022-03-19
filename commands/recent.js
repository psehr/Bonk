module.exports = {
  name: "recent",
  aliases: ["rs"],

  async execute(client, msg, args, db) {
    const recent = require("../functions/osu/recent");
    let q = await recent.execute(9239673, 1);
    console.log(q);
  },
};
