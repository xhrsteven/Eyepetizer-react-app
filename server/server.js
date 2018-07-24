import config from './../config/config';
import app from './express';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise
mongoose.connect(config.mongoURI)
mongoose.connection.on('err', ()=>{
    throw new Error(`Unable to connect to database ${mongoURI}`)
})

app.listen(config.port, (err)=>{
    if (err) throw err;
    console.log('http://localhost:'+config.port);
})