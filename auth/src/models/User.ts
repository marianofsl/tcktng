import mongoose from 'mongoose';
import { Password } from '../services/password';

// To understand this code look at chapter 146, 147

// This interface describe the attributes that
// are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

// This interface describe the attributes that
// User model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs) : UserDoc;
}


// This interface describe what a User
// Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
} 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

//Here use function keyword and not arrow function
//
userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashedPassword = await Password.toHash(this.get('password'));
        this.set('password', hashedPassword);
    }
    
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };