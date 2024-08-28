import React, { useState } from "react";

const Search = ({ onClose, onCitySelect }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    onCitySelect(inputValue);
  };

  return (
    <div className=" ">
      <div className="flex justify-end p-2 ">
        <button onClick={onClose}>
          <img src="/x.png" alt="Cerrar" className="w-3 my-2 mx-4" />
        </button>
      </div>
      <div className=" w-4/4 mr-6 mx-2 mt-3 ">
        <label htmlFor="search-bar" className="flex items-center ">
          <img src="/lupa.png" alt="searchIcon" className="mr-2" />
          <input
            type="text"
            id="search-bar"
            placeholder="Search location"
            className="flex-grow p-2 border-solid border-white border-[1px] text-white bg-[#1e213a] h-9"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="bg-[#3c47e9] text-white p-2 ml-2 text-center h-9 flex items-center justify-center"
            onClick={handleSearch}
          >
            Search
          </button>
        </label>
        <div className="flex flex-col items-start content-start text-start mt-14 px-4">
          <button
            className="mb-8 hover:border-[1px] hover:border-slate-50 w-[100%] flex p-2 justify-between hover:opacity-50 relative group"
            onClick={() => onCitySelect("London")}
          >
            London
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              &gt;
            </span>
          </button>

          <button
            className="hover:border-[1px] hover:border-slate-50 w-[100%] flex p-2 justify-between hover:opacity-50 relative group"
            onClick={() => onCitySelect("Barcelona")}
          >
            Barcelona
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              &gt;
            </span>
          </button>

          <button
            className="mt-8 hover:border-[1px] hover:border-slate-50 w-[100%] flex p-2 justify-between hover:opacity-50 relative group"
            onClick={() => onCitySelect("Long Beach")}
          >
            Long Beach
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              &gt;
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
