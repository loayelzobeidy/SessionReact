import React from "react";
import "../App.css";
import Session from "../types/Session";
import { GetSessions,SaveSessions } from "../utils/StorageManager";
import 'antd/dist/antd.css';
import {v4 as uuidv4} from 'uuid';
import {  Form, Input, Button, DatePicker} from 'antd';
import CheckpointsEditor from './CheckpointsEditor'
import moment from 'moment'


interface Props {
  session: Session;
  create:boolean
  submit: () => void;
}

const SessionEditor = ({ session,create, submit }: Props) => {
  const layout = {
    labelCol: {
      span: 10
      
    },
    wrapperCol: {
      span: 4
    }
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 8
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  let add = ()=>{

  }
  let remove = (Task:String)=>{

  }
  const [ form ] = Form.useForm()
  form.setFieldsValue({title:session.title,notes:session.notes,date:moment(session.date)})
  console.log("session editor", session);
  const onFinish = (values:any) => {    
    let uuid;
    let currentSessions =GetSessions();
    if(create)
    {
      uuid = uuidv4();
      let newSession = {id:uuid,title:values.title,date:values.date,notes:values.notes,checkPoints:values.checkpoints}
      currentSessions.push(newSession)
    }
    else{
       currentSessions.forEach(
         (currentSession,index)=>{
           if(currentSession.id === session.id){
             currentSessions[index].title= values.title
             currentSessions[index].date= values.date
             currentSessions[index].notes= values.notes

           }
         }
       );
  }
  SaveSessions(currentSessions);
  submit();
};
let renderTitle =()=>{
  if(create)
     return <label>Create a new Session</label>;
  return <label>Edit the session</label>;
}
    return <div className="sessionForm">
    {renderTitle()}
    <Form
    {...layout}
    form={form}
        name="basic"
        onFinish={onFinish}
        className = "formCreate"
        >
         <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please Choose a title for the session ',
            },
          ]}
        >
          <Input  defaultValue={session.title}/>
        </Form.Item>
  
        <Form.Item
          label="Date"
          name="date"
        >
         <DatePicker />
        </Form.Item>
  
  
        <Form.Item
          label="Notes"
          name="notes"
        >
          <Input defaultValue={session.notes}/>
        </Form.Item>

  {/* <CheckpointsEditor checkpoints={session.checkPoints}></CheckpointsEditor> */}
  <Form.Item {...tailLayout}
  >
     <Button type="primary"color="success" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
  </Form>;
  </div>
};

export default SessionEditor;
