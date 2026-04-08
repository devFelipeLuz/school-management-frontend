import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaBook,
  FaFileAlt,
  FaClipboardList
} from "react-icons/fa";

import {
  SidebarContainer,
  SidebarItem
} from "./styles";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();


  return (
    <SidebarContainer>
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
    </SidebarContainer>
  );
}

export default Sidebar;