exports.botMarket = (appTitle, Discord, firebaseDatabase, message, symbolCommand) => {
    const marketRef = firebaseDatabase.child('market/' + message.author.id)
    const command = message.cleanContent.split(" ")[0]
    const currencySymbol = "¥"
    const marketHelp = `
**${symbolCommand}balance** Show your balance
**${symbolCommand}help** Show all available commands
**${symbolCommand}shop** Open shop
    `
    switch (command) {
        // Shop
        case symbolCommand + 'shop': // Remember to multiply real word USD prices to 5000 (Only applicable if item has real word USD price)
            const shopEmbed = new Discord.RichEmbed()
                .setTitle(`${appTitle} Shop`)
                .setColor(0xcd3c2a)
                .addField('1 Month Discord Nitro with Free Nitro Games', `/buy 1 • ${currencySymbol}49,950`, false)
                .addField('1 Year Discord Nitro with Free Nitro Games', `/buy 2 • ${currencySymbol}499,950 (-16%)`, false)
                .addField('1 time use of server Megaphone', `/buy 3 • ${currencySymbol}00.1`, false)
                .setThumbnail('https://i.imgur.com/nYbEBaS.png')
            message.channel.send(shopEmbed)
            break
        // Check Balance
        case symbolCommand + 'balance':
            const balanceRef = marketRef.child('balance')
            balanceRef.once('value').then(snap => {
                let balanceValueData = snap.exists() ? snap.val() : 0
                message.author.send(`Your current balance is ${currencySymbol}${balanceValueData}.`)
                message.reply("A message has been sent to your DMs!")
            })
            break
        // Show Help
        case symbolCommand + 'help':
            const marketEmbed = new Discord.RichEmbed()
                .setTitle('List of market commands')
                .setColor(0xcd3c2a)
                .setDescription(marketHelp)
            message.channel.send(marketEmbed)
            break
        // Normal Message
        default:
            message.reply("Command not found!")
    }
}