import React, { useEffect, useState, useRef } from "react";
import "./CategoryBar.css";
import MenuIcon from '@mui/icons-material/Menu';
import "./SideBar.css";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Subcategory from "./Subcategory";

const categories = [
  "Books", "Toys", "Makeup", "Electronics", "Home"
];

export default function CategoryBar() {
  const [moreCategories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategories, setHoveredCategories] = useState([]);

  const sidebarRef = useRef(null);
  const dropdownToggleRef = useRef(null);

  const [isSubcategoryVisible, setIsSubcategoryVisible] = useState(false);
  const [subCategory, setSubcategory] = useState([]);
  const [idSubCategory, setIdSubCategory] = useState();

  useEffect(() => {
    loadCategories();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function loadCategories() {
    axios.get("http://localhost:3000/api/v1/categories")
      .then((response) => {
        setCategories(response.data);
        setHoveredCategories(new Array(response.data.length).fill(false));
      });
  }
  function loadSubCategory(id) {
    axios.get("http://localhost:3000/api/v1/categories/" + id)
      .then((response) => {
        setSubcategory(response.data);
        setIdSubCategory(id);
        setIsSubcategoryVisible(true);
      });
  }


  function handleClickOutside(event) {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      !dropdownToggleRef.current.contains(event.target)
      
    ) {
      setIsMenuOpen(false);
      setisSubcategoryVisible(false);
    }
  }

  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
    setIsSubcategoryVisible(false);
  }
  return (
    <div>
      {isMenuOpen && (
        <div className="container-sidebar" ref={sidebarRef}>
          <div className="sidebar-grid">
            <div className="container-category">
              <ul className="sidebar-ulli">
                {moreCategories.map((category, index) => (
                  <li className="sidebar-ulli" key={category.id}>
                    <button className="sidebar-category" isHovered={hoveredCategories[index]} onClick={() => loadSubCategory(category.id)}>
                      <div id={category.id}>
                        <p>{category.name}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {isSubcategoryVisible && (
              <div className="container-subcategory">
                <Subcategory subCategoryList={subCategory} idSubCategory={idSubCategory} />
              </div>
            )}
          </div>
        </div>
      )}
      <div className={`category-bar-container ${isMenuOpen ? 'disabled' : ''}`}>
        <div className="grid-category-bar">
          <button onClick={handleClick} className="dropdown-toggle" ref={dropdownToggleRef}>
            <MenuIcon />
          </button>
          {categories.map((category) => (
            <button className="category" key={category}>
              <div>{category}</div>
            </button>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
}
