export default function Button({ variant = "primary", children, onClick }) {
  const base = "btn";
  const style =
    variant === "outline" ? "btn-outline" : "btn-primary";
  return (
    <button className={`${base} ${style}`} onClick={onClick}>
      {children}
    </button>
  );
}
