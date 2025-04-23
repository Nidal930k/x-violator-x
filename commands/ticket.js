const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'ticket',
  async execute(message) {
    const existing = message.guild.channels.cache.find(c => c.name === `ticket-${message.author.id}`);
    if (existing) return message.reply("❗ Tu as déjà un ticket ouvert.");

    const channel = await message.guild.channels.create({
      name: `ticket-${message.author.id}`,
      type: 0, // TEXT
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: message.author.id,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
        },
        {
          id: message.client.user.id,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
        },
      ],
    });

    channel.send(`🎫 **Ticket ouvert par <@${message.author.id}>**
Un membre du staff te répondra sous peu.`);
    message.reply(`✅ Ton ticket a été créé : ${channel}`);
  }
};
