import { CommandClient, delay, Intents, Message } from './deps.ts';
import { config } from './config.ts';

const client = new CommandClient({
	prefix: '\\',
	owners: ['325254775828512778'],
});

client.on('ready', () => {
	console.log('Ready!');
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
});

client.connect(config.token, Intents.All);
