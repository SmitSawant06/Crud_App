const mongoose = require('mongoose');

const storiesSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        img: {
            type: String,
            require: false
        },
        summary: {
            type: String
        }
    }
)

const Storybook = mongoose.model("Storybook" , storiesSchema);
module.exports = Storybook;