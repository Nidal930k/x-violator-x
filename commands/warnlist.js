const fs = require('fs');
const WARNS_FILE = './data/warns.json';

module.exports = {
  name: 'warnlist',
  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;
    const warns = fs.existsSync(WARNS_FILE) ? JSON.parse(fs.readFileSync(WARNS_FILE)) : {};
    const userWarns = warns[user.id] || [];

    if (userWarns.length === 0) {
      return message.reply("✅ Aucun warn trouvé pour cet utilisateur.");
    }

    const list = userWarns.map((warn, i) => `\`\`#${i + 1}\`\` - ${warn.reason} (par ${warn.moderator}, le ${new Date(warn.date).toLocaleString()})`).join("\n");
    message.reply(`📋 Historique des warns pour **${user.tag}** :\n${list}`);
  }
};
