const fs = require('fs');
const path = require('path');
const accessPath = path.join(__dirname, '../data/user-blacklist.json');
let data = require(accessPath);

module.exports = {
  name: "blacklistserver",
  description: "Blacklist un membre et le bannit du serveur",
  async execute(message, args) {
    if (message.author.id !== "1154008138769518652") return message.reply("❌ Commande réservée au créateur.");
    
    const userId = args[0];
    if (!userId) return message.reply("❌ Utilisation : !blacklistserver <ID utilisateur>");

    const guildId = message.guild.id;
    if (!data.guilds[guildId]) data.guilds[guildId] = [];

    if (!data.guilds[guildId].includes(userId)) {
      data.guilds[guildId].push(userId);
      fs.writeFileSync(accessPath, JSON.stringify(data, null, 2));
      try {
        await message.guild.members.ban(userId, { reason: "Blacklisted by Violator" });
        message.reply(`🚫 L'utilisateur ${userId} a été blacklisté et banni.`);
      } catch (err) {
        message.reply("⚠️ L'utilisateur est blacklisté, mais le bannissement a échoué (peut-être pas sur le serveur).");
      }
    } else {
      message.reply("⚠️ Cet utilisateur est déjà blacklisté.");
    }
  }
};
