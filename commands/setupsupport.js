module.exports = {
  name: 'setupsupport',
  async execute(message) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply("❌ Tu dois être admin pour faire ça.");
    }

    const guild = message.guild;

    const structure = [
      {
        name: "📜・INFORMATIONS",
        channels: [
          { name: "📢・annonces", topic: "Annonces du bot" },
          { name: "📘・règles", topic: "Règles du serveur" },
          { name: "🧠・fonctionnalités", topic: "Commandes et modules du bot" },
          { name: "📈・roadmap", topic: "Projets à venir" },
        ]
      },
      {
        name: "👥・COMMUNAUTÉ",
        channels: [
          { name: "💬・général" },
          { name: "🎉・présentations" },
          { name: "📸・memes-fun" },
        ]
      },
      {
        name: "🆘・SUPPORT",
        channels: [
          { name: "📩・créer-ticket", topic: "Clique ici pour ouvrir un ticket" },
        ]
      },
      {
        name: "📚・COMMANDES",
        channels: [
          { name: "⚙️・commande-test" },
          { name: "📃・logs-bot" },
          { name: "👮・modération" },
        ]
      },
    ];

    let supportRole = guild.roles.cache.find(r => r.name === "Support");
    if (!supportRole) {
      supportRole = await guild.roles.create({
        name: "Support",
        color: "Red",
        permissions: ["ViewChannel", "SendMessages"]
      });
    }

    for (const cat of structure) {
      const category = await guild.channels.create({
        name: cat.name,
        type: 4 // CATEGORY
      });

      for (const ch of cat.channels) {
        await guild.channels.create({
          name: ch.name,
          type: 0, // TEXT
          parent: category.id,
          topic: ch.topic || ""
        });
      }
    }

    message.reply("✅ Le serveur de support Violator a été généré !");
  }
};
