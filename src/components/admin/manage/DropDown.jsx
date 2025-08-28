export default function DropDown({ label, items, className = "", onItemClick }) {
  return (
    <li className={`relative cursor-pointer group ${className}`}>
      <span className="px-4 block font-semibold hover:text-red-500">
        {label}
        <ul className="absolute left-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg invisible group-hover:visible">
          {items.map((item, index) => (
            <li
              key={index}
              onChange={() => onItemClick(item)}
              className="px-4 py-2 hover:bg-red-400 text-gray-700 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </span>
    </li>
  );
}
