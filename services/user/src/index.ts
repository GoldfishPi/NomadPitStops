import express from "express";
import bcrypt from "bcrypt";
import { User, validateUser } from "./models/user.model";
import { connect } from "mongoose";

const app = express();

app.get('/', (_, res) => {
    console.log('Endpoint hit lolol');
    return res.status(500).send('User Service Running!')
});

app.post('/', async (req, res) => {
    const { error } = validateUser(req.body);

    if(error)return res.status(400).send(error.details);

    let user = await User.findOne({ email:req.body.email });
    if(user) return res.status(400).send('User already exists');

    user = new User({
        name:req.body.name,
        password:bcrypt.hash(req.body.password, 10),
        email:req.body.email
    });

    await user.save();

    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send({
        _id:user._id,
        name:user.name,
        email:user.email,
    });

});

const makeConnection = async () => {
    try {
        await connect('mongodb://user_db:27018', { 
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
        console.log('connected to db!');
        return true;
    } catch(e) {
        console.log('failed to connect to db');
        return await new Promise(res => {
            setTimeout(res, 1000);
        })
        .then(() => false)
    }
}

const connectDb = async () => {
    for(let i =0; i < 20; i ++) {
        const conncted = await makeConnection();
        if(conncted)break;
    }
}

connectDb();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`user service listening on ${port}`))

