const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member, client) {
    const channel = member.guild.channels.cache.find(ch =>
      ch.name.includes('bienvenue') || ch.name.includes('welcome')
    );

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle('👋 Nouveau membre !')
      .setDescription(`Bienvenue ${member}, t’es sur le territoire de **Violator Supreme**.\nComporte-toi bien... ou pas.`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `ID: ${member.id}` })
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
};
