import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";
import { orders as initialOrders } from "@/data/restaurant";
import { Order } from "@/types/restaurant";
import { toast } from "sonner";

const statusFilters: Array<Order["status"] | "all"> = ["all", "pending", "preparing", "served", "completed"];

const OrdersPage = () => {
  const [ordersList, setOrdersList] = useState(initialOrders);
  const [activeFilter, setActiveFilter] = useState<Order["status"] | "all">("all");

  const filtered = activeFilter === "all" ? ordersList : ordersList.filter((o) => o.status === activeFilter);

  const updateStatus = (id: string, newStatus: Order["status"]) => {
    setOrdersList(ordersList.map((o) => o.id === id ? { ...o, status: newStatus } : o));
    toast.success(`Order ${id} marked as ${newStatus}`);
  };

  const nextStatus: Record<string, Order["status"]> = {
    pending: "preparing",
    preparing: "served",
    served: "completed",
  };

  return (
    <AppLayout>
      <PageHeader title="Orders" subtitle="Track and manage customer orders in real-time." />

      <div className="mb-6 flex gap-2">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setActiveFilter(s)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-all ${activeFilter === s ? "gradient-primary text-primary-foreground shadow-gold" : "bg-card text-muted-foreground border border-border hover:text-foreground"}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-gold hover:border-primary/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-display text-lg font-bold text-primary">
                  T{order.tableNumber}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg font-semibold text-foreground">{order.customerName}</h3>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{order.id} · {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold text-foreground">₹{order.total}</p>
                {nextStatus[order.status] && (
                  <button
                    onClick={() => updateStatus(order.id, nextStatus[order.status])}
                    className="mt-2 rounded-lg px-4 py-1.5 text-sm font-medium gradient-primary text-primary-foreground shadow-gold hover:opacity-90 transition-opacity"
                  >
                    Mark {nextStatus[order.status]}
                  </button>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {order.items.map((oi, j) => (
                <span key={j} className="rounded-lg bg-muted px-3 py-1.5 text-sm text-muted-foreground">
                  {oi.menuItem.name} × {oi.quantity}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
};

export default OrdersPage;
