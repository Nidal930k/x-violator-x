const fs = require('fs');
const path = require('path');

const STAFF_FILE = path.join(__dirname, '../data/staff.json');

module.exports = {
  name: 'addstaff',
  async execute(message, args) {
    if (message.author.id !== '1154008138769518652') {
      return message.reply("❌ Tu n'as pas la permission.");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mentionne un utilisateur pour le promouvoir.");

    if (!fs.existsSync(STAFF_FILE)) {
      fs.writeFileSync(STAFF_FILE, JSON.stringify([]));
    }

    const staffList = JSON.parse(fs.readFileSync(STAFF_FILE));
    if (staffList.includes(member.id)) {
      return message.reply("⚠️ Ce membre est déjà staff.");
    }

    staffList.push(member.id);
    fs.writeFileSync(STAFF_FILE, JSON.stringify(staffList, null, 2));

    // Donner un rôle Discord
    let staffRole = message.guild.roles.cache.find(role => role.name === "BotStaff");
    if (!staffRole) {
      try {
        staffRole = await message.guild.roles.create({
          name: "BotStaff",
          color: "#FF0000",
          reason: "Rôle pour les membres staff du bot"
        });
      } catch (error) {
        console.error("Erreur création rôle :", error);
        return message.reply("❌ Impossible de créer le rôle BotStaff.");
      }
    }

    try {
      await member.roles.add(staffRole);
    } catch (error) {
      console.error("Erreur ajout rôle :", error);
      return message.reply("❌ Je n’ai pas pu ajouter le rôle. Vérifie mes permissions.");
    }

    message.reply(`✅ <@${member.id}> est maintenant un staff de Violator et a reçu le rôle **BotStaff**.`);
  }
};
