import React from "react";
const Banner = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <img
          src="https://res.cloudinary.com/jllacson/image/upload/v1639601754/sampleShop/3125988_bevrj5.jpg"
          alt=""
          style={{ width: "50%" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "475px",
            marginTop: "20px",
          }}
        >
          <h1 style={{ fontWeight: "bold" }}>WRITE WITHOUT A PEN</h1>
          <p>Let the world know your story anytime, anywhere.</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
