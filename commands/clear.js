const fs = require('fs');
const STAFF_FILE = './data/staff.json';

module.exports = {
  name: 'clear',
  async execute(message, args) {
    const staff = fs.existsSync(STAFF_FILE) ? JSON.parse(fs.readFileSync(STAFF_FILE)) : [];
    if (!staff.includes(message.author.id)) {
      return message.reply("🚫 Seuls les membres du staff peuvent utiliser cette commande.");
    }

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount < 1 || amount > 100) {
      return message.reply("❌ Fournis un nombre valide entre 1 et 100.");
    }

    await message.channel.bulkDelete(amount, true);
    message.channel.send(`✅ ${amount} messages supprimés.`).then(msg => setTimeout(() => msg.delete(), 3000));
  }
};
