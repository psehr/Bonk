const shutdown = require("../functions/shutdown"); // imports the shutdown function, used to refresh the status through a restart

module.exports = {
  name: "status",

  async execute(client, msg, args, db) {
    if (args.length > 0) {
      // argument amount has to be over 0 to actually replace the status
      db.collection("bot") // update the status value in the database with all the arguments given
        .doc("status")
        .update({
          value: args.join(" "),
        });
      msg.reply(`\`Successfully updated status to "${args.join(" ")}"\``); // informing that it's actually done
      shutdown.execute(msg); // shuts the bot down in order for it to restart and refresh the status (discord limitation)
    } else {
      return msg.reply(`\`Invalid arguments\``); // DISPLAY THE CURRENT STATUS INSTEAD
    }
  },
};
