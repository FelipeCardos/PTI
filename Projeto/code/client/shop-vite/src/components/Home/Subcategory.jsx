import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Subcategory({ subCategoryList }) {
  const [isSubcategoryHovered, setIsSubcategoryHovered] = useState(false);
  let navigate = useNavigate();
  if (!subCategoryList) {
    return null; // ou outra lógica adequada para lidar com o valor indefinido
  }
  function handleSubcategory(id){
    navigate(`/products?category=${id}`);    
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
