import { useState } from "react";
import { motion } from "framer-motion";
import { Package, AlertTriangle, Search, Plus } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/common/PageHeader";
import { inventoryItems as initialItems } from "@/data/restaurant";
import { InventoryItem } from "@/types/restaurant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const InventoryPage = () => {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Grains", quantity: "", unit: "kg", minStock: "", supplier: "" });

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  const lowStock = items.filter((i) => i.quantity <= i.minStock);

  const handleAdd = () => {
    if (!form.name || !form.quantity) return;
    const newItem: InventoryItem = {
      id: `INV-${String(items.length + 1).padStart(3, "0")}`,
      name: form.name,
      category: form.category,
      quantity: Number(form.quantity),
      unit: form.unit,
      minStock: Number(form.minStock) || 5,
      lastRestocked: new Date().toISOString().split("T")[0],
      supplier: form.supplier,
    };
    setItems([...items, newItem]);
    setDialogOpen(false);
    setForm({ name: "", category: "Grains", quantity: "", unit: "kg", minStock: "", supplier: "" });
    toast.success("Inventory item added!");
  };

  const restock = (id: string) => {
    setItems(items.map((i) => i.id === id ? { ...i, quantity: i.quantity + 20, lastRestocked: new Date().toISOString().split("T")[0] } : i));
    toast.success("Stock restocked +20 units!");
  };

  return (
    <AppLayout>
      <PageHeader
        title="Inventory"
        subtitle="Track ingredients, supplies and stock levels."
        action={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-primary-foreground shadow-gold hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-display">Add Inventory Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 bg-muted border-border" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Quantity</Label><Input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="mt-1 bg-muted border-border" /></div>
                  <div><Label>Unit</Label><Input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="mt-1 bg-muted border-border" /></div>
                </div>
                <div><Label>Min Stock Level</Label><Input type="number" value={form.minStock} onChange={(e) => setForm({ ...form, minStock: e.target.value })} className="mt-1 bg-muted border-border" /></div>
                <div><Label>Supplier</Label><Input value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} className="mt-1 bg-muted border-border" /></div>
                <Button onClick={handleAdd} className="w-full gradient-primary text-primary-foreground shadow-gold hover:opacity-90">Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      {lowStock.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 flex items-center gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <p className="text-sm text-warning"><span className="font-semibold">{lowStock.length} item(s)</span> are at or below minimum stock level.</p>
        </motion.div>
      )}

      <div className="mb-6 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-card border-border pl-10" />
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="px-5 py-3.5 text-left font-medium text-muted-foreground">Item</th>
              <th className="px-5 py-3.5 text-left font-medium text-muted-foreground">Category</th>
              <th className="px-5 py-3.5 text-center font-medium text-muted-foreground">Stock</th>
              <th className="px-5 py-3.5 text-left font-medium text-muted-foreground">Supplier</th>
              <th className="px-5 py-3.5 text-left font-medium text-muted-foreground">Last Restocked</th>
              <th className="px-5 py-3.5 text-right font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((item, i) => (
              <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{item.category}</td>
                <td className="px-5 py-4 text-center">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${item.quantity <= item.minStock ? "bg-destructive/10 text-destructive border-destructive/30" : "bg-success/10 text-success border-success/30"}`}>
                    {item.quantity} {item.unit}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{item.supplier}</td>
                <td className="px-5 py-4 text-muted-foreground">{item.lastRestocked}</td>
                <td className="px-5 py-4 text-right">
                  <button onClick={() => restock(item.id)} className="rounded-lg px-3 py-1.5 text-xs font-medium gradient-primary text-primary-foreground shadow-gold hover:opacity-90 transition-opacity">
                    Restock
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default InventoryPage;
