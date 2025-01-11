import logo from "/logo.png";
import "./Header.css";

export function Header() {
  return (
    <div id="header">
      <img src={logo} alt="stackline-logo" />
    </div>
  );
}
