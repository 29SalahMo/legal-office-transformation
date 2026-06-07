import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Mail, Phone, Calendar, Loader2, Eye } from "lucide-react";
import { toast } from "sonner";

const AdminContacts = () => {
  const queryClient = useQueryClient();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ read: true })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact-submissions"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
      toast.success("Submission deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const unreadCount = submissions.filter((s: any) => !s.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Contact Submissions
          {unreadCount > 0 && (
            <Badge className="ml-3 bg-primary">{unreadCount} new</Badge>
          )}
        </h1>
        <p className="text-muted-foreground font-sans text-sm mt-1">
          Messages received from the contact form.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No contact submissions yet.
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub: any) => (
            <Card
              key={sub.id}
              className={`border-border/50 shadow-elegant ${!sub.read ? "border-l-4 border-l-primary" : ""}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground font-sans text-sm">
                        {sub.name}
                      </h3>
                      {!sub.read && (
                        <Badge variant="secondary" className="text-xs">New</Badge>
                      )}
                    </div>
                    {sub.subject && (
                      <p className="text-sm font-medium text-foreground/80 mb-1">
                        {sub.subject}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap">
                      {sub.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-sans">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {sub.email}
                      </span>
                      {sub.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {sub.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{" "}
                        {new Date(sub.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {!sub.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => markReadMutation.mutate(sub.id)}
                        title="Mark as read"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(sub.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
