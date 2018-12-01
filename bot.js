const Discord   = require('discord.js');
const ApiAI     = require('apiai');
const firebase  = require('firebase');

const Client    = new Discord.Client();
const App       = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN);

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
    databaseURL: 'https://' + process.env.FIREBASE_DATABASE_NAME + '.firebaseio.com',
    storageBucket: process.env.FIREBASE_BUCKET + '.appspot.com',
};
firebase.initializeApp(firebaseConfig);

// App Title
const appTitle = 'Kuru Anime';

// Rules Text
const rulesText = `**1.** Please do not be an asshole!
**2.** Do not post outside links.
**3.** Please talk in English only.
**4.** Only talk to the bots on their own channels.`;

// Welcome Message
const welcomeText = 'Hello! Thanks for joining ' + appTitle + '! Feel free to talk to me here or if you prefer, talk to me on the #kuru-anime channel.';

// Symbol Command of Fun
const symbolCommand = '~';

// Fun Help Command
const funHelp = `
**${symbolCommand}8ball** Magic 8-ball
**${symbolCommand}avatar** Show your avatar
**${symbolCommand}flip** Flip a coin
**${symbolCommand}fortune** Fortune cookie
**${symbolCommand}help** Show all available commands
**${symbolCommand}rules** Show the server rules
`;

