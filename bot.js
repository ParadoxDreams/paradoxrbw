
const Discord = require('discord.js');
const client = new Discord.Client();
let config = require('./config.json');
let prefix = 'p.'; // Írd át a saját prefixedre

client.on('ready', () => {
  console.log('> A bot sikeresen elindult.') // Ha a bot sikeresen elindult, kiír egy üzenetet a consoleba
  client.user.setPresence({ game: { name: `🌈 Rainbow Life`, type: 'WATCHING' }, status: 'online' });
});

client.on('message', async (msg) => {
  if (msg.content === prefix + 'multicolor') { // A parancs a(z) a következő lesz: prefix + multicolor (például: m.multicolor) - ha a prefix m.-ra van állítva
  if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(`:x: Ezt a parancsot nem használhatod! Nincs meg a jogod hozzá!`); 
  const szerver = client.guilds.get("611126033944674309"); // ID alapján megkeresi a szervert
  if (!szerver) return console.log('Hiba > A szervert nem találom.') //Ha a szervert nem találja, kilogolja a consoleba a hibaüzenetet
  const szerep = szerver.roles.get("650761940339261451"); // Ha megtalálta a szervert, akkor a guilden belül megpróbálja megkeresni a szerepet ID alapján
  if (!szerep) return console.log('Hiba > A szerepet nem találom.'); //Ha a szerepet nem találja, kilogolja a consoleba a hibaüzenetet
  setInterval(() => {
    const szerepSzerkeszt = Math.floor(Math.random() * (config.colors.length - 1) + 1);
    szerep.setColor(config.colors[szerepSzerkeszt]); // Ez szerkeszti a szerepet
  }, 1 * 5000); // Ne írd át, ha gyorsabb lesz a váltakozás akkor API-bant fogsz kapni
 }}
);

client.on('message', async (msg) => {
  if (msg.content === prefix + 'help') { 
  const embed = new Discord.RichEmbed();
    embed.setColor("RANDOM");
    embed.setTitle("🌈 Rainbow Life**");
    embed.setDescription("A multicolor bot 5 másodpercenként váltogatja egy megadott rang színét.");
   msg.channel.send(embed); 
}});

client.login(config.token); //Bejelentkezés a config tokenjével
