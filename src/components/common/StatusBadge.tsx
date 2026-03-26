import { Order } from "@/types/restaurant";

interface StatusBadgeProps {
  status: Order["status"];
}

const statusStyles: Record<Order["status"], string> = {
  pending: "bg-warning/15 text-warning border-warning/30",
  preparing: "bg-info/15 text-info border-info/30",
  served: "bg-primary/15 text-primary border-primary/30",
  completed: "bg-success/15 text-success border-success/30",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
