module.exports = {
  name: "osuset",
  aliases: ["auth"],

  async execute(client, msg, args, db) {
    if (args.length == 0 || args.length > 1) {
      // checking invalid arguments (none or over 2)
      return msg.reply(`\`Invalid arguments\``);
    } else {
      const dbUsers = db.collection("users").doc(msg.author.id);
      dbUsers.get().then((data) => {
        if (data.exists) {
          dbUsers.update({
            osu_id: args[0]
          })
        } else {
          dbUsers.set({
            osu_id: args[0]
          })
        }
      })
      return msg.reply(`\`Successfully updated your osu! user id to ${args[0]}\``); // informing that it's actually done
    }
  },
};
