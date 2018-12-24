exports.botFun = (message, symbolCommand, Discord, Client, firebaseDatabase) => {
    const messageCountRef = firebaseDatabase.child('statistics/' + message.author.id + '/message_count')
    const taggedUser = message.mentions.users.first() ? message.guild.member(message.mentions.users.first()) : null
    const currentName = message.author.username !== 'Kuru Anime' ? (message.member.nickname === null ? message.author.username : message.member.nickname) : 'Kuru Anime'
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
**${symbolCommand}topic** Show the topic of the day (Only works in main #general)
**${symbolCommand}upvote** Upvote someone by 1
    `
    if (message.channel.name === 'kuru-fun' && Client.user.id !== message.author.id) {
        const command = message.cleanContent.split(" ")[0]
        const parameter = message.cleanContent.replace(command + " ", "")
        const parameterNoTag = message.content.replace(command + " ", "").replace(/<((@!?\d+)|(:.+?:\d+))>/g, '')
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
                if (taggedUser !== null && taggedUser.id !== message.author.id) {
                    firebaseDatabase.child('reputation/' + taggedUser.id).once('value').then(snap => {
                        let voteCount = snap.child('vote').exists() ? snap.child('vote').val() : 0
                        let voteReasons = snap.child('reasons').exists() ? snap.child('reasons').val() : []
                        voteReasons.push({ "status": "+", "by": currentName, "reason": parameterNoTag })
                        firebaseDatabase.child('reputation/' + taggedUser.id).set({
                            vote: voteCount + 1,
                            reasons: voteReasons
                        })
                    })
                    message.delete()
                } else if (taggedUser !== null && taggedUser.id === message.author.id) {
                    message.reply('You can\'t upvote yourself!');
                } else if (taggedUser === null) {
                    message.reply('Please specify a user by tagging them.');
                }
                break
            // Reputation: Downvote
            case symbolCommand + 'downvote':
                if (taggedUser !== null && taggedUser.id !== message.author.id) {
                    firebaseDatabase.child('reputation/' + taggedUser.id).once('value').then(snap => {
                        let voteCount = snap.child('vote').exists() ? snap.child('vote').val() : 0
                        let voteReasons = snap.child('reasons').exists() ? snap.child('reasons').val() : []
                        voteReasons.push({ "status": "-", "by": currentName, "reason": parameterNoTag })
                        firebaseDatabase.child('reputation/' + taggedUser.id).set({
                            vote: voteCount - 1,
                            reasons: voteReasons
                        })
                    })
                    message.delete()
                } else if (taggedUser !== null && taggedUser.id === message.author.id) {
                    message.reply('You can\'t downvote yourself!');
                } else if (taggedUser === null) {
                    message.reply('Please specify a user by tagging them.');
                }
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
                firebaseDatabase.child('fun_data/fortune_cookie').once('value').then(snap => {
                    let fortuneCookie = snap.val()
                    message.reply(fortuneCookie[Math.floor(Math.random() * fortuneCookie.length)])
                })
                break
            // Fornute Cookie
            case symbolCommand + 'fornute':
                firebaseDatabase.child('fun_data/fornute_cookie').once('value').then(snap => {
                    let fornuteCookie = snap.val()
                    message.reply(fornuteCookie[Math.floor(Math.random() * fornuteCookie.length)])
                })
                break
            // Nicknames
            case symbolCommand + 'nicknames':
                firebaseDatabase.child('user_account/' + (taggedUser !== null ? taggedUser.id : message.author.id)).child('nicknames').once('value').then(snap => {
                    let nicknameMessage = "Only the previous **10** nickname change will be shown:"
                    snap.val().map((names, key) => {
                        nicknameMessage += "\n**" + (key + 1) + "**. " + names
                    })
                    message.reply(nicknameMessage)
                })
                break
            // 8-ball
            case symbolCommand + '8ball':
                firebaseDatabase.child('fun_data/eight_ball').once('value').then(snap => {
                    let eightBall = snap.val()
                    message.reply('My answer to "' + parameter + '" is "' + eightBall[Math.floor(Math.random() * eightBall.length)] + '"')
                })
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