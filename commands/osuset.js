const { execute } = require("../functions/log");

module.exports = {
  name: "osuset",

  async execute(client, msg, args, db) {
    if (args.length == 0 || args.length > 1) {
      return msg.reply(`\`Invalid arguments\``);
    } else {
      db.collection("users").doc(msg.author.id).update({
        osu_id: args[0],
      });
      return msg.reply(
        `\`Successfully updated your osu! user id to ${args[0]}\``
      );
    }
  },
};
