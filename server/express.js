
import express from 'express';
import path from 'path';
import bodyPaser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import Template from './../template'

//Server Side Rendering
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MainRouter from './../client/MainRouter';
import StaticRouter from 'react-router-dom/StaticRouter';

const app = express();

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
//secure apps by HTTP headers
app.use(helmet());
app.use(cors());


app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', postRoutes);


app.use((err, req, res, next) =>{
    if(err.name ==='UnauthorizedError'){
        res.status(401).json({'error' : err.name + ':' + err.message})
    }
})

export default app;

