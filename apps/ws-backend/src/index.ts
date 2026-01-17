import { WebSocketServer, WebSocket } from 'ws';
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/back-common/config";

const wss = new WebSocketServer({ port: 8080 });

interface User{
  ws:WebSocket,
  userid:string,
  rooms:string[]
}
const users:User[]=[];

function checkuser(token:string) : string | null{
  const decoded=jwt.verify(token,JWT_SECRET)

  if(typeof decoded == "string"){
    return null;
  }
  if(!decoded || !decoded.userId){
    return null;
  }
  return decoded.userId;
}
wss.on('connection', function connection(ws,request) {
  const url=request.url;
  if(!url){
    return;
  }
  const tokenurl=new URLSearchParams(url.split('?')[1]);
  const token=tokenurl.get("token") ?? "";
  const userId=checkuser(token);
  
  if(!userId){
    ws.close();
    return null;
  }

  users.push({
    userid:userId,
    rooms:[],
    ws
  })

  ws.on('message', function message(data) {
  const parseddata=JSON.parse(data as unknown as string);

  if(parseddata.type === "join_room"){
    const user =users.find(x=>x.ws===ws);
    user?.rooms.push(parseddata.roomId)
  }

  if(parseddata.type==="leave_room"){
    const user=users.find(x=>x.ws===ws)
    if(!user){
      return;
    }
    user.rooms=user.rooms.filter(x=>x ===parseddata.room)
  }
  if(parseddata.type==="chat"){
    const room=parseddata.roomId;
    const message=parseddata.message;
    users.forEach(user=>{
      if(user.rooms.includes(room)){
        user.ws.send(JSON.stringify({
          type:"chat",
          message:message,
          room
        }))
      }
    })
  }
});

  
});