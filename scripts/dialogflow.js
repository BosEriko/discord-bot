exports.botDF = (App, message) => {
    let promise = new Promise((resolve, reject) => {
        let request = App.textRequest(message.cleanContent, {
            sessionId: message.author.id
        })
        request.on('response', (response) => {
            console.log(response)
            let rep = response.result.fulfillment.speech
            resolve(rep)
        })
        request.on('error', (error) => {
            resolve(null)
        })
        request.end()
    })
    ;(async function () {
        let result = await promise
        if (result) {
            message.reply(result)
        } else {
            message.reply('nothing here')
        }
    }())
}