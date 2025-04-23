const fs = require('fs');
const path = require('path');
const STAFF_FILE = './data/staff.json';
const WARNS_FILE = './data/warns.json';

module.exports = {
  name: 'warn',
  async execute(message, args) {
    const staff = fs.existsSync(STAFF_FILE) ? JSON.parse(fs.readFileSync(STAFF_FILE)) : [];
    if (!staff.includes(message.author.id)) {
      return message.reply("❌ Tu n’as pas la permission d’utiliser cette commande.");
    }

    const user = message.mentions.users.first();
    if (!user) return message.reply("⚠️ Mentionne un utilisateur à warn.");
    const reason = args.slice(1).join(" ") || "Aucune raison spécifiée.";

    const warns = fs.existsSync(WARNS_FILE) ? JSON.parse(fs.readFileSync(WARNS_FILE)) : {};
    if (!warns[user.id]) warns[user.id] = [];
    warns[user.id].push({
      moderator: message.author.tag,
      reason: reason,
      date: new Date().toISOString()
    });

    fs.writeFileSync(WARNS_FILE, JSON.stringify(warns, null, 2));
    message.channel.send(`⚠️ ${user.tag} a été warn : ${reason}`);
  }
};
