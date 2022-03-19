module.exports = {
    name: "usercheck",
    async execute(msg, args) {

        const user = require("./user");
        var db = require("../../dbinit");

        switch (args.length) {
            case 0:
                const discUser = db.collection("users").doc(msg.author.id);
                const doc = await discUser.get();
                if (!doc.exists) {
                    return msg.reply("You have to link your osu! account first, use the `osuset` command");
                } else {
                    let q3 = await user.execute(doc.data().osu_id);

                    if (!q3.statistics.global_rank) {
                        msg.reply("invalid argument, the user \"`" + doc.data().osu_id + "`\" does not exist")
                        return false;
                    } else {
                        return q3.id;
                    }
                }
            case 1:
                let q = await user.execute(args[0]);
                if (!q.statistics.global_rank) {
                    msg.reply("invalid argument, the user \"`" + args[0] + "`\" does not exist")
                    return false;
                } else {
                    return q.id;
                }
            default:
                let args_f = args.join(" ");
                let q2 = await user.execute(args_f);
                if (!q2.statistics.global_rank) {
                    msg.reply("invalid argument, the user \"`" + args_f + "`\" does not exist")
                    return false;
                } else {
                    return q2.id;
                }



        }
    }
}