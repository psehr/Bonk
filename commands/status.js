const shutdown = require("../functions/shutdown");

module.exports = {
  name: "status",

  async execute(client, msg, args, db) {
    if (args.length > 0) {
      db.collection("bot")
        .doc("status")
        .update({
          value: args.join(" "),
        });
      msg.reply(`\`Successfully updated status to "${args.join(" ")}"\``);
      shutdown.execute(msg);
    } else {
      return msg.reply(`\`Invalid arguments\``);
    }
  },
};
