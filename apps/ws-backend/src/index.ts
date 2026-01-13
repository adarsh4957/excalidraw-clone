import { WebSocketServer } from 'ws';
import jwt from "jsonwebtoken"
import { JWT_SECRET } from './config';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,request) {
  const url=request.url;
  if(!url){
    return;
  }
  const tokenurl=new URLSearchParams(url.split('?')[1]);
  const token=tokenurl.get("token") ?? "";
  const decoded=jwt.verify(token,JWT_SECRET)

  //@ts-ignore
  if(!decoded || !decoded.userId){
    ws.close();
    return;
  }

  ws.on('message', function message(data) {
  ws.send('ping');
});

  
});