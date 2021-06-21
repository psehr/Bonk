module.exports = {
  name: "user",
  aliases: ["u", "profile"],

  execute(client, msg, args, db) {
    const user = require("../functions/osu/user"); // importing the user function, used to call osu's APIv2 through osu-api-extended
    const embedhandler = require("../functions/embedhandler"); // importing the embed handler, used to format the data and create the embed that will be posted
    const usercheck = require("../functions/osu/usercheck"); // importing the user checker, used to check if the user actually exists and id formatting
    usercheck.execute(msg, args).then(async (user_id_formatted) => {
      // checking user
      user.execute(user_id_formatted).then((q) => {
        // fetching api using the answered id
        const avatar_url = q.avatar_url; // extracting profile picture
        const country_code = q.country_code.toLowerCase(); // extracting country code, formatted to lowercase, used for the flag emote (ex: fr)
        const id = q.id; // extracting id (used to create the profile URL)
        const username = q.username; // extracting username
        const level = q.statistics.level.current; // extracting the current level (ex: 101)
        const level_progression = q.statistics.level.progress; // extracting the level progression (ex: 72 (%))
        const global_rank = q.statistics.global_rank.toLocaleString(); // extracting the current global rank, formatted (ex: 12 735)
        const country_rank = q.statistics.rank.country.toLocaleString(); // extracting the current country rank, formatted (ex: 1 234)
        const pp = Math.round(q.statistics.pp).toLocaleString(); // extracting pp amount, rounded and formatted (ex: 8 765)
        const accuracy = q.statistics.hit_accuracy.toFixed(2); // extracting average accuracy, rounded to a .01 precision
        const badgeAmount = q.badges.length; // extracting badge amount using the length of the badge array (ex: 2)
        const playtime = Math.round(q.statistics.play_time / 3600).toLocaleString(); // extracting and formatting the total playtime (ex: 1 400 (hours))
        const playcount = q.statistics.play_count.toLocaleString(); // extracting the playcount, formatted (ex: 47 837)
        const joinDate = q.join_date.split("T")[0]; // extracting the account creation date (ex: 2016-11-06)
        const followers = q.mapping_follower_count; // extracting mapping followers amount
        const friends = q.follower_count; // extracting friend amount
        const rankedMaps = q.ranked_and_approved_beatmapset_count; // extracting ranked maps amount

        let wrapped = {
          // creating an object, containing all the needed fields of the future embed
          color: "#ff00ff", // rose
          title: "",
          image: "",
          thumbnail: `${avatar_url}`,
          url: `https://osu.ppy.sh/users/${id}`,
          footer: `${badgeAmount} badge(s) | ${friends} friend(s) | ${followers} follower(s) | ${rankedMaps} ranked beatmap(s)`,
          author: {
            name: `${username} on osu!`,
            url: `https://osu.ppy.sh/users/${id}`,
            iconURL: `https://upload.wikimedia.org/wikipedia/commons/4/44/Osu%21Logo_%282019%29.png`,
          },
          fields: [
            {
              name: `**Performance:**`,
              value: `
              **🠶 #${global_rank} :earth_africa:
              🠶 #${country_rank} :flag_${country_code}:
              🠶 ${pp}pp
              🠶 ${accuracy}% avg.**
              `,
              inline: true, // fields will be side to side
            },
            {
              name: `**Progression:**`,
              value: `
                **🠶 ${playtime} hours played
                🠶 ${playcount} plays
                🠶 Level ${level} (${level_progression}%)
                🠶 Joined ${joinDate} **
                `,
              inline: true, // fields will be side to side
            },
          ],
        };

        let ans = embedhandler.execute(wrapped); // passing the object through the embed handler that'll create the "profile card"
        msg.channel.send(ans); // sending the "profile card"
      });
    });
  },
};
