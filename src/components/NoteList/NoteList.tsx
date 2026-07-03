// src/components/NoteList/NoteList.tsx
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
}

export const NoteList = ({ notes, onDeleteNote }: NoteListProps) => {
  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            {note.tag &&
              note.tag.map((tag) => (
                <span key={tag.id} className={css.tag}>
                  {tag.name}
                </span>
              ))}

            <button
              className={css.button}
              onClick={() => onDeleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