// Fortune Cookie Answers
// http://www.fortunecookiemessage.com/archive.php?start=0
const fortuneCookie = [
    // Page 1
    "Today it's up to you to create the peacefulness you long for.",
    "A friend asks only for your time not your money.",
    "If you refuse to accept anything but the best, you very often get it.",
    "A smile is your passport into the hearts of others.",
    "A good way to keep healthy is to eat more Chinese food.",
    "Your high-minded principles spell success.",
    "Hard work pays off in the future, laziness pays off now.",
    "Change can hurt, but it leads a path to something better.",
    "Enjoy the good luck a companion brings you.",
    "People are naturally attracted to you.",
    "Hidden in a valley beside an open stream- This will be the type of place where you will find your dream.",
    "A chance meeting opens new doors to success and friendship.",
    "You learn from your mistakes... You will learn a lot today.",
    "If you have something good in your life, don't let it go!",
    "What ever you're goal is in life, embrace it visualize it, and for it will be yours.",
    "Your shoes will make you happy today.",
    "You cannot love life until you live the life you love.",
    "Be on the lookout for coming events; They cast their shadows beforehand.",
    "Land is always on the mind of a flying bird.",
    "The man or woman you desire feels the same about you.",
    "Meeting adversity well is the source of your strength.",
    "A dream you have will come true.",
    "Our deeds determine us, as much as we determine our deeds.",
    "Never give up. You're not a failure if you don't give up.",
    "You will become great if you believe in yourself.",
    "There is no greater pleasure than seeing your loved ones prosper.",
    "You will marry your lover.",
    "A very attractive person has a message for you.",
    "You already know the answer to the questions lingering inside your head.",
    "It is now, and in this world, that we must live.",
    "You must try, or hate yourself for not trying.",
    "You can make your own happiness.",
    "The greatest risk is not taking one.",
    "The love of your life is stepping into your planet this summer.",
    "Love can last a lifetime, if you want it to.",
    "Adversity is the parent of virtue.",
    "Serious trouble will bypass you.",
    "A short stranger will soon enter your life with blessings to share.",
    "Now is the time to try something new.",
    "Wealth awaits you very soon.",
    "If you feel you are right, stand firmly by your convictions.",
    "If winter comes, can spring be far behind?",
    "Keep your eye out for someone special.",
    "You are very talented in many ways.",
    "A stranger, is a friend you have not spoken to yet.",
    "A new voyage will fill your life with untold memories.",
    "You will travel to many exotic places in your lifetime.",
    "Your ability for accomplishment will follow with success.",
    "Nothing astonishes men so much as common sense and plain dealing.",
    "Its amazing how much good you can do if you dont care who gets the credit.",
    // Page 2
    "Everyone agrees. You are the best.",
    "LIFE CONSIST NOT IN HOLDING GOOD CARDS, BUT IN PLAYING THOSE YOU HOLD WELL.",
    "Jealousy doesn't open doors, it closes them!",
    "It's better to be alone sometimes.",
    "When fear hurts you, conquer it and defeat it!",
    "Let the deeds speak.",
    "You will be called in to fulfill a position of high honor and responsibility.",
    "The man on the top of the mountain did not fall there.",
    "You will conquer obstacles to achieve success.",
    "Joys are often the shadows, cast by sorrows.",
    "Fortune favors the brave.",
    "An upward movement initiated in time can counteract fate.",
    "A journey of a thousand miles begins with a single step.",
    "Sometimes you just need to lay on the floor.",
    "Never give up. Always find a reason to keep trying.",
    "If you have something worth fighting for, then fight for it.",
    "Stop wishing. Start doing.",
    "Accept your past without regrets. Handle your present with confidence. Face your future without fear.",
    "Stay true to those who would do the same for you.",
    "Ask yourself if what you are doing today is getting you closer to where you want to be tomorrow.",
    "Happiness is an activity.",
    "Help is always needed but not always appreciated. Stay true to your heart and help those in need weather they appreciate it or not.",
    "Hone your competitive instincts.",
    "Finish your work on hand don't be greedy.",
    "For success today, look first to yourself.",
    "Your fortune is as sweet as a cookie.",
    "Integrity is the essence of everything successful.",
    "If you're happy, you're successful.",
    "You will always be surrounded by true friends",
    "Believing that you are beautiful will make you appear beautiful to others around you.",
    "Happinees comes from a good life.",
    "Before trying to please others think of what makes you happy.",
    "When hungry, order more Chinese food.",
    "Your golden opportunity is coming shortly.",
    "For hate is never conquered by hate. Hate is conquered by love.",
    "You will make many changes before settling down happily.",
    "A man is born to live and not prepare to live.",
    "You cannot become rich except by enriching others.",
    "Don't pursue happiness - create it.",
    "You will be successful in love.",
    "All your fingers can't be of the same length.",
    "Wise sayings often fall on barren ground, but a kind word is never thrown away.",
    "A lifetime of happiness is in store for you.",
    "It is very possible that you will achieve greatness in your lifetime.",
    "Be tactful; overlook your own opportunity.",
    "You are the controller of your destiny.",
    "Everything happens for a reson.",
    "How can you have a beutiful ending without making beautiful mistakes.",
    "You can open doors with your charm and patience.",
    "Welcome the change coming into your life.",
    // Page 3
    "There will be a happy romance for you shortly.",
    "Your fondest dream will come true within this year.",
    "You have a deep interest in all that is artistic.",
    "Your emotional nature is strong and sensitive.",
    "A letter of great importance may reach you any day now.",
    "Good health will be yours for a long time.",
    "You will become better acquainted with a coworker.",
    "To be old and wise, you must first be young and stupid.",
    "Failure is only the opportunity to begin again more intelligently.",
    "Integrity is doing the right thing, even if nobody is watching.",
    "Conquer your fears or they will conquer you.",
    "You are a lover of words; One day you will write a book.",
    "In this life it is not what we take up, but what we give up, that makes us rich.",
    "Fear can keep us up all night long, but faith makes one fine pillow.",
    "Seek out the significance of your problem at this time. Try to understand.",
    "Never upset the driver of the car you're in; they're the master of your destiny until you get home.",
    "He who slithers among the ground is not always a foe.",
    "You learn from your mistakes, you will learn a lot today.",
    "You only need look to your own reflection for inspiration. Because you are Beautiful!",
    "You are not judged by your efforts you put in; you are judged on your performance.",
    "Rivers need springs.",
    "Good news from afar may bring you a welcome visitor.",
    "When all else seems to fail, smile for today and just love someone.",
    "Patience is a virtue, unless its against a brick wall.",
    "When you look down, all you see is dirt, so keep looking up.",
    "If you are afraid to shake the dice, you will never throw a six.",
    "Even if the person who appears most wrong, is also quite often right.",
    "A single conversation with a wise man is better than ten years of study.",
    "Happiness is often a rebound from hard work.",
    "The world may be your oyster, but that doesn't mean you'll get it's pearl.",
    "Your life will be filled with magical moments.",
    "You're true love will show himself to you under the moonlight.",
    "Do not follow where the path may lead. Go where there is no path...and leave a trail.",
    "Do not fear what you don't know.",
    "The object of your desire comes closer.",
    "You have a flair for adding a fanciful dimension to any story.",
    "If you wish to know the mind of a man, listen to his words.",
    "The most useless energy is trying to change what and who God so carefully created.",
    "Do not be covered in sadness or be fooled in happiness they both must exist",
    "You will have unexpected great good luck.",
    "You will have a pleasant surprise.",
    "All progress occurs because people dare to be different.",
    "Your ability for accomplishment will be followed by success.",
    "The world is always ready to receive talent with open arms.",
    "Things may come to those who wait, but only the things left by those who hustle.",
    "We can't help everyone. But everyone can help someone.",
    "Every day is a new day. But tomorrow is never promised.",
    "Express yourself: Don't hold back!",
    "It is not necessary to show others you have change; the change will be obvious.",
    "You have a deep appreciation of the arts and music.",
    // Page 4
];

