// requirement file
const Discord = require('discord.js');
const config  = require('./config.json');
// call discord instance
const client = new Discord.Client();
// constant variables
const prefix = config.bot.prefix;

// event listener message
client.on("message", msg => {

	// initial text split into array
	let args = msg.content.slice(prefix.length).trim().split(' ');
	let cmd  = args.shift().toLowerCase();

	// ignore bot
	if (msg.author.bot) return;
	if (!msg.content.startsWith(prefix)) return;

	// Command Handler
	try {
		// Options paramater
		let ops = {
			ownerID: config.bot.owner_id
		}

		let commandFile = require(`./commands/${cmd}.js`);
		commandFile.run(client, msg, args, ops);
	} catch (e) {
		console.log(e.stack);
	}

});

// event listener bot readt
client.on("ready", () => {
	console.log(`bot is ready to rumble : \n [ID] >${config.bot.owner_id} \n [Name] >${config.bot.owner_name}`);

	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

	client.user.setActivity('as Deni [beta 0.1]');
});

client.on("guildMemberAdd", member => {

	// check
	if (member.guild.id !== config.serverStatus.guild_id) return;

	client.channels.get(config.serverStatus.total_users_id).setName(`Jumlah Users : ${member.guild.memberCount}`);
	client.channels.get(config.serverStatus.total_bots_id).setName(`Jumlah Bots : ${member.guild.members.filter(users => users.user.bot).size}`);

	console.log("someone has join the server!");
});

client.on("guildMemberRemove", member => {
	// check
	if (member.guild.id !== config.serverStatus.guild_id) return;

	client.channels.get(config.serverStatus.total_users_id).setName(`Jumlah Users : ${member.guild.memberCount}`);
	client.channels.get(config.serverStatus.total_bots_id).setName(`Jumlah Bots : ${member.guild.members.filter(users => !users.user.bot).size}`);

	console.log("someone has leave the server!");
});

// bot login token
client.login(config.bot.token);
