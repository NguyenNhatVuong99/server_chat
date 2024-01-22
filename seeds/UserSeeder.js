const bcrypt = require('bcryptjs');
let { faker } = require('@faker-js/faker/locale/vi');
const unorm = require('unorm');

let User = require('../models/User')
let Seeder = async (req, res,) => {
    try {
        await User.deleteMany({});
        console.log("User deleted.");
    } catch (error) {
        console.log(error);
    }
    var salt = bcrypt.genSaltSync(10)
    let hashPassword = await bcrypt.hashSync('nhatvuong99', salt);
    let newUser1 = new User({
        email: 'nhatvuong99@gmail.com',
        password: hashPassword,
        full_name: 'Nguyễn Nhất Vương',
        full_name_without_diacritics: 'nguyen nhat vuong',
        avatar: 'https://scontent.fdad7-1.fna.fbcdn.net/v/t39.30808-6/312297714_206841441768622_8737112273700475545_n.jpg?_nc_cat=109&cb=99be929b-8d691acd&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=u-biDy2Rc3MAX_BlD8G&_nc_ht=scontent.fdad7-1.fna&oh=00_AfDGSut1JxfkbdzlYWOM4dnLmIQlmunHBKc41f6LSugM6A&oe=65B07E01',
        cover: faker.image.url(),
        role: 'admin',
        is_active: faker.datatype.boolean(),
    })
    await newUser1.save();
    let newUser2 = new User({
        email: 'doannhat@gmail.com',
        password: hashPassword,
        full_name: 'Phan Doãn Nhật',
        full_name_without_diacritics: 'phan doan nhat',
        avatar: faker.image.avatar(),
        cover: faker.image.url(),
        role: 'admin',
        is_active: faker.datatype.boolean(),
    })
    await newUser2.save()
    let newUser3 = new User({
        email: 'tuyetni@gmail.com',
        password: hashPassword,
        full_name: 'Lê Tuyết Ni',
        full_name_without_diacritics: 'le tuyet ni',
        avatar: faker.image.avatar(),
        cover: faker.image.url(),
        role: 'user',
        is_active: faker.datatype.boolean(),
    })
    await newUser3.save()
    for (let index = 0; index < 100; index++) {
        let gender = faker.person.sex()
        var salt = bcrypt.genSaltSync(10)
        let hashPassword = await bcrypt.hashSync('nhatvuong99', salt);
        let full_name = faker.person.fullName(gender);
        let full_name_without_diacritics = unorm.nfd(full_name).replace(/[\u0300-\u036f]/g, '');

        let newUser = new User({
            email: faker.internet.email(),
            password: hashPassword,
            full_name: full_name,
            full_name_without_diacritics: full_name_without_diacritics,
            avatar: faker.image.avatar(),
            cover: faker.image.url(),
            friend_count: faker.string.numeric(),
            is_active: faker.datatype.boolean(),
        })
        await newUser.save()
    }
    console.log('user saved successfully')
}

module.exports = { Seeder }