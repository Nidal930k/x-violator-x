const fs = require('fs');
const path = require('path');

const STAFF_FILE = path.join(__dirname, '../data/staff.json');

module.exports = {
  name: 'stafflist',
  async execute(message) {
    if (!fs.existsSync(STAFF_FILE)) {
      return message.reply("📭 Aucun staff enregistré.");
    }

    const staffList = JSON.parse(fs.readFileSync(STAFF_FILE));
    if (staffList.length === 0) {
      return message.reply("📭 Aucun staff enregistré.");
    }

    const staffMentions = staffList.map(id => `<@${id}>`).join("\n");
    message.channel.send(`📋 **Liste des staff de Violator :**\n${staffMentions}`);
  }
};
