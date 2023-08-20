import { useState, useEffect, useRef } from "react";
import * as itemsAPI from "../../utilities/items-api";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import MenuList from "../../components/MenuList/MenuList";
import CategoryList from "../../components/CategoryList/CategoryList";
import UserLogOut from "../../components/UserLogOut/UserLogOut";

export default function HomePage({ user, setUser }) {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCat, setActiveCat] = useState("");
  const categoriesRef = useRef([]);

  useEffect(() => {
    console.log("iam here");
    async function getItems() {
      const items = await itemsAPI.getAll();
      console.log(`items ===> ${items[0].name}`);
      categoriesRef.current = [
        ...new Set(items.map((item) => item.categoryId.name)),
      ];
      setMenuItems(items);
      setActiveCat(categoriesRef.current[0]);
    }
    getItems();
  }, []);

  return (
    <main className="HomePage">
      <aside>
        <CategoryList
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />
        {/* <Link to="/orders" className="button btn-sm">
          PREVIOUS ORDERS
        </Link> */}
        <MenuList
          menuItems={menuItems.filter(
            (item) => item.categoryId.name === activeCat
          )}
        />
      </aside>
      {/* <UserLogOut user={user} setUser={setUser} /> */}
    </main>
  );
}
