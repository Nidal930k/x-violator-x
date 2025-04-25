const fs = require('fs');
module.exports = {
  name: 'ticketban',
  description: 'Ban via système de ticket',
  async execute(message, args) {
    const owners = JSON.parse(fs.readFileSync('./owners.json')).owners;
    if (!owners.includes(message.author.id)) {
      return message.reply("🚫 Seuls les fondateurs peuvent utiliser cette commande.");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("❌ Mentionne un utilisateur à bannir.");
    await member.ban({ reason: "Banni via ticket" });
    message.channel.send(`📩 ${member.user.tag} banni via ticket.`);
  }
};
