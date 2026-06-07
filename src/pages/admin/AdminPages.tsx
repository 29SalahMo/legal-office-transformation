import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil } from "lucide-react";
import AdminPageEditor, { PageConfig, getDefaultPages } from "./AdminPageEditor";

const pages = getDefaultPages();

const AdminPages = () => {
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  const editingPage = pages.find((p) => p.id === editingPageId) || null;

  if (editingPage) {
    return (
      <AdminPageEditor
        page={editingPage}
        onBack={() => setEditingPageId(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pages</h1>
        <p className="text-muted-foreground font-sans text-sm mt-1">
          Click a page to edit its photos and text content.
        </p>
      </div>

      <div className="grid gap-4">
        {pages.map((page) => (
          <Card
            key={page.id}
            className="border-border/50 shadow-elegant cursor-pointer hover:border-primary/30 transition-colors"
            onClick={() => setEditingPageId(page.id)}
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Eye className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground font-sans text-sm">
                      {page.name}
                    </h3>
                    <Badge variant="outline" className="bg-secondary text-primary border-border text-xs">
                      Live
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-sans mt-0.5">
                    <span>{page.slug}</span>
                    <span>·</span>
                    <span>{page.sections.length} editable sections</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Pencil className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPages;
