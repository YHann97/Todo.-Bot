const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send("Todo. Bot Always Alive!"));

app.listen(port, () => console.log(`listening at http://localhost:${port}`));


const Discord = require("discord.js");
const Database = require("@replit/database")
const token = process.env.DISCORD_BOT_SECRET;
const client = new Discord.Client();
const prefix = "lyh_";
const db = new Database()

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.author.send({embed: {
    color: 006798,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL()
    },
    title: "Ping 📈",
    description: `Pong! This message had a latency of ${timeTaken}ms.` ,
   footer: {
      icon_url: client.user.avatarURL(),
      text: "© Todo. Inc"}}})
  }
  if (command === "yell") {
		const string = args.join(" ");
		const upperCase = string.toUpperCase();
    message.author.send({embed: {
    color: 006798,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL()
    },
    title: "Yell 😡",
    description: `REEEEEEEEE! ${upperCase}`,
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© Todo. Inc"}}})
	}
  if (command === "echo") {
		const string = args.join(" ");
    message.author.send({embed: {
    color: 006798,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL()
    },
    title: "Echo ⛰️",
    description: `We are in a cave ${string}`,
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© Todo. Inc"}}})
	}
    if (command === "info") {
    message.channel.send({embed: {
    color: 006798,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL()
    },
    title: "Information at your fingertips...",
    description: "Organising your schedule, No problem! All you gotta do is to type it out and click enter. It's that simple.",
    fields: [{
        name: "Functions",
        value: "get,add,ping,sum,echo"
      },
      {
        name: "Created By",
        value: "Yie Hann"
      },
    ],
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© Todo. Inc"
    }
  }
});
  }
    if (command === "help") {
    message.channel.send({embed: {
    color: 006798,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL()
    },
    title: "Functions",
    fields: [{
        name: "Get",
        value: "Helps you get a link/message. lyh_get Key "
      },
      {
        name: "Delete",
        value: "Helps you delete a link/message. lyh_delete Key "
      },
      {
        name: "Add",
        value: "Helps you add a link/message. lyh_add Key Link/Message "
      },
      {
        name: "Ping",
        value: "Shows how long does it take for the message to be delivered. lyh_ping  "
      },
      {
        name: "Echo",
        value: "Repeats after you. lyh_echo Word/Message "
      },
      {
        name: "Yell",
        value: "Keeps you awake! lyh_yell Word/Message "
      },
      {
        name: "Created By",
        value: "Yie Hann"
      },
    ],
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© Todo. Inc"
    }
  }
});
  }
  if (command === "add") {
    const key = args[0];
    const value = args[1];
    db.set(key,value).then(() => {
    message.author.send({embed: {
    color: 505148,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL()
    },
    title: "Added Link",
    description: `Saved ✅ <${value}> at ${key}`,
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© Todo. Inc"
      }}})
      }
     ) }
    
  if (command === "get") {
    const key = args[0];
    db.get(key).then((value) => {
    message.author.send({embed: {
    color: 006798,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL()
    },
    title: "Saved Link 📁",
    description: `Here you go! <${value}>` ,
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© Todo. Inc"
    }}})
      }
    )}
    
  if (command === "delete") {
    const key = args[0];
    db.delete(key).then(() => {});
    message.author.send({embed: {
    color: 006798,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL()
    },
    title: "Clear",
    description: "Successfully Deleted!",
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© Todo. Inc"
}}});
      
    }
    
  else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.author.send({embed: {
    color: 006798,
      author: {
      name: client.user.username,
      icon_url: client.user.avatarURL()
    },
    title: "Sum",
    description: `The sum of all the arguments you provided is ${sum}!`,
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© Todo. Inc"
    }}})
    }
});

client.login(token);