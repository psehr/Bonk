const shutdown = require("../functions/shutdown.js"); // imports the shutdown function

module.exports = {
  name: "shutdown",

  async execute(client, msg, args, db) {
    shutdown.execute(msg); // shuts the bot down using the imported function
  },
};
