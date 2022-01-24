import { Command, CommandContext } from '../../deps.ts';

export default class ServerPictureCommand extends Command {
  name = 'serverpicture';
  aliases = ['serverpic'];
  category = 'util';
  execute(ctx: CommandContext) {
    ctx.channel.send(ctx.guild?.iconURL());
  }
}
