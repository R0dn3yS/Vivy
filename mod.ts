import { CommandClient, Intents, Message, delay } from './deps.ts';
import { config } from './config.ts';

const client = new CommandClient({
	prefix: '\\',
	owners: config.owners,
})

client.on('ready', () => {
	console.log('Ready!');
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

client.connect(config.token, Intents.All);
