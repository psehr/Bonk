module.exports = {
    name: 'unique',

    async execute(client, msg, args, db) {
        const c = require('../config.json');
        const unr = require('uniqueness-rating');

        unr.login_lazer(c.log, c.pass).then(async (api) => {
            msg.reply('Computing...')
            const score = await api.scores.score.get('osu', args[0]);

            const beatmap = await api.beatmap.get(score.beatmap.id);
            const title = `${beatmap.beatmapset.artist} - ${beatmap.beatmapset.title} [${beatmap.version}]`
            const l = await unr.computeLayers(api, score.beatmap.id, 1000);
            const s = await unr.getUniqueness(api, score.id, l);

            const str = `\`\`\`
${score.user.username} on ${title}

PP: ${s.pp}
Mods: ${s.mods.join()}
Layer: ${s.layerType}
Uniqueness: ${s.uniqueness}/100
\`\`\``
            msg.channel.send(str);
        })
    }
}