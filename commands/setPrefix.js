module.exports = {
  name: "prefix",
  aliases: ["prefixset"],

  async execute(client, msg, args, db) {
    if (args.length == 0 || args.length > 1) {
      // checking invalid arguments (none or over 2)
      return msg.reply(`\`Invalid arguments\``);
    } else {
      db.collection("guilds").doc(msg.guild.id).update({
        // updating prefix assigned to the current (from the msg) server id
        prefix: args[0],
      });
      return msg.reply(
        `\`Successfully updated prefix to ${args[0]} on ${msg.guild.name}\`` // informing that it's actually done
      );
    }
  },
};
