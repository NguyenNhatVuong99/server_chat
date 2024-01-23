require("../config/database").connect()
let PostSeeder = require("./PostSeeder")
let UserSeeder = require("./UserSeeder")
let ConversationSeeder = require("./ConversationSeeder")
let MessageSeeder = require("./MessageSeeder")
let CommentSeeder = require("./CommentSeeder")
let ReactSeeder = require("./ReactSeeder")
let FriendSeeder = require("./FriendSeeder")
let PostReactSeeder = require("./PostReactSeeder")
let DataSeeder = async () => {
    try {
        // await UserSeeder.Seeder()
        await PostReactSeeder.Seeder()
        // await MessageSeeder.Seeder()
        // await ConversationSeeder.Seeder()
        // await CommentSeeder.Seeder()
        // await ReactSeeder.Seeder()
        // await FriendSeeder.Seeder()
        // console.log('ok');
    } catch (error) {
        console.log(error);
    }
}
DataSeeder()