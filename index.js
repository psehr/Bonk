const fs = require("fs"); // requiring fs to read directories
const client = require("./dclient"); // importing the discord client instance

const commandFiles = fs // fetching files ending with js in the commands directory into a const variable
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  // for each file in the list of command files
  const command = require(`./commands/${file}`); // selecting the current command file
  client.commands.set(command.name, command); // assign the command file into the "commands" discord collection of the client
}

const config = require("./config.json"); // fetching config settings from local file

const db = require("./dbinit");

const timecode = require("./functions/timecode.js"); // timecode function: basic function to fetch the current time and date
let timecodeObject = timecode.execute(); // using the timecode function to get curretn date and time

const log = require("./functions/log");

client.on("ready", () => {
  // once the bot is connected
  console.log(`Logged in as ${client.user.tag}!`); // console logging the bot's connection

  db.collection("bot") // fetching db
    .doc("logs")
    .get()
    .then((q) => {
      if (!q.data().sendLogs) return; // only continue if logging is enabled in db
      logChannelID = q.data().logChannel; // fetchning logging channel id
      logChannelID = client.channels.cache.get(logChannelID); // fetching discord channel object using the id
      log.execute(logChannelID, `\`${timecodeObject.date} ${timecodeObject.time} | Restarted\`\n\`Successfully loaded ${commandFiles.length} commands\``); // sending the restart log using the log function (channel id and what to send)
      db.collection("bot")
        .doc("stats")
        .get()
        .then((q) => {
          // fetching restart amount
          db.collection("bot")
            .doc("stats")
            .update({
              // initialize restart amount updating
              restarts: q.data().restarts + 1, // update the restarts to restarts+1
            });
        });
    });

  db.collection("bot") // fetching db
    .doc("status")
    .get()
    .then((q) => {
      client.user.setActivity(q.data().value, {
        // setting the bot's discord activity (text value)
        type: q.data().type, // activity type
        url: q.data().url, // activity url
      }); // user activity
    });
});

client.on("guildCreate", (gData) => {
  // when the bot joins a new server (guild)
  db.collection("guilds")
    .doc(gData.id)
    .set({
      // creating the newly joined server db entry (and setting its values)
      guildID: gData.id, // servers id
      guildName: gData.name, // servers name
      guildMemberCount: gData.memberCount, // servers member count
      guildOwnerID: gData.ownerID, // servers owner id
      prefix: "!", // default prefix for the server
      restrictedChannels: [""], // channels where commands are disabled
      restrictedCommands: [""], // commands disabled on the server
    });

  db.collection("bot") // fetching db
    .doc("logs")
    .get()
    .then((q) => {
      if (!q.data().sendLogs) return; // checking if the sendLogs setting is set to false
      logChannelID = q.data().logChannel; // fetching the logging channel ID from the db
      logChannelID = client.channels.cache.get(logChannelID); // fetching discord channel object using the id previously fetched
      log.execute(logChannelID, `\`${timecodeObject.date} ${timecodeObject.time} | Server joined: ${gData.name}\``); // server join log using the log function
    });
});

client.on("guildDelete", (gData) => {
  // when the bot is kicked
  db.collection("bot") // fetching db
    .doc("logs")
    .get()
    .then((q) => {
      if (!q.data().sendLogs) return; // checking if the sendLogs setting is set to false
      logChannelID = q.data().logChannel; // fetching the logging channel ID from the db
      logChannelID = client.channels.cache.get(logChannelID); // fetching discord channel object using the id previously fetched
      log.execute(logChannelID, `\`${timecodeObject.date} ${timecodeObject.time} | Server left: ${gData.name}\``); // server join log using the log function
    });

  db.collection("guilds").doc(gData.id).delete(); // remove the corresponding server from the db
});

client.on("message", (msg) => {
  // when a message is sent anywhere
  if (msg.channel.type === "dm" || msg.author.bot) return; // if the msg is sent in dms or by a bot, ignore it

  db.collection("guilds")
    .doc(msg.guild.id)
    .get()
    .then((q) => {
      // fetching guild data for the prefix
      if (q.exists) {
        // if the guild id exists in the db
        prefix = q.data().prefix; // fetch prefix
        restrictedChannels = q.data().restrictedChannels; // fetch restrictedChannels
        restrictedCommands = q.data().restrictedCommands; // fetch restrictedCommands
      }
    })
    .then(() => {
      if (!msg.content.startsWith(prefix)) return; // if the message does not start with the fetched prefix, abort

      let msg_array = msg.content.split(" "); // splitting msg's content in an array
      let commandName = msg_array[0].slice(prefix.length); // retrieving the first item (i.e the command that's called) in the array
      let args = msg_array.slice(1); // removing the command from the msg array (1st item) to retrieve all the arguments

      const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName)); // getting the command through name/aliases

      if (restrictedCommands.includes(command.name)) return msg.reply("`This command has been disabled on this server`"); // if restrictedCommands contains the command (name/alias), abort
      if (restrictedChannels.includes(msg.channel.id) && command.name != "restrictChannel") return msg.reply("`This channel does not allow sending commands`"); // if restrictedChannels contains the channel id, abort

      if (command) {
        // if command (file) has a value
        command.execute(client, msg, args, db); // execute the command
      }
    });
});
