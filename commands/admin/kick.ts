import { CommandContext, Command, Embed, stripIndent } from '../../deps.ts';
import type { Args, User, Member, GuildTextBasedChannel } from '../../deps.ts';

export default class KickCommand extends Command {
	name = 'kick';
	category = 'admin';
	ownerOnly = true;
	args: Args[] = [
		{
			name: 'user',
			match: 'user'
		},
		{
			name: 'reason',
			match: 'rest'
		}
	]
	async execute(ctx: CommandContext) {
		const kUser: User = ctx.args!.user as User;
		const kMember: Member = await ctx.guild!.members.fetch(kUser.id);
		const reason: string = ctx.args!.reason as string;
		const adminLog = await ctx.guild!.channels.get('535389016338464771') as GuildTextBasedChannel;

		if (!kUser) {
			return ctx.message.reply('No user specified.');
		} else if (!reason) {
			return ctx.message.reply('Please provide a reason.');
		}

		if (!kMember.kickable) {
			return ctx.message.reply('I cannot kick this user');
		}

		kMember.kick(reason);

		const kickEmbed = new Embed()
			.setThumbnail(kUser.avatarURL())
			.setFooter(ctx.client.user!.username, ctx.client.user!.avatarURL())
			.setColor('#FF0000')
			.addField('Member Kicked', stripIndent`**> Kicked member:** ${kUser}
			**> Kicked by:** ${ctx.message.author}
			**> Reason:** ${reason}`)
			.setTimestamp(Date.now());

		adminLog.send(kickEmbed);
	}
}