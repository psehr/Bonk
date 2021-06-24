module.exports = {
  name: "restrictCommand",
  aliases: ["corestrict", "cores"],

  async execute(client, msg, args, db) {
    const firebase = require("firebase-admin"); // required for array pop/push methods in firestore
    const commands = client.commands; // importing the commands collection to handle aliases easier
    db.collection("guilds")
      .doc(msg.guild.id)
      .get()
      .then((q) => {
        // fetching guild settings from firestore
        let restrictedCommands = q.data().restrictedCommands; // destructuring restricted commands array
        if (args[0] == "-l") {
          // if user wants to list restricted commands
          let formatted;
          if (restrictedCommands.length) {
            // if there's currently some restricted commands
            formatted = "| ";
          } else {
            // if there's currently no restricted commands
            formatted = "| `None` |";
          }
          restrictedCommands.forEach((el) => {
            // creating a formatted list of restricted commands
            formatted = formatted.concat("`", el, "`", " | ");
          });
          return msg.reply(`Currently disabled command(s) in "\`${msg.guild.name}\`":\n${formatted}`); // sending the list of restricted commands
        }
        args.forEach((elem) => {
          // for each argument provided by the user
          try {
            // searching for the selected argument in the commands collection, this returns TypeError if no command is found (catch is then used to handle this case)
            commandName = (commands.get(elem) || commands.find((cmd) => cmd.aliases && cmd.aliases.includes(elem))).name;
            if (commandName == "restrictCommand") return msg.reply(`Cannot disable this command`); // disallowing disabling the command itself
          } catch (e) {
            return msg.reply(`No matching commands found for "\`${elem}\`"`); // informing that no command has been found
          }
          found = restrictedCommands.find((element) => element == commandName); // detecting if the entered command is already in the restricted commands or not
          if (!found) {
            // if the entered command isn't in firestore yet
            db.collection("guilds")
              .doc(msg.guild.id)
              .update({
                // add it
                restrictedCommands: firebase.firestore.FieldValue.arrayUnion(commandName),
              });
            msg.reply(`Succesfully disabled the "\`${commandName}\`" command in "\`${msg.guild.name}\`"`); // informing that it's been disabled
          } else {
            // else is it's already in firestore
            db.collection("guilds")
              .doc(msg.guild.id)
              .update({
                // remove it
                restrictedCommands: firebase.firestore.FieldValue.arrayRemove(commandName),
              });
            msg.reply(`Succesfully enabled the "\`${commandName}\`" command in "\`${msg.guild.name}\`"`); // informing that it's been removed
          }
        });
      });
  },
};
