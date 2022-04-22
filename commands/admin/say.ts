import { Command, CommandContext } from '../../deps.ts';
import type { Args } from '../../deps.ts';

export default class SayCommand extends Command {
	name = 'say';
	category = 'admin'
	ownerOnly = true;
	args: Args[] = [
		{
			name: 'message',
			match: 'rest',
		},
	];
	execute(ctx: CommandContext) {
		const message = ctx.args!.message as string;

		if (!message[0]) {
			return ctx.message.reply('Can\'t say nothing retard.');
		}

		ctx.channel.send(message);
	}
}