import { Card, CardContent } from "@/components/ui/card";
import { FileText, FileEdit, Image, Eye } from "lucide-react";

const stats = [
  { label: "Total Posts", value: "12", icon: FileText },
  { label: "Published Pages", value: "6", icon: FileEdit },
  { label: "Media Files", value: "34", icon: Image },
  { label: "Page Views (Today)", value: "1,284", icon: Eye },
];

const recentActivity = [
  { action: "Published", item: "Understanding Corporate Law in 2026", time: "2 hours ago" },
  { action: "Updated", item: "About Us page", time: "5 hours ago" },
  { action: "Uploaded", item: "team-photo-2026.jpg", time: "1 day ago" },
  { action: "Draft saved", item: "Tax Planning Strategies", time: "2 days ago" },
];

const AdminOverview = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-sans text-sm mt-1">
          Overview of your website content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/50 shadow-elegant">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-sans">{s.label}</p>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="border-border/50 shadow-elegant">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="font-sans text-sm">
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="font-medium text-foreground">{a.item}</span>
                </div>
                <span className="text-xs text-muted-foreground font-sans whitespace-nowrap ml-4">{a.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
