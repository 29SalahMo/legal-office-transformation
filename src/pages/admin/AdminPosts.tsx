import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  status: "published" | "draft";
  date: string;
  category: string;
}

const initialPosts: Post[] = [
  { id: "1", title: "Understanding Corporate Law in 2026", excerpt: "A comprehensive guide to navigating corporate legal challenges...", status: "published", date: "Feb 5, 2026", category: "Corporate Law" },
  { id: "2", title: "Tax Planning Strategies for Businesses", excerpt: "Key tax planning strategies every business should know...", status: "draft", date: "Feb 3, 2026", category: "Tax Law" },
  { id: "3", title: "Employment Law Updates", excerpt: "Recent changes in employment law and what they mean...", status: "published", date: "Jan 28, 2026", category: "Employment" },
  { id: "4", title: "Real Estate Due Diligence Checklist", excerpt: "Essential steps for property acquisition due diligence...", status: "published", date: "Jan 20, 2026", category: "Real Estate" },
  { id: "5", title: "Intellectual Property Protection Guide", excerpt: "How to protect your intellectual property effectively...", status: "draft", date: "Jan 15, 2026", category: "IP Law" },
];

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [form, setForm] = useState({ title: "", excerpt: "", category: "", status: "draft" as "published" | "draft" });

  const filteredPosts = posts.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingPost(null);
    setForm({ title: "", excerpt: "", category: "", status: "draft" });
    setDialogOpen(true);
  };

  const openEdit = (post: Post) => {
    setEditingPost(post);
    setForm({ title: post.title, excerpt: post.excerpt, category: post.category, status: post.status });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (editingPost) {
      setPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, ...form } : p)));
      toast.success("Post updated");
    } else {
      const newPost: Post = {
        id: Date.now().toString(),
        ...form,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      };
      setPosts((prev) => [newPost, ...prev]);
      toast.success("Post created");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Post deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Posts</h1>
          <p className="text-muted-foreground font-sans text-sm mt-1">Manage your blog articles and insights.</p>
        </div>
        <Button onClick={openCreate} className="rounded-full">
          <Plus className="w-4 h-4 mr-1" />
          New Post
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 rounded-full"
        />
      </div>

      {/* Posts List */}
      <Card className="border-border/50 shadow-elegant">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground font-sans">Title</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground font-sans hidden md:table-cell">Category</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground font-sans hidden sm:table-cell">Date</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground font-sans">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground font-sans">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="p-4">
                      <p className="text-sm font-medium text-foreground font-sans">{post.title}</p>
                      <p className="text-xs text-muted-foreground font-sans mt-0.5 line-clamp-1">{post.excerpt}</p>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground font-sans hidden md:table-cell">{post.category}</td>
                    <td className="p-4 text-sm text-muted-foreground font-sans hidden sm:table-cell">{post.date}</td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={post.status === "published" ? "bg-secondary text-primary border-border" : "bg-muted text-muted-foreground border-border"}
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(post)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPosts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground font-sans text-sm">
                      No posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Edit Post" : "New Post"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium text-foreground font-sans">Title</label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-sans">Excerpt</label>
              <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="mt-1" rows={3} />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground font-sans">Category</label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground font-sans">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as "published" | "draft" })}
                  className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-sans"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingPost ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPosts;
