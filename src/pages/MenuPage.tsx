import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/common/PageHeader";
import { menuItems as initialMenuItems } from "@/data/restaurant";
import { MenuItem } from "@/types/restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages"];

const MenuPage = () => {
  const [items, setItems] = useState<MenuItem[]>(initialMenuItems);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState({ name: "", price: "", category: "Starters", description: "" });

  const filtered = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const openAdd = () => {
    setEditItem(null);
    setForm({ name: "", price: "", category: "Starters", description: "" });
    setDialogOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditItem(item);
    setForm({ name: item.name, price: String(item.price), category: item.category, description: item.description });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editItem) {
      setItems(items.map((i) => i.id === editItem.id ? { ...i, ...form, price: Number(form.price) } : i));
      toast.success("Menu item updated!");
    } else {
      const newItem: MenuItem = { id: String(Date.now()), ...form, price: Number(form.price), available: true };
      setItems([...items, newItem]);
      toast.success("Menu item added!");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
    toast.success("Menu item deleted!");
  };

  const toggleAvailability = (id: string) => {
    setItems(items.map((i) => i.id === id ? { ...i, available: !i.available } : i));
  };

  return (
    <AppLayout>
      <PageHeader
        title="Menu Management"
        subtitle="Add, edit, and manage your restaurant menu."
        action={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAdd} className="gradient-primary text-primary-foreground shadow-gold hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-display">{editItem ? "Edit Item" : "Add New Item"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 bg-muted border-border" /></div>
                <div><Label>Price (₹)</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="mt-1 bg-muted border-border" /></div>
                <div>
                  <Label>Category</Label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground">
                    {categories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 bg-muted border-border" /></div>
                <Button onClick={handleSave} className="w-full gradient-primary text-primary-foreground shadow-gold hover:opacity-90">Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search menu..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-card border-border pl-10" />
        </div>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeCategory === cat ? "gradient-primary text-primary-foreground shadow-gold" : "bg-card text-muted-foreground border border-border hover:text-foreground"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-gold hover:border-primary/30 ${!item.available ? "opacity-60" : ""}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{item.category}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                <p className="mt-3 font-display text-2xl font-bold text-primary">₹{item.price}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Switch checked={item.available} onCheckedChange={() => toggleAvailability(item.id)} />
                <div className="flex gap-1">
                  <button onClick={() => openEdit(item)} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><Edit2 className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
};

export default MenuPage;
