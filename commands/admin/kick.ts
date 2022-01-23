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
		const kUser = ctx.args!.user as User;
		const kMember = await ctx.guild!.members.resolve(kUser.id) as Member;
		const reason = ctx.args!.reason as string;
		const adminLog = await ctx.guild!.channels.resolve('535389016338464771') as GuildTextBasedChannel;

		if (!kUser.id) {
			return ctx.message.reply('No user specified.');
		} else if (!reason) {
			return ctx.message.reply('Please provide a reason.');
		}

		if (!kMember.kickable) {
			return ctx.message.reply('I cannot kick this user.');
		}

		kMember.kick(reason).catch(e => {
			console.error(e);
		}) ;

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

	onError(ctx: CommandContext) {console.log(ctx)}
}