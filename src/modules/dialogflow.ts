const modulesDialogflow: any = (data) => {
    let promise = new Promise((resolve, reject) => {
        let request = data.df.textRequest(data.message.cleanContent, {
            sessionId: data.message.author.id
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
            data.message.reply(result)
        } else {
            data.message.reply('nothing here')
        }
    }())
}

module.exports = modulesDialogflow