const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('messageCreate', async message => {
  if (message.author.bot || !message.content.startsWith('!')) return;
  const args = message.content.slice(1).split(/ +/);
  const command = args.shift().toLowerCase();
  if (client.commands.has(command)) {
    client.commands.get(command).execute(message, args);
  }
});

client.login(process.env.TOKEN);
