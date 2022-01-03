import { relativeTimeRounding } from "moment";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px 0",
      }}>
      <h3>TINY</h3>
      <p style={{ lineHeight: "3px", marginTop: "10px" }}>
        <small>A project by talented developers.</small>
      </p>
    </div>
  );
};

export default Footer;
