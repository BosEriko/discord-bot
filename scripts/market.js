exports.botMarket = (firebaseDatabase, message) => {
    const marketRef = firebaseDatabase.child('market/' + message.author.id)
    const command = message.cleanContent.split(" ")[0]
    const currencySymbol = "₭€"
    switch (command) {
        // Check Balance
        case symbolCommand + 'balance':
            const balanceRef = marketRef.child('balance')
            balanceRef.once('value').then(snap => {
                let balanceValueData = snap.exists() ? snap.val() : 0
                message.author.send('Your current balance is ' + currencySymbol + balanceValueData + ".")
                message.reply("A message has been sent to your DMs!")
            })
            break
        // Show Help
        case symbolCommand + 'balance':
            message.reply('Market is under maintenance!')
            break
        // Normal Message
        default:
            message.reply("Command not found!")
    }
}