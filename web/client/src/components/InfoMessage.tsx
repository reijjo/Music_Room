import { InfoMsg } from "../utils/types";

const infoStyles = {
  container: {
    border: "4px solid",
    borderRadius: "5px",
    width: "min-content",
    padding: "0.5rem 1rem",
    backgroundColor: "var(--white)",
  },
};

const InfoMessage = (info: InfoMsg) => {
  if (!info.message || !info) {
    return null;
  }
  return (
    <div style={infoStyles.container} className={info.style}>
      {info.message}
    </div>
  );
};

export default InfoMessage;
