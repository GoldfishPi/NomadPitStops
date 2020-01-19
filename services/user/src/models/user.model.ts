import config from "../config/config.json";
import jwt from "jsonwebtoken";
import joi from "@hapi/joi";
import { Schema, model, Document } from "mongoose";

interface schema extends Document {
    name:string;
    email:string;
    password:string;
    isAdmin:boolean;
    generateAuthToken:() => string;
}

const UserSchema = new Schema({
    name: {
        type:String,
        required:true,
        minlength:3,
        maxlength:50,
    },
    email: {
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255,
    },
    isAdmin: Boolean,
});

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin:this.isAdmin }, config.myprivatekey);
    return token;
}

export const User = model<schema>('User', UserSchema);

export const validateUser = (user:any) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        email: joi.string().min(5).max(255).required(),
        password: joi.string().min(3).max(255).required()
    });

    return schema.validate(user);

}
