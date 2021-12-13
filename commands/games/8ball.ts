import { CommandContext, Command } from '../../deps.ts';
import type { Args } from '../../deps.ts';

export default class EightballCommand extends Command {
    name = '8ball';
    category = 'games';
    args: Args[] = [
        {
            name: 'question',
            match: 'rest',
        },
    ]
    execute(ctx: CommandContext) {
        if (!ctx.args!.question) {
            return ctx.channel.send('Please provide a question.');
        }

        const posAnswers = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Outlook good.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.',
        ];

        return ctx.channel.send(posAnswers[Math.floor(Math.random() * posAnswers.length)]);
    }
}