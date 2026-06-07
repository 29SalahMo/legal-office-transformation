import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import {
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  X,
  Calendar,
  User,
  ImageIcon,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface ArticleForm {
  title: string;
  author: string;
  category: string;
  description: string;
  content: string;
  image_url: string;
  slug: string;
}

const emptyForm: ArticleForm = {
  title: "",
  author: "",
  category: "",
  description: "",
  content: "",
  image_url: "",
  slug: "",
};

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

interface AdminArticleManagerProps {
  category?: string;
  title: string;
  subtitle: string;
}

const AdminArticleManager = ({ category, title, subtitle }: AdminArticleManagerProps) => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleForm>(emptyForm);

  const queryKey = [`admin-articles-${category || "all"}`];

  const { data: articles = [], isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      let query = supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (category) {
        query = query.eq("category", category);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const slug = form.slug || generateSlug(form.title);
      const contentArray = form.content
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean);

      const payload = {
        title: form.title,
        author: form.author,
        category: category || form.category,
        description: form.description,
        content: contentArray,
        image_url: form.image_url || null,
        slug,
      };

      if (editingId) {
        const { error } = await supabase.from("articles").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("articles").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(editingId ? "Article updated" : "Article created");
      setDialogOpen(false);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Article deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const openNew = () => {
    setEditingId(null);
    setForm({ ...emptyForm, category: category || "" });
    setDialogOpen(true);
  };

  const openEdit = (article: any) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      author: article.author,
      category: article.category || "",
      description: article.description,
      content: (article.content || []).join("\n\n"),
      image_url: article.image_url || "",
      slug: article.slug,
    });
    setDialogOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    const ext = file.name.split(".").pop();
    const path = `articles/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("page-images").upload(path, file);
    if (error) {
      toast.error("Upload failed");
      return;
    }
    const { data } = supabase.storage.from("page-images").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: data.publicUrl }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground font-sans text-sm mt-1">{subtitle}</p>
      </div>

      <div className="flex justify-end">
        <Button onClick={openNew} size="sm">
          <Plus className="w-4 h-4 mr-1" /> New Article
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No articles yet. Create your first one.
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article: any) => (
            <Card key={article.id} className="border-border/50 shadow-elegant">
              <CardContent className="p-5 flex items-start gap-4">
                {article.image_url ? (
                  <img src={article.image_url} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground font-sans text-sm truncate">{article.title}</h3>
                    <Badge variant="outline" className="text-xs flex-shrink-0">{article.category}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-sans">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(article)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(article.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Article" : "New Article"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium font-sans">Title</label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium font-sans">Author</label>
                <Input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} className="mt-1" />
              </div>
              {!category && (
                <div>
                  <label className="text-sm font-medium font-sans">Category</label>
                  <Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="mt-1" />
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-medium font-sans">Slug</label>
              <Input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder="auto-generated from title"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium font-sans">Description</label>
              <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="mt-1" rows={2} />
            </div>
            <div>
              <label className="text-sm font-medium font-sans">Content (paragraphs separated by blank lines)</label>
              <Textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} className="mt-1" rows={8} />
            </div>
            <div>
              <label className="text-sm font-medium font-sans">Cover Image</label>
              {form.image_url ? (
                <div className="relative mt-1 w-full max-w-xs">
                  <img src={form.image_url} alt="" className="w-full h-32 object-cover rounded-lg border" />
                  <button onClick={() => setForm((f) => ({ ...f, image_url: "" }))} className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/30 mt-1">
                  <ImageIcon className="w-6 h-6 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">Upload image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file); }} />
                </label>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending || !form.title}>
              {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
              {editingId ? "Save Changes" : "Create Article"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminArticleManager;
