import logo from "/logo.png";
import "./Header.css";

/**
 * Header component that displays the Stackline logo.
 */
export function Header() {
  return (
    <div id="header">
      <img src={logo} alt="stackline-logo" />
    </div>
  );
}
