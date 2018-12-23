exports.botFun = (message, symbolCommand, Discord, Client, firebaseDatabase) => {
    const messageCountRef = firebaseDatabase.child('statistics/' + message.author.id + '/message_count');
    const taggedUser = message.mentions.users.first() ? message.guild.member(message.mentions.users.first()) : null;
    messageCountRef.once('value').then(snap => {
        let messageCountData = snap.exists() ? snap.val() : 0;
        firebaseDatabase.child('statistics/' + message.author.id).set({
            message_count: messageCountData + 1
        });
    });
    const funHelp = `
**${symbolCommand}8ball** Magic 8-ball
**${symbolCommand}avatar** Show your avatar
**${symbolCommand}flip** Flip a coin
**${symbolCommand}fortune** Fortune cookie
**${symbolCommand}help** Show all available commands
**${symbolCommand}message-count** Show how much messages you've sent
**${symbolCommand}nicknames** Show a list of the past 10 nicknames
    `;
    const eightBall = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes - definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful.",
    ];
    const fortuneCookie = [
        "A chance meeting opens new doors to success and friendship.",
        "A dream you have will come true.",
        "A friend asks only for your time not your money.",
        "A good way to keep healthy is to eat more Chinese food.",
        "A journey of a thousand miles begins with a single step.",
        "A letter of great importance may reach you any day now.",
        "A lifetime of happiness is in store for you.",
        "A man is born to live and not prepare to live.",
        "A new voyage will fill your life with untold memories.",
        "A short stranger will soon enter your life with blessings to share.",
        "A single conversation with a wise man is better than ten years of study.",
        "A smile is your passport into the hearts of others.",
        "A stranger, is a friend you have not spoken to yet.",
        "A very attractive person has a message for you.",
        "Accept your past without regrets. Handle your present with confidence. Face your future without fear.",
        "Adversity is the parent of virtue.",
        "All progress occurs because people dare to be different.",
        "All your fingers can't be of the same length.",
        "An upward movement initiated in time can counteract fate.",
        "Ask yourself if what you are doing today is getting you closer to where you want to be tomorrow.",
        "Be on the lookout for coming events; They cast their shadows beforehand.",
        "Be tactful; overlook your own opportunity.",
        "Before trying to please others think of what makes you happy.",
        "Believing that you are beautiful will make you appear beautiful to others around you.",
        "Change can hurt, but it leads a path to something better.",
        "Conquer your fears or they will conquer you.",
        "Do not be covered in sadness or be fooled in happiness they both must exist",
        "Do not fear what you don't know.",
        "Do not follow where the path may lead. Go where there is no path...and leave a trail.",
        "Don't pursue happiness - create it.",
        "Enjoy the good luck a companion brings you.",
        "Even if the person who appears most wrong, is also quite often right.",
        "Every day is a new day. But tomorrow is never promised.",
        "Everyone agrees. You are the best.",
        "Everything happens for a reson.",
        "Express yourself: Don't hold back!",
        "Failure is only the opportunity to begin again more intelligently.",
        "Fear can keep us up all night long, but faith makes one fine pillow.",
        "Finish your work on hand don't be greedy.",
        "For hate is never conquered by hate. Hate is conquered by love.",
        "For success today, look first to yourself.",
        "Fortune favors the brave.",
        "Good health will be yours for a long time.",
        "Good news from afar may bring you a welcome visitor.",
        "Happinees comes from a good life.",
        "Happiness is an activity.",
        "Happiness is often a rebound from hard work.",
        "Hard work pays off in the future, laziness pays off now.",
        "He who slithers among the ground is not always a foe.",
        "Help is always needed but not always appreciated. Stay true to your heart and help those in need whether they appreciate it or not.",
        "Hidden in a valley beside an open stream- This will be the type of place where you will find your dream.",
        "Hone your competitive instincts.",
        "How can you have a beutiful ending without making beautiful mistakes.",
        "If winter comes, can spring be far behind?",
        "If you are afraid to shake the dice, you will never throw a six.",
        "If you feel you are right, stand firmly by your convictions.",
        "If you have something good in your life, don't let it go!",
        "If you have something worth fighting for, then fight for it.",
        "If you refuse to accept anything but the best, you very often get it.",
        "If you wish to know the mind of a man, listen to his words.",
        "If you're happy, you're successful.",
        "In this life it is not what we take up, but what we give up, that makes us rich.",
        "Integrity is doing the right thing, even if nobody is watching.",
        "Integrity is the essence of everything successful.",
        "It is not necessary to show others you have change; the change will be obvious.",
        "It is now, and in this world, that we must live.",
        "It is very possible that you will achieve greatness in your lifetime.",
        "It's better to be alone sometimes.",
        "Its amazing how much good you can do if you dont care who gets the credit.",
        "Jealousy doesn't open doors, it closes them!",
        "Joys are often the shadows, cast by sorrows.",
        "Keep your eye out for someone special.",
        "Land is always on the mind of a flying bird.",
        "Let the deeds speak.",
        "LIFE CONSIST NOT IN HOLDING GOOD CARDS, BUT IN PLAYING THOSE YOU HOLD WELL.",
        "Love can last a lifetime, if you want it to.",
        "Meeting adversity well is the source of your strength.",
        "Never give up. Always find a reason to keep trying.",
        "Never give up. You're not a failure if you don't give up.",
        "Never upset the driver of the car you're in; they're the master of your destiny until you get home.",
        "Nothing astonishes men so much as common sense and plain dealing.",
        "Now is the time to try something new.",
        "Our deeds determine us, as much as we determine our deeds.",
        "Patience is a virtue, unless it's against a brick wall.",
        "People are naturally attracted to you.",
        "Rivers need springs.",
        "Seek out the significance of your problem at this time. Try to understand.",
        "Serious trouble will bypass you.",
        "Sometimes you just need to lay on the floor.",
        "Stay true to those who would do the same for you.",
        "Stop wishing. Start doing.",
        "The greatest risk is not taking one.",
        "The love of your life is stepping into your planet this summer.",
        "The man on the top of the mountain did not fall there.",
        "The man or woman you desire feels the same about you.",
        "The most useless energy is trying to change what and who God so carefully created.",
        "The object of your desire comes closer.",
        "The world is always ready to receive talent with open arms.",
        "The world may be your oyster, but that doesn't mean you'll get it's pearl.",
        "There is no greater pleasure than seeing your loved ones prosper.",
        "There will be a happy romance for you shortly.",
        "Things may come to those who wait, but only the things left by those who hustle.",
        "To be old and wise, you must first be young and stupid.",
        "Today it's up to you to create the peacefulness you long for.",
        "We can't help everyone. But everyone can help someone.",
        "Wealth awaits you very soon.",
        "Welcome the change coming into your life.",
        "What ever your goal is in life, embrace it visualize it, and for it will be yours.",
        "When all else seems to fail, smile for today and just love someone.",
        "When fear hurts you, conquer it and defeat it!",
        "When hungry, order more Chinese food.",
        "When you look down, all you see is dirt, so keep looking up.",
        "Wise sayings often fall on barren ground, but a kind word is never thrown away.",
        "You already know the answer to the questions lingering inside your head.",
        "You are a lover of words; One day you will write a book.",
        "You are not judged by your efforts you put in; you are judged on your performance.",
        "You are the controller of your destiny.",
        "You are very talented in many ways.",
        "You can make your own happiness.",
        "You can open doors with your charm and patience.",
        "You cannot become rich except by enriching others.",
        "You cannot love life until you live the life you love.",
        "You have a deep appreciation of the arts and music.",
        "You have a deep interest in all that is artistic.",
        "You have a flair for adding a fanciful dimension to any story.",
        "You learn from your mistakes, you will learn a lot today.",
        "You learn from your mistakes... You will learn a lot today.",
        "You must try, or hate yourself for not trying.",
        "You only need look to your own reflection for inspiration. Because you are Beautiful!",
        "You will always be surrounded by true friends",
        "You will be called in to fulfill a position of high honor and responsibility.",
        "You will be successful in love.",
        "You will become better acquainted with a coworker.",
        "You will become great if you believe in yourself.",
        "You will conquer obstacles to achieve success.",
        "You will have a pleasant surprise.",
        "You will have unexpected great good luck.",
        "You will make many changes before settling down happily.",
        "You will marry your lover.",
        "You will travel to many exotic places in your lifetime.",
        "Your true love will show himself to you under the moonlight.",
        "Your ability for accomplishment will be followed by success.",
        "Your ability for accomplishment will follow with success.",
        "Your emotional nature is strong and sensitive.",
        "Your fondest dream will come true within this year.",
        "Your fortune is as sweet as a cookie.",
        "Your golden opportunity is coming shortly.",
        "Your high-minded principles spell success.",
        "Your life will be filled with magical moments.",
        "Your shoes will make you happy today.",
    ];
    if (message.channel.name === 'kuru-fun' && Client.user.id !== message.author.id) {
        const command = message.cleanContent.split(" ")[0];
        const parameter = message.cleanContent.replace(command + " ", "");
        switch (command) {
            // Show Avatar
            case symbolCommand + 'avatar':
                const avatarEmbed = new Discord.RichEmbed()
                    .setTitle('Avatar Full View')
                    .setColor(0xcd3c2a)
                    .setImage(message.author.avatarURL);
                message.channel.send(avatarEmbed);
                break;
            // Message Count
            case symbolCommand + 'message-count':
                messageCountRef.once('value').then(snap => {
                    message.reply('There are ' + (snap.exists() ? snap.val() : 0) + ' messages sent by you!');
                });
                break;
            // Flip a coin
            case symbolCommand + 'flip':
                message.reply((Math.floor(Math.random() * 2) == 0) ? 'Heads' : 'Tails');
                break;
            // Fortune Cookie
            case symbolCommand + 'fortune':
                message.reply(fortuneCookie[Math.floor(Math.random() * fortuneCookie.length)]);
                break;
            // Nicknames
            case symbolCommand + 'nicknames':
                firebaseDatabase.child('user_account/' + (taggedUser !== null ? taggedUser.id : message.author.id)).child('nicknames').once('value').then(snap => {
                    let nicknameMessage = "Only the previous **10** nickname change will be shown:";
                    snap.val().map((names, key) => {
                        nicknameMessage += "\n**" + (key + 1) + "**. " + names;
                    });
                    message.channel.send(nicknameMessage);
                });
                break;
            // 8-ball
            case symbolCommand + '8ball':
                message.reply('My answer to "' + parameter + '" is "' + eightBall[Math.floor(Math.random() * eightBall.length)] + '"');
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
};