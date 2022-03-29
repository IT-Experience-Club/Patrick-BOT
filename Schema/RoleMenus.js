const mongoose = require("mongoose");

const RoleMenusSchema = new mongoose.Schema({
    custom_id: String,
    placeholder: String,
    max_selections: Number,
    options: Array,
    title: String
});

module.exports = mongoose.model("RoleMenus",RoleMenusSchema);
