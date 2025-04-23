const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const { prefix } = require('./config.json');
const settings = require('./configViolator.json');
const userBlacklist = require('./data/user-blacklist.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.name) {
    client.commands.set(command.name, command);
  }
}

client.on('guildMemberAdd', async member => {
  const guildId = member.guild.id;
  const blacklistedUsers = userBlacklist.guilds[guildId] || [];

  if (blacklistedUsers.includes(member.id)) {
    try {
      await member.ban({ reason: 'Utilisateur blacklisté (Violator)' });
      console.log(`🚫 ${member.user.tag} a été auto-banni.`);
    } catch (err) {
      console.error("❌ Erreur lors du bannissement :", err);
    }
  }
});

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

  const blacklistedUsers = userBlacklist.guilds[message.guild.id] || [];
  if (blacklistedUsers.includes(message.author.id)) {
    return message.reply("🚫 Tu es blacklisté sur ce serveur.");
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (err) {
    console.error(err);
    message.reply("💥 Une erreur est survenue !");
  }
});

client.once('ready', () => {
  console.log(`✅ Violator prêt en tant que ${client.user.tag}`);
});

client.login(process.env.TOKEN);
