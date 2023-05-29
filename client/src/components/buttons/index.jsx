import React, { useEffect } from "react";

export default function RippleButton({ title, className }) {
  const [ripple, setRipple] = React.useState(true);
  const [cords, setCords] = React.useState({ x: -1, y: -1 });

  const handleRipple = (e) => {
    const button = e.currentTarget;
    setCords({
      x: e.clientX - e.target.offsetLeft,
      y: e.clientY - e.target.offsetTop,
    });
  };

  useEffect(() => {
    if (cords.x !== -1 && cords.y !== -1) {
      setRipple(true);

      setTimeout(() => {
        setRipple(false);
        setCords({ x: -1, y: -1 });
      }, 300);
    } else {
      setRipple(false);
    }
  }, [cords]);



  return (
    <button className={className} id="ripple__btn" onClick={handleRipple}>
      {ripple && (
        <span
          className="ripple__effect"
          style={{
            left: cords.x,
            top: cords.y,
          }}
        ></span>
      )}
      <span className="ripple__btn__content">{title}</span>
    </button>
  );
}
