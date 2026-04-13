import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaBook,
  FaFileAlt,
  FaClipboardList,
  FaSignOutAlt,
  FaCalendarAlt,
  FaUser
} from "react-icons/fa";

import {
  ActionList,
  LogoutAction,
  SidebarContainer,
  SidebarItem
} from "./styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../Loading/Loagind";


function Sidebar() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setIsLoading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ refreshToken })
      });

      if (!response.ok) {
        console.error("Erro ao deslogar no servidor");
      }

    } catch (error) {
      console.error("Falha na rede ao tentar deslogar", error);

    } finally {
      localStorage.clear();
      navigate("/login");
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loading />}

      <SidebarContainer>
        <ActionList>
          <SidebarItem onClick={() => navigate("/students")} >
            <FaUserGraduate />
            <span>Students</span>
          </SidebarItem>

          <SidebarItem onClick={() => navigate("/professors")}>
            <FaChalkboardTeacher />
            <span>Professors</span>
          </SidebarItem>

          <SidebarItem onClick={() => navigate("/classrooms")}>
            <FaSchool />
            <span>Classrooms</span>
          </SidebarItem>

          <SidebarItem onClick={() => navigate("/subjects")}>
            <FaBook />
            <span>Subjects</span>
          </SidebarItem>

          <SidebarItem onClick={() => navigate("/enrollments")}>
            <FaClipboardList />
            <span>Enrollments</span>
          </SidebarItem>

          <SidebarItem onClick={() => navigate("/assessments")}>
            <FaFileAlt />
            <span>Assessments</span>
          </SidebarItem>

          <SidebarItem onClick={() => navigate("/school-years")}>
            <FaCalendarAlt />
            <span>School Year</span>
          </SidebarItem>

          <SidebarItem onClick={() => navigate("/users")}>
            <FaUser />
            <span>Users</span>
          </SidebarItem>
        </ActionList>

        

        <LogoutAction>
          <SidebarItem onClick={logout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </SidebarItem>
        </LogoutAction>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;