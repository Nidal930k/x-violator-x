const fs = require('fs');
const OWNERS_FILE = './data/owners.json';
const STAFF_FILE = './data/staff.json';

module.exports = {
  name: 'removestaff',
  async execute(message, args) {
    const owners = fs.existsSync(OWNERS_FILE) ? JSON.parse(fs.readFileSync(OWNERS_FILE)) : [];
    if (!owners.includes(message.author.id)) {
      return message.reply("🚫 Seul le fondateur peut retirer un membre du staff.");
    }

    const member = message.mentions.users.first();
    if (!member) return message.reply("⚠️ Mentionne un membre à retirer.");

    let staff = fs.existsSync(STAFF_FILE) ? JSON.parse(fs.readFileSync(STAFF_FILE)) : [];
    if (!staff.includes(member.id)) return message.reply("❌ Ce membre n’est pas staff.");

    staff = staff.filter(id => id !== member.id);
    fs.writeFileSync(STAFF_FILE, JSON.stringify(staff, null, 2));
    message.reply(`❌ ${member.tag} a été retiré du staff.`);
  }
};
