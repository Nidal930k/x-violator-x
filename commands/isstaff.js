const fs = require('fs');

const OWNERS_FILE = './data/owners.json';
const STAFF_FILE = './data/staff.json';

module.exports = {
  name: 'isstaff',
  async execute(message, args) {
    const member = message.mentions.users.first() || message.author;
    const owners = fs.existsSync(OWNERS_FILE) ? JSON.parse(fs.readFileSync(OWNERS_FILE)) : [];
    const staff = fs.existsSync(STAFF_FILE) ? JSON.parse(fs.readFileSync(STAFF_FILE)) : [];

    const isOwner = owners.includes(member.id);
    const isStaff = staff.includes(member.id);

    let result = `🔍 Vérification pour **${member.tag}** :\n`;
    result += isOwner ? '👑 Est Owner du bot\n' : '';
    result += isStaff ? '🛡️ Est membre du Staff\n' : '';
    if (!isOwner && !isStaff) result += '❌ N’a aucun rôle spécial.';

    message.reply(result);
  }
};
