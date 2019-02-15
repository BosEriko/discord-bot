const modulesDialogflow: any = (data: any) => {
    let promise = new Promise((resolve, reject) => {
        let request = data.df.textRequest(data.message.cleanContent, {
            sessionId: data.message.author.id
        })
        request.on('response', (response: any) => {
            console.log(response)
            let rep = response.result.fulfillment.speech
            resolve(rep)
        })
        request.on('error', (error: any) => {
            const resolveData: any = null
            resolve(resolveData)
        })
        request.end()
    });
    (async function () {
        let result = await promise
        if (result) {
            data.message.reply(result)
        } else {
            data.message.reply('nothing here')
        }
    }())
}

module.exports = modulesDialogflow