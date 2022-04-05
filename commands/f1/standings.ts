import { Command, CommandContext, Embed } from '../../deps.ts';

export default class StandingsCommand extends Command {
	name = 'standings';
	category = 'f1';
	async execute(ctx: CommandContext) {
		const res = await fetch('https://ergast.com/api/f1/2022/driverStandings.json');
		const apiJson = await res.json();

		const driverArray: string[] = [];
		for (let i = 0; i < 20; i++) {
			const givenName = apiJson.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName;
			const familyName = apiJson.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName;

			driverArray.push(`${givenName} ${familyName}`);
		}

		let desc = '';

		for (const driver of driverArray) {
			desc += `${driver}\n`;
		}

		const embed = new Embed()
			.setTitle('F1 2022 Driver Standings')
			.setColor('#FF0000')
			.setDescription(desc);

		ctx.channel.send(embed);
	}
}