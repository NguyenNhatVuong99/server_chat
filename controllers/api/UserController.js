const unorm = require('unorm');

let User = require("../../models/User")
let index = async (req, res) => {
    let data = await User.find({})
    res.status(200).json({
        data
    })
}
let show = async (req, res) => {
    let id = req.params.id
    try {
        let user = await User.findOne({ _id: id })
        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}
let search = async (req, res) => {
    let searchQuery = req.query.name; // Accessing the query parameter 'name'
    const diacriticInsensitiveRegex = (input) => {
        const normalizedInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return new RegExp(normalizedInput, "i");
    };

    try {
        let users;

        if (searchQuery) {
            const searchRegex = diacriticInsensitiveRegex(searchQuery);
            users = await User.aggregate([
                {
                    $match: {
                        full_name_without_diacritics: { $regex: searchRegex }
                    }
                }
            ]);
        } else {
            users = [];
        }


        return res.status(200).json({
            success: true,
            data: { users }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error
        })
    }
};
let create = async (req, res) => {

}
let store = async (req, res) => {

}
let edit = async (req, res) => {

}
let update = async (req, res) => {

}
let destroy = async (req, res) => {

}
module.exports = { index, show, create, store, edit, update, destroy, search }