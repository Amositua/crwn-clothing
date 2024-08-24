import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
}); 

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategories] = useState({});
    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategories(categoryMap);
            
        }   
        getCategoryMap();
    }, []);

    const value = { categoriesMap }
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}