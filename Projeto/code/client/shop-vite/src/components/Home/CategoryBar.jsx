import React, { useState, useRef } from "react";
import "./CategoryBar.css";
import MenuIcon from '@mui/icons-material/Menu';

const categories = [
    "Books", "Toys", "Makeup", "Eletronics", "Home"
];

const moreCategories = [
    "Books", "Toys", "Makeup", "Eletronics","Clothing", "Food", "Sports", "Home"
];

export default function CategoryBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleBlur = () => {
        setIsDropdownOpen(false);
    };
    const [sortedCategories, setSortedCategories] = useState(moreCategories.sort());

    return (
        <div className="category-bar-container">
            <div className="grid-category-bar">
            <button onClick={handleDropdown} onBlur={handleBlur} className="dropdown-toggle"><MenuIcon /></button>
                {categories.map((category) => (
                    <button className="category">
                        <div>
                            {category}
                        </div>
                    </button>
                ))}
                {isDropdownOpen && (
                    <div ref={dropdownRef} onBlur={handleBlur} className="dropdown">
                        {sortedCategories.map((category) => (
                            <button className="category">
                                <div>
                                    {category}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <hr />
        </div>
    );
}
