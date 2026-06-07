import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react";
import { toast } from "sonner";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  photo_url: string | null;
  rating: number;
  display_order: number;
}

const emptyForm = { name: "", title: "", quote: "", rating: 5, display_order: 0 };

const AdminTestimonials = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (values: typeof emptyForm & { id?: string }) => {
      if (values.id) {
        const { error } = await supabase.from("testimonials").update(values).eq("id", values.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert(values);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast.success(editingId ? "Testimonial updated" : "Testimonial added");
      closeDialog();
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast.success("Testimonial deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const openNew = () => {
    setEditingId(null);
    setForm({ ...emptyForm, display_order: testimonials.length });
    setDialogOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({ name: t.name, title: t.title, quote: t.quote, rating: t.rating, display_order: t.display_order });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSave = () => {
    if (!form.name || !form.quote) return toast.error("Name and quote are required");
    saveMutation.mutate(editingId ? { ...form, id: editingId } : form);
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground py-12">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground font-sans text-sm mt-1">
            Manage client testimonials shown on the homepage.
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 mr-2" /> Add Testimonial
        </Button>
      </div>

      <div className="grid gap-4">
        {testimonials.map((t) => (
          <Card key={t.id} className="border-border/50 shadow-elegant">
            <CardContent className="p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm font-sans">{t.name}</h3>
                <p className="text-xs text-muted-foreground font-sans">{t.title}</p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">"{t.quote}"</p>
                <div className="flex gap-0.5 mt-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-primary fill-current" />
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(t)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(t.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {testimonials.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-8">No testimonials yet.</p>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium font-sans">Client Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium font-sans">Title / Company</label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium font-sans">Quote</label>
              <Textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} rows={4} />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium font-sans">Rating (1-5)</label>
                <Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium font-sans">Display Order</label>
                <Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button onClick={handleSave} disabled={saveMutation.isPending}>
                {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingId ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;
