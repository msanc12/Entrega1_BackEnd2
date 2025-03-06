import mongoose from 'mongoose';
import { hashSync } from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' },
    role: { type: String, default: 'user' }
});

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = hashSync(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);
export default User;
