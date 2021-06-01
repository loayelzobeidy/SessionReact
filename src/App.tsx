import "./styles.css";
import SessionEditor from "./components/SessionEditor";
import SessionList from "./components/SessionList";
import Session from './types/Session'
import {GetSessions} from './utils/StorageManager'
import {useState} from 'react'
import { Button } from "antd";

export default function App() {
  let sessionList:Session[] = GetSessions();
  let tempSession:Session = {id:"",title:"",date:new Date,notes:"",checkPoints:[]}
  const [sessions,setSessions] = useState<{sessions:Session[],selectedSession:Session,create:boolean}>({sessions:sessionList,selectedSession:tempSession,create:true});
  
  const    submit = ()=>{
    const newList:Session[] = GetSessions();
    setSessions({
       ...sessions,
      sessions:newList
    });   
  }
  const    setSelected = (session:Session)=>{
    setSessions({
       ...sessions,
       selectedSession:session,
       create:false
    });   
    
  }

  const createNewSession = ()=>{
    const clearedSession ={id:"",title:"",date:new Date(),notes:"",checkPoints:[]}
    setSessions({
      ...sessions,
      selectedSession:clearedSession,
      create:true
   }); 
  }
  return <div className="App">
  <SessionEditor 
 session =  {sessions.selectedSession}
 create = {sessions.create}
 submit = {submit}
   /> 
   <SessionList 
 sessions =  {sessions.sessions}
 submit = {submit}
 select = {setSelected}
   /> 
   <Button color='primary' onClick={createNewSession}> Create a new Session</Button>
    
  </div>;
}
