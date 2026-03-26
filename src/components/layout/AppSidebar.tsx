import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, UtensilsCrossed, ClipboardList, Receipt, Package, BarChart3, Leaf, LogOut, Settings } from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/menu", icon: UtensilsCrossed, label: "Menu" },
  { to: "/orders", icon: ClipboardList, label: "Orders" },
  { to: "/billing", icon: Receipt, label: "Billing" },
  { to: "/inventory", icon: Package, label: "Inventory" },
  { to: "/reports", icon: BarChart3, label: "Reports" },
];

const AppSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-border px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary shadow-gold">
          <Leaf className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-foreground tracking-wide">Silver Leaf</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Management</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Main Menu</p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/12 text-primary shadow-gold"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`
            }
          >
            <item.icon className="h-[18px] w-[18px]" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3 space-y-1">
        <button
          onClick={() => navigate("/")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-destructive"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
