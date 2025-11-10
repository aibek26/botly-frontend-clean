export default function Card({ title, children }) {
  return (
    <div className="card p-5 mb-4">
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      {children}
    </div>
  );
}
