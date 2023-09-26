import React from "react";
import { useDisconnect } from "@thirdweb-dev/react";
import { Route } from "react-router-dom";
import { Home } from ".";
const Logout = () => {
  const disconnect = useDisconnect();
  disconnect();
  <Route path="/" element={<Home />}></Route>;
  return;
};

export default Logout;
