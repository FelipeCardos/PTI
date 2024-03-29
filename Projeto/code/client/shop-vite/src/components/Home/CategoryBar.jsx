import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryBar.css";
import "./SideBar.css";
import Subcategory from "./Subcategory";

const categories = [
  {
    name: "Home & Kitchen",
    id: 3,
  },
  {
    name: "Electronics",
    id: 1,
  },
  {
    name: "Clothing",
    id: 2,
  },
  {
    name: "Mobile Phones",
    id: 5,
  },
  {
    name: "Bottoms",
    id: 7,
  },
];

export default function CategoryBar() {
  const [moreCategories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategories, setHoveredCategories] = useState([]);
  const [isSubcategoryVisible, setIsSubcategoryVisible] = useState(false);
  const [subCategory, setSubcategory] = useState([]);
  const [idSubCategory, setIdSubCategory] = useState();
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);

  let navigate = useNavigate();
  const sidebarRef = useRef(null);
  const dropdownToggleRef = useRef(null);

  useEffect(() => {
    loadCategories();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isMenuOpen]);

  function handleCategory(id) {
    setIsCategoryClicked(true);
    navigate(`/products?category=${id}`);
  }

  function loadCategories() {
    axios
      .get("https://yourlocalshop.pt:3000/api/v1/categories")
      .then((response) => {
        let categories = [];

        for (let category of response.data) {
          if (category.parent_category === null) categories.push(category);
        }
        setCategories(sortedCategories(categories));
        setHoveredCategories(new Array(categories.length).fill(false));
      });
  }

  function loadSubCategory(id) {
    axios
      .get("https://yourlocalshop.pt:3000/api/v1/categories/" + id)
      .then((response) => {
        setSubcategory(response.data.subcategories);
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
      setIsSubcategoryVisible(false);
    }
  }

  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
    setIsSubcategoryVisible(false);
  }

  function sortedCategories(categories) {
    const sortedCategories = categories.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return sortedCategories;
  }

  return (
    <div>
      {isMenuOpen && (
        <div className='container-sidebar' ref={sidebarRef}>
          <div
            className={`sidebar-grid`}
            style={{ display: isSubcategoryVisible ? "grid" : "flex" }}
          >
            <div className='container-category'>
              <ul className='sidebar-ulli'>
                {moreCategories.map((category, index) => (
                  <li className='sidebar-ulli' key={category.id}>
                    <button
                      className='sidebar-category'
                      onClick={() => loadSubCategory(category.id)}
                    >
                      <div id={category.id}>
                        <p>{category.name}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {isSubcategoryVisible && (
              <div className='container-subcategory'>
                <Subcategory
                  subCategoryList={subCategory}
                  idSubCategory={idSubCategory}
                  disabled={!isCategoryClicked}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className={`category-bar-container ${isMenuOpen ? "disabled" : ""}`}>
        <div className='grid-category-bar'>
          <button
            onClick={handleClick}
            className='dropdown-toggle'
            ref={dropdownToggleRef}
          >
            <MenuIcon />
          </button>
          {categories.map((category) => (
            <button
              className='category'
              key={category.id}
              onClick={() => handleCategory(category.id)}
            >
              <div>{category.name}</div>
            </button>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
}
