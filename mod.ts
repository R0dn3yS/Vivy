import { CommandClient, Intents, Message, stripIndent, Embed, GuildTextBasedChannel } from './deps.ts';
import { delay } from './util/delay.ts';
import { config } from './config.ts';

const client = new CommandClient({
	prefix: '\\',
	owners: config.owners,
})

client.on('ready', () => {
	console.log('Ready!');
	client.setPresence({
		name: 'Camellia',
		type: 'LISTENING',
	})
});

client.commands.loader.loadDirectory('./commands', { maxDepth: 2 });

client.on('messageCreate', async (message: Message) => {
	if (message.author.bot) return;

	const year = new Date().getFullYear().toString().substring(2);
	const QUOTE_REGEX = new RegExp(`"(.+)" - <@!?(\\d{17,19})> 2k${year}`);

	// Quote Checker
	if (message.channelID === '789201783901650975' && !QUOTE_REGEX.test(message.content)) {
		message.delete();
		const botMessage = await message.channel.send('This message is not a quote.');
		await delay(2500);
		botMessage.delete();
	}

	if (message.content.startsWith('[') && message.content.endsWith(']')) {
		const REGEX = new RegExp('[0-9]{1,6}');
		const digits = message.content.substring(1, message.content.length - 1);

		if (REGEX.test(digits)) {
			message.channel.send(`https://nhentai.net/g/` + digits);
		}
	}
});

client.on('messageDelete', async (message: Message) => {
	if (message.channelID === '789201783901650975') return;

	const dLog = await message.guild!.channels.resolve('790787179663196191') as GuildTextBasedChannel;

	const dEmbed = new Embed()
		.setThumbnail(message.author.avatarURL())
		.setFooter(client.user!.username, client.user!.avatarURL())
		.setColor('#FFA500')
		.addField('Deleted Message', stripIndent`**> User:** ${message.author}
		**> Deleted in:** ${message.channel}
		**> Message:** ${message.content}`, true)
		.setTimestamp(Date.now());

	return dLog.send(dEmbed);
});

client.on('messageUpdate', async (oldMessage: Message, newMessage: Message) => {
	if (oldMessage.channelID === '789201783901650975') return;
	if (oldMessage.content === newMessage.content) return;

	const eLog = await oldMessage.guild!.channels.resolve('790792385889566751') as GuildTextBasedChannel;

	const eEmbed = new Embed()
		.setThumbnail(oldMessage.author.avatarURL())
		.setFooter(client.user!.username, client.user!.avatarURL())
		.setColor('#FFA500')
		.addField('Edited Message', stripIndent`**> User:** ${oldMessage.author}
		**> Edited in:** ${oldMessage.channel}
		**> Old message:** ${oldMessage.content}
		**> New message:** ${newMessage.content}`, true)
		.setTimestamp(Date.now());

	return eLog.send(eEmbed);
})

client.connect(config.token, Intents.All);
