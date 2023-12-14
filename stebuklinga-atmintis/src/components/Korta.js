import "./korta.css";

export default function Korta({
  korta,
  handlePasirinkimas,
  flipped,
  disabled,
}) {
  const handleClick = () => {
    if (!disabled) {
      handlePasirinkimas(korta);
    }
  };

  return (
    <div className="korta">
      <div className={flipped ? "flipped" : ""}>
        <img src={korta.src} className="priekis" alt="kortos priekinė pusė" />
        <img
          src="/img/cover.webp"
          className="nugara"
          alt="kortos nugarinė pusė"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
