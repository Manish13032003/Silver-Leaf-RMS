import { motion } from "framer-motion";
import { BarChart3, TrendingUp, DollarSign, ShoppingBag } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";

const weeklyRevenue = [
  { day: "Mon", revenue: 4200 },
  { day: "Tue", revenue: 3800 },
  { day: "Wed", revenue: 5100 },
  { day: "Thu", revenue: 4700 },
  { day: "Fri", revenue: 6200 },
  { day: "Sat", revenue: 7800 },
  { day: "Sun", revenue: 6500 },
];

const categoryBreakdown = [
  { name: "Main Course", value: 42, color: "hsl(160, 45%, 45%)" },
  { name: "Starters", value: 25, color: "hsl(38, 55%, 55%)" },
  { name: "Beverages", value: 18, color: "hsl(210, 60%, 50%)" },
  { name: "Desserts", value: 15, color: "hsl(280, 40%, 55%)" },
];

const monthlyTrend = [
  { month: "Oct", orders: 320, revenue: 89000 },
  { month: "Nov", orders: 380, revenue: 102000 },
  { month: "Dec", orders: 450, revenue: 128000 },
  { month: "Jan", orders: 410, revenue: 115000 },
  { month: "Feb", orders: 390, revenue: 108000 },
  { month: "Mar", orders: 470, revenue: 134000 },
];

const ReportsPage = () => {
  return (
    <AppLayout>
      <PageHeader title="Reports & Analytics" subtitle="Sales performance and restaurant statistics." />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Weekly Revenue" value="₹38,300" icon={DollarSign} trend="+14% vs last week" index={0} />
        <StatCard title="Total Orders" value="312" icon={ShoppingBag} trend="+9% vs last week" index={1} />
        <StatCard title="Avg Order Value" value="₹605" icon={TrendingUp} trend="+5%" index={2} />
        <StatCard title="Top Category" value="Main Course" icon={BarChart3} index={3} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Weekly Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(220, 8%, 50%)" fontSize={12} />
              <YAxis stroke="hsl(220, 8%, 50%)" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "hsl(220, 14%, 10%)", border: "1px solid hsl(220, 12%, 18%)", borderRadius: "8px", color: "hsl(210, 20%, 93%)" }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="hsl(160, 45%, 45%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Sales by Category</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                  {categoryBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(220, 14%, 10%)", border: "1px solid hsl(220, 12%, 18%)", borderRadius: "8px", color: "hsl(210, 20%, 93%)" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 flex-1">
              {categoryBreakdown.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ background: cat.color }} />
                    <span className="text-sm text-foreground">{cat.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Monthly Trend */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Monthly Trend (Orders & Revenue)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 18%)" />
            <XAxis dataKey="month" stroke="hsl(220, 8%, 50%)" fontSize={12} />
            <YAxis yAxisId="left" stroke="hsl(160, 45%, 45%)" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(38, 55%, 55%)" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(220, 14%, 10%)", border: "1px solid hsl(220, 12%, 18%)", borderRadius: "8px", color: "hsl(210, 20%, 93%)" }} />
            <Line yAxisId="left" type="monotone" dataKey="orders" stroke="hsl(160, 45%, 45%)" strokeWidth={2} dot={{ r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="hsl(38, 55%, 55%)" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </AppLayout>
  );
};

export default ReportsPage;
