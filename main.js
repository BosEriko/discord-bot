const Discord   = require('discord.js');
const ApiAI     = require('apiai');
const firebase  = require('firebase');
const Axios     = require('axios');

const Client    = new Discord.Client();
const App       = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN);

// Bot Modules
const botPost   = require('./bot-post');
const botFun    = require('./features/bot-fun');

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
    databaseURL: 'https://' + process.env.FIREBASE_DATABASE_NAME + '.firebaseio.com',
    storageBucket: process.env.FIREBASE_BUCKET + '.appspot.com',
};
firebase.initializeApp(firebaseConfig);

// Election Data
const electionData = firebase.database().ref().child('election');
let electionDataValue;
electionData.on("value", snap => {
    electionDataValue = snap.val();
});

// Current Day
const now       = new Date();
const start     = new Date(now.getFullYear(), 0, 0);
const diff      = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
const oneDay    = 1000 * 60 * 60 * 24;
const day       = Math.floor(diff / oneDay);

// App Title
const appTitle = 'Kuru Anime';

// Symbol Command of Fun
const symbolCommand = '~';

// Topic of the Day answers
const topicOfTheDay = [
    "What is something you hate but you wished you loved?",
    "Where do you go and what do you do to wind down/relax?",
    "If you were in a band, what kind of music would you play?",
    "What TV show do you most identify with?",
    "What is your favorite season of the year?",
    "If a movie was made about your life, what actor/actress would play you?",
    "If you were a vegetable, what vegetable would you be?",
    "If you woke up tomorrow as an animal, what animal would you choose to be?",
    "If you could live anywhere on this planet, and take anything that you love with you, where would you choose to live?",
    "Are you where you thought you’d be at this point in your life?",
    "What is your most valuable skill?",
    "What do you think about the organic food movement?",
    "What do you think is the best age to get married?",
    "If you had to pick an image to represent each member of your family, what would you pick?",
    "What did you dream about last night?",
    "Do you mind if I stay by your side?",
    "What is your favorite chewing gum flavor?",
    "What is your dream job?",
    "What was the first thing you bought with your first paycheck?",
    "What is one thing you wish you had known at 21?",
    "What is one thing you thought existed but it actually doesn’t?",
    "What is something you’ve always wanted, but couldn’t have due to social stigmas?",
    "How’s life?",
    "What is the best pizza place you have ever been to?",
    "What song do you secretly like but won’t admit it elsewhere?",
    "What’s the earliest memory you have of your life?",
    "What is the one thing you can’t do, no matter how hard you try?",
    "What is one thing that you would risk your life for?",
    "What was the single, best realization you have ever had?",
    "What are your three biggest life goals right now?",
    "Your hair looks beautiful. How is it like to be extremely good looking?",
    "I’m genuinely interested. What’s one song you will never skip on your playlist?",
    "If you were guaranteed the correct answer to one question, what would you ask?",
    "What product do you think the world could go on without?",
    "If one animal was made the size of an elephant, which would be the scariest?",
    "What is your most interesting hobby?",
    "What is one thing you do to get motivated?",
    "What is the worst song lyric you have ever heard?",
    "Why are you burned out from your job?",
    "What was your favorite toy as a child?",
    "What are questions that you don’t like to answer?",
    "What are you scared of?",
    "What was your most irrational fear as a child?",
    "What is something you get wrong almost every time you do it?",
    "What is something beautiful you see every day?",
    "What things do you do every day that you wish were automated?",
    "What smells make you happy?",
    "Where is the weirdest place you have seen someone you know?",
    "What is your favorite word in the English language?",
    "What is the social event you hate the most?",
    "What is the best thing that you have done, just because you were told you can’t?",
    "What is an obscure food that you have eaten that most people never tried?",
    "If you could visit any fictional town, what would it be?",
    "When did you realize people had accepted you as an adult?",
    "What is the craziest thing you’ve seen somebody do at  the workplace?",
    "What is your current desktop wallpaper?",
    "What is the most cliché thing you have done in your life?",
    "What is the word you absolutely hate people for using?",
    "Give me your deepest, most profound quote you just made up.",
    "Do you “genuinely” think you are attractive?",
    "What is the most laid back job you have ever had?",
    "When is the last time you cried?",
    "What is your “I shouldn’t be here today” story?",
    "What is the most famous person you have ever met?",
    "What is your “happy” song?",
    "Do you have something that you find strangely relaxing?",
    "What short phrases should be on candy hearts but aren’t?",
    "What made you smile today?",
    "What is your “go-to” joke?",
    "What is the worst thing your mom caught you doing as a kid?",
    "What simple changes have made your life better?",
    "Which cartoons have made you cry?",
    "What incredibly common thing in life terrifies you?",
    "If you had the opportunity to spend a year in another country, where would you go?",
    "What would you do if you had a working time machine?",
    "What are your three biggest life goals right now?",
    "What do you think is the ultimate waste of your money?",
    "What would you do if you had no money?",
    "What is your favorite three-word sentence?",
    "What is the funniest movie you have ever seen?",
    "What is one thing you don’t understand about yourself?",
    "What is something you just have to do every day?",
    "What is something new you learned this week?",
    "What impresses you most about kids these days?",
    "What was your first kiss like?",
    "What is a movie moment that completely transformed you?",
    "What “impossible coincidence” stories do you know?",
    "What is legal that you think should be illegal?",
    "If you had to live a week without internet, what will you do to keep yourself busy?",
    "What do you think is the best feeling in the world?",
    "What is the worst advice you have ever been given?",
    "What was your turning point to a more active life?",
    "What is your best piece of advice?",
    "What do you consider to be the highlight of your life?",
    "What is the happiest you have ever been?",
    "What is something that you seriously take for granted?",
    "What is your favorite drink?",
    "What is your worst experience in a foreign country?",
    "What would you do if you could do anything for 8 hours a day for the rest of your life, assuming money were no object?",
    "What is the biggest waste of time in your life?",
    "What is the biggest change you want to make in your life?",
];

// Bot Ready Message
Client.on('ready', () => {
    console.log('Bot is ready.');
});

// New User
Client.on('guildMemberAdd', member => {
    member.send('Hello! Thanks for joining ' + appTitle + '! Feel free to talk to me here or if you prefer, talk to me on the #kuru-anime channel. Don\'t forget to read our rules, okay? Have a nice stay!')
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
});

// Main Code
Client.on('message', message => {
    botPost.botPost(message, symbolCommand);
    botFun.botFun(message, symbolCommand, Discord);
    // Kuru Election
    if (message.channel.name === 'kuru-election' && Client.user.id !== message.author.id) {
        message.reply(electionDataValue);
    }
    // Topic of the Day
    if (message.channel.id === '510302403031990274' && Client.user.id !== message.author.id) {
        if(message.content.startsWith(symbolCommand + 'topic')) {
            message.reply(topicOfTheDay[day % topicOfTheDay.length]);
        }
    }
    // Rabbit Post
    if (message.channel.name === 'rabbit-post' && Client.user.id !== message.author.id) {
        Axios.post(process.env.RABBIT_WEBHOOK, {
            "content": message.content
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    // Announcements Post
    if (message.channel.name === 'announcements-post' && Client.user.id !== message.author.id) {
        Axios.post(process.env.ANNOUNCEMENTS_WEBHOOK, {
            "content": message.content
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
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