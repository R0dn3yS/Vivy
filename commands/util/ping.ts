import { CommandContext, Command} from '../../deps.ts';

export default class PingCommand extends Command {
	name = 'ping';
	execute(ctx: CommandContext) {
		ctx.message.reply('pinging').then(m => {
			m.edit(`Latency is ${ctx.client.gateway.ping}ms`)
		});
	}
}