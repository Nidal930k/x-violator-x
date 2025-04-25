const fs = require('fs');
module.exports = {
  name: 'kick',
  description: 'Kick un utilisateur',
  async execute(message, args) {
    const owners = JSON.parse(fs.readFileSync('./owners.json')).owners;
    if (!owners.includes(message.author.id)) {
      return message.reply("🚫 Tu n’as pas la permission d’utiliser cette commande.");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("❌ Mentionne un membre à kick.");
    if (!member.kickable) return message.reply("❌ Je ne peux pas kick cet utilisateur.");

    const reason = args.slice(1).join(" ") || "Aucune raison spécifiée.";
    await member.kick(reason);
    message.channel.send(`👢 ${member.user.tag} a été kické. Raison : ${reason}`);
  }
};
