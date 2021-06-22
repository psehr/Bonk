<p align="center">
  <a href="https://github.com/Oxyyy/Bonk">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">Bonk</h1>
</p>

<p align="center">
  Bonk is a Discord bot developed using Discord.js, it features osu! related functionalities.
</p>

<h2 align="center">Currently implemented</h2>

<h3 align="center">Commands</h3>

- Fully-fledged **user** command, used to display an osu! player profile card in the form of a Discord embed.
- **osuset** command, used to assign a osu! user id to a discord user, in order to simplify per-user osu! commands.
- **ping** command, used to check if the bot's online.
- **prefixset** command, used to change the prefix used to trigger commands (unique for each server).
- **shutdown** command, used to force restart the bot.
- **status** command, used to update the bot's status.
- ... and more to come! (see the To-do list)

<h2 align="center">To-Do</h2>

<h3 align="center">Structure</h3>

- [ ] Allow per-server command enabling/disabling
- [ ] Allow per-channel command enabling/disabling
- [ ] Two display modes: canvas and embed

<h3 align="center">Commands</h3>

- [ ] Roll
- [ ] Retrieving a user's most recent score (!recent)
  - [x] Fetching apiv2 through a custom function
  - [ ] Command
- [ ] Displaying beatmap data (!beatmap)
  - [ ] Basic features
  - [ ] pp calc features
  - [ ] beatmap snapshots using canvas
  - [ ] dynamic map preview
- [ ] Displaying a user's top plays
  - ...
- [x] Displaying a user's "playing profile" (!user)
- [ ] Displaying a user's "mapping profile"
  - ...
- [ ] Displaying replay data
  - [ ] Rendering the whole replay in itself
  - [ ] Allow choke point analysis
- [ ] Random map recommandation, including filters for skillsets and difficulty range (std)
- [ ] BWS calculations for tournament players (+formula customization)
- [ ] Multiplayer matches analysis
  - [ ] For tournament matches (match costs with advanced features)
  - [ ] For casual lobbies (player stats)
- [ ] o!mm (Maid Bot) API integration (?)
- [ ] Playing session reports (by user)

<h3 align="center">Channel alerts ("Widgets")</h3>

- [ ] Hourly global leaderboard
  - [x] Job
  - [x] Fetching
  - [ ] Fully-fledged integration
- [ ] New scores (filters: min pp, user, country)
  - [ ] Job
  - [ ] Fetching
  - [ ] Fully-fledged integration
- [ ] New beatmaps (filters: all, by mapper, by diff range, by status)
  - [ ] Job
  - [ ] Fetching
  - [ ] Fully-fledged integration
- ...
