import { CommandClient, Intents } from './deps.ts';
import { config } from './config.ts';

const client = new CommandClient({
	prefix: '!',
	owners: ['325254775828512778']
});

client.on('ready', () => {
	console.log('Ready!');
});

client.commands.loader.loadDirectory('./commands', { maxDepth: 2 });

client.connect(config.token, Intents.All);