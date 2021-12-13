import { CommandContext, Command, Collector } from '../../deps.ts';

export default class TictactoeCommand extends Command {
    name = 'tictacttoe';
    aliases = ['ttt'];
    async execute(ctx: CommandContext) {
        const players: string[] = [];
        players.push(ctx.author.id);

        await ctx.channel.send('type "ttt_join" to join the game.');

        const coll = new Collector({
            event: 'messageCreate',
            // filter: (m) => m.author.id !== ctx.author.id,
            deinitOnEnd: true,
            max: 1,
            timeout: 15000,
        });

        coll.init(ctx.client);
        coll.collect()
        coll.on('end', () => {
            if (coll.collected.size === 0) {
                ctx.channel.send('No one joined this game');
            }
        });
        coll.on('collect', (msg) => {
            players.push(msg.author.id);
            ctx.channel.send(`Game will start, ${ctx.author.username} vs ${msg.author.username}`)
        })
    }
}