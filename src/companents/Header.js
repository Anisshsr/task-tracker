import Button from "./Button";
import { useLocation } from "react-router";

const Header = ({ onAdd, showadd }) => {
  const location = useLocation()
  return (
    <header className="header">
      <h1>Task Tracker </h1>
      {location.pathname ==='/' && <Button
        color={showadd ? "#ff531a" : "#00cc00"}
        text={showadd ? "Close" : "Add"}
        onClick={onAdd}
      />}
    </header>
  );
};

export default Header;
