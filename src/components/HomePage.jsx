import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to My Projects</h1>
      <NavLink
        to="/ShoppingList"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        activeClassName="active"
      >
        Go to Shopping List
      </NavLink>
    </div>
  );
}
