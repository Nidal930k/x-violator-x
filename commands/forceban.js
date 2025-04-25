const fs = require('fs');
module.exports = {
  name: 'forceban',
  description: 'Ban un utilisateur même s’il n’est pas dans le serveur',
  async execute(message, args) {
    const owners = JSON.parse(fs.readFileSync('./owners.json')).owners;
    if (!owners.includes(message.author.id)) {
      return message.reply("🚫 Tu n’as pas la permission d’utiliser cette commande.");
    }

    const userId = args[0];
    if (!userId) return message.reply("❌ Fournis un ID d'utilisateur à bannir.");
    const reason = args.slice(1).join(" ") || "Aucune raison précisée.";

    try {
      await message.guild.members.ban(userId, { reason });
      message.channel.send(`⛔ L'utilisateur ${userId} a été banni du serveur.`);
    } catch (err) {
      message.reply("❌ Impossible de bannir cet utilisateur.");
    }
  }
};
