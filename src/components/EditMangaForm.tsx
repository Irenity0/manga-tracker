/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

interface EditMangaFormProps {
  manga: any;
  onClose: () => void;
  onUpdated: () => void;
}

export const EditMangaForm: React.FC<EditMangaFormProps> = ({ manga, onClose, onUpdated }) => {
  const [form, setForm] = React.useState({ ...manga });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (key: string, value: any) =>
    setForm((prev: any) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("manga")
        .update({ ...form, updated_at: new Date().toISOString() })
        .eq("id", manga.id);
      if (error) throw error;
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error updating manga");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Form fields in 2 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block">Title</Label>
          <Input
            value={form.manga_title}
            onChange={(e) => handleChange("manga_title", e.target.value)}
            placeholder="Title"
          />
        </div>

        <div>
          <Label className="mb-2 block">Original Title</Label>
          <Input
            value={form.original_title}
            onChange={(e) => handleChange("original_title", e.target.value)}
            placeholder="Original Title"
          />
        </div>

        <div>
          <Label className="mb-2 block">Author</Label>
          <Input
            value={form.author}
            onChange={(e) => handleChange("author", e.target.value)}
            placeholder="Author"
          />
        </div>

        <div>
          <Label className="mb-2 block">Status</Label>
          <Select
            value={form.status}
            onValueChange={(val: any) => handleChange("status", val)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="hiatus">Hiatus</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="dropped">Dropped</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Reading Status</Label>
          <Select
            value={form.reading_status}
            onValueChange={(val) => handleChange("reading_status", val)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reading">Reading</SelectItem>
              <SelectItem value="plan-to-read">Plan to Read</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="dropped">Dropped</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Genres (comma separated)</Label>
          <Input
            value={form.genres?.join(", ")}
            onChange={(e) =>
              handleChange(
                "genres",
                e.target.value.split(",").map((g: string) => g.trim())
              )
            }
            placeholder="Genres"
          />
        </div>

        <div>
          <Label className="mb-2 block">Total Chapters</Label>
          <Input
            type="number"
            value={form.total_chapters}
            onChange={(e) =>
              handleChange("total_chapters", Number(e.target.value))
            }
            placeholder="Total Chapters"
          />
        </div>

        <div>
          <Label className="mb-2 block">Current Chapter</Label>
          <Input
            type="number"
            value={form.current_chapter}
            onChange={(e) =>
              handleChange("current_chapter", Number(e.target.value))
            }
            placeholder="Current Chapter"
          />
        </div>

        <div>
          <Label className="mb-2 block">Star Rating</Label>
          <Input
            type="number"
            value={form.star_rating || 0}
            onChange={(e) =>
              handleChange("star_rating", Number(e.target.value))
            }
            placeholder="Star Rating"
          />
        </div>

        {/* Notes spans full width */}
        <div className="md:col-span-2">
          <Label className="mb-2 block">Notes</Label>
          <Textarea
            value={form.notes || ""}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Notes"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};
