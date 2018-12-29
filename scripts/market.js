exports.botMarket = (Discord, firebaseDatabase, message, symbolCommand) => {
    const marketRef         = firebaseDatabase.child('market/' + message.author.id)
    const command           = message.cleanContent.split(" ")[0]
    const currencySymbol    = "₱"
    const marketHelp = `
**${symbolCommand}balance** Show your balance
**${symbolCommand}help** Show all available commands
    `
    switch (command) {
        // Check Balance
        case symbolCommand + 'balance':
            const balanceRef = marketRef.child('balance')
            balanceRef.once('value').then(snap => {
                let balanceValueData = snap.exists() ? snap.val() : 0
                message.author.send('Your current balance is ' + currencySymbol + " " + balanceValueData + ".")
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