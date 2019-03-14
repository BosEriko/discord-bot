// tslint:disable: no-any
const modulesDialogflow: any = (data: any) => {
    const promise = new Promise((resolve, reject) => {
        const request = data.dfClient.textRequest(data.message.cleanContent, {
            sessionId: data.message.author.id
        });
        request.on('response', (response: any) => {
            console.log(response);
            const rep = response.result.fulfillment.speech;
            resolve(rep);
        });
        request.on('error', (error: any) => {
            const resolveData: any = null;
            resolve(resolveData);
        });
        request.end();
    });
    // tslint:disable-next-line: only-arrow-functions
    (async function () {
        const result = await promise;
        if (result) {
            data.message.reply(result);
        } else {
            data.message.reply('nothing here');
        }
    }());
};

module.exports = modulesDialogflow;