import React from "react";
import "../App.css"
import Session from "../types/Session";
import {Table, Space} from 'antd';
import {DeleteSession} from '../utils/StorageManager'

const { Column,} = Table;

interface Props {
    sessions: Session[];
    submit: () => void;
    select: (session:Session) => void;

  }

  
const SessionList = ({ sessions, submit,select}: Props)=> {
    
  const deleteHandler = (record:any) => {
    console.log("recor",record);
    
    console.log("Delete the session");
    DeleteSession(record)
    submit();
    
};

const editHandler = (record:any) => {
  console.log("update the sessionn")
  select(record);
}

  const items = sessions

  return <div className="todo-container">
      <Table dataSource={sessions}>
      <Column title="Id" dataIndex="id" key="id" />
      <Column title="Title" dataIndex="title" key="title" />
    <Column title="date" dataIndex="date" key="date" />
    <Column title="notes" dataIndex="notes" key="notes" />

  
    <Column
      title="Edit"
      key="edit"
      render={(text, record) => (
        <Space size="middle">
           <a onClick={() => editHandler(record)}>Edit</a>
        </Space>
      )}
    />
     <Column
      title="Delete"
      key="action"
      render={(text, record) => (
        <Space size="middle">
          <a onClick={() => deleteHandler(record)}>Delete</a>
        </Space>
      )}
    />
  </Table>
</div>
};

export default SessionList;
