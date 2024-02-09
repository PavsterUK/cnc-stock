import React from "react";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material/";

const MaterialsSelector = ({ selectedMaterials, setSelectedMaterials }) => {

  const handleAttributeChange = (event) => {
    setSelectedMaterials(event.target.value);
  };

  return (
    <FormControl fullWidth >
      <InputLabel id="item-attributes-label">Suitable Materials</InputLabel>
      <Select
        label="Suitable Materials"
        labelId="item-attributes-label"
        id="item-attributes-select"
        multiple
        value={selectedMaterials}
        onChange={handleAttributeChange}
      >
        <MenuItem
          value="P"
          sx={{
            backgroundColor: selectedMaterials.includes("P")
              ? "#0eb6f7 !important"
              : "transparent",
            color: selectedMaterials.includes("P")
              ? "white !important"
              : "black",
          }}
        >
          Mild Steel
        </MenuItem>
        <MenuItem
          value="M"
          sx={{
            backgroundColor: selectedMaterials.includes("M")
              ? "#f6ea02 !important"
              : "transparent",
          }}
        >
          Stainless
        </MenuItem>
        <MenuItem
          value="K"
          sx={{
            backgroundColor: selectedMaterials.includes("K")
              ? "#e31c1e !important"
              : "transparent",
            color: selectedMaterials.includes("K")
              ? "white !important"
              : "black",
          }}
        >
          Cast Iron
        </MenuItem>
        <MenuItem
          value="N"
          sx={{
            backgroundColor: selectedMaterials.includes("N")
              ? "#2dc65b !important"
              : "transparent",
            color: selectedMaterials.includes("N")
              ? "white !important"
              : "black",
          }}
        >
          Non Ferrous
        </MenuItem>
        <MenuItem
          value="S"
          sx={{
            backgroundColor: selectedMaterials.includes("S")
              ? "#f77b00 !important"
              : "transparent",
            color: selectedMaterials.includes("S")
              ? "white !important"
              : "black",
          }}
        >
          Super Alloy
        </MenuItem>
        <MenuItem
          value="H"
          sx={{
            backgroundColor: selectedMaterials.includes("H")
              ? "#bababa !important"
              : "transparent",
            color: selectedMaterials.includes("H")
              ? "white !important"
              : "black",
          }}
        >
          Hardened Steel
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default MaterialsSelector;
