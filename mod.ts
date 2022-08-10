import { CommandClient, Embed, GuildTextBasedChannel, Intents, Member, Message, stripIndent, VoiceChannel } from './deps.ts';
import { delay } from './util/delay.ts';
import { config } from './config.ts';

let memberCount: number;
let countChannel: VoiceChannel;

const client = new CommandClient({
  prefix: '\\',
  owners: config.owners,
});

client.on('ready', async () => {
  console.log(`${client.user!.username} is ready on ${await client.guilds.size()} servers.`);
  client.setPresence({
    name: 'over you',
    type: 'WATCHING',
  });
  countChannel = await client.channels.resolve('947819208518008874') as VoiceChannel;
  memberCount = await countChannel.guild.memberCount!;
  console.log(`Guild has ${memberCount} members`);
  await countChannel.edit({ name: `Members: ${memberCount}` });
});

client.commands.loader.loadDirectory('./commands', { maxDepth: 2 });

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;

  const year = new Date().getFullYear().toString().substring(2);
  const QUOTE_REGEX = new RegExp(`"(.+)" - <@!?(\\d{17,19})> 2k${year}`);

  // Quote Checker
  if (
    message.channelID === '789201783901650975' &&
    !QUOTE_REGEX.test(message.content)
  ) {
    message.delete();
    const botMessage = await message.channel.send(
      'This message is not a quote.',
    );
    await delay(2500);
    botMessage.delete();
  }

  if (message.content.startsWith('[') && message.content.endsWith(']')) {
    const digits = message.content.substring(1, message.content.length - 1);

    if (parseInt(digits).toString() === digits) {
      message.channel.send(`https://nhentai.net/g/` + digits);
    }
  }
});

client.on('messageDelete', async (message: Message) => {
  if (message.channelID === '789201783901650975') return;
  if (message.content.length > 1000) return;

  const dLog = await message.guild!.channels.resolve(
    '790787179663196191',
  ) as GuildTextBasedChannel;

  const dEmbed = new Embed()
    .setThumbnail(message.author.avatarURL())
    .setFooter(client.user!.username, client.user!.avatarURL())
    .setColor('#FFA500')
    .addField(
      'Deleted Message',
      stripIndent`**> User:** ${message.author}
		**> Deleted in:** ${message.channel}
		**> Message:** ${message.content}`,
      true,
    )
    .setTimestamp(Date.now());

  return dLog.send(dEmbed);
});

client.on('messageUpdate', async (oldMessage: Message, newMessage: Message) => {
  if (oldMessage.channelID === '789201783901650975') return;
  if (oldMessage.content === newMessage.content) return;
  if (oldMessage.content.length > 500) return;
  if (newMessage.content.length > 500) return;

  const eLog = await oldMessage.guild!.channels.resolve(
    '790792385889566751',
  ) as GuildTextBasedChannel;

  const eEmbed = new Embed()
    .setThumbnail(oldMessage.author.avatarURL())
    .setFooter(client.user!.username, client.user!.avatarURL())
    .setColor('#FFA500')
    .addField(
      'Edited Message',
      stripIndent`**> User:** ${oldMessage.author}
		**> Edited in:** ${oldMessage.channel}
		**> Old message:** ${oldMessage.content}
		**> New message:** ${newMessage.content}`,
      true,
    )
    .setTimestamp(Date.now());

  return eLog.send(eEmbed);
});

client.on('guildMemberAdd', async (_member: Member) => {
  memberCount += 1;
  await countChannel.edit({ name: `Members: ${memberCount}` });
});

client.on('guildMemberRemove', async (_member: Member) => {
  memberCount -= 1;
  await countChannel.edit({ name: `Members: ${memberCount}` });
});

client.on('commandNotFound', async (message) => {
  await message.reply('This command does not exist you fucking idiot.').then(async (msg) => {
    await delay(2500);
    msg.delete();
    message.delete();
  });
});

client.on('presenceUpdate', async (presence) => {
  const pUser = presence.user;
  const guild = await client.guilds.resolve('486410117961744384');

  if (presence.activities[0].name === 'League of Legends') {
    console.log(`${pUser.username} is playing League`);
    const pMember = await guild?.members.resolve(pUser.id);
    pMember?.kick('Playing League of Legends');
  }
});

client.connect(config.token, Intents.All);
