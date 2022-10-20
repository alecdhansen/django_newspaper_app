import { FaCopyright } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <FaCopyright
        className="copywrite"
        style={{
          color: "rgb(229, 70, 70)",
          backgroundColor: "#FFF",
          borderRadius: "50%",
        }}
      />
      <span>CHATTN NEWS, 2022</span>
    </footer>
  );
}

export default Footer;
