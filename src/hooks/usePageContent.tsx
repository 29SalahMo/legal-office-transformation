import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PageContentRow = {
  id: string;
  page_id: string;
  label: string;
  type: string;
  value: string;
  image_url: string | null;
  updated_at: string;
};

export const usePageContent = (pageId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["page-content", pageId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .eq("page_id", pageId);
      if (error) throw error;
      return data as PageContentRow[];
    },
  });

  // Get a specific section value, with optional fallback
  const getValue = (sectionId: string, fallback = "") => {
    const row = query.data?.find((r) => r.id === sectionId);
    return row?.value || fallback;
  };

  const getImageUrl = (sectionId: string, fallback = "") => {
    const row = query.data?.find((r) => r.id === sectionId);
    return row?.image_url || fallback;
  };

  return { ...query, getValue, getImageUrl };
};

export const useSavePageContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rows: Omit<PageContentRow, "updated_at">[]) => {
      // Upsert all rows
      const { error } = await supabase
        .from("page_content")
        .upsert(
          rows.map((r) => ({
            id: r.id,
            page_id: r.page_id,
            label: r.label,
            type: r.type,
            value: r.value,
            image_url: r.image_url,
          })),
          { onConflict: "page_id,id" }
        );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-content"] });
    },
  });
};

export const uploadPageImage = async (
  pageId: string,
  sectionId: string,
  file: File
) => {
  const ext = file.name.split(".").pop();
  const path = `${pageId}/${sectionId}.${ext}`;

  await supabase.storage.from("page-images").remove([path]);

  const { error } = await supabase.storage
    .from("page-images")
    .upload(path, file, { upsert: true });
  if (error) throw error;

  const { data } = supabase.storage.from("page-images").getPublicUrl(path);
  return data.publicUrl;
};
