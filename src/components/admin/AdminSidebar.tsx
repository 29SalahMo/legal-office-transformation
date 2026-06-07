import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  FileText,
  FileEdit,
  Image,
  BookOpen,
  Briefcase,
  Users,
  MessageSquareQuote,
  Inbox,
  ArrowLeft,
  LogOut,
  Newspaper,
  Scale,
} from "lucide-react";
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const menuItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Posts", href: "/admin/posts", icon: FileText },
  { label: "Pages", href: "/admin/pages", icon: FileEdit },
  { label: "Insights", href: "/admin/insights", icon: BookOpen },
  { label: "News", href: "/admin/news", icon: Newspaper },
  { label: "Legal Updates", href: "/admin/legal-updates", icon: Scale },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "Contacts", href: "/admin/contacts", icon: Inbox },
  { label: "Media", href: "/admin/media", icon: Image },
];

const AdminSidebar = () => {
  const { signOut } = useAdminAuth();

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/admin" className="flex items-center gap-3">
          <img src={logo} alt="Admin" className="h-7" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-sans">
            Admin
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/admin"}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors font-sans"
            activeClassName="bg-secondary text-foreground"
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Back to site & Logout */}
      <div className="p-4 border-t border-border space-y-1">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </Link>
        <button
          onClick={signOut}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors font-sans w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
