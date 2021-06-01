import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input, Button,Switch} from "antd";
import CheckPoint from "../types/CheckPoint";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
  checkpoints: CheckPoint[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 4   },
    sm: { span: 4 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 4, offset: 10 },
    sm: { span: 4, offset: 10 },
  },
};

const CheckpointsEditor = ({ checkpoints }: Props) => {
  const [ Checkpointform ] = Form.useForm()
  const [input, setInput] = React.useState(false);
  const onChange = (values: any) => {
    console.log("Received values of form:", values);

  };

  return (
    <Form
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      form={Checkpointform}
      onChange={onChange}
    >
      <label>Checkpoints: </label>
      <Form.List
        name="names"
      >
        
        {(checkpoints, { add, remove }, { errors }) => (
          <>
            {checkpoints.map((field, index) => (
              <Form.Item
              >
             {console.log("field",field,checkpoints,index)}
                <Form.Item
                  {...field}
                  noStyle
                >
                  <Input
                    placeholder="task name"
                    style={{ width: "60%" }}
                  />
                </Form.Item>
               
                  <Switch
                    checked={input}
                    checkedChildren=""
                    unCheckedChildren="Done"
                    onChange={() => {
                      setInput(!input);
                    }}
                  />                
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name) }
                  />

              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add() }
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default CheckpointsEditor;
