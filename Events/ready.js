module.exports = (client) => {
    console.log("» "+client.user.username+" is ready, logged in as a "+client.user.tag+".");
    client.user.setActivity("Thank you for downloading and using my Discord'Handler!", { type: "PLAYING" })
}