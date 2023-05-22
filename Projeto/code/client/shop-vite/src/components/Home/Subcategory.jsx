import React, { useState } from "react";

export default function Subcategory({ subCategoryList, idSubCategory, isHovered }) {
  const [isSubcategoryHovered, setIsSubcategoryHovered] = useState(false);

  if (!subCategoryList) {
    return null; // ou outra lógica adequada para lidar com o valor indefinido
  }
  function handleSubcategory(id){
    // Carregar produtos da categoria id
    // Redirecionar ?
  }

  return (
    <div className={`subcategory-container ${isSubcategoryHovered ? 'hovered' : ''}`} onMouseEnter={() => setIsSubcategoryHovered(true)} onMouseLeave={() => setIsSubcategoryHovered(false)}>
      <ul className="subcategory-ulli">
        {subCategoryList.map((subcategory) => (
          <li key={subcategory.id}>
            <button className="subcategory" onClick={() =>handleSubcategory(subcategory.id)}>{subcategory.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
