// tslint:disable: no-any
const modulesPrefix: any = (data: any) => {
    // data.message.reply(data.message.content);
    data.message.reply(data.command);
};

module.exports = modulesPrefix;