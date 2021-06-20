module.exports = {
    name: "log",
    execute(logChannelID, item) {
        logChannelID.send(item)        
    }
}