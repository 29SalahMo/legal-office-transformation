import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Upload, Trash2, Search, Image as ImageIcon, FileText, Film } from "lucide-react";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  name: string;
  type: "image" | "document" | "video";
  size: string;
  uploadedAt: string;
  preview?: string;
}

const initialMedia: MediaFile[] = [
  { id: "1", name: "hero-lawyer-meeting.jpg", type: "image", size: "1.8 MB", uploadedAt: "Feb 5, 2026" },
  { id: "2", name: "partner-female.jpg", type: "image", size: "920 KB", uploadedAt: "Feb 3, 2026" },
  { id: "3", name: "partner-male.jpg", type: "image", size: "1.1 MB", uploadedAt: "Feb 3, 2026" },
  { id: "4", name: "article-1.jpg", type: "image", size: "650 KB", uploadedAt: "Jan 28, 2026" },
  { id: "5", name: "article-2.jpg", type: "image", size: "780 KB", uploadedAt: "Jan 28, 2026" },
  { id: "6", name: "article-3.jpg", type: "image", size: "540 KB", uploadedAt: "Jan 28, 2026" },
  { id: "7", name: "retainer-agreement.pdf", type: "document", size: "245 KB", uploadedAt: "Jan 15, 2026" },
  { id: "8", name: "company-profile.pdf", type: "document", size: "3.2 MB", uploadedAt: "Jan 10, 2026" },
  { id: "9", name: "office-tour.mp4", type: "video", size: "48 MB", uploadedAt: "Dec 20, 2025" },
];

const typeIcon = (type: string) => {
  switch (type) {
    case "image":
      return <ImageIcon className="w-5 h-5 text-primary" />;
    case "document":
      return <FileText className="w-5 h-5 text-primary" />;
    case "video":
      return <Film className="w-5 h-5 text-primary" />;
    default:
      return <FileText className="w-5 h-5 text-primary" />;
  }
};

const AdminMedia = () => {
  const [media, setMedia] = useState<MediaFile[]>(initialMedia);
  const [search, setSearch] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({ name: "", type: "image" as "image" | "document" | "video" });

  const filteredMedia = media.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpload = () => {
    if (!uploadForm.name.trim()) {
      toast.error("File name is required");
      return;
    }
    const newFile: MediaFile = {
      id: Date.now().toString(),
      name: uploadForm.name,
      type: uploadForm.type,
      size: "—",
      uploadedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setMedia((prev) => [newFile, ...prev]);
    toast.success("File uploaded (mock)");
    setUploadOpen(false);
    setUploadForm({ name: "", type: "image" });
  };

  const handleDelete = (id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
    toast.success("File deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-muted-foreground font-sans text-sm mt-1">Manage images, documents, and videos.</p>
        </div>
        <Button onClick={() => setUploadOpen(true)} className="rounded-full">
          <Upload className="w-4 h-4 mr-1" />
          Upload File
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 rounded-full"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedia.map((file) => (
          <Card key={file.id} className="border-border/50 shadow-elegant hover:shadow-card transition-shadow group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    {typeIcon(file.type)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground font-sans truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground font-sans">
                      {file.size} · {file.uploadedAt}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  onClick={() => handleDelete(file.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredMedia.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground font-sans text-sm">
            No files found.
          </div>
        )}
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground font-sans">
                Drag & drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground/60 font-sans mt-1">
                Connect Lovable Cloud to enable real uploads
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-sans">File Name (mock)</label>
              <Input
                value={uploadForm.name}
                onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                placeholder="e.g. new-photo.jpg"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-sans">Type</label>
              <select
                value={uploadForm.type}
                onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value as "image" | "document" | "video" })}
                className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-sans"
              >
                <option value="image">Image</option>
                <option value="document">Document</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
            <Button onClick={handleUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMedia;
