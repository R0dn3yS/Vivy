import { CommandContext, Command } from '../../deps.ts';
import type { Args } from '../../deps.ts';

export default class EightballCommand extends Command {
  name = 'arch';
  category = 'util';
  args: Args[] = [
    {
      name: 'query',
      match: 'rest',
    },
  ]
  execute(ctx: CommandContext) {
    const query = ctx.args!.query as string

    return ctx.channel.send('https://wiki.archlinux.org/index.php?search=' + query.split(' ').join('+'));
  }
}