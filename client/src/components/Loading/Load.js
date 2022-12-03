const Load = ({ size }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <i className="rotate-small fa-solid fa-spinner"></i>
    </div>
  );
};

export default Load;
