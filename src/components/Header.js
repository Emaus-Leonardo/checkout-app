import React from "react";
import { Link } from "gatsby";

const Header = () => {
  return (
    <header className="bg-white text-black h-[74px] flex items-center shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:px-8">
        <h1 className="text-xl font-bold">
          <Link to="/SolicitarValor">BANK</Link>
        </h1>
        <nav>
          <div className="flex items-center space-x-4">
            <ul className=" md:flex space-x-4">
              <li>
                <Link to="/SolicitarValor" className="font-medium hover:underline">
                  Solicitar Valor
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
