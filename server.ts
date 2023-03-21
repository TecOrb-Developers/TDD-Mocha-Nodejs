import express  from "express";
const app = express();
import apiRouter from './src/routes'
import {  } from './src/database/database/index';
import exp from "constants";
import {connect} from './src/database/database/index'
connect();
// Common middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cookieParser());
const PORT  = process.env.port || 2002;
app.use('/api/v1',apiRouter)
app.get("/",(req,res) =>res.send("Hello from server"));
app.listen(PORT,()=>console.log(`Server is runing here https://localhost:${PORT}`))

export default app