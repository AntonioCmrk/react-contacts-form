import { Menu } from "antd";
import {
  FormOutlined,
  UnorderedListOutlined,
  PoweroffOutlined,
} from "@ant-design/icons/lib/icons";
import { useNavigate } from "react-router-dom";
const NavigationMenu = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Menu
        mode="horizontal"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        onClick={({ key }) => {
          if (key === "signout") {
            localStorage.removeItem("user");
            navigate("/login");
          } else {
            navigate(key);
          }
        }}
        defaultSelectedKeys={[window.location.pathname]}
        items={[
          { label: "Contact form", icon: <FormOutlined />, key: "/home" },
          {
            label: "Contact info",
            icon: <UnorderedListOutlined />,
            key: "/contact-info",
          },
          {
            label: "Sign out",
            icon: <PoweroffOutlined />,
            key: "signout",
            danger: true,
          },
        ]}
      />
    </div>
  );
};

export default NavigationMenu;
