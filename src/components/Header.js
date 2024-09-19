import React from "react";
import { Link } from "gatsby";

const Header = () => {
  return (
    <header className="bg-white text-black h-[74px] flex shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/SolicitarValor">BANK</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link  className="font-medium hover:underline cursor-pointer">Home</Link>
            </li>
            <li>
              <Link to="/SolicitarValor" className=" font-medium hover:underline">Solicitar Valor</Link>
            </li>
            <li>
              <Link className="font-medium hover:underline cursor-pointer">Sobre</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
