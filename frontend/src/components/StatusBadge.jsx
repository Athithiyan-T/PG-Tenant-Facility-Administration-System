export default function StatusBadge({ status }) {
  const cls =
    status === "Resolved"
      ? "badge badgeResolved"
      : status === "In Progress"
        ? "badge badgeInProgress"
        : "badge badgePending";
  return <span className={cls}>{status || "Pending"}</span>;
}

