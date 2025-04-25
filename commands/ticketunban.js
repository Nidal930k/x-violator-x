const fs = require('fs');
module.exports = {
  name: 'ticketunban',
  description: 'Unban via système de ticket',
  async execute(message, args) {
    const owners = JSON.parse(fs.readFileSync('./owners.json')).owners;
    if (!owners.includes(message.author.id)) {
      return message.reply("🚫 Seuls les fondateurs peuvent utiliser cette commande.");
    }

    const userId = args[0];
    if (!userId) return message.reply("❌ Fournis un ID à débannir.");

    try {
      await message.guild.members.unban(userId);
      message.channel.send(`✅ L'utilisateur ${userId} a été débanni.`);
    } catch (err) {
      message.reply("❌ Impossible de débannir cet utilisateur.");
    }
  }
};
