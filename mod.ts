import { CommandClient, Intents, Message, delay } from './deps.ts';
import { config } from './config.ts';

const client = new CommandClient({
	prefix: '!',
	owners: ['325254775828512778']
});

client.on('ready', () => {
	console.log('Ready!');
});

client.commands.loader.loadDirectory('./commands', { maxDepth: 2 });

client.on('messageCreate', (message: Message) => {
	if (message.author.bot) return;

	// Quote Checker
	if (message.channelID == '789201783901650975') {
		const fullYear = new Date(Date.now()).getFullYear();
		const year = fullYear.toString().substring(2);

		if (!message.content.startsWith('"')) {
			message.delete();
			return message.channel.send('This message is not a quote.').then(async msg => {
				await delay(2500);
				msg.delete();
			})
		} else if (message.content.substring(1).startsWith('"')) {
			message.delete();
			return message.channel.send('Cannot use empty quote.').then(async msg => {
				await delay(2500);
				msg.delete();
			})
		} else if (!message.content.endsWith(year)) {
			message.delete();
			return message.channel.send(`This message does not end with 2k${year}.`).then(async msg => {
				await delay(2500);
				msg.delete();
			})
		} else if (!message.mentions.users.first()) {
			message.delete();
			return message.channel.send('This quote does not contain a mention.').then(async msg => {
				await delay(2500);
				msg.delete();
			})
		} else {
			return;
		}
	}
})

client.connect(config.token, Intents.All);