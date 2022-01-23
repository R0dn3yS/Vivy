import { CommandContext, Command } from '../../deps.ts';

export default class NeofetchCommand extends Command {
  name = 'neofetch';
  category = 'information';
  async execute(ctx: CommandContext) {
    const neofetch = Deno.run({ cmd: ['neofetch'], stdout: 'piped' });
    let output = new TextDecoder().decode(await neofetch.output());
    // const regex = new RegExp('/\x1B\[\d+m/');

    output = output.replace(/\`/g, '\'');
    // deno-lint-ignore no-control-regex
    output = output.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
    output = output.replace('99D', '');

    ctx.channel.send(`\`\`\`ansi\n${output}\n\`\`\``);
  }
}