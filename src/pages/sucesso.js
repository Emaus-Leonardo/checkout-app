import React from "react";
import { navigate } from "gatsby";

const Sucesso = () => {
  return (
    <div className="container mx-auto flex justify-center items-center h-screen px-4">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Compra realizada com sucesso!</h1>
        <p className="mb-4">Obrigado pela sua compra.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
};

export default Sucesso;
