import * as Discord from 'discord-js';

let discordClient = new Discord.Client();

discordClient.login('ODQ5Njk4ODc2OTEwMjA2OTk3.YLe9vg.Yuwf32Ge2dFxw1ev92BZ6WygQqU');
discordClient.on('ready', () => {
  console.log('Discord ready');
});
discordClient.on('message', (msg: Discord.Message) => {
  if (msg.content === 'ping') {
    msg.channel.send('pong');
    msg.channel.send('channel: ' + msg.channel);
  }
});
