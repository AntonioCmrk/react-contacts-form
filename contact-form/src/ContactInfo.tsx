import { Table, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import NavigationMenu from "./NavigationMenu";

const ContactInfo = ({ contacts, setContacts }: any) => {
  const [isEditing, setIsEditing] = useState(false);
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
      // render: (record: any) => {
      //   <>
      //     <EditOutlined onClick={() => onEditContact(record)} />
      //     <DeleteOutlined
      //       onClick={() => onDeleteContact(record)}
      //       style={{ color: "red", marginLeft: 12 }}
      //     />
      //   </>;
      // },
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
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingContact(null);
  };
  return (
    <div>
      <NavigationMenu />
      ContactInfo
      <Table dataSource={contacts} columns={columns} />
      <Modal
        title="Edit Contact"
        visible={isEditing}
        okText="Save"
        onCancel={() => resetEditing()}
        onOk={() => {
          setContacts((prev: any) => {
            return prev.map((contact: any) => {
              if (contact.key === editingContact.key) {
                return editingContact;
              } else {
                return contact;
              }
            });
          });
          resetEditing();
        }}
      >
        <Input
          value={editingContact?.fname}
          onChange={(e) => {
            setEditingContact((prev: any) => {
              return { ...prev, fname: e.target.value };
            });
          }}
        ></Input>
        {/* <Input value={editingContact?.lname}></Input>
        <Input value={editingContact?.dateOfBirth}></Input>
        <Input value={editingContact?.contact}></Input> */}
      </Modal>
    </div>
  );
};

export default ContactInfo;
