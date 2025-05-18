import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function ShoppingList() {
  const LOCAL_STORAGE_KEY = "shoppingList";
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedItems
      ? JSON.parse(savedItems)
      : [
          // Menemen malzemeleri
          { id: 15, name: "Tomato", quantity: 7 },
          { id: 16, name: "Green Pepper", quantity: 4 },
          { id: 17, name: "Eggs", quantity: 7 },
          { id: 18, name: "Butter", quantity: 1 },
          { id: 19, name: "Salt", quantity: 1 },
          { id: 20, name: "Black Pepper", quantity: 1 },
          { id: 21, name: "Bread", quantity: 7 },
          { id: 22, name: "Tea", quantity: 1 },
          { id: 23, name: "Sugar", quantity: 1 },
          { id: 24, name: "Baklava", quantity: 1 },
        ];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <Toaster />
      <Header />
      <Form setItems={setItems} items={items} />
      <List
        items={items}
        setItems={setItems}
        localStorageKey={LOCAL_STORAGE_KEY}
      />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-yellow-200 text-center py-4">
      <h1 className="text-2xl font-bold">🛒Shopping List</h1>
    </header>
  );
}

function Form({ setItems, items }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Please enter an item name");
      return;
    }
    const newItem = {
      id: Date.now(),
      name: name,
      quantity: quantity,
    };
    setItems([...items, newItem]);
    toast.success(`${newItem.name} is added!`);

    setName("");
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Add an item"
        className="border border-gray-300 rounded-l px-4 py-2"
      />
      <input
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        type="number"
        placeholder="1"
        className="border border-gray-300 rounded-l px-2 py-1 max-w-[60px]"
        min="1"
      />
      <button className="bg-blue-500 text-white rounded-r px-4 py-2 hover:bg-blue-600 cursor-pointer">
        Add
      </button>
    </form>
  );
}

function List({ items, setItems, localStorageKey }) {
  return (
    <div className="flex justify-center m-4">
      <ul className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            items={items}
            setItems={setItems}
            localStorageKey={localStorageKey}
          />
        ))}
      </ul>
    </div>
  );
}

function ListItem({ item, items, setItems, localStorageKey }) {
  const removeItem = () => {
    console.log("Silme işlemi çalıştı!");
    const newItems = items.filter((i) => i.id !== item.id);
    setItems(newItems);
    localStorage.setItem(localStorageKey, JSON.stringify(newItems));

    toast.error(`${item.name} is removed!`);
  };

  return (
    <li className="font-semibold bg-amber-200 p-2 rounded-xl min-w-[150px] text-center">
      <span>{item.quantity}</span> - <span>{item.name}</span>
      <button
        onClick={removeItem}
        className="bg-amber-700 mx-2 rounded-full text-white px-2 hover:bg-red-400 cursor-pointer"
      >
        X
      </button>
    </li>
  );
}
