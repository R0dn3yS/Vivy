import { CommandContext, Command } from '../../deps.ts';

export default class ServerpictureCommand extends Command {
	name =  'serverpicture';
	aliases = ['serverpic'];
	category = 'util';
	execute(ctx: CommandContext) {
		ctx.channel.send(ctx.guild?.iconURL());
	}
}