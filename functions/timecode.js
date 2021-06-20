module.exports = {
    name: "timecode",
    execute() {
        const { UTCIncrement } = require("../config.json");
        var d = new Date();

        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();

        let hour = d.getHours() + UTCIncrement;
        let hourConcat = "";
        let minute = d.getMinutes();
        let minuteConcat = "";
        let second = d.getSeconds();
        let secondConcat = "";

        if (hour > 24) {
            hour-=24;
        }
        if (hour < 10) {
            hourConcat = "0";
        }
        if (minute < 10) {
            minuteConcat = "0";
        }
        if (second < 10) {
            secondConcat = "0";
        }

        let time = hourConcat + hour + ":" + minuteConcat + minute + ":" + secondConcat + second;
        let timecodeObject = {
            date: year + "-" + month + "-" + day,
            time: time
        }

        return timecodeObject;
    }
};