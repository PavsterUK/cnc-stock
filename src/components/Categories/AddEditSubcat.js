import { useState, useContext } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import SimpleModal from "../UI/SimpleModal";
import { CategoriesContext } from "./CategoriesContext";

const AddEditSubcat = ({ isEditMode, name, categoryId }) => {
  const [_name, setName] = useState(name);
  const [feedbackMessage, setFeedbackMessage] = useState();
  const { addSubcategory, fetchCategories } = useContext(CategoriesContext);
  const buttonText = isEditMode ? "Update" : "Add";

  const handleUserInput = (event) => {
    const userInput = event.target.value;
    setName(userInput);
  };

  const saveOrUpdateHandler = async (event) => {
    if (!isEditMode) {
      const response = await addSubcategory(categoryId, _name);
      setFeedbackMessage(response.data);
    }
  };

  return (
    <SimpleModal title={_name} color="warning">
      <div>
        <div>
          <TextField onChange={handleUserInput} value={_name} label="Name" variant="outlined" />
          <Button onClick={saveOrUpdateHandler}>{buttonText}</Button>
        </div>
        <h3 style={{color: "green"}} >{feedbackMessage}</h3>
      </div>
    </SimpleModal>
  );
};

export default AddEditSubcat;
