const fs = require('fs');
const path = require('path');

const STAFF_FILE = path.join(__dirname, '../data/staff.json');

module.exports = {
  name: 'removestaff',
  async execute(message, args) {
    if (message.author.id !== '1154008138769518652') {
      return message.reply("❌ Tu n'as pas la permission.");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mentionne un utilisateur à retirer.");

    if (!fs.existsSync(STAFF_FILE)) {
      return message.reply("❌ Aucun staff enregistré.");
    }

    const staffList = JSON.parse(fs.readFileSync(STAFF_FILE));
    const index = staffList.indexOf(member.id);
    if (index === -1) {
      return message.reply("⚠️ Ce membre n'est pas staff.");
    }

    staffList.splice(index, 1);
    fs.writeFileSync(STAFF_FILE, JSON.stringify(staffList, null, 2));

    // Retirer le rôle BotStaff si présent
    const role = message.guild.roles.cache.find(r => r.name === "BotStaff");
    if (role && member.roles.cache.has(role.id)) {
      try {
        await member.roles.remove(role);
      } catch (error) {
        console.error("Erreur suppression rôle :", error);
        return message.reply("⚠️ Le membre a été retiré du staff, mais le rôle n’a pas pu être retiré.");
      }
    }

    message.reply(`✅ <@${member.id}> a été retiré du staff de Violator.`);
  }
};
