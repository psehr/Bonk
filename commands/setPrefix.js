const { execute } = require("../functions/log");

module.exports = {
  name: "prefix",

  async execute(client, msg, args, db) {
    if (args.length == 0 || args.length > 1) {
      return msg.reply(`\`Invalid arguments\``);
    } else {
      db.collection("guilds").doc(msg.guild.id).update({
        prefix: args[0],
      });
      return msg.reply(
        `\`Successfully updated prefix to ${args[0]} on ${msg.guild.name}\``
      );
    }
  },
};
