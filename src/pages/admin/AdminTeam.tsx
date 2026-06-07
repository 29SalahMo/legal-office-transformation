import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Pencil, Upload, Users } from "lucide-react";
import { toast } from "sonner";

const ROLE_CATEGORIES = [
  "Partner",
  "Senior Associate",
  "Associate",
  "Junior Associate",
  "Counsel",
  "Corporate",
];

type TeamMember = {
  id: string;
  name: string;
  title: string;
  role_category: string;
  focus: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  email: string | null;
  experience: string | null;
  display_order: number;
  bio: string[];
};

const emptyForm = {
  name: "",
  title: "",
  role_category: "Associate",
  focus: "",
  linkedin_url: "",
  email: "",
  experience: "",
  bio: "",
};

const AdminTeam = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const uploadPhoto = async (file: File, memberId: string) => {
    const ext = file.name.split(".").pop();
    const path = `${memberId}.${ext}`;
    
    // Delete old photo if exists
    await supabase.storage.from("team-photos").remove([path]);
    
    const { error } = await supabase.storage
      .from("team-photos")
      .upload(path, file, { upsert: true });
    if (error) throw error;

    const { data } = supabase.storage
      .from("team-photos")
      .getPublicUrl(path);
    return data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const bioArray = form.bio
        ? form.bio.split("\n\n").filter((p) => p.trim())
        : [];

      const payload = {
        name: form.name,
        title: form.title,
        role_category: form.role_category,
        focus: form.focus || null,
        linkedin_url: form.linkedin_url || null,
        email: form.email || null,
        experience: form.experience || null,
        bio: bioArray,
        display_order: editingId
          ? members.find((m) => m.id === editingId)?.display_order ?? 0
          : members.length + 1,
      };

      let memberId: string;

      if (editingId) {
        const { error } = await supabase
          .from("team_members")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        memberId = editingId;
      } else {
        const { data, error } = await supabase
          .from("team_members")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        memberId = data.id;
      }

      if (photoFile) {
        const photoUrl = await uploadPhoto(photoFile, memberId);
        await supabase
          .from("team_members")
          .update({ photo_url: photoUrl })
          .eq("id", memberId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success(editingId ? "Member updated" : "Member added");
      closeDialog();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Member deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const openEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      title: member.title,
      role_category: member.role_category,
      focus: member.focus || "",
      linkedin_url: member.linkedin_url || "",
      email: member.email || "",
      experience: member.experience || "",
      bio: (member.bio || []).join("\n\n"),
    });
    setPhotoPreview(member.photo_url);
    setPhotoFile(null);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const grouped = ROLE_CATEGORIES.reduce(
    (acc, cat) => {
      const items = members.filter((m) => m.role_category === cat);
      if (items.length > 0) acc[cat] = items;
      return acc;
    },
    {} as Record<string, TeamMember[]>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
          <p className="text-muted-foreground font-sans text-sm mt-1">
            Manage your team members displayed on the website.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => open ? setDialogOpen(true) : closeDialog()}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
                setPhotoFile(null);
                setPhotoPreview(null);
                setDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add"} Team Member</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveMutation.mutate();
              }}
              className="space-y-4 mt-4"
            >
              {/* Photo Upload */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center overflow-hidden border border-border">
                  {photoPreview ? (
                    <img src={photoPreview} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <Label htmlFor="photo" className="cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <Upload className="w-4 h-4" /> Upload Photo
                    </div>
                  </Label>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 5MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Title *</Label>
                  <Input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category *</Label>
                  <Select
                    value={form.role_category}
                    onValueChange={(v) => setForm({ ...form, role_category: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Focus Area</Label>
                  <Input
                    value={form.focus}
                    onChange={(e) => setForm({ ...form, focus: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Experience</Label>
                  <Input
                    placeholder="e.g. 10+ Years"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  />
                </div>
                <div>
                  <Label>LinkedIn URL</Label>
                  <Input
                    value={form.linkedin_url}
                    onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Bio (paragraphs separated by blank lines)</Label>
                <Textarea
                  rows={4}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={closeDialog}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Saving..." : editingId ? "Update" : "Add Member"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading...</p>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-lg font-semibold text-foreground mb-3">{category}s</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((member) => (
                <Card key={member.id} className="border-border/50">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center overflow-hidden shrink-0">
                      {member.photo_url ? (
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-primary font-serif text-lg font-bold">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{member.name}</p>
                      <p className="text-xs text-primary truncate">{member.title}</p>
                      {member.focus && (
                        <p className="text-xs text-muted-foreground truncate">{member.focus}</p>
                      )}
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEdit(member)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => {
                          if (confirm(`Delete ${member.name}?`)) {
                            deleteMutation.mutate(member.id);
                          }
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminTeam;
