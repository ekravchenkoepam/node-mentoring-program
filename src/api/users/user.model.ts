import { Schema, model } from 'mongoose';
import { UserExtended } from '../../types';

const userSchema = new Schema<UserExtended>({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hobbies: {
        type: [String],
        default: []
    }
});

const UserModel = model<UserExtended>('User', userSchema);

export default UserModel;