import { useState, useContext } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import SimpleModal from "../UI/SimpleModal";
import { CategoriesContext } from "./CategoriesContext";

const AddEditCategory = ({ isEditMode, title, name, id }) => {
  const [_name, setName] = useState(name);
  const [feedbackMessage, setFeedbackMessage] = useState();
  const { addCategory, fetchCategories } = useContext(CategoriesContext);
  const buttonText = isEditMode ? "Update" : "Add";

  const handleUserInput = (event) => {
    const userInput = event.target.value;
    setName(userInput);
  };

  const saveOrUpdateHandler = async (event) => {
    if (!isEditMode) {
      const status = await addCategory(_name);
      fetchCategories()
    }
  };

  return (
    <SimpleModal title={_name} color="primary">
      <TextField onChange={handleUserInput} value={_name} label="Name" variant="outlined" />
      <Button onClick={saveOrUpdateHandler}>{buttonText}</Button>
      <h3>{feedbackMessage}</h3>
    </SimpleModal>
  );
};

export default AddEditCategory;
