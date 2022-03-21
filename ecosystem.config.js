module.exports = {
    apps: [{
        name: "index",
        script: "./index.js",
        cron_restart: "0 0 * * *"
    }, {
        name: "osulb",
        script: "./functions/osu/osulb.js",
        args: "hour",
        cron_restart: "0 * * * *"
    }, {
        name: "osulb",
        script: "./functions/osu/osulb.js",
        args: "live",
        cron_restart: "* * * * *"
    }]
}