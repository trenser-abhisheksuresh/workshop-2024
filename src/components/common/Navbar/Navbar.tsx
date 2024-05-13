import { useNavigate } from "react-router-dom";

import "./Navbar.css";
import HomeIcon from "../../../assets/Home.svg";
import SignOutIcon from "../../../assets/SignOut.svg";
import { INavItemButton } from "./NavbarTypes";

export default function Navbar() {

    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
    };

    const handleHomeButtonClick = () => {
        navigate("/");
    };

    const NavItemButton = ({ text, iconSrc, handleClick }: INavItemButton) => {
        return (
            <button className="nav-item-button" onClick={handleClick}>
                <img className="icon" src={iconSrc} />
                {text !== "" && <span>{text}</span>}
            </button>
        );
    };

    return (
        <nav className="navbar-container">
            <NavItemButton text="Workshop 2024" handleClick={handleHomeButtonClick} iconSrc={HomeIcon} />
            <NavItemButton handleClick={handleSignOut} iconSrc={SignOutIcon} />
        </nav>
    );
}
