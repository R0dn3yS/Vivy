import { CommandContext, Command} from '../deps.ts';

export class PingCommand extends Command {
	name = 'ping'
	execute(ctx: CommandContext) {
		ctx.message.reply('Pong!');
	}
}