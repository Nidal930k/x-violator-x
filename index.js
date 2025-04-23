const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const { prefix } = require('./config.json');
const settings = require('./configViolator.json');
const userBlacklist = require('./data/user-blacklist.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // pour détecter les entrées de membres
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.commands = new Collection();

// Chargement des commandes
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.name) {
    client.commands.set(command.name, command);
  }
}

// Chargement des events
const eventFiles = fs.existsSync('./events') ? fs.readdirSync('./events').filter(file => file.endsWith('.js')) : [];
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.name && typeof event.execute === 'function') {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Lorsqu’un membre rejoint le serveur
client.on('guildMemberAdd', async member => {
  const guildId = member.guild.id;
  const blacklistedUsers = userBlacklist.guilds[guildId] || [];

  if (blacklistedUsers.includes(member.id)) {
    try {
      await member.ban({ reason: 'Utilisateur blacklisté (Violator)' });
      console.log(`🚫 ${member.user.tag} a été auto-banni du serveur ${member.guild.name}`);
    } catch (err) {
      console.error("❌ Impossible de bannir l'utilisateur :", err);
    }
  }
});

// Lorsqu’un message est envoyé
client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

  const guildId = message.guild.id;
  const blacklistedUsers = userBlacklist.guilds[guildId] || [];

  if (blacklistedUsers.includes(message.author.id)) {
    return message.reply("🚫 Tu es blacklisté sur ce serveur. Tu ne peux pas utiliser ce bot.");
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (err) {
    console.error(err);
    message.reply("💥 Une erreur violente est survenue. Violator est en rage !");
  }
});

client.once('ready', () => {
  console.log(`🔥 Violator est prêt à frapper. Connecté en tant que ${client.user.tag}`);
});

client.login(process.env.TOKEN);
