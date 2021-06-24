module.exports = {
  name: "restrictChannel",
  aliases: ["chrestrict", "chres"],

  async execute(client, msg, args, db) {
    const firebase = require("firebase-admin"); // required for array pop/push methods in firestore
    db.collection("guilds")
      .doc(msg.guild.id)
      .get()
      .then((q) => {
        if (q.data().restrictedChannels.includes(msg.channel.id)) {
          // if the channel is already restricted
          db.collection("guilds")
            .doc(msg.guild.id)
            .update({
              // remove it from the restricted channels
              restrictedChannels: firebase.firestore.FieldValue.arrayRemove(msg.channel.id),
            });
          return msg.reply(
            `\`Successfully unrestricted commands in \"${msg.channel.name}\"\`` // informing that it's actually done
          );
        } else {
          // else if it's not currently restricted
          db.collection("guilds")
            .doc(msg.guild.id)
            .update({
              // add it to the restricted channels
              restrictedChannels: firebase.firestore.FieldValue.arrayUnion(msg.channel.id),
            });
          return msg.reply(
            `\`Successfully restricted commands in \"${msg.channel.name}\"\`` // informing that it's actually done
          );
        }
      });
  },
};
