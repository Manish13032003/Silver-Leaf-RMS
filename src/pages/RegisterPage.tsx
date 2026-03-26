import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Eye, EyeOff, ArrowRight, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "staff" });
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    toast.success("Account created! Welcome to Silver Leaf.");
    navigate("/dashboard");
  };

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  return (
    <div className="flex min-h-screen">
      {/* Left — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden" style={{ background: "var(--gradient-dark)" }}>
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 70% 60%, hsl(160 45% 45% / 0.3), transparent 60%)" }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-md px-12 text-center"
        >
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-gold">
            <UserPlus className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="font-display text-4xl font-bold text-foreground">Join Silver Leaf</h2>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
            Set up your restaurant management account and start optimizing operations today.
          </p>
          <div className="mt-10 space-y-3 text-left">
            {["Complete menu & order management", "Real-time billing & invoicing", "Inventory tracking & analytics"].map((feat) => (
              <div key={feat} className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-4">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm text-foreground">{feat}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right — Form */}
      <div className="flex w-full items-center justify-center bg-background px-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary shadow-gold">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Silver Leaf</h1>
          </div>

          <h2 className="font-display text-3xl font-bold text-foreground">Create account</h2>
          <p className="mt-2 text-muted-foreground">Get started with Silver Leaf in minutes.</p>

          <form onSubmit={handleRegister} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Full Name</Label>
              <Input placeholder="John Doe" value={form.name} onChange={(e) => update("name", e.target.value)} className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Email</Label>
              <Input type="email" placeholder="you@restaurant.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Role</Label>
              <select value={form.role} onChange={(e) => update("role", e.target.value)} className="h-12 w-full rounded-lg border border-border bg-card px-3 text-foreground text-sm">
                <option value="admin">Administrator</option>
                <option value="staff">Staff</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Password</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={(e) => update("password", e.target.value)} className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Confirm Password</Label>
              <Input type="password" placeholder="••••••••" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground" />
            </div>

            <Button type="submit" className="h-12 w-full gradient-primary text-primary-foreground shadow-gold text-sm font-semibold hover:opacity-90 transition-opacity mt-2">
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/" className="font-semibold text-primary hover:text-primary/80 transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
