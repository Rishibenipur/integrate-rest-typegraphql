import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import {buildSchema} from "type-graphql";
import cors from "cors"
import { ApolloServer } from "@apollo/server"
import { LoginResolver } from "./resolvers/LoginResolver";
import { expressMiddleware } from '@apollo/server/express4';

dotenv.config();

async function startServer() {
    const schema = await buildSchema({
        resolvers: [LoginResolver],
    });

    const server = new ApolloServer({
        schema,
    });

    await server.start();

    const app = express();
    app.use(cors());
    app.use(express.json())

    app.use("/abc", (req, res, next) => {
        console.log("Request Body::", req.body);
        next
    })

    app.use('/graphql',((req, res, next) => {
        console.log(req.headers.authorization);
        next();

    }),  expressMiddleware(server));




    app.listen(process.env.PORT, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
        console.log(`GraphQL server is running at http://localhost:${process.env.PORT}/graphql`);
    });
}

startServer()