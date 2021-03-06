import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { firebaseAdmin } from "./helpers/firebase";
import { connectDb } from "./helpers/db";
import { buildSchema } from "type-graphql";
import {  GlobalUserResolver } from "./resolvers/user";
import { GlobalPitstopResolver, PitstopResolver } from "./resolvers/pitstop";
import { GlobalCommentResolver, CommentResolver } from "./resolvers/comment";
import { ProfileResolver } from "./resolvers/Profile";
const express = require('express');

const bootstrap = async () => {
    const port = process.env.PORT || 3001;
    await connectDb();
    const schema = await buildSchema({
        resolvers:[
            GlobalUserResolver,
            GlobalPitstopResolver,
            GlobalCommentResolver,
            CommentResolver,
            PitstopResolver,
            ProfileResolver,
        ]
    });
    const server = new ApolloServer({
        schema,
        context:async ({req}) => {
            const auth = req.headers.authorization || '';
            const token = auth.replace('Bearer ', '');
            let user:any;
            try {
                user = await firebaseAdmin.auth().verifyIdToken(token);
            } catch(e) {
                user = false;
            }
            return {
                user
            };
        }
    });

    const app = express();
    app.get('/', (_:any, res:any) => res.send('hello world'));
    server.applyMiddleware({app});

    app.listen(port);
    console.log(`listening on http://localhost:${port}`);
}

bootstrap();
