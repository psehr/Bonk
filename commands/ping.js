module.exports = {
  name: "ping",
  aliases: ["p"],

  async execute(client, msg, args, db) {
    msg.channel.send(`\`Pong!\``); // answering with pong
  },
};
