var CronJob = require("cron").CronJob;
var osulb = require("../functions/osu/osulb")
var job = new CronJob(
  "* * * * *",
  () => {
    osulb.execute('live')
  },
  null,
  true,
  "America/Los_Angeles"
);
job.start();
