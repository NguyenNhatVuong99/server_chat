let { faker } = require('@faker-js/faker/locale/vi');

let User = require('../models/User')
let Conversation = require('../models/Conversation');
let Message = require("../models/Message")
const { get } = require('mongoose');
let limit = 30;
let getUser1 = async () => {
    try {
        return await User.findOne({
            email: 'nhatvuong99@gmail.com'
        }, '_id')

    } catch (error) {
        console.log(error);
    }
}
let getUser2 = async () => {
    try {
        return await User.findOne({
            email: 'doannhat@gmail.com'
        }, '_id')

    } catch (error) {
        console.log(error);
    }
}
let getUsers = async () => {
    try {
        return await User.find({ _id: { $ne: '65a89222784268eee668e590' } }, "_id")
            .limit(limit)
    } catch (error) {
        console.log(error);
    }
}
let getConversation = async () => {
    return await Conversation.find({})
}
const Seeder = async (req, res,) => {

    // try {
    //     await Conversation.deleteMany({});
    //     console.log("Conversations deleted.");
    // } catch (error) {
    //     console.log(error);
    // }
    // let user1 = await getUser1()
    // // let user2 = await getUser2()
    // let users = await getUsers()
    // let arr = [user1["_id"], user2["_id"]];
    // let newConver = new Conversation({
    //     users: arr
    // })
    // await newConver.save()
    // for (let index = 1; index < limit; index++) {
    //     let startDate = new Date('2023-11-01T00:00:00.000Z');
    //     let endDate = new Date('2023-12-18T00:00:00.000Z');
    //     let updatedAt = faker.date.between({ startDate, endDate });
    //     let arr = [user1["_id"]];
    //     arr.push(users[index]['_id'])
    //     let newConver = new Conversation({
    //         users: arr,
    //         updatedAt: updatedAt
    //     })
    //     await newConver.save()
    // }
    let conversations = await getConversation();

    // Use Promise.all to wait for all asynchronous operations to complete
    await Promise.all(conversations.map(async (item) => {
        let conver_id = item['_id'];
        try {
            // Use the `await` keyword to handle the asynchronous operation
            let messages = await Message.find({ "conversation_id": conver_id }, "_id");

            // Assuming you want to get the last message, use messages[messages.length - 1]
            let lastMessage = messages[messages.length - 1];

            // Use findByIdAndUpdate with the 'await' keyword
            let updatedConversation = await Conversation.findByIdAndUpdate(
                conver_id,
                { last_message_id: lastMessage },
                { new: true } // To get the updated document
            );
        } catch (error) {
            console.error(error);
        }
    }));

    // // The rest of your code after all conversations have been processed

    console.log('Conversations saved successfully')

}

module.exports = { Seeder }