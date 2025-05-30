const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        first_name:{
            type: String,
            required: [true, "Please enter a first name"],
        },

        last_name:{
            type: String,
            required: [true, "Please enter a last name"],

        },

        gender:{
            type: String,
            required: [true, "Please enter a gender"],
        }


    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", UserSchema);
module.exports = User;