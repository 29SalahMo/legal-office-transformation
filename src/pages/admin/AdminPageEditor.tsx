import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, X, ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { usePageContent, useSavePageContent, uploadPageImage } from "@/hooks/usePageContent";
import type { PageContentRow } from "@/hooks/usePageContent";

export interface PageSection {
  id: string;
  label: string;
  type: "text" | "textarea" | "image";
  value: string;
  image_url?: string;
}

export interface PageConfig {
  id: string;
  name: string;
  slug: string;
  sections: PageSection[];
}

// Default content for all pages
export const getDefaultPages = (): PageConfig[] => [
  {
    id: "home",
    name: "Home",
    slug: "/",
    sections: [
      { id: "hero_heading", label: "Hero Heading", type: "text", value: "Legal Excellence, Tailored Solutions." },
      { id: "hero_subtext", label: "Hero Subtext", type: "text", value: "Over 25 Years of Expertise in Litigation, Corporate Law, and Arbitration." },
      { id: "hero_image", label: "Hero Image", type: "image", value: "" },
      { id: "partner_male_image", label: "Partner 1 Photo", type: "image", value: "" },
      { id: "partner_female_image", label: "Partner 2 Photo", type: "image", value: "" },
      { id: "about_heading", label: "About Section Heading", type: "text", value: "At Abdallah, we don't just practice law — we redefine it." },
      { id: "about_description", label: "About Section Description", type: "textarea", value: "Since 1999, our firm has been a home for clients seeking exceptional legal representation, from emerging startups to Fortune 500 corporations." },
      { id: "about_image", label: "About Section Image", type: "image", value: "" },
    ],
  },
  {
    id: "about",
    name: "About Us",
    slug: "/about",
    sections: [
      { id: "hero_heading", label: "Page Heading", type: "text", value: "A&A Legal Advisors" },
      { id: "hero_description", label: "Description", type: "textarea", value: "A boutique law firm based in Egypt..." },
      { id: "hero_image", label: "Hero Image", type: "image", value: "" },
    ],
  },
  {
    id: "services",
    name: "Services",
    slug: "/services",
    sections: [
      { id: "hero_heading", label: "Page Heading", type: "text", value: "Comprehensive Legal Solutions" },
      { id: "hero_description", label: "Page Description", type: "textarea", value: "We provide expert legal services across multiple disciplines." },
    ],
  },
  {
    id: "contact",
    name: "Contact",
    slug: "/contact",
    sections: [
      { id: "hero_heading", label: "Page Heading", type: "text", value: "Let's Discuss Your Legal Needs" },
      { id: "hero_description", label: "Page Description", type: "textarea", value: "Our team is ready to provide the counsel and representation you need." },
    ],
  },
];

interface AdminPageEditorProps {
  page: PageConfig;
  onBack: () => void;
}

const AdminPageEditor = ({ page, onBack }: AdminPageEditorProps) => {
  const { data: dbRows, isLoading } = usePageContent(page.id);
  const saveMutation = useSavePageContent();
  const [sections, setSections] = useState<PageSection[]>(page.sections);
  const [saving, setSaving] = useState(false);

  // Merge DB data into sections on load
  useEffect(() => {
    if (dbRows) {
      setSections((prev) =>
        prev.map((s) => {
          const dbRow = dbRows.find((r) => r.id === s.id);
          if (dbRow) {
            return {
              ...s,
              value: dbRow.value || s.value,
              image_url: dbRow.image_url || s.image_url,
            };
          }
          return s;
        })
      );
    }
  }, [dbRows]);

  const updateSection = (id: string, value: string) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));
  };

  const updateImageUrl = (id: string, image_url: string) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, image_url } : s)));
  };

  const handleImageUpload = async (sectionId: string, file: File) => {
    try {
      const url = await uploadPageImage(page.id, sectionId, file);
      updateImageUrl(sectionId, url);
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const rows = sections.map((s) => ({
        id: s.id,
        page_id: page.id,
        label: s.label,
        type: s.type,
        value: s.value,
        image_url: s.image_url || null,
      }));
      await saveMutation.mutateAsync(rows);
      toast.success(`"${page.name}" page saved`);
    } catch (err: any) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
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
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Edit — {page.name}</h1>
          <p className="text-muted-foreground font-sans text-sm mt-0.5">{page.slug}</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
        </Button>
      </div>

      {/* Sections */}
      <div className="grid gap-5">
        {sections.map((section) => (
          <Card key={section.id} className="border-border/50 shadow-elegant">
            <CardContent className="p-5">
              <label className="text-sm font-medium text-foreground font-sans block mb-2">
                {section.label}
              </label>

              {section.type === "text" && (
                <Input
                  value={section.value}
                  onChange={(e) => updateSection(section.id, e.target.value)}
                />
              )}

              {section.type === "textarea" && (
                <Textarea
                  value={section.value}
                  onChange={(e) => updateSection(section.id, e.target.value)}
                  rows={4}
                />
              )}

              {section.type === "image" && (
                <div className="space-y-3">
                  {section.image_url ? (
                    <div className="relative w-full max-w-xs">
                      <img
                        src={section.image_url}
                        alt={section.label}
                        className="w-full h-40 object-cover rounded-lg border border-border"
                      />
                      <button
                        onClick={() => updateImageUrl(section.id, "")}
                        className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full max-w-xs h-36 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/30">
                      <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Click to upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(section.id, file);
                        }}
                      />
                    </label>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPageEditor;
