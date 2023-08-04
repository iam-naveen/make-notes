import NotesList from "../components/NotesList";
import InputForm from "../components/InputForm";

export default function HomePage() {
  return (
    <div className="w-full text-center px-3">
      <InputForm />
      <NotesList />
    </div>
  );
}
