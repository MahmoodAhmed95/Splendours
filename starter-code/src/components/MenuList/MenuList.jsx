import "./MenuList.css";
import MenuListItem from "../MenuListItem/MenuListItem";

export default function MenuList({ menuItems }) {
  const currentDate = new Date();

  const filteredMenuItems = menuItems.filter(
    (item) => new Date(item.endDate) >= currentDate
  );

  const items = filteredMenuItems.map((item) => (
    <MenuListItem key={item._id} menuItem={item} />
  ));

  return <main className="MenuList">{items}</main>;
}