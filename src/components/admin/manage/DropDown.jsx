import { useState } from "react";

export default function DropDown({ label, items, className = "", onItemClick }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={`relative ${className}`}>
      {/* Texte cliquable */}
      <span
        className="px-4 block font-semibold hover:text-red-500 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
      </span>

      {/* Dropdown visible uniquement si open === true */}
      {open && (
        <ul className="absolute left-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                onItemClick(item);
                setOpen(false); // referme le menu après clic
              }}
              className="px-4 py-2 hover:bg-red-400 text-gray-700 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
