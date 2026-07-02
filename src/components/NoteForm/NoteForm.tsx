import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

const AVAILABLE_TAGS = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  onSubmit: (data: CreateNotePayload) => void;
  onCancel: () => void;
}

const NoteSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required(),

  content: Yup.string().max(500).required(),

  tag: Yup.string()
    .oneOf([...AVAILABLE_TAGS])
    .required(),
});

export const NoteForm = ({ onSubmit, onCancel }: NoteFormProps) => {
  const initialValues: CreateNotePayload = {
    title: "",
    content: "",
    tag: AVAILABLE_TAGS[0],
  };

  return (
    <Formik<CreateNotePayload>
      initialValues={initialValues}
      validationSchema={NoteSchema}
      validateOnMount
      onSubmit={(values, { resetForm }) => {
        console.log("📤 SENDING DATA:", values);
        onSubmit(values); // 👈 ВСЁ! без кастов
        resetForm();
      }}
    >
      {({ isValid, dirty }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              id="content"
              as="textarea"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" name="tag" className={css.select}>
              {AVAILABLE_TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="submit"
              disabled={!dirty || !isValid}
              className={css.submitButton}
            >
              Create note
            </button>

            <button
              type="button"
              onClick={onCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
