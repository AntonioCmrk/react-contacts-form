import React, { ReactNode } from "react";
import NavigationMenu from "../../NavigationMenu";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {window.location.pathname !== "/login" && <NavigationMenu />}
      <main> {children}</main>
    </>
  );
};

export default Layout;
