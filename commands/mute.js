const fs = require('fs');
const STAFF_FILE = './data/staff.json';

module.exports = {
  name: 'mute',
  async execute(message, args) {
    const staffList = fs.existsSync(STAFF_FILE) ? JSON.parse(fs.readFileSync(STAFF_FILE)) : [];

    if (!staffList.includes(message.author.id)) {
      return message.reply("🚫 Tu n’as pas la permission d’utiliser cette commande.");
    }

    // Ici tu ajoutes le vrai comportement de la commande
    message.reply("✅ La commande `mute` est maintenant sécurisée, ajoute ton code ici !");
  }
};
