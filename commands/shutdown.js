const shutdown = require("../functions/shutdown.js");

module.exports = {
  name: "shutdown",

  async execute(client, msg, args, db) {
    shutdown.execute(msg);
  },
};
