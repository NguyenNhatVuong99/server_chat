let bcrypt = require('bcryptjs');
let { faker } = require('@faker-js/faker/locale/vi');

let User = require('../models/User')
let Comment = require('../models/Comment')
let Post = require('../models/Post')
let limit = 90;
let getUser = async () => {
    return await User.find({}, '_id').limit(limit)
}
let getPost = async () => {
    return await Post.find().limit(limit)
}

const Seeder = async (req, res,) => {
    let users = await getUser()
    let posts = await getPost()
    for (let index = 0; index < posts.length; index++) {
        let post_id = posts[index]["_id"]
        let startDate = new Date('2024-01-01T00:00:00.000Z');
        let endDate = new Date('2024-01-20T00:00:00.000Z');
        let createdAt = faker.date.between({ startDate, endDate });
        let comments = posts[index]["comments"]
        let arr = []
        for (let j = 0; j < 5; j++) {
            let random = Math.floor(Math.random() * 20)
            const newComment = new Comment({
                content: faker.word.sample(5),
                user_id: users[random]['_id'],
                post_id,
            });
            await newComment.save();
            arr.push(newComment['id'])
        }
        Post.updateOne
            (
                {
                    '_id': posts[index]['_id']
                },
                {
                    $set:
                    {
                        "comments": arr,
                    }
                }
            )
    }

}

module.exports = { Seeder }