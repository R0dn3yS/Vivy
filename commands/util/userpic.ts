import { Command, CommandContext } from '../../deps.ts';
import type { Args, User } from '../../deps.ts';

export default class UserPictureCommand extends Command {
  name = 'userpicture';
  aliases = ['userpic'];
  category = 'util';
  optionalArgs = true;
  args: Args[] = [
    {
      name: 'user',
      match: 'user',
    },
  ];
  execute(ctx: CommandContext) {
    let user: User;
    if (!ctx.args!.user) {
      user = ctx.author;
    } else {
      user = ctx.args!.user as User;
    }

    ctx.channel.send(user.avatarURL('dynamic'));
  }
}
