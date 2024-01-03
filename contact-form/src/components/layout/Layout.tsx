import React, { ReactNode } from "react";
import NavigationMenu from "../../NavigationMenu";

const Layout = ({ children }: { children: ReactNode }) => {
  console.log("children", children);
  return (
    <>
      <NavigationMenu />
      <main> {children}</main>
    </>
  );
};

export default Layout;
