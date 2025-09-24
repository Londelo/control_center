type ToggleEditModeArgs = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

const ToggleEditMode = ({ isEditing, setIsEditing }: ToggleEditModeArgs) => () => {
  setIsEditing(!isEditing);
};

export default ToggleEditMode;
