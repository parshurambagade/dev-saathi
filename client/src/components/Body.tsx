import useUserInfo from "@/hooks/useUserInfo";
import Header from "./layouts/Header";
import { Outlet } from "react-router-dom";

const Body = () => {
  useUserInfo();
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
