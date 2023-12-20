import { Table, Modal, Input, Form, DatePicker, Select, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import NavigationMenu from "./NavigationMenu";
import moment from "moment";
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
          if (values.dateOfBirth?._d) {
            editingContact.dateOfBirth = values.dateOfBirth._d
              .toLocaleString("hr", { timeZone: "CET" })
              .slice(0, 13)
              .split(" ")
              .join("");
            editingContact.day = editingContact.dateOfBirth.slice(0, 2);
            editingContact.month = editingContact.dateOfBirth.slice(3, 5);
            editingContact.year = editingContact.dateOfBirth.slice(6, 10);
          } else {
            editingContact.dateOfBirth =
              (values.dateOfBirth.$D < 10
                ? "0" + values.dateOfBirth.$D
                : values.dateOfBirth.$D) +
              "." +
              (values.dateOfBirth.$M + 1 < 10
                ? "0" + (values.dateOfBirth.$M + 1)
                : values.dateOfBirth.$M + 1) +
              "." +
              values.dateOfBirth.$y +
              ".";
            editingContact.day = values.dateOfBirth.$D;
            editingContact.month = values.dateOfBirth.$M + 1;
            editingContact.year = values.dateOfBirth.$y;
          }

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
    dateOfBirth: moment(
      editingContact?.month +
        "." +
        editingContact?.day +
        "." +
        editingContact?.year
    ),
    email: editingContact?.email,
    phone: editingContact?.phone,
    prefix: editingContact?.prefix,
  });

  return (
    <div>
      <NavigationMenu />
      <h1>ContactInfo</h1>
      <Table
        style={{ marginLeft: "5%", marginRight: "5%" }}
        dataSource={contacts}
        columns={columns}
      />
      <Modal
        title="Edit Contact"
        open={isEditing}
        onCancel={() => resetEditing()}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="First name"
            name="fname"
            rules={[{ required: true, message: validateMessages.required }]}
          >
            <Input value={editingContact?.fname} placeholder="First name" />
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={() => resetEditing()}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContactInfo;
