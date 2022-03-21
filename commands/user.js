module.exports = {
  name: "user",
  aliases: ["u", "profile", "usr"],

  execute(client, msg, args, db) {
    const user = require("../functions/osu/user"); // importing the user function, used to call osu's APIv2 through osu-api-extended
    const user_recent = require("../functions/osu/user_recent");
    const embedhandler = require("../functions/embedhandler"); // importing the embed handler, used to format the data and create the embed that will be posted
    const usercheck = require("../functions/osu/usercheck"); // importing the user checker, used to check if the user actually exists and id formatting
    const ta = require("time-ago");
    const td = require("timediff");
    usercheck.execute(msg, args).then(async (user_id_formatted) => {
      // checking user
      user.execute(user_id_formatted).then((user) => {
        // fetching user api using the answered id

        user_recent.execute(user_id_formatted, true, 'osu', 1).then((user_recent) => {
          // fetching user_recent api using the answered id
          var currently_playing;
          user_recent.exists ? (currently_playing = td(user_recent[0].created_at, Date.now()).minutes <= 15 && user.is_online ? true : false) : currently_playing = false;
          const embedColor = currently_playing ? "#ff00ff" : "#ff0000";
          const isPlayingField = currently_playing ? "Online" : "Offline"

          const avatar_url = user.avatar_url; // extracting profile picture
          const country_code = user.country_code.toLowerCase(); // extracting country code, formatted to lowercase, used for the flag emote (ex: fr)
          const id = user.id; // extracting id (used to create the profile URL)
          const username = user.username; // extracting username
          const level = user.statistics.level.current; // extracting the current level (ex: 101)
          const level_progression = user.statistics.level.progress; // extracting the level progression (ex: 72 (%))
          const global_rank = user.statistics.global_rank.toLocaleString(); // extracting the current global rank, formatted (ex: 12 735)
          const country_rank = user.statistics.rank.country.toLocaleString(); // extracting the current country rank, formatted (ex: 1 234)
          const pp = Math.round(user.statistics.pp).toLocaleString(); // extracting pp amount, rounded and formatted (ex: 8 765)
          const accuracy = user.statistics.hit_accuracy.toFixed(2); // extracting average accuracy, rounded to a .01 precision
          const badgeAmount = user.badges.length; // extracting badge amount using the length of the badge array (ex: 2)
          const playtime = Math.round(user.statistics.play_time / 3600).toLocaleString(); // extracting and formatting the total playtime (ex: 1 400 (hours))
          const playcount = user.statistics.play_count.toLocaleString(); // extracting the playcount, formatted (ex: 47 837)
          const lastMonthPlaycount = user.monthly_playcounts[user.monthly_playcounts.length - 1].count.toLocaleString();
          const joinDate = user.join_date.split("T")[0]; // extracting the account creation date (ex: 2016-11-06)
          const ago = ta.ago(user.join_date);
          const subscribers = user.mapping_follower_count.toLocaleString(); // extracting mapping followers amount
          const subscriber_plural = subscribers > 1 ? "s" : "";
          const followers = user.follower_count.toLocaleString(); // extracting friend amount
          const follower_plural = followers > 1 ? "s" : "";
          const rankedMaps = user.ranked_and_approved_beatmapset_count; // extracting ranked maps amount
          const map_plural = rankedMaps > 1 ? "s" : "";
          const medals = user.user_achievements.length;
          const medalsProgression = Math.round((user.user_achievements.length / 261) * 100);
          var playstyle;
          if (user.playstyle) {
            playstyle = user.playstyle;
            playstyle = playstyle.join("+");
            playstyle = playstyle.replace("keyboard", "KB");
            playstyle = playstyle.replace("tablet", "TB");
            playstyle = playstyle.replace("mouse", "M");
            playstyle = playstyle.replace("touch", "TD");
          } else {
            playstyle = "N/A";
          }

          let wrapped = {
            // creating an object, containing all the needed fields of the future embed
            color: embedColor,
            title: "",
            image: "",
            thumbnail: `${avatar_url}`,
            url: `https://osu.ppy.sh/users/${id}`,
            footer: `${followers} follower${follower_plural} | ${subscribers} subscriber${subscriber_plural} | ${rankedMaps} ranked beatmap${map_plural} | Playstyle: ${playstyle} | ${isPlayingField}`,
            author: {
              name: `${username} on osu!standard`,
              url: `https://osu.ppy.sh/users/${id}`,
              iconURL: `https://osu.ppy.sh/favicon-32x32.png`,
            },
            fields: [
              {
                name: `**Performance:**`,
                value: `
                **🠶 #${global_rank} :earth_africa:
                🠶 #${country_rank} :flag_${country_code}:
                🠶 ${pp}pp
                🠶 ${accuracy}% avg.
                🠶 ${badgeAmount} badge(s) **
                `,
                inline: true, // fields will be side to side
              },
              {
                name: `**Progression:**`,
                value: `
                  **🠶 ${playtime} hours played
                  🠶 Joined ${joinDate} (${ago})
                  🠶 ${playcount} plays (${lastMonthPlaycount} last month)
                  🠶 Level ${level} (${level_progression}%)
                  🠶 ${medals} medal(s) (${medalsProgression}%)**
                  `,
                inline: true, // fields will be side to side
              },
            ],
          };

          let ans = embedhandler.execute(wrapped); // passing the object through the embed handler that'll create the "profile card"
          msg.channel.send(ans); // sending the "profile card"
        })

      });
    });
  }
};
