import { Command, CommandContext, Embed, stripIndent } from '../../deps.ts';
import type { Args, Member, User } from '../../deps.ts';

export default class UserinfoCommand extends Command {
	name = 'userinfo';
	aliases = ['ui'];
	category = 'information';
	args: Args[] = [
		{
			name: 'user',
			match: 'user',
		},
	];
	async execute(ctx: CommandContext) {
		// Get User
		let cUser: User;
		if (!ctx.args!.user) {
			cUser = ctx.author;
		} else {
			cUser = ctx.args!.user as User;
		}

		const cMember = await ctx.guild!.members.resolve(cUser.id) as Member;

		// Get Roles
		const roles: string[] = [];
		(await cMember.roles.array()).forEach((role) => {
			if (role.id !== ctx.guild?.id) roles.push(`<@&${role.id}>`);
		});

		// Get Dates
		const created = Intl.DateTimeFormat('en-US').format(
			new Date(cUser.timestamp),
		);
		const joined = Intl.DateTimeFormat('en-US').format(
			new Date(cMember.joinedAt),
		);

		const uEmbed = new Embed()
			.setFooter(
				cMember.displayName ? cMember.displayName : cUser.username,
				cUser.avatarURL(),
			)
			.setThumbnail(cUser.avatarURL())
			.setColor(await cMember.effectiveColor())
			.addField(
				'Member Information',
				stripIndent`**> Display Name:** ${
					cMember.displayName ? cMember.displayName : cUser.username
				}
			**> Joined At:** ${joined}
			**> Roles:** ${roles.join(' ')}`,
				true,
			)
			.addField(
				'User Information',
				stripIndent`**> ID:** ${cUser.id}
			**> Username:** ${cUser.username}
			**> Discord Tag:** ${cUser.tag}
			**> Created At** ${created}`,
				true,
			)
			.setTimestamp(Date.now());

		ctx.message.channel.send(uEmbed);
	}
}
