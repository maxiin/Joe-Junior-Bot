const Discord = require('discord.js');
const configs = require('./config.json')
const client = new Discord.Client();

//starting the bot set its activity and logs in the console some info
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
    
    client.user.setActivity(`With my masters <3`);
});

//joining a server will log in the console where and how many people in there
client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

//been removed from a server
client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

//any message read
client.on('message', msg => {
    
    //test if the author is a bot, returning so it wont be in a bot loop
    if (msg.author.bot) return;
    //test if the msg start with the command prefix (/ ! t!)etc
    if (!msg.content.startsWith(configs.prefix)) return;

    //slice msg to show only the command, not the prefix of any not wanted arguments
    const args = msg.content.slice(configs.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(/^([0-9]{1,2}d[0-9]{1,3})$/.test(command)){
        var commandArgs = command.split("d");
        for(let x = 0; x < commandArgs[0]; x++){
            var roll = Math.floor(Math.random() * Math.floor(commandArgs[1])) + 1;
            msg.channel.send(`${msg.author.username}'s d${commandArgs[1]} roll: ${roll}`);
        }
    }

});

//bot start
client.login(configs.token);
