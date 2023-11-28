import {
  Button,
  Form,
  Input,
  DatePicker,
  Radio,
  Select,
  RadioChangeEvent,
  Spin,
} from "antd";
import { useState } from "react";
import "./Home.css";
import { v4 as uuidv4 } from "uuid";
import NavigationMenu from "./NavigationMenu";

const { Option } = Select;
type ContactType = boolean | "phone" | "email";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not valid!",
    number: "${label} is not a valid number!",
    date: "${label} is not a valid date!",
  },
};

const Home = ({ contacts, setContacts }: any) => {
  const [contactType, setContactType] = useState<ContactType>("phone");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onChangeContactType = (e: RadioChangeEvent) => {
    setContactType(e.target.value);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="385">+385</Option>
        <Option value="93">+93</Option>
        <Option value="355">+355</Option>
        <Option value="213">+213</Option>
        <Option value="376">+376</Option>
      </Select>
    </Form.Item>
  );

  function onFinish(values: any): void {
    setLoading(true);
    const contact = {
      key: uuidv4(),
      fname: values.fname,
      lname: values.lname,
      dateOfBirth:
        values.dateOfBirth.$D +
        "." +
        (values.dateOfBirth.$M + 1) +
        "." +
        values.dateOfBirth.$y +
        ".",
      contact:
        values.contactType === "email"
          ? values.user.email
          : "+" + values.prefix + values.phone,
    };
    setContacts([...contacts, contact]);
    form.resetFields();
    setLoading(false);
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Spin spinning={loading}>
      <NavigationMenu />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        initialValues={{
          contactType: contactType,
          prefix: prefixSelector.props.children.props.children[0].props.value,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item label="Contact Form"></Form.Item>
        <Form.Item
          label="First name"
          name="fname"
          rules={[{ required: true, message: validateMessages.required }]}
        >
          <Input placeholder="First name" />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lname"
          rules={[{ required: true, message: validateMessages.required }]}
        >
          <Input placeholder="Last name" />
        </Form.Item>
        <Form.Item
          label="Date of birth"
          name="dateOfBirth"
          rules={[{ required: true, message: validateMessages.types.date }]}
        >
          <DatePicker format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item label="Contact Type" name="contactType">
          <Radio.Group onChange={onChangeContactType}>
            <Radio.Button value="phone">phone</Radio.Button>
            <Radio.Button value="email">email</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          {contactType === "phone" ? (
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: validateMessages.types.number },
              ]}
            >
              <Input
                type="number"
                addonBefore={prefixSelector}
                style={{ width: "100%" }}
                placeholder="Phone number"
              />
            </Form.Item>
          ) : (
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: validateMessages.types.email,
                },
              ]}
            >
              <Input placeholder="example@mail.com" />
            </Form.Item>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="reset">
            Clear
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};
export default Home;
