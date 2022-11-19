// link : https://discord.com/oauth2/authorize?client_id=1043588022895120534&scope=bot&permissions=1

// discord.js node modules
const Discord = require('discord.js');

// token contains a string thas is the password for the discord bot
require('dotenv').config();
const { token } = require('./token.json');

// Creating a new client with intents and partials needed for this bot to function.
const Client = new Discord.Client({
  intents: ['Guilds', 'GuildMessages', 'DirectMessages'],
  partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
});

// Ready event capture the state when the bot gets online.
Client.on('ready', (client) => {
  console.log('This is bot new online', client.user.tag);
});

// messageCreate new captures data of message that is create/posted.
Client.on('messageCreate', (message) => {
  // only run this code is the user that wrote the message is NOT a bot
  if (message.author.bot === false) {
    message.reply('Hello');
  }
});

// Logs in the discord bot with the password stored in an external file.
Client.login(process.env.TOKEN);
