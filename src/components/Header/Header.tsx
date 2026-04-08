import { useNavigate } from "react-router-dom";
import { HeaderContainer, Brand, Navigation } from "./styles";
import { FaHome, FaPhoneAlt } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Brand>School Management</Brand>

      <Navigation>
        <div onClick={() => navigate("/dashboard")}>
          <FaHome />
          <a>Home</a>
        </div>

        <div onClick={() => navigate("/dashboard")}>
          <FaPhoneAlt />
          <a>Contact</a>
        </div>

      </Navigation>
    </HeaderContainer>
  );
}

export default Header;