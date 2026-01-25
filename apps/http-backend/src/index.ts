import  express  from "express";
import { room, signin, signup,prevchat} from "./user";
import {middleware} from "./middleware";

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/signup",signup)
app.post("/signin",signin)
app.post("/room",middleware,room)
app.get("/chats/:roomid",prevchat)


app.listen(3002);