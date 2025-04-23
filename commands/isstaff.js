const fs = require('fs');
const path = require('path');

const STAFF_FILE = path.join(__dirname, '../data/staff.json');
const OWNER_ID = '1154008138769518652';

module.exports = {
  name: 'isstaff',
  async execute(message, args) {
    const target = message.mentions.users.first() || message.author;

    const staffList = fs.existsSync(STAFF_FILE) ? JSON.parse(fs.readFileSync(STAFF_FILE)) : [];

    const isOwner = target.id === OWNER_ID;
    const isInStaffList = staffList.includes(target.id);
    const hasStaffRole = message.guild.members.cache.get(target.id)?.roles.cache.some(role => role.name === 'BotStaff');

    let result = `🔍 **Vérification de <@${target.id}> :**
`;

    result += isOwner ? '👑 Est Owner du bot
' : '';
    result += isInStaffList ? '✅ Est enregistré dans le staff.json
' : '❌ N’est pas dans le staff.json
';
    result += hasStaffRole ? '✅ A le rôle Discord `BotStaff`
' : '❌ N’a pas le rôle `BotStaff`
';

    message.reply(result);
  }
};
