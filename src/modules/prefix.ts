// tslint:disable: no-any
const modulesPrefix: any = (data: any) => {
    data.message.reply(data.message.content);
}

module.exports = modulesPrefix;