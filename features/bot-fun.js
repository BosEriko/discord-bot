exports.botFun = (message, symbolCommand, Discord, Client, firebaseDatabase) => {
    const messageCountRef = firebaseDatabase.child('statistics/' + message.author.id + '/message_count')
    const taggedUser = message.mentions.users.first() ? message.guild.member(message.mentions.users.first()) : null
    messageCountRef.once('value').then(snap => {
        let messageCountData = snap.exists() ? snap.val() : 0
        firebaseDatabase.child('statistics/' + message.author.id).set({
            message_count: messageCountData + 1
        })
    })
    const funHelp = `
**${symbolCommand}8ball** Magic 8-ball
**${symbolCommand}avatar** Show your avatar
**${symbolCommand}downvote** Downvote someone by 1
**${symbolCommand}flip** Flip a coin
**${symbolCommand}fortune** Fortune cookie
**${symbolCommand}help** Show all available commands
**${symbolCommand}message-count** Show how much messages you've sent
**${symbolCommand}nicknames** Show a list of the past 10 nicknames
**${symbolCommand}reputation** List your Reputation
**${symbolCommand}upvote** Upvote someone by 1
    `
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
    ]
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
        "Be on the lookout for coming events They cast their shadows beforehand.",
        "Be tactful overlook your own opportunity.",
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
        "It is not necessary to show others you have change the change will be obvious.",
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
        "Never upset the driver of the car you're in they're the master of your destiny until you get home.",
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
        "You are a lover of words One day you will write a book.",
        "You are not judged by your efforts you put in you are judged on your performance.",
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
    ]
    firebaseDatabase.child('fun_data').set({
        fortune_cookie: fortuneCookie,
        eight_ball: eightBall,
        fornute_cookie: [
            '"Slavery is big gay" - Penny Nibba',
            "Squidward, Digiorno Text",
            "I'm sorry i don't speak Italics",
            "let me get the pizza BONELESS",
            "Make some cornbread today, Bone App the Teeth",
            "Knowledge is expensive, you have to pay attention",
            "I't really do be like that sometimes",
            "By the holy decree of this meme, the person below is Infinite Gay",
            "The almighty decree of this meme has declared. henceforth and forevermore, that the person above be Infinity + 1 gay",
            "hello, forbidden knowledge"
        ],
        topic_of_the_day: [
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
        ]
    });
    if (message.channel.name === 'kuru-fun' && Client.user.id !== message.author.id) {
        const command = message.cleanContent.split(" ")[0]
        const parameter = message.cleanContent.replace(command + " ", "")
        switch (command) {
            // Show Avatar
            case symbolCommand + 'avatar':
                const avatarEmbed = new Discord.RichEmbed()
                    .setTitle('Avatar Full View')
                    .setColor(0xcd3c2a)
                    .setImage(message.author.avatarURL)
                message.channel.send(avatarEmbed)
                break
            // Message Count
            case symbolCommand + 'message-count':
                messageCountRef.once('value').then(snap => {
                    message.reply('There are ' + (snap.exists() ? snap.val() : 0) + ' messages sent by you!')
                })
                break
            // Reputation: Upvote
            case symbolCommand + 'upvote':

                break
            // Reputation: Downvote
            case symbolCommand + 'downvote':

                break
            // Reputation: History
            case symbolCommand + 'reputation':

                break
            // Flip a coin
            case symbolCommand + 'flip':
                message.reply((Math.floor(Math.random() * 2) == 0) ? 'Heads' : 'Tails')
                break
            // Fortune Cookie
            case symbolCommand + 'fortune':
                message.reply(fortuneCookie[Math.floor(Math.random() * fortuneCookie.length)])
                break
            // Nicknames
            case symbolCommand + 'nicknames':
                firebaseDatabase.child('user_account/' + (taggedUser !== null ? taggedUser.id : message.author.id)).child('nicknames').once('value').then(snap => {
                    let nicknameMessage = "Only the previous **10** nickname change will be shown:"
                    snap.val().map((names, key) => {
                        nicknameMessage += "\n**" + (key + 1) + "**. " + names
                    })
                    message.channel.send(nicknameMessage)
                })
                break
            // 8-ball
            case symbolCommand + '8ball':
                message.reply('My answer to "' + parameter + '" is "' + eightBall[Math.floor(Math.random() * eightBall.length)] + '"')
                break
            // Show Help
            case symbolCommand + 'help':
                const helpEmbed = new Discord.RichEmbed()
                    .setTitle('List of commands')
                    .setColor(0xcd3c2a)
                    .setDescription(funHelp)
                message.channel.send(helpEmbed)
                break
            // Normal Message
            default:
                message.reply("Command not found!")
        }
    }
}