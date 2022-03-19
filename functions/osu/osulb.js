var dab = require("../../dbinit");
const client = require("../../dclient");
const { argv } = require("process");

dab
  .collection("osulb")
  .doc("count")
  .get()
  .then((q) => {
    let count = q.data().i;
    const timecode = require("../timecode.js"); // timecode function: basic function to fetch the current time and date
    let timecodeObject = timecode.execute(); // using the timecode function to get current date and time
    let timeString = `${count}_${timecodeObject.date}_${timecodeObject.time}`;

    dab
      .collection("osulb")
      .doc("count")
      .update({
        i: count + 1,
      });

    let db = dab.collection("osulb").doc("leaderboard_live");
    let dbh = dab.collection("osulb").doc("leaderboard_hour");

    const api = require("osu-npm");

    api.get_n_leaderboard_spots(0, 50, (res) => {
      if (argv[2] == "live") {
        db.set({
          date: timeString,
          leaderboard: Object.values(res),
        });
      } else {
        db.set({
          date: timeString,
          leaderboard: Object.values(res),
        });
        dbh.set({
          date: timeString,
          leaderboard: Object.values(res),
        });
        client.once('ready', () => {
          client.channels.fetch("811992998077923399").then((channel) => {
            channel.send(`${timeString}\n - ${res.join("\n - ")}`);
          });
        })
      }
    });
  });


