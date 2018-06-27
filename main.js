const Discord = require('discord.js');
const configs = require('./config.json')
const client = new Discord.Client();

//starting the bot set its activity and logs in the console some info
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
    
    client.user.setActivity(`OwO what's this?`);
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

    if (msg.author.bot) return;
    if (!msg.content.startsWith(configs.prefix)) return;

    const args = msg.content.slice(configs.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === ""){
        if (msg.author.id == 147523153566892032 || msg.author.id == 158223674888028160){
            msg.channel.send("yes, master?");
        }else{
            msg.channel.send("yes?");
        }
    }

    if(command === "img"){
        msg.channel.send(`Your avatar: ${msg.author.displayAvatarURL}`);
    }
});

//bot start
client.login(configs.token);
