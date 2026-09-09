interface StatusMessageProps {
  type: "loading" | "error" | "empty";
  title: string;
  message?: string;
  action?: React.ReactNode;
}

export default function StatusMessage({
  type,
  title,
  message,
  action,
}: StatusMessageProps) {
  return (
    <div className={`status-card ${type}`}>
      <div className="status-icon">
        {type === "loading" && <span className="spinner" />}
        {type === "error" && "!"}
        {type === "empty" && "∅"}
      </div>
      <div>
        <h3>{title}</h3>
        {message && <p>{message}</p>}
        {action && <div className="status-action">{action}</div>}
      </div>
    </div>
  );
}