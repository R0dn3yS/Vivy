import { CommandClient, Command, Intents, CommandContext } from './deps.ts';
import { token } from './config.ts';

const client = new CommandClient({
	prefix: '!'
});

client.on('ready', () => {
	console.log('Ready!');
});

class PingCommand extends Command {
	name = 'ping'
	execute(ctx: CommandContext) {
		ctx.message.reply('Pong!');
	}
}

client.commands.add(PingCommand);

client.connect(token, Intents.None);