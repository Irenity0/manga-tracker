/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface AddMangaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded?: () => void;
}

export const AddMangaForm: React.FC<AddMangaFormProps> = ({
  open,
  onOpenChange,
  onAdded,
}) => {
  const [manga, setManga] = React.useState({
    manga_title: "",
    original_title: "",
    author: "",
    status: "ongoing" as "ongoing" | "hiatus" | "completed" | "dropped",
    total_chapters: 0,
    current_chapter: 0,
    reading_status: "plan-to-read" as
      | "reading"
      | "plan-to-read"
      | "completed"
      | "on-hold"
      | "dropped",
    genres: "",
    star_rating: 0,
    notes: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (key: string, value: any) => {
    setManga((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.from("manga").insert([
        {
          manga_title: manga.manga_title,
          original_title: manga.original_title,
          author: manga.author,
          status: manga.status,
          total_chapters: manga.total_chapters,
          current_chapter: manga.current_chapter,
          reading_status: manga.reading_status,
          genres: manga.genres.split(",").map((g) => g.trim()),
          star_rating: manga.star_rating,
          notes: manga.notes,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;

      setManga({
        manga_title: "",
        original_title: "",
        author: "",
        status: "ongoing",
        total_chapters: 0,
        current_chapter: 0,
        reading_status: "plan-to-read",
        genres: "",
        star_rating: 0,
        notes: "",
      });

      onAdded?.();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Error adding manga");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="min-w-md px-6">
        <SheetHeader>
          <SheetTitle>Add New Manga</SheetTitle>
          <SheetDescription>
            Fill the details to add a new manga.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-2">Title</Label>
            <Input
              value={manga.manga_title}
              onChange={(e) => handleChange("manga_title", e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2">Original Title</Label>
            <Input
              value={manga.original_title}
              onChange={(e) => handleChange("original_title", e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2">Author</Label>
            <Input
              value={manga.author}
              onChange={(e) => handleChange("author", e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2">Status</Label>
            <Select
              onValueChange={(val: any) => handleChange("status", val)}
              value={manga.status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
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
            <Label className="mb-2">Total Chapters</Label>
            <Input
              type="number"
              value={manga.total_chapters}
              onChange={(e) =>
                handleChange("total_chapters", Number(e.target.value))
              }
            />
          </div>
          <div>
            <Label className="mb-2">Current Chapter</Label>
            <Input
              type="number"
              value={manga.current_chapter}
              onChange={(e) =>
                handleChange("current_chapter", Number(e.target.value))
              }
            />
          </div>
          <div>
            <Label className="mb-2">Reading Status</Label>
            <Select
              onValueChange={(val: any) => handleChange("reading_status", val)}
              value={manga.reading_status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reading status" />
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
            <Label className="mb-2">Genres (comma separated)</Label>
            <Input
              value={manga.genres}
              onChange={(e) => handleChange("genres", e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2">Star Rating (0-5)</Label>
            <Input
              min={0}
              max={5}
              type="number"
              value={manga.star_rating}
              onChange={(e) =>
                handleChange("star_rating", Number(e.target.value))
              }
            />
          </div>
          <div className="col-span-2">
            <Label className="mb-2">Notes</Label>
            <Textarea
              value={manga.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 w-full"
        >
          {loading ? "Adding..." : "Add Manga"}
        </Button>
      </SheetContent>
    </Sheet>
  );
};
