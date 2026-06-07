import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Briefcase, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface JobPosting {
  id: string;
  title: string;
  department: string | null;
  location: string | null;
  type: string | null;
  description: string | null;
  created_at: string;
}

const AdminCareers = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "Cairo, Egypt",
    type: "Full-time",
    description: "",
  });

  const { data: postings = [], isLoading } = useQuery({
    queryKey: ["job_postings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_postings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as JobPosting[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("job_postings").insert({
        title: form.title,
        department: form.department || null,
        location: form.location || null,
        type: form.type || null,
        description: form.description || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job_postings"] });
      setForm({ title: "", department: "", location: "Cairo, Egypt", type: "Full-time", description: "" });
      setShowForm(false);
      toast.success("Position added");
    },
    onError: () => toast.error("Failed to add position"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("job_postings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job_postings"] });
      toast.success("Position deleted");
    },
    onError: () => toast.error("Failed to delete position"),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Careers</h1>
          <p className="text-muted-foreground font-sans text-sm mt-1">
            Manage open positions displayed on the Careers page.
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Position
        </Button>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card className="border-primary/30 shadow-elegant">
          <CardContent className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground font-sans block mb-1.5">Title *</label>
                <Input
                  placeholder="e.g. Senior Associate – Corporate"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground font-sans block mb-1.5">Department</label>
                <Input
                  placeholder="e.g. Litigation"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground font-sans block mb-1.5">Location</label>
                <Input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground font-sans block mb-1.5">Type</label>
                <Input
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-sans block mb-1.5">Description</label>
              <Textarea
                placeholder="Brief description of the role..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button
                onClick={() => addMutation.mutate()}
                disabled={!form.title || addMutation.isPending}
              >
                {addMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save Position
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Listings */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : postings.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="p-12 text-center">
            <Briefcase className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-sans text-sm">No open positions yet. Click "Add Position" to create one.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {postings.map((posting) => (
            <Card key={posting.id} className="border-border/50 shadow-elegant">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground font-sans text-sm">{posting.title}</h3>
                      {posting.department && (
                        <Badge variant="outline" className="bg-secondary text-primary border-border text-xs">
                          {posting.department}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-sans mt-0.5">
                      {posting.location && <span>{posting.location}</span>}
                      {posting.type && (
                        <>
                          <span>·</span>
                          <span>{posting.type}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(posting.id)}
                  disabled={deleteMutation.isPending}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCareers;
