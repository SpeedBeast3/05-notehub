import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { fetchNotes, createNote, deleteNote } from "../../services/noteService";
import { NoteList } from "../NoteList/NoteList";
import { SearchBox } from "../SearchBox/SearchBox";
import { Pagination } from "../Pagination/Pagination";
import { Modal } from "../Modal/Modal";
import { NoteForm } from "../NoteForm/NoteForm";

import type { CreateNotePayload } from "../NoteForm/NoteForm";
import css from "./App.module.css";

const NOTES_PER_PAGE = 5;

export default function App() {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 400);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: NOTES_PER_PAGE,
        search: searchQuery,
      }),
    placeholderData: (previousData) => previousData,
  });

  console.log("📦 NOTES LIST RESPONSE:", data);
  const notes = data?.notes || [];

  const totalPages = data?.totalPages || 0;

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
        exact: false,
      });

      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      console.log("🔥 CREATED NOTE RESPONSE:", data);
      queryClient.invalidateQueries({
        queryKey: ["notes"],
        exact: false,
      });

      if (notes.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    },
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debouncedSearch} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main className={css.mainContent}>
        {isLoading && notes.length === 0 ? (
          <div className={css.loader}>Loading notes...</div>
        ) : isError ? (
          <div className={css.error}>
            Error:{" "}
            {error instanceof Error ? error.message : "Something went wrong"}
          </div>
        ) : notes.length > 0 ? (
          <NoteList
            notes={notes}
            onDeleteNote={(id) => deleteMutation.mutate(id)}
          />
        ) : (
          <div className={css.empty}>No notes found</div>
        )}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={(data: CreateNotePayload) => createMutation.mutate(data)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
