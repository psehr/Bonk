var CronJob = require("cron").CronJob;
var osulb = require("../functions/osu/osulb");
var log = require("../functions/log");
let db = require("../dbinit"); // initializing db through a separate file for reusability
var jobTest = new CronJob(
  "0 * * * *",
  () => {
    osulb.execute("hour");
  },
  null,
  true,
  "America/Los_Angeles"
);
jobTest.start();
