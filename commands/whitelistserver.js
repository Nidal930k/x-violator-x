const fs = require('fs');
const path = require('path');
const accessPath = path.join(__dirname, '../data/user-blacklist.json');
let data = require(accessPath);

module.exports = {
  name: "whitelistserver",
  description: "Retire un membre de la blacklist",
  async execute(message, args) {
    if (message.author.id !== "1154008138769518652") return message.reply("❌ Commande réservée au créateur.");

    const userId = args[0];
    if (!userId) return message.reply("❌ Utilisation : !whitelistserver <ID utilisateur>");

    const guildId = message.guild.id;
    if (!data.guilds[guildId]) data.guilds[guildId] = [];

    const index = data.guilds[guildId].indexOf(userId);
    if (index !== -1) {
      data.guilds[guildId].splice(index, 1);
      fs.writeFileSync(accessPath, JSON.stringify(data, null, 2));
      try {
        await message.guild.members.unban(userId);
        message.reply(`✅ L'utilisateur ${userId} a été retiré de la blacklist et débanni.`);
      } catch {
        message.reply(`✅ L'utilisateur ${userId} a été retiré de la blacklist.`);
      }
    } else {
      message.reply("⚠️ Cet utilisateur n'était pas dans la blacklist.");
    }
  }
};
