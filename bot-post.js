exports.botPost = (message, symbolCommand) => {
    const command   = message.content.split(" ")[0];
    const parameter = message.content.replace(command + " ", "");
    if (message.author.id === '230249439481167872') {
        if(message.content.startsWith(symbolCommand + 'bp')) {
            message.delete();
            message.channel.send(parameter);
        }
    }
};