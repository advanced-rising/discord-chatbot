// link : https://discord.com/oauth2/authorize?client_id=1043588022895120534&scope=bot&permissions=1

// discord.js node modules
const { GatewayIntentBits } = require('discord.js');
const Discord = require('discord.js');

// token contains a string thas is the password for the discord bot
require('dotenv').config();
const { token } = require('./token.json');

// Creating a new client with intents and partials needed for this bot to function.
const Client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction],
});

// Ready event capture the state when the bot gets online.
Client.on('ready', (client) => {
  console.log('This is bot new online', client.user.tag);
});

// messageCreate new captures data of message that is create/posted.
Client.on('messageCreate', (message) => {
  // only run this code is the user that wrote the message is NOT a bot
  if (message.author.bot === false) {
    const userInput = message.content.toLowerCase();
    const userInputSplit = message.content.split(' ');

    if (userInputSplit[0] == '!randomreward') {
      const userInputSplitNumber = Math.floor(Number(userInputSplit[1]));
      if (userInputSplitNumber > 10000) return message.reply('number 10000 under');

      if (
        !isNaN(userInputSplitNumber) &&
        userInputSplitNumber > 0 &&
        userInputSplitNumber < 10001
      ) {
        let rewardRolls = 0;

        let rareSword = 0;
        let epicSword = 0;
        let legendarySword = 0;

        for (let i = 0; i < userInputSplitNumber; i++) {
          rewardRolls += Math.floor(Math.random() * 3) * 3;
        }

        for (let i = 0; i < rewardRolls; i++) {
          // number between 1-250
          const randomNumber = Math.floor(Math.random() * 250) + 1;
          if (randomNumber == 100) {
            rareSword++;
          } else if (randomNumber == 150) {
            epicSword++;
          } else if (randomNumber == 200) {
            legendarySword++;
          }
        }
        // Tailoring a message reply with how many loot boxes you opened and how many items you received.
        const replyText =
          'You opened ' +
          userInputSplitNumber +
          ' Loot Boxes!\nRare Sword: ' +
          rareSword +
          '\nEpic Sword: ' +
          epicSword +
          '\nLegendary Sword: ' +
          legendarySword;

        // https://discord.com/developers/docs/resources/channel#channel-object-channel-types
        // reply if command was written inside a text channel in a server
        if (message.channel.type === 0) {
          message.reply(replyText);
        }

        // reply if command was written in direct message
        else if (message.channel.type === 1) {
          message.channel.send(replyText);
        }

        return;
      }
      message.reply('Wrong input or wrong command');
    }
  }
});

// Logs in the discord bot with the password stored in an external file.
Client.login(process.env.TOKEN);
