const mongoose = require(`mongoose`);

const foodSchema = new mongoose.Schema({
    foodname: {
        type: String,
        required: true
    },

    video: {
        type:String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    discription: {
        type: String
    },

    foodpartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `foodpartner`,
        required: true
    }
})

const foodModel = mongoose.model(`food` , foodSchema);

module.exports = foodModel;