import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
      <div className="flex-1">
        <a className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
          devTinder
        </a>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-24 md:w-auto"
        />
        <div className="relative group">
          <button className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all">
            <img
              alt="User avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="w-full h-full object-cover"
            />
          </button>
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <ul className="py-2">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Profile
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
