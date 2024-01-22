let User = require("../../models/User")
let AuthValidator = require("../../validations/auth")
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let login = async (req, res) => {
    const { error } = AuthValidator.loginValidator(req.body)
    if (error) {
        return res.status(400).json(
            { message: error.details[0].message }
        );
    }
    let { email, password } = req.body
    let user = await User.findOne({ email: email })
    if (!user) {
        return res.status(400).json(
            { message: "Email or password is incorrect" }
        );
    }
    let checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        res.status(400).json(
            { message: "Email or password is incorrect" }
        );
    } else {
        const full_name = user.lastName + " " + user.firstName
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({
            token: token,
            role: user.role,
            userId: user._id,
            full_name: full_name,
            avatar: user.avatar,
            message: "Đăng nhập thành công"
        })
    }

}
let register = async (req, res) => {
    const { error } = AuthValidator.registerValidator(req.body)
    if (error) {
        return res.status(400).json(
            { message: error.details[0].message }
        );
    }
    const checkEmailExist = await User.findOne({ email: req.body.email })
    if (checkEmailExist) {
        return res.status(400).json({
            message: "Email is exits"
        });
    }
    var salt = bcrypt.genSaltSync(10)
    const hashPassword = await bcrypt.hashSync(req.body.password, salt);
    let user = new User({
        email: req.body.email,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        password: hashPassword,
    })
    try {
        await user.save();
        req.session.userId = user._id
        res.status(200).json({
            message: "Đăng ký thành công"
        })
    } catch (error) {
        res.status(400).json(error)
    }
}
let logout = (req, res) => {
    if (req.session.userId) {
        req.session.destroy()
        res.clearCookie("ssid")
        res.status(200).json({
            message: "Đăng xuất thành công"
        })
    }
}
module.exports = { login, register, logout }