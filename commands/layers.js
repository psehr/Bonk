module.exports = {
    name: 'layers',

    async execute(client, msg, args, db) {
        const c = require('../config.json');
        const unr = require('uniqueness-rating');

        unr.login_lazer(c.log, c.pass).then(async (api) => {
            msg.reply('Computing...')

            const beatmap = await api.beatmap.get(args[0]);
            const title = `${beatmap.beatmapset.artist} - ${beatmap.beatmapset.title} [${beatmap.version}]`
            const res = await unr.computeLayers(api, args[0], 1000);

            const str = `\`\`\`
Computed layers for ${title}

Layer 1 (DT + HR): ${res[0].average}pp out of ${res[0].scores.length} scores 
Layer 2 (FL): ${res[1].average}pp out of ${res[1].scores.length} scores 
Layer 3 (EZ): ${res[2].average}pp out of ${res[2].scores.length} scores 
Layer 4 (DT): ${res[3].average}pp out of ${res[3].scores.length} scores 
Layer 5 (HR): ${res[4].average}pp out of ${res[4].scores.length} scores 
Layer 6 (HD): ${res[5].average}pp out of ${res[5].scores.length} scores 
Layer 7 (HT): ${res[6].average}pp out of ${res[6].scores.length} scores 
Layer 8 (NM): ${res[7].average}pp out of ${res[7].scores.length} scores \`\`\``
            msg.channel.send(str);
        })
    }
}