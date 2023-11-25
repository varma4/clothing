const mongoose = require('mongoose')
const bcrypt = require(`bcryptjs`)
const validator = require('validator')
const loginSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must have a name'],
    },
    email: {
        type: String,
        required: [true, "User must have a email Id"],
        unique: true,
        validate: [validator.isEmail, 'Email is not valid']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type : String,
        required: [true, "User must have password"],
        trim: true
    },
    confirmpassword:{
        type: String,
        required: [true, 'User should have a confirm password'],
        validate: {
            validator: function(val){
                return val === this.password;
            },
            message: 'password and confirm password should be the same'
        }
    },
})


loginSchema.pre('save', async function(next) {
    if(!this.isModified('password'))return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmpassword = undefined
    next()
})



loginSchema.methods.checkPassword = async function(pwd, pwdDb){
    return await bcrypt.compare(pwd, pwdDb)
}



const LoginData = mongoose.model('LoginDetails', loginSchema)

module.exports = LoginData