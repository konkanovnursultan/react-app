import { Routes, Route } from "react-router-dom";
import { UserListPage } from "@/pages/user-list";
import { UserEditPage } from "@/pages/user-edit";
import { ScrollToTop } from "./page-scroll/ScrollToTop";

export const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/edit" element={<UserEditPage />} />
      </Routes>
    </>
  );
};
