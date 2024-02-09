import { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../../constants/config";
import axios from "axios";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  const allCategoriesOption = {
    categoryName: "All Categories",
    id: 1,
  };
  const allSubCategoriesOption = {
    subCategoryName: "All Sub Categories",
    categoryId: allCategoriesOption.id,
    id: 1,
  };
  const [categories, setCategories] = useState([allCategoriesOption]);
  const [subCategories, setSubCategories] = useState([allSubCategoriesOption]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSubCategoriesByCategoryId = async (categoryId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/subcategories/${categoryId}`);
      const subCategories = response.data.filter((subCat) => subCat.id !== 1);
      return [allSubCategoriesOption, ...subCategories];
    } catch (error) {
      console.error("Error fetching sub categories:", error);
    }
  };

  const addSubcategory = async (categoryId, subcategoryName) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/subcategory/add/${categoryId}?subcategoryName=${subcategoryName}`
      );
      return response;
    } catch (error) {
      console.error("Error saving subcategory:", error);
      return error;
    }
  };

  const updateSubcategory = async (subcategoryId, subCategoryName) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/subcategories/update`, subcategoryId, subCategoryName);
    } catch (error) {
      console.error("Error saving subcategory:", error);
    }
  };

  const addCategory = async (categoryName) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/category/add/?categoryName=${categoryName}`);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        subCategories,
        allCategoriesOption,
        allSubCategoriesOption,
        fetchCategories,
        fetchSubCategoriesByCategoryId,
        addSubcategory,
        addCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export { CategoriesContext };
