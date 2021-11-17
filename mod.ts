import { CommandClient, Intents } from './deps.ts';
import { config } from './config.ts';

const client = new CommandClient({
	prefix: '!'
});

client.on('ready', () => {
	console.log('Ready!');
});

client.commands.loader.loadDirectory('./commands');

client.connect(config.token, Intents.None);