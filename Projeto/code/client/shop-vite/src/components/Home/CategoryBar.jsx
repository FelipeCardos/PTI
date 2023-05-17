import React, { useState } from "react";
import "./CategoryBar.css";
import MenuIcon from '@mui/icons-material/Menu';
import "./SideBar.css";
import CloseIcon from '@mui/icons-material/Close';

const moreCategories = [
    "Books", "Toys", "Makeup", "Eletronics", "Clothing", "Food", "Sports", "Home"
];
const categories = [
    "Books", "Toys", "Makeup", "Eletronics", "Home"
];

export default function CategoryBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {isMenuOpen && (
                <div>
                    <div>
                        <button className="close-sidebar" onClick={handleClick}>
                            <CloseIcon/>
                        </button>
                    </div>
                    <div className="sidebar-container">
                        <div className="sidebar">
                            <ul>
                                {moreCategories.map((category) => (
                                    <li key={category}>
                                        <button className="sidebar-category">
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            <div className={`category-bar-container ${isMenuOpen ? 'disabled' : ''}`}>
                <div className="grid-category-bar">
                    <button onClick={handleClick} className="dropdown-toggle">
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
        </>
    );
}
