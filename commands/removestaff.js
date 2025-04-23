const fs = require('fs');
const STAFF_FILE = './data/staff.json';
const STAFF_ROLE_NAME = "BotStaff";

module.exports = {
  name: 'removestaff',
  async execute(message, args) {
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("❌ Tu n'as pas la permission.");
    }

    const user = message.mentions.users.first();
    if (!user) return message.reply("⚠️ Mentionne un utilisateur à retirer.");

    let staff = fs.existsSync(STAFF_FILE) ? JSON.parse(fs.readFileSync(STAFF_FILE)) : [];
    if (!staff.includes(user.id)) return message.reply("ℹ️ Cet utilisateur n'est pas dans le staff.");

    staff = staff.filter(id => id !== user.id);
    fs.writeFileSync(STAFF_FILE, JSON.stringify(staff, null, 2));

    const member = message.guild.members.cache.get(user.id);
    const role = message.guild.roles.cache.find(r => r.name === STAFF_ROLE_NAME);
    if (member && role) {
      await member.roles.remove(role).catch(console.error);
    }

    message.reply(`❌ ${user} a été retiré du staff et le rôle **${STAFF_ROLE_NAME}** lui a été enlevé.`);
  }
};
