module.exports = {
  name: "shutdown",

  execute(msg) {
    setTimeout(async function () {
      await msg.channel.send(`\`Restarting..\``);
      return process.exit(22);
    }, 100);
  },
};
