exports.botPost = (message, symbolCommand) => {
    const command   = message.cleanContent.split(" ")[0];
    const parameter = message.cleanContent.replace(command + " ", "");
    if (message.author.id === '230249439481167872') {
        if(message.content.startsWith(symbolCommand + 'bot-post')) {
            message.channel.send(parameter);
        }
    }
};