export default function Die({ value, holdDice, isHeld }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };
  return (
    <div className={"die-face"} style={styles} onClick={holdDice}>
      {value === 1 && (
        <div className={`__${value}`}>
          <span className={"dot"}></span>
        </div>
      )}
      {value === 2 && (
        <div className={`__${value}`}>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      )}
      {value === 3 && (
        <div className={`__${value}`}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      )}
      {value === 4 && (
        <div className={`__${value}`}>
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}
      {value === 5 && (
        <div className={`__${value}`}>
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

          <div className="column">
            <span className="dot"></span>
          </div>

          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}
      {value === 6 && (
        <div className={`__${value}`}>
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}
    </div>
  );
}
