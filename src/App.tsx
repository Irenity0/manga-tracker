import "./App.css"
import MangaTable from "./components/MangaTable"
import { Button } from "./components/ui/button"

function App() {
  return (
    <>
 <section className="min-h-screen bg-background text-foreground p-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-space fon-bold">Manga Tracker ✦︎</h1>
          <p className="text-muted-foreground">
            Manga Tracker for me uwu ✦︎
          </p>
 <Button>Add Manga</Button>
        </div>
        <MangaTable/>
      </section>
    </>
  )
}

export default App