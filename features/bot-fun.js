exports.botFun = (message, symbolCommand, Discord, Client, firebaseDatabase) => {
    let cooldownMinute = 60000
    let cooldownHour = cooldownMinute * 24
    const messageCountRef = firebaseDatabase.child('statistics/' + message.author.id + '/message_count')
    const taggedUser = message.mentions.users.first() ? message.guild.member(message.mentions.users.first()) : null
    const currentName = message.channel.type !== 'dm' && message.author.username !== 'Kuru Anime' ? (message.member.nickname === null ? message.author.username : message.member.nickname) : 'Kuru Anime'
    messageCountRef.once('value').then(snap => {
        let messageCountData = snap.exists() ? snap.val() : 0
        firebaseDatabase.child('statistics/' + message.author.id).set({
            message_count: messageCountData + 1
        })
    })
    const funHelp = `
**${symbolCommand}8ball** Magic 8-ball
**${symbolCommand}avatar** Show your avatar
**${symbolCommand}flip** Flip a coin
**${symbolCommand}fortune** Fortune cookie
**${symbolCommand}help** Show all available commands
**${symbolCommand}message-count** Show how much messages you've sent
**${symbolCommand}nicknames** Show a list of the past 10 nicknames
    `
    const reputationHelp = `
**${symbolCommand}downvote** Downvote someone by 1
**${symbolCommand}reputation** List your Reputation
**${symbolCommand}upvote** Upvote someone by 1
    `
    const generalHelp = `
**${symbolCommand}topic** Show the topic of the day
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
                    firebaseDatabase.child('reputation/' + message.author.id + '/vote_cooldown_timestamp').once('value').then(snap => {
                        let cooldown = snap.exists() ? snap.val() : 0
                        if (cooldown < Date.now()) {
                            firebaseDatabase.child('reputation/' + taggedUser.id).once('value').then(snap => {
                                let voteCount = snap.child('vote').exists() ? snap.child('vote').val() : 0
                                let voteReasons = snap.child('reasons').exists() ? snap.child('reasons').val() : []
                                voteReasons.push({ "status": "+", "by": currentName, "reason": parameterNoTag, "voter_discord_id": message.author.id })
                                if (voteReasons.length > 10) {
                                    voteReasons.shift()
                                }
                                firebaseDatabase.child('reputation/' + taggedUser.id + '/vote').set(voteCount + 1)
                                firebaseDatabase.child('reputation/' + taggedUser.id + '/reasons').set(voteReasons)
                                firebaseDatabase.child('reputation/' + message.author.id + '/vote_cooldown_timestamp').set(Date.now() + cooldownHour * 24)
                            })
                        } else {
                            message.reply("Please wait " + (Math.floor(Math.round((cooldown - Date.now()) / cooldownMinute) / 24)) + " hours and " + (60 - (60 * parseFloat("0." + Math.round((cooldown - Date.now()) / cooldownMinute) % 24))) + " minutes before you can vote again!")
                        }
                    })
                    message.delete()
                } else if (taggedUser !== null && taggedUser.id === message.author.id) {
                    message.reply('You can\'t upvote yourself!')
                } else if (taggedUser === null) {
                    message.reply('Please specify a user by tagging them.')
                }
                break
            // Reputation: Downvote
            case symbolCommand + 'downvote':
                if (taggedUser !== null && taggedUser.id !== message.author.id) {
                    firebaseDatabase.child('reputation/' + message.author.id + '/vote_cooldown_timestamp').once('value').then(snap => {
                        let cooldown = snap.exists() ? snap.val() : 0
                        if (cooldown < Date.now()) {
                            firebaseDatabase.child('reputation/' + taggedUser.id).once('value').then(snap => {
                                let voteCount = snap.child('vote').exists() ? snap.child('vote').val() : 0
                                let voteReasons = snap.child('reasons').exists() ? snap.child('reasons').val() : []
                                voteReasons.push({ "status": "-", "by": currentName, "reason": parameterNoTag, "voter_discord_id": message.author.id })
                                if (voteReasons.length > 10) {
                                    voteReasons.shift()
                                }
                                firebaseDatabase.child('reputation/' + taggedUser.id + '/vote').set(voteCount - 1)
                                firebaseDatabase.child('reputation/' + taggedUser.id + '/reasons').set(voteReasons)
                                firebaseDatabase.child('reputation/' + message.author.id + '/vote_cooldown_timestamp').set(Date.now() + cooldownHour * 24)
                            })
                        } else {
                            message.reply("Please wait " + (Math.floor(Math.round((cooldown - Date.now()) / cooldownMinute) / 24)) + " hours and " + (60 - (60 * parseFloat("0." + Math.round((cooldown - Date.now()) / cooldownMinute) % 24))) + " minutes before you can vote again!")
                        }
                    })
                    message.delete()
                } else if (taggedUser !== null && taggedUser.id === message.author.id) {
                    message.reply('You can\'t downvote yourself!')
                } else if (taggedUser === null) {
                    message.reply('Please specify a user by tagging them.')
                }
                break
            // Reputation: History
            case symbolCommand + 'reputation':
                firebaseDatabase.child('reputation/' + (taggedUser !== null ? taggedUser.id : message.author.id)).child('reasons').once('value').then(snap => {
                    let reputationHistory
                    if (snap.exists()) {
                        reputationHistory = "Only the previous **10** reputation change will be shown:"
                        snap.val().map((data) => {
                            reputationHistory += "\n**" + data.status + "1:** '" + data.reason + "' by " + data.by
                        })
                    } else {
                        reputationHistory = "No reputation change found!"
                    }
                    message.author.send(reputationHistory)
                    message.reply("A message has been sent to your DMs!");
                })
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
                    message.author.send(nicknameMessage)
                    message.reply("A message has been sent to your DMs!");
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
                    .setTitle('List of basic commands')
                    .setColor(0xcd3c2a)
                    .setDescription(funHelp)
                const reputationEmbed = new Discord.RichEmbed()
                    .setTitle('List of reputation commands')
                    .setColor(0xcd3c2a)
                    .setDescription(reputationHelp)
                const generalEmbed = new Discord.RichEmbed()
                    .setTitle('List of commands for #general (Kuru Anime Community)')
                    .setColor(0xcd3c2a)
                    .setDescription(generalHelp)
                message.author.send(helpEmbed)
                message.author.send(reputationEmbed)
                message.author.send(generalEmbed)
                message.reply("A message has been sent to your DMs!");
                break
            // Normal Message
            default:
                message.reply("Command not found!")
        }
    }
}