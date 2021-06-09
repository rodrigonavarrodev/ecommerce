import mongooseService from '../../common/services/mongoose.service'
import mongoose from 'mongoose'
import debug from 'debug'

const log: debug.IDebugger = debug('app:blanks-dao');

export interface User extends mongoose.Document {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    adress?: string,
    city?: string,
    country?: string,
    datebirth?: string,
    phone?: string,
    profilepic?: string
};

class UsersDao {
    Schema = mongooseService.getMongoose().Schema;

    UsersSchema = new this.Schema({
        email: String,
        password: String,
        firstname: String,
        lastname: String,
        adress: String,
        city: String,
        country: String,
        datebirth: String,
        phone: String,
        profilepic: String
    }, { timestamps: true });

    User = mongooseService.getMongoose().model<User>('Users', this.UsersSchema);

    constructor() {
        log('Created new instance of StatesDao');
    }

    async addUser(userfields: UsersModel.registerUser){
        const user = new this.User({...userfields})
        await user.save();
        return user;
    }

    async getUserByEmail(email: string) {
        return this.User.findOne({ email: email })
    }

    async getUserById(id: string) {
        return this.User.findById(id)
    }

   
}

export default new UsersDao();