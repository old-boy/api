const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellStatusModulesSchema = new Schema({
    statusName: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("SellStatus", SellStatusModulesSchema);