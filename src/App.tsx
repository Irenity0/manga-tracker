import { useState, useEffect } from "react";
import MangaTable, { type Manga } from "./components/MangaTable";
import { Button } from "./components/ui/button";
import { supabase } from "./lib/supabase";
import { AddMangaForm } from "./components/AddMangaForm";

function App() {
  const [addMangaOpen, setAddMangaOpen] = useState(false);
  const [mangaData, setMangaData] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchManga = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("manga")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      setMangaData(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManga();
  }, []);

  return (
    <>
      <section className="min-h-screen bg-background text-foreground p-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-space font-bold">Manga Tracker ✦︎</h1>
          <p className="text-muted-foreground">
            A manga tracker ✦︎ built with Vite, React, TS, Shadcn ✦︎
          </p>
          <Button onClick={() => setAddMangaOpen(true)}>Add Manga</Button>

          <AddMangaForm
            open={addMangaOpen}
            onOpenChange={setAddMangaOpen}
            onAdded={fetchManga} // refresh table after adding
          />
        </div>
        <MangaTable loading={loading} data={mangaData} refresh={fetchManga} />
      </section>
    </>
  );
}

export default App;