// Bot Ready Message
Client.on('ready', () => {
    console.log('Bot is ready.');
});

// New User
Client.on('guildMemberAdd', member => {
    member.send(welcomeText)
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
});

// Main Code
Client.on('message', message => {
    // Kuru Fun
    if (message.channel.name === 'kuru-fun' && Client.user.id !== message.author.id) {
        switch(message.cleanContent) {
            // Rules Text
            case symbolCommand + 'rules':
                const rulesEmbed = new Discord.RichEmbed()
                    .setTitle('Rules to obey')
                    .setColor(0xcd3c2a)
                    .setThumbnail('https://i.imgur.com/5q2WR9V.png')
                    .setDescription(rulesText);
                message.channel.send(rulesEmbed);
                break;
            // Show Avatar
            case symbolCommand + 'avatar':
                const avatarEmbed = new Discord.RichEmbed()
                    .setTitle('Avatar Full View')
                    .setColor(0xcd3c2a)
                    .setImage(message.author.avatarURL);
                message.channel.send(avatarEmbed);
                break;
            // Flip a coin
            case symbolCommand + 'flip':
                message.reply((Math.floor(Math.random() * 2) == 0) ? 'Heads' : 'Tails');
                break;
            // Fortune Cookie
            case symbolCommand + 'fortune':
                message.reply(fortuneCookie[Math.floor(Math.random() * fortuneCookie.length)]);
                break;
            // 8-ball
            case symbolCommand + '8ball':
                message.reply('8-ball is under maintenance.');
                break;
            // Show Help
            case symbolCommand + 'help':
                const helpEmbed = new Discord.RichEmbed()
                    .setTitle('List of commands')
                    .setColor(0xcd3c2a)
                    .setDescription(funHelp);
                message.channel.send(helpEmbed);
                break;
            // Normal Message
            default:
                message.reply("Command not found!");
        }
    }
    // Kuru Election
    if (message.channel.name === 'kuru-election' && Client.user.id !== message.author.id) {
        message.reply('#kuru-election is under maintenance.');
    }
    // Dialogflow
    if ((message.channel.name === 'kuru-anime' || message.channel.type === 'dm') && Client.user.id !== message.author.id) {
        let promise = new Promise((resolve, reject) => {
            let request = App.textRequest(message.cleanContent, {
                sessionId: message.author.id
            });
            request.on('response', (response) => {
                console.log(response);
                let rep = response.result.fulfillment.speech;
                resolve(rep);
            });
            request.on('error', (error) => {
                resolve(null);
            });
            request.end();
        });
        (async function () {
            let result = await promise;
            if (result) {
                message.reply(result);
            } else {
                message.reply('nothing here');
            }
        }());
    }
});

// Discord Login
Client.login(process.env.BOT_TOKEN);