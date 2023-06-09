if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
    }
    const express = require('express')
    const connectToDb = require('./config/connectToDb')
    const server = express();
    const bodyParser = require('body-parser')
    const cookieParser = require('cookie-parser')
    const path = require('path');

    connectToDb();
    const cors = require('cors')
    server.use(bodyParser.urlencoded({extended:false}))
    server.use(express.json());
    server.use(cors({
        origin:true,
        credentials:true
    }));
    
    server.use(cookieParser())
    
    server.use((req,res,next)=>{
        const {method,url} = req;
        console.log(`req for url ${url} and using method ${method}`);
        next();
    })
    server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    server.use("/users",require('./routes/Usersroute'));
    server.use("/company",require('./routes/Companyroute'));
    
    server.use("/match",require('./routes/Matchrout'));
    server.use("/worker",require('./routes/Workerrout'));
    server.listen(process.env.PORT,()=>{
        console.log(`server opening with port 5656`);
    })