import React, { useState } from 'react'
import { BiSearch, BiCaretDown, BiCheck } from "react-icons/bi";

const DropDown = ({ toggle, sortBy, onChangeSortHandler, orderBy, onChangeOrderHandler }) => {
    if (!toggle) return null;
    return (
        <div
            className="origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
            <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
            >
                <div
                    onClick={() => onChangeSortHandler("petName")}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
                    role="menuitem"
                >
                    Pet Name { sortBy==="petName" && <BiCheck />}
                </div>
                <div
                    onClick={() => onChangeSortHandler("ownerName")}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
                    role="menuitem"
                >
                    Owner Name {sortBy === "ownerName" && <BiCheck />}
                </div>
                <div
                    onClick={() => onChangeSortHandler("aptDate")}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
                    role="menuitem"
                >
                    Date {sortBy === "aptDate" && <BiCheck />}
                </div>
                <div
                    onClick={() => onChangeOrderHandler("asc")}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2"
                    role="menuitem"
                >
                    Asc{orderBy === "asc" && <BiCheck />}
                </div>
                <div
                    onClick={() => onChangeOrderHandler("desc")}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
                    role="menuitem"
                >
                    Desc{orderBy === "desc" && <BiCheck />}
                </div>
            </div>
        </div>
    )
}

function SearchAppointment({ searchQuery, onSearchQueryChange, sortBy, orderBy, onChangeSortHandler, onChangeOrderHandler }) {
    const [toggle, setToggle] = useState(false);
    return (
        <>
            <div className="py-5  mx-12">
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BiSearch />
                        <label htmlFor="query" className="sr-only" />
                    </div>
                    <input
                        type="text"
                        className="pl-8 py-2 rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border border-gray-500"
                        placeholder="Search"
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    setToggle(!toggle);
                                }}
                                className="justify-center px-4 py-2 bg-green-800 border-2 border-green-800 text-sm text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center rounded rounded-l-none"
                                id="options-menu"
                                aria-haspopup="true"
                                aria-expanded="true"
                            >
                                Sort By <BiCaretDown className="ml-2" />
                            </button>
                            <DropDown
                                toggle={toggle}
                                sortBy={sortBy}
                                onChangeSortHandler={(sort) => onChangeSortHandler(sort)}
                                orderBy={orderBy}
                                onChangeOrderHandler={(order)=>onChangeOrderHandler(order)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchAppointment;