import { MenuItem, Order, DashboardStats, InventoryItem } from "@/types/restaurant";

export const menuItems: MenuItem[] = [
  { id: "1", name: "Butter Chicken", price: 320, category: "Main Course", description: "Creamy tomato-based curry with tender chicken", available: true },
  { id: "2", name: "Paneer Tikka", price: 240, category: "Starters", description: "Grilled cottage cheese with spices", available: true },
  { id: "3", name: "Veg Biryani", price: 220, category: "Main Course", description: "Aromatic rice with mixed vegetables", available: true },
  { id: "4", name: "Masala Dosa", price: 150, category: "Starters", description: "Crispy crepe with spiced potato filling", available: true },
  { id: "5", name: "Gulab Jamun", price: 120, category: "Desserts", description: "Deep-fried milk dumplings in sugar syrup", available: true },
  { id: "6", name: "Mango Lassi", price: 90, category: "Beverages", description: "Refreshing yogurt-based mango drink", available: true },
  { id: "7", name: "Chicken Biryani", price: 280, category: "Main Course", description: "Fragrant rice with spiced chicken", available: false },
  { id: "8", name: "Dal Makhani", price: 200, category: "Main Course", description: "Slow-cooked black lentils in creamy gravy", available: true },
  { id: "9", name: "Samosa", price: 60, category: "Starters", description: "Crispy pastry filled with spiced potatoes", available: true },
  { id: "10", name: "Cold Coffee", price: 110, category: "Beverages", description: "Chilled blended coffee with cream", available: true },
];

export const orders: Order[] = [
  { id: "ORD-001", customerName: "Rahul Sharma", items: [{ menuItem: menuItems[0], quantity: 2 }, { menuItem: menuItems[5], quantity: 2 }], status: "preparing", total: 820, createdAt: "2025-03-26T10:30:00", tableNumber: 5 },
  { id: "ORD-002", customerName: "Priya Patel", items: [{ menuItem: menuItems[2], quantity: 1 }, { menuItem: menuItems[4], quantity: 3 }], status: "served", total: 580, createdAt: "2025-03-26T10:15:00", tableNumber: 3 },
  { id: "ORD-003", customerName: "Amit Verma", items: [{ menuItem: menuItems[1], quantity: 1 }, { menuItem: menuItems[7], quantity: 1 }], status: "pending", total: 440, createdAt: "2025-03-26T11:00:00", tableNumber: 8 },
  { id: "ORD-004", customerName: "Sneha Joshi", items: [{ menuItem: menuItems[8], quantity: 4 }, { menuItem: menuItems[9], quantity: 2 }], status: "completed", total: 460, createdAt: "2025-03-26T09:45:00", tableNumber: 1 },
  { id: "ORD-005", customerName: "Vikram Singh", items: [{ menuItem: menuItems[0], quantity: 1 }, { menuItem: menuItems[2], quantity: 1 }, { menuItem: menuItems[5], quantity: 1 }], status: "preparing", total: 630, createdAt: "2025-03-26T11:20:00", tableNumber: 12 },
];

export const dashboardStats: DashboardStats = {
  totalOrders: 47,
  totalRevenue: 28450,
  activeOrders: 12,
  menuItems: 10,
};

export const inventoryItems: InventoryItem[] = [
  { id: "INV-001", name: "Basmati Rice", category: "Grains", quantity: 45, unit: "kg", minStock: 10, lastRestocked: "2025-03-24", supplier: "Agri Fresh" },
  { id: "INV-002", name: "Chicken Breast", category: "Meat", quantity: 12, unit: "kg", minStock: 8, lastRestocked: "2025-03-25", supplier: "Fresh Farms" },
  { id: "INV-003", name: "Paneer", category: "Dairy", quantity: 8, unit: "kg", minStock: 5, lastRestocked: "2025-03-25", supplier: "Dairy Best" },
  { id: "INV-004", name: "Tomatoes", category: "Vegetables", quantity: 20, unit: "kg", minStock: 10, lastRestocked: "2025-03-26", supplier: "Green Valley" },
  { id: "INV-005", name: "Onions", category: "Vegetables", quantity: 30, unit: "kg", minStock: 15, lastRestocked: "2025-03-24", supplier: "Green Valley" },
  { id: "INV-006", name: "Cooking Oil", category: "Oils", quantity: 15, unit: "litre", minStock: 5, lastRestocked: "2025-03-22", supplier: "Fortune" },
  { id: "INV-007", name: "Butter", category: "Dairy", quantity: 4, unit: "kg", minStock: 3, lastRestocked: "2025-03-25", supplier: "Amul" },
  { id: "INV-008", name: "Flour (Maida)", category: "Grains", quantity: 25, unit: "kg", minStock: 10, lastRestocked: "2025-03-23", supplier: "Agri Fresh" },
  { id: "INV-009", name: "Sugar", category: "Essentials", quantity: 18, unit: "kg", minStock: 5, lastRestocked: "2025-03-24", supplier: "Sweet Corp" },
  { id: "INV-010", name: "Milk", category: "Dairy", quantity: 20, unit: "litre", minStock: 10, lastRestocked: "2025-03-26", supplier: "Amul" },
];
