// link : https://discord.com/oauth2/authorize?client_id=1043588022895120534&scope=bot&permissions=1

// discord.js node modules
const { GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

// token contains a string thas is the password for the discord bot
require('dotenv').config();
const { token } = require('./token.json');
const channelId = '1043593047306412044';
const guildId = '1043593046803099648';
const discordId = '1043812579300094002';
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

  let commands;

  const guild = Client.guilds.cache.get(guildId);
  if (guild) {
    commands = guild.commands;
  } else {
    commands = Client.application.commands;
  }
  const data = new SlashCommandBuilder()
    .setName('clean')
    .setDescription('Replies with your input!')
    .addStringOption((option) => option.setName('input').setDescription('The input to echo back'))
    .addChannelOption((option) =>
      option.setName('channel').setDescription('The channel to echo into')
    );
  commands?.create({
    name: 'ping',
    description: 'Replies with pong.',
  });

  commands?.create({
    name: 'add',
    description: 'Adds two numbers',
    options: [
      {
        name: 'num1',
        description: 'The first numbers',
        required: true,
      },
      {
        name: 'num1',
        description: 'The first numbers',
        required: true,
      },
    ],
  });
});

Client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName, options } = interaction;

  if (commandName === 'ping') {
    interaction.reply({
      content: 'pong',
      ephemeral: true,
    });
  }
});

// Event when a user is added to the server
Client.on('guildMemberAdd', (guildMember) => {
  //guildMember.guild.channels.fetch().then(channels => console.log(channels)).catch(console.error);

  // send a DM to the new member
  if (guildMember.user.bot == false) {
    guildMember.send('Welcome to the server!');
  }

  // Send message to General text channel
  guildMember.guild.channels
    .fetch(channelId)
    .then((channel) => channel.send('Welcome to the server! <@' + guildMember.id + '>'))
    .catch(console.error);

  // send admin message to admin text channel
  guildMember.guild.channels
    .fetch(channelId)
    .then((channel) =>
      channel.send(
        guildMember.user.tag +
          ' joined the server. Date & Time: ' +
          new Date(guildMember.joinedTimestamp)
      )
    )
    .catch(console.error);

  // Converting milliseconds to a date beginning from 1 january 1970.
  console.log(1000000);
  console.log(new Date(1000000));

  //console.log(guildMember);
  //console.log("\n");
  //console.log(guildMember.guild);
  //console.log("\n");
  //console.log(guildMember.guild.channels);
  //console.log("\n");

  // ID for general channel: 934414515167170645
  // ID for admin channel: 951951720311820299
});

// messageCreate new captures data of message that is create/posted.
Client.on('messageCreate', (message) => {
  // only run this code is the user that wrote the message is NOT a bot
  if (message.author.bot === false) {
    console.log('message.content', message);
    const userInput = message.content.toLowerCase();
    const userInputSplit = message.content.split(' ');
    const Embed = new Discord.EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Hello, Title')
      .setURL('https://www.google.com/')
      .setDescription('Hello, Description')
      .setAuthor({
        name: 'risingcore',
        iconURL: 'https://avatars.githubusercontent.com/u/34502254?v=4',
        url: 'https://www.google.com/',
      })
      .setImage('https://avatars.githubusercontent.com/u/34502254?v=4')
      .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true }
      )
      .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
      .setImage('https://i.imgur.com/AfFp7pu.png')
      .setTimestamp()
      .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
    message.reply({ embeds: [Embed] });

    const exampleEmbed = {
      color: 0x0099ff,
      title: 'Some title',
      url: 'https://discord.js.org',
      author: {
        name: 'Some name',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
        url: 'https://discord.js.org',
      },
      description: 'Some description here',
      thumbnail: {
        url: 'https://i.imgur.com/AfFp7pu.png',
      },
      fields: [
        {
          name: 'Regular field title',
          value: 'Some value here',
        },
        {
          name: '\u200b',
          value: '\u200b',
          inline: false,
        },
        {
          name: 'Inline field title',
          value: 'Some value here',
          inline: true,
        },
        {
          name: 'Inline field title',
          value: 'Some value here',
          inline: true,
        },
        {
          name: 'Inline field title',
          value: 'Some value here',
          inline: true,
        },
      ],
      image: {
        url: 'https://i.imgur.com/AfFp7pu.png',
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Some footer text here',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
      },
    };
    // message.reply({ embeds: [exampleEmbed] });

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
