import {
  Table,
  Modal,
  Input,
  Form,
  DatePicker,
  Select,
  Button,
  Row,
  Col,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Option } = Select;

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not valid!",
    number: "${label} is not a valid number!",
    date: "${label} is not a valid date!",
  },
};

const ContactInfo = ({ contacts, setContacts }: any) => {
  const [form] = Form.useForm();
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

  const [isEditing, setIsEditing] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [editingContact, setEditingContact] = useState<any>(null);

  const columns = [
    {
      title: "First name",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "Last name",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      key: "actions",
      title: "Actions",
      render: (record: any) => (
        <>
          <EditOutlined
            onClick={() => {
              onEditContact(record);
            }}
          />
          <DeleteOutlined
            onClick={() => onDeleteContact(record)}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];

  const onDeleteContact = (record: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete this contact?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setContacts((prev: any) => {
          return prev.filter((contact: any) => contact.key !== record.key);
        });
      },
    });
  };

  const onEditContact = (record: any) => {
    setIsEditing(true);
    setEditingContact({ ...record });
    record?.contact.includes("@") ? setIsEmail(true) : setIsEmail(false);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingContact(null);
  };

  function onFinish(values: any): void {
    setContacts((prev: any) => {
      return prev.map((contact: any) => {
        if (contact.key === editingContact.key) {
          editingContact.fname = values.fname;
          editingContact.lname = values.lname;
          editingContact.dateOfBirthpicker = values.dateOfBirth;
          editingContact.dateOfBirth =
            values.dateOfBirth.$D +
            "." +
            (values.dateOfBirth.$M + 1) +
            "." +
            values.dateOfBirth.$y +
            ".";

          if (isEmail) {
            editingContact.contact = values.email;
          } else {
            editingContact.contact = "+" + values.prefix + values.phone;
            editingContact.phone = values.phone;
            editingContact.prefix = values.prefix;
          }

          return editingContact;
        } else {
          return contact;
        }
      });
    });
    resetEditing();
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  form.setFieldsValue({
    fname: editingContact?.fname,
    lname: editingContact?.lname,
    dateOfBirth: editingContact?.dateOfBirthPicker,
    email: editingContact?.email,
    phone: editingContact?.phone,
    prefix: editingContact?.prefix,
  });

  return (
    <div>
      <h1>ContactInfo</h1>
      <Row justify="center">
        <Col span={20}>
          <Table dataSource={contacts} columns={columns} />
        </Col>
      </Row>
      <Modal
        title="Edit Contact"
        open={isEditing}
        onCancel={() => resetEditing()}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row justify="center" gutter={[24, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Form.Item
                label="First name"
                name="fname"
                rules={[{ required: true, message: validateMessages.required }]}
                style={{ width: "100%" }}
              >
                <Input value={editingContact?.fname} placeholder="First name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Form.Item
                label="Last name"
                name="lname"
                rules={[{ required: true, message: validateMessages.required }]}
              >
                <Input placeholder="Last name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Form.Item
                label="Date of birth"
                name="dateOfBirth"
                rules={[
                  { required: true, message: validateMessages.types.date },
                ]}
              >
                <DatePicker format={"DD/MM/YYYY"} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              {isEmail ? (
                <Form.Item
                  name="email"
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
              ) : (
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
              )}
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
              <Form.Item>
                <Button type="default" onClick={() => resetEditing()}>
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ContactInfo;
