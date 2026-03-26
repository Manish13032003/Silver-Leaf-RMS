import { ShoppingBag, IndianRupee, Clock, UtensilsCrossed, Package, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";
import { dashboardStats, orders, inventoryItems } from "@/data/restaurant";
import StatusBadge from "@/components/common/StatusBadge";

const Dashboard = () => {
  const recentOrders = orders.slice(0, 5);
  const lowStockCount = inventoryItems.filter((i) => i.quantity <= i.minStock).length;

  return (
    <AppLayout>
      <PageHeader title="Dashboard" subtitle="Welcome back! Here's your Silver Leaf overview." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Orders" value={dashboardStats.totalOrders} icon={ShoppingBag} trend="+12% from yesterday" index={0} />
        <StatCard title="Revenue" value={`₹${dashboardStats.totalRevenue.toLocaleString()}`} icon={IndianRupee} trend="+8% from yesterday" index={1} />
        <StatCard title="Active Orders" value={dashboardStats.activeOrders} icon={Clock} index={2} />
        <StatCard title="Low Stock Items" value={lowStockCount} icon={Package} trend={lowStockCount > 0 ? "Needs attention" : "All stocked"} index={3} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 rounded-xl border border-border bg-card shadow-card"
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Recent Orders</h2>
            <span className="text-xs text-muted-foreground">{orders.length} total</span>
          </div>
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-muted/20">
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 font-body text-xs font-bold text-primary">
                    T{order.tableNumber}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.id} · {order.items.length} items</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={order.status} />
                  <p className="font-display text-base font-semibold text-foreground">₹{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-border bg-card shadow-card p-6 space-y-5"
        >
          <h2 className="font-display text-lg font-semibold text-foreground">Performance</h2>
          {[
            { label: "Avg Order Value", value: `₹${Math.round(dashboardStats.totalRevenue / dashboardStats.totalOrders)}`, icon: TrendingUp, color: "text-primary" },
            { label: "Menu Items", value: dashboardStats.menuItems, icon: UtensilsCrossed, color: "text-accent" },
            { label: "Completion Rate", value: "87%", icon: Clock, color: "text-success" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
