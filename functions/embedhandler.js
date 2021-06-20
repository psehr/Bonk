module.exports = {
  name: "embedhandler",
  execute(wrapped) {
    const Discord = require("discord.js");
    let embed = new Discord.MessageEmbed()
      .setColor(wrapped.color)
      .setTitle(wrapped.title)
      .setImage(wrapped.image)
      .setThumbnail(wrapped.thumbnail)
      .setURL(wrapped.url)
      .setFooter(wrapped.footer)
      .setAuthor(wrapped.author.name, wrapped.author.iconURL, wrapped.author.url);

    wrapped.fields.forEach(field => {
      embed.addFields(field);
    });
  
    return embed;
  },
};
