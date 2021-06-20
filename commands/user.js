module.exports = {
  name: "user",
  aliases: ["u", "profile"],

  execute(client, msg, args, db) {
    const user = require("../functions/osu/user");
    const embedhandler = require("../functions/embedhandler");
    const usercheck = require("../functions/osu/usercheck");
    usercheck.execute(msg, args).then(async (user_id_formatted) => {
      user.execute(user_id_formatted).then((q) => {
        const avatar_url = q.avatar_url;
        const country_code = q.country_code.toLowerCase();
        const id = q.id;
        const username = q.username;
        const level = q.statistics.level.current;
        const level_progression = q.statistics.level.progress;
        const global_rank = q.statistics.global_rank.toLocaleString();
        const country_rank = q.statistics.rank.country.toLocaleString();
        const pp = Math.round(q.statistics.pp).toLocaleString();
        const accuracy = q.statistics.hit_accuracy.toFixed(2);
        const badgeAmount = q.badges.length;
        const playtime = Math.round(q.statistics.play_time / 3600).toLocaleString();
        const playcount = q.statistics.play_count.toLocaleString();
        const joinDate = q.join_date.split("T")[0];
        const followers = q.mapping_follower_count;
        const friends = q.follower_count;
        const rankedMaps = q.ranked_and_approved_beatmapset_count;

        let wrapped = {
          color: "#ff00ff",
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
              inline: true,
            },
            {
              name: `**Progression:**`,
              value: `
                **🠶 ${playtime} hours played
                🠶 ${playcount} plays
                🠶 Level ${level} (${level_progression}%)
                🠶 Joined ${joinDate} **
                `,
              inline: true,
            },
          ],
        };

        let ans = embedhandler.execute(wrapped);
        msg.channel.send(ans);
      });
    });
  },
};
