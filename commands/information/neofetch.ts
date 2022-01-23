import { CommandContext, Command } from '../../deps.ts';

export default class NeofetchCommand extends Command {
  name = 'neofetch';
  category = 'information';
  async execute(ctx: CommandContext) {
    const neofetch = Deno.run({ cmd: ['./neofetch.sh'], stdout: 'piped' });
    let output = new TextDecoder().decode(await neofetch.output());

    output = output.replace(/\`/g, '\'');
    output = output.replace(/(\\[\?25l\\[\?7l)|(\\[19A\\[9999999D)|(\\[41C)/g, '');

    ctx.channel.send(`\`\`\`ansi\n${output}\n\`\`\``);
  }
}