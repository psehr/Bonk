var CronJob = require("cron").CronJob;
var osulb = require("../functions/osu/osutrack");
var log = require("../functions/log");
let db = require("../dbinit"); // initializing db through a separate file for reusability
var jobTest = new CronJob(
  "0 * * * *",
  () => {
    osutrack.execute();
  },
  null,
  true,
  "America/Los_Angeles"
);
jobTest.start();