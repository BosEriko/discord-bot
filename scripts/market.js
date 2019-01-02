exports.botMarket = (appTitle, Discord, firebaseDatabase, message, symbolCommand) => {
    const marketRef         = firebaseDatabase.child('market/' + message.author.id)
    const command           = message.cleanContent.split(" ")[0]
    const currencySymbol    = "¥"
    const convertedPrice    = price => price * 5000
    const marketHelp = `
**${symbolCommand}balance** Show your balance
**${symbolCommand}buy** Buy an item
**${symbolCommand}help** Show all available commands
**${symbolCommand}shop** Open shop
    `
    switch (command) {
        // Shop
        case symbolCommand + 'shop':
            const shopEmbed = new Discord.RichEmbed()
                .setTitle(`${appTitle} Shop`)
                .setColor(0xcd3c2a)
                .addField('Discord Nitro (1 Month)', `/buy nitro-short • ${currencySymbol}${convertedPrice(9.99)} • Stocked`, false)
                .addField('Discord Nitro (1 Year)', `/buy nitro-long • ${currencySymbol}${convertedPrice(99.99)} (-16%) • Stocked`, false)
                .addField('Megaphone', `/buy megaphone • ${currencySymbol}00.1 • Stocked`, false)
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