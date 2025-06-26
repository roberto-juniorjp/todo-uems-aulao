export interface TodoFormProps {
  newTitle: string;
  setNewTitle: (title: string) => void;
  handleAdd: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isAdding: boolean;
}
