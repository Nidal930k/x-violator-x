module.exports = {
  name: 'close',
  async execute(message) {
    if (!message.channel.name.startsWith("ticket-")) {
      return message.reply("❌ Cette commande ne peut être utilisée que dans un ticket.");
    }

    message.channel.send("🔒 Fermeture du ticket dans 5 secondes...").then(() => {
      setTimeout(() => {
        message.channel.delete().catch(console.error);
      }, 5000);
    });
  }
};
