exports.run = (client, msg, args, ops) => {

	// check apa author is the bot owner
	if (msg.author.id !== ops.ownerID) return msg.channel.send("Sorry, only the owner can use this command.");

	// Delete from cache
	try {
		delete require.cache[require.resolve(`./${args[0]}.js`)];
	} catch (e) {
		return msg.channel.send(`Unable to reload: ${args[0]}`);
	}

	msg.channel.send(`Succesfully reloaded: ${args[0]}`);
}