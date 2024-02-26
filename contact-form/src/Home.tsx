import {
  Button,
  Form,
  Input,
  DatePicker,
  Radio,
  Select,
  RadioChangeEvent,
  Spin,
  Row,
  Col,
} from "antd";
import { useState } from "react";
import "./Home.css";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;
type ContactType = boolean | "phone" | "email";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not valid!",
    number: "${label} is not a valid number!",
    numberLength: "${label} is not a valid number!",
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
      dateOfBirthPicker: values.dateOfBirth,
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
      email: values.contactType === "email" ? values.user.email : "",
      phone: values.contactType === "phone" ? values.phone : "",
      prefix: values.contactType === "phone" ? values.prefix : "",
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
      <h1>Contact form</h1>

      <Form
        style={{ marginLeft: "15%", marginRight: "15%" }}
        layout="vertical"
        initialValues={{
          contactType: contactType,
          prefix: prefixSelector.props.children.props.children[0].props.value,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Row justify="space-evenly" gutter={[24, 12]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="First name"
              name="fname"
              rules={[{ required: true, message: validateMessages.required }]}
            >
              <Input placeholder="First name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Last name"
              name="lname"
              rules={[{ required: true, message: validateMessages.required }]}
            >
              <Input placeholder="Last name" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-between" gutter={[24, 12]}>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Form.Item
              label="Date of birth"
              name="dateOfBirth"
              rules={[{ required: true, message: validateMessages.types.date }]}
            >
              <DatePicker format={"DD/MM/YYYY"} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Form.Item label="Contact Type" name="contactType">
              <Radio.Group
                onChange={onChangeContactType}
                style={{ width: "100%" }}
              >
                <Radio.Button value="phone" style={{ width: "50%" }}>
                  phone
                </Radio.Button>
                <Radio.Button value="email" style={{ width: "50%" }}>
                  email
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            {contactType === "phone" ? (
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: validateMessages.types.number },
                  { min: 6, message: validateMessages.types.numberLength },
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
          </Col>
        </Row>
        <Row justify="center" gutter={[24, 12]}>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: 75 }}>
                Submit
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="default" htmlType="reset" style={{ width: 75 }}>
                Clear
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
export default Home;
