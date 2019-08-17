const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false
    }
});

UserSchema.pre('save', async function (next) {
    const hash  = await bcrypt.hash(this.password, 10);
    this.password = hash;
  
    next();
})

module.exports = model('User', UserSchema);