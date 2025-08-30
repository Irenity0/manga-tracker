import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";

type Manga = {
  id: string;
  manga_title: string;
  original_title: string;
  author: string;
  status: "ongoing" | "hiatus" | "completed" | "dropped";
  genres?: string[];
  star_rating?: number;
  total_chapters: number;
  current_chapter: number;
  reading_status:
    | "reading"
    | "plan-to-read"
    | "completed"
    | "on-hold"
    | "dropped";
  notes?: string;
  created_at: string;
  updated_at: string;
};

const initialData: Manga[] = [
  {
    id: "1",
    manga_title: "Haikyuu!!",
    original_title: "ハイキュー!!",
    author: "Haruichi Furudate",
    status: "completed",
    genres: ["Sports", "Comedy", "Drama"],
    star_rating: 5,
    total_chapters: 402,
    current_chapter: 402,
    reading_status: "completed",
    notes: "One of the most inspiring sports manga ever.",
    created_at: "2025-08-30T00:00:00Z",
    updated_at: "2025-08-30T00:00:00Z",
  },
  {
    id: "2",
    manga_title: "The Summer Hikaru Died",
    original_title: "光が死んだ夏",
    author: "Mokumokuren",
    status: "ongoing",
    genres: ["Horror", "Psychological", "Drama"],
    star_rating: 5,
    total_chapters: 40,
    current_chapter: 30,
    reading_status: "reading",
    notes: "Eerie atmosphere, gripping story.",
    created_at: "2025-08-30T00:00:00Z",
    updated_at: "2025-08-30T00:00:00Z",
  },
  {
    id: "3",
    manga_title: "Jujutsu Kaisen",
    original_title: "呪術廻戦",
    author: "Gege Akutami",
    status: "ongoing",
    genres: ["Action", "Supernatural", "Dark Fantasy"],
    star_rating: 5,
    total_chapters: 270, // ongoing
    current_chapter: 270,
    reading_status: "reading",
    notes: "Dark and thrilling, Gojo supremacy.",
    created_at: "2025-08-30T00:00:00Z",
    updated_at: "2025-08-30T00:00:00Z",
  },
  {
    id: "4",
    manga_title: "Tokyo Ghoul",
    original_title: "東京喰種トーキョーグール",
    author: "Sui Ishida",
    status: "completed",
    genres: ["Dark Fantasy", "Psychological", "Horror"],
    star_rating: 5,
    total_chapters: 143,
    current_chapter: 143,
    reading_status: "completed",
    notes: "Haunting and tragic masterpiece.",
    created_at: "2025-08-30T00:00:00Z",
    updated_at: "2025-08-30T00:00:00Z",
  },
  {
    id: "5",
    manga_title: "Death Note",
    original_title: "デスノート",
    author: "Tsugumi Ohba / Takeshi Obata",
    status: "completed",
    genres: ["Thriller", "Psychological", "Supernatural"],
    star_rating: 5,
    total_chapters: 108,
    current_chapter: 108,
    reading_status: "completed",
    notes: "Classic battle of wits, Light vs L forever.",
    created_at: "2025-08-30T00:00:00Z",
    updated_at: "2025-08-30T00:00:00Z",
  },
  {
    id: "6",
    manga_title: "Omniscient Reader’s Viewpoint",
    original_title: "전지적 독자 시점",
    author: "Sing-Shong",
    status: "ongoing",
    genres: ["Action", "Fantasy", "Psychological"],
    star_rating: 5,
    total_chapters: 120, // ongoing
    current_chapter: 120,
    reading_status: "reading",
    notes: "Kim Dokja supremacy ✨",
    created_at: "2025-08-30T00:00:00Z",
    updated_at: "2025-08-30T00:00:00Z",
  },
];

