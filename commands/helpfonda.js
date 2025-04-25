const fs = require('fs');
module.exports = {
  name: 'helpfonda',
  description: 'Commandes fonda',
  execute(message, args) {
    const owners = JSON.parse(fs.readFileSync('./owners.json')).owners;
    if (!owners.includes(message.author.id)) {
      return message.reply("🚫 Seuls les fondateurs peuvent accéder à cette commande.");
    }

    const embed = {
      color: 0xff0000,
      title: "👑 Commandes Fondateur",
      description: "Commandes réservées aux owners du bot :",
      fields: [
        { name: "!ban", value: "Ban un utilisateur" },
        { name: "!kick", value: "Kick un utilisateur" }
      ],
      footer: { text: "Violator Bot • Panel Fonda" }
    };

    message.channel.send({ embeds: [embed] });
  }
};
