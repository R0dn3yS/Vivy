import { CommandContext, Command, Embed, stripIndent } from '../../deps.ts';
import type { Args, User, Member, GuildTextBasedChannel } from '../../deps.ts';

export default class BanCommand extends Command {
	name = 'ban';
	category = 'admin';
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
		const bUser: User = ctx.args!.user as User;
		const bMember: Member = await ctx.guild!.members.fetch(bUser.id);
		const reason: string = ctx.args!.reason as string;
		const adminLog = await ctx.guild!.channels.get('535389016338464771') as GuildTextBasedChannel;

		if (!bUser) {
			return ctx.message.reply('No user specified.');
		} else if (!reason) {
			return ctx.message.reply('Please provide a reason.');
		}

		if (!bMember.bannable) {
			return ctx.message.reply('I cannot ban this user');
		}

		bMember.ban(reason);

		const banEmbed = new Embed()
			.setThumbnail(bUser.avatarURL())
			.setFooter(ctx.client.user!.username, ctx.client.user!.avatarURL())
			.setColor('#FF0000')
			.addField('Member Banned', stripIndent`**> Banned member:** ${bUser}
			**> Banned by:** ${ctx.message.author}
			**> Reason:** ${reason}`)
			.setTimestamp(Date.now());

		adminLog.send(banEmbed);
	}
}