import React, { useState, useEffect, useRef } from "react";
import * as itemsAPI from "../../utilities/items-api";
import "./HomePage.css";
import MenuList from "../../components/MenuList/MenuList";
import CategoryList from "../../components/CategoryList/CategoryList";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

// Styled component for the scrollable area
const ScrollableDiv = styled(Paper)(({ theme }) => ({
  maxHeight: "900px", // Set the maximum height for the scrollable area
  overflowY: "auto", // Enable vertical scrolling if content overflows
  border: "1px solid #ccc", // Add a border for visual separation
  padding: theme.spacing(2), // Add padding as needed
}));

export default function HomePage({ user, setUser }) {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCat, setActiveCat] = useState("");
  const categoriesRef = useRef([]);

  useEffect(() => {
    async function getItems() {
      const items = await itemsAPI.getAll();
      categoriesRef.current = [
        ...new Set(items.map((item) => item.categoryId.name)),
      ];
      setMenuItems(items);
      setActiveCat(categoriesRef.current[0]);
    }
    getItems();
  }, []);

  return (
    <main className="Main">
      <div className="HomePage">
        <ScrollableDiv>
          <MenuList
            menuItems={menuItems.filter(
              (item) => item.categoryId.name === activeCat
            )}
          />
        </ScrollableDiv>
        <Box>
        <div className="Cats">
          <CategoryList
            categories={categoriesRef.current}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
          />
          </div>
        </Box>
      </div>
    </main>
  );
}
