const fs = require('fs');
module.exports = {
  name: 'resetbot',
  description: 'Redémarre le bot',
  async execute(message, args) {
    const owners = JSON.parse(fs.readFileSync('./owners.json')).owners;
    if (!owners.includes(message.author.id)) {
      return message.reply("🚫 Tu n’as pas la permission de redémarrer le bot.");
    }

    message.channel.send("♻️ Redémarrage du bot...").then(() => {
      process.exit();
    });
  }
};
