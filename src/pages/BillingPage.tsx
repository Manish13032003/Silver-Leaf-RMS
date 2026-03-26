import { useState } from "react";
import { motion } from "framer-motion";
import { Printer, CheckCircle } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/common/PageHeader";
import { orders } from "@/data/restaurant";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TAX_RATE = 0.05;

const BillingPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);

  const subtotal = selectedOrder.total;
  const tax = Math.round(subtotal * TAX_RATE);
  const grandTotal = subtotal + tax;

  return (
    <AppLayout>
      <PageHeader title="Billing" subtitle="Generate and manage customer bills." />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Select Order</h3>
          {orders.map((order) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`w-full rounded-xl border p-4 text-left transition-all ${
                selectedOrder.id === order.id
                  ? "border-primary bg-primary/10 shadow-gold"
                  : "border-border bg-card hover:border-primary/30 hover:shadow-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{order.customerName}</p>
                  <p className="text-sm text-muted-foreground">{order.id} · Table {order.tableNumber}</p>
                </div>
                <p className="font-display text-lg font-bold text-primary">₹{order.total}</p>
              </div>
            </button>
          ))}
        </div>

        <motion.div
          key={selectedOrder.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 rounded-xl border border-border bg-card shadow-card overflow-hidden"
        >
          <div className="border-b border-border px-8 py-6 gradient-primary">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-primary-foreground">Invoice</h2>
                <p className="text-primary-foreground/70 text-sm">{selectedOrder.id}</p>
              </div>
              <div className="text-right text-primary-foreground">
                <p className="font-display text-lg font-bold">Silver Leaf</p>
                <p className="text-sm text-primary-foreground/70">Restaurant Management</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-muted-foreground">Customer</p><p className="font-medium text-foreground">{selectedOrder.customerName}</p></div>
              <div><p className="text-muted-foreground">Table</p><p className="font-medium text-foreground">Table {selectedOrder.tableNumber}</p></div>
              <div><p className="text-muted-foreground">Date</p><p className="font-medium text-foreground">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p></div>
              <div><p className="text-muted-foreground">Time</p><p className="font-medium text-foreground">{new Date(selectedOrder.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p></div>
            </div>

            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Item</th>
                    <th className="px-4 py-3 text-center font-medium text-muted-foreground">Qty</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Price</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {selectedOrder.items.map((oi, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 text-foreground">{oi.menuItem.name}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{oi.quantity}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">₹{oi.menuItem.price}</td>
                      <td className="px-4 py-3 text-right font-medium text-foreground">₹{oi.menuItem.price * oi.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Tax (5%)</span><span>₹{tax}</span></div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="font-display text-xl font-bold text-foreground">Grand Total</span>
                <span className="font-display text-xl font-bold text-primary">₹{grandTotal}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={() => toast.success("Bill printed!")} className="gradient-primary text-primary-foreground shadow-gold hover:opacity-90">
                <Printer className="mr-2 h-4 w-4" /> Print Bill
              </Button>
              <Button onClick={() => toast.success("Payment recorded!")} variant="outline" className="border-success text-success hover:bg-success/10">
                <CheckCircle className="mr-2 h-4 w-4" /> Mark Paid
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default BillingPage;
