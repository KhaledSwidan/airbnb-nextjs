import React from "react";

const SearchFilter = () => {
  const filters = [
    "Cancellation Flexibility",
    "Type of Place",
    "Price",
    "Rooms and Beds",
    "More filters",
  ];

  return (
    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
      {filters.map((filter) => (
        <button type="button" className="filter-btn" key={filter}>
          {filter}
        </button>
      ))}
    </div>
  );
};

export default SearchFilter;