const MangaTable = () => {
  const [data, setData] = React.useState<Manga[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedManga, setSelectedManga] = React.useState<Manga | null>(null);
  const [newNote, setNewNote] = React.useState("");

  const columns: ColumnDef<Manga>[] = [
    {
      accessorKey: "manga_title",
      header: "Title",
      cell: ({row})=>{
        const title = row.getValue("manga_title") as string;
        const truncated = 
        title.length > 24 ? title.slice(0, 18) + "..." : title;
        return <span>{truncated}</span>
      }
    },
    {
      accessorKey: "original_title",
      header: "Original Title",
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="capitalize">{row.getValue("status")}</span>
      ),
    },
    {
      accessorKey: "genres",
      header: "Genres",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.genres?.map((g) => (
            <span
              key={g}
              className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {g}
            </span>
          )) || "—"}
        </div>
      ),
    },
    {
      accessorKey: "total_chapters",
      header: "Total Chapters",
    },
    {
      accessorKey: "current_chapter",
      header: "Current Chapter",
    },
    {
      accessorKey: "reading_status",
      header: "Reading Status",
      cell: ({ row }) => (
        <span className="capitalize">{row.getValue("reading_status")}</span>
      ),
    },
    {
      accessorKey: "star_rating",
      header: "Rating",
      cell: ({ row }) =>
        "⭐".repeat(row.getValue("star_rating") ?? 0) || "No rating",
    },
    {
      id: "notes",
      header: "Notes",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedManga(row.original)}
        >
          View Notes
        </Button>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const manga = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => alert(`Editing ${manga.manga_title}`)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert(`Delete ${manga.manga_title}`)}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedManga(manga)}>
                Add note
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const addNote = () => {
    if (!selectedManga || !newNote.trim()) return;
    setData((prev) =>
      prev.map((m) =>
        m.id === selectedManga.id
          ? { ...m, notes: m.notes ? `${m.notes}\n${newNote}` : newNote }
          : m
      )
    );
    setSelectedManga((prev) =>
      prev
        ? { ...prev, notes: prev.notes ? `${prev.notes}\n${newNote}` : newNote }
        : prev
    );
    setNewNote("");
  };

  return (
    <div className="w-full -mt-7 font-mono">
      {/* Filter + Column Toggle */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("manga_title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("manga_title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Notes + Info Sheet */}
      <Sheet
        open={!!selectedManga}
        onOpenChange={(open) => !open && setSelectedManga(null)}
      >
        <SheetContent side="right" className="w-[700px]! min-w-md px-4">
          {selectedManga && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedManga.manga_title}</SheetTitle>
                <SheetDescription>
                  {selectedManga.original_title} / {selectedManga.author}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-4 ml-3 space-y-4">
                <div className="gap-2 text-sm">
                  <div>
                    <span className="font-semibold">Author:</span>{" "}
                    {selectedManga.author}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    {selectedManga.status}
                  </div>
                  <div>
                    <span className="font-semibold">Genres:</span>{" "}
                    {selectedManga.genres!.join(", ")}
                  </div>
                  <div>
                    <span className="font-semibold">Total Chapters:</span>{" "}
                    {selectedManga.total_chapters}
                  </div>
                  <div>
                    <span className="font-semibold">Current Chapter:</span>{" "}
                    {selectedManga.current_chapter}
                  </div>
                  <div>
                    <span className="font-semibold">Reading Status:</span>{" "}
                    {selectedManga.reading_status}
                  </div>
                  <div>
                    <span className="font-semibold">Rating:</span>{" "}
                    {"⭐".repeat(selectedManga.star_rating!)}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold mb-2">Notes</h3>
                  {selectedManga.notes ? (
                    <ul className="list-disc pl-5 whitespace-pre-line">
                      {selectedManga.notes.split("\n").map((note, i) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No notes yet.
                    </p>
                  )}
                  <div className="mt-2 flex gap-2">
                    <Input
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add a new note..."
                    />
                    <Button onClick={addNote}>Add</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MangaTable;
