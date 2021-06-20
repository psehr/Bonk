var CronJob = require("cron").CronJob;
var jobTest = new CronJob(
  "5 0 * * *",
  () => {
    const { exec } = require("child_process");

    exec("pm2 restart ../index.js ", () => {
      console.log("Performing automatic restart..");
    });
  },
  null,
  true,
  "America/Los_Angeles"
);
jobTest.start();
