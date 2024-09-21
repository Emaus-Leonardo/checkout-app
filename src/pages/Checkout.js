import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import InputMask from "react-input-mask";
import { navigate } from "gatsby";
import { z } from "zod";

import pagamentoImg from "../images/pagamentoImg.png";
import LoadingScreen from "../components/LoadingScreen";

const personalInfoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z
    .string()
    .min(11, "CPF deve ter no mínimo 11 caracteres")
    .max(14, "CPF deve ter no máximo 14 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone deve ter no mínimo 10 caracteres"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
});

const paymentInfoSchema = z.object({
  pagamento: z.enum(["cartao", "boleto", "pix"], "Forma de pagamento inválida"),
  cartao: z
    .object({
      numero: z.string().min(16, "Número do cartão inválido"),
      titular: z.string().min(1, "Nome do titular é obrigatório"),
      vencimento: z.string().min(1, "Data de vencimento é obrigatória"),
      cvv: z.string().min(3, "CVV deve ter no mínimo 3 dígitos"),
    })
    .optional(),
});

const Checkout = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const valor = queryParams.get("valor");

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereco: "",
    pagamento: "",
    cartao: { numero: "", titular: "", vencimento: "", cvv: "" },
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("cartao")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        cartao: {
          ...formData.cartao,
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    try {
      personalInfoSchema.parse(formData);
      setErrors({});
      setStep(2);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format();
        setErrors(formattedErrors);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const validationSchema =
        formData.pagamento === "cartao"
          ? paymentInfoSchema
          : paymentInfoSchema.omit({ cartao: true });

      validationSchema.parse(formData);
      setErrors({});
      setIsLoading(true);

      setTimeout(() => {
        navigate("/sucesso");
      }, 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format();
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl flex flex-col md:flex-row">
          <div className="md:flex-1 hidden md:block">
            <img
              src={pagamentoImg}
              alt="imagem pagamento"
              className="w-full h-full object-cover md:rounded-l-xl"
            />
          </div>

          <div className="flex-1 p-4 md:p-8">
            {step === 1 && (
              <div>
                <h1 className="text-2xl font-bold mb-4">Informações Pessoais</h1>

                <form role="form" className="flex flex-col gap-4">
                  {["nome", "cpf", "email", "telefone", "endereco"].map((field) => (
                    <div key={field} className="flex flex-col">
                      <label htmlFor={field} className="mb-1 capitalize">
                        {field}
                      </label>
                      {field === "cpf" ? (
                        <InputMask
                          mask="999.999.999-99"
                          value={formData.cpf}
                          onChange={handleChange}
                        >
                          {() => (
                            <input
                              type="text"
                              name={field}
                              id={field}
                              className={`border p-2 w-full outline-none rounded-md bg-slate-50 ${
                                errors[field] ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="Digite seu CPF"
                            />
                          )}
                        </InputMask>
                      ) : field === "telefone" ? (
                        <InputMask
                          mask="(99) 99999-9999"
                          value={formData.telefone}
                          onChange={handleChange}
                        >
                          {() => (
                            <input
                              type="text"
                              name={field}
                              id={field}
                              className={`border p-2 w-full outline-none rounded-md bg-slate-50 ${
                                errors[field] ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="Digite seu Telefone"
                            />
                          )}
                        </InputMask>
                      ) : (
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          id={field}
                          className={`border p-2 w-full outline-none rounded-md bg-slate-50 ${
                            errors[field] ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder={`Digite seu ${
                            field.charAt(0).toUpperCase() + field.slice(1)
                          }`}
                          value={formData[field]}
                          onChange={handleChange}
                        />
                      )}
                      {errors[field] && (
                        <span className="text-red-500 text-sm">
                          {errors[field]._errors[0]}
                        </span>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={handleNextStep}
                    className="bg-blue-600 border border-blue-600 text-white py-2 px-4 w-full font-medium rounded-md hover:bg-transparent hover:text-blue-600 transition-all duration-200"
                  >
                    Próximo
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div
                    className="cursor-pointer order-1 p-1 hover:bg-slate-200 rounded-full transition duration-200 ease-in-out"
                    onClick={() => setStep(1)}
                  >
                    <IoIosArrowBack size={25} color="black" />
                  </div>

                  <h1 className="text-2xl font-bold ">Pagamento - Valor: R${valor}</h1>
                </div>

                <form role="form" className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label className="block mb-2">Forma de Pagamento:</label>
                    <select
                      name="pagamento"
                      className={`border p-2 w-full outline-none rounded-md bg-slate-50 ${
                        errors.pagamento ? "border-red-500" : "border-gray-300"
                      }`}
                      value={formData.pagamento}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      <option value="cartao">Cartão</option>
                      <option value="boleto">Boleto</option>
                      <option value="pix">Pix</option>
                    </select>
                  </div>

                  {formData.pagamento === "cartao" && (
                    <>
                      {["numero", "titular", "vencimento", "cvv"].map((field) => (
                        <div key={field} className="flex flex-col">
                          <label htmlFor={`cartao.${field}`} className="mb-1 capitalize">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          {field === "numero" ? (
                            <InputMask
                              mask="9999 9999 9999 9999"
                              value={formData.cartao[field]}
                              onChange={handleChange}
                            >
                              {() => (
                                <input
                                  type="text"
                                  name={`cartao.${field}`}
                                  id={`cartao.${field}`}
                                  className={`border p-2 w-full outline-none rounded-md bg-slate-50 ${
                                    errors.cartao?.[field]
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                  placeholder={`Digite ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                />
                              )}
                            </InputMask>
                          ) : (
                            <input
                              type={field === "vencimento" ? "date" : "text"}
                              name={`cartao.${field}`}
                              id={`cartao.${field}`}
                              className={`border p-2 w-full outline-none rounded-md bg-slate-50 ${
                                errors.cartao?.[field] ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder={`Digite ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                              value={formData.cartao[field]}
                              onChange={handleChange}
                            />
                          )}
                          {errors.cartao?.[field] && (
                            <span className="text-red-500 text-sm">
                              {errors.cartao[field]._errors[0]}
                            </span>
                          )}
                        </div>
                      ))}
                    </>
                  )}

                  <button
                    onClick={handleSubmit}
                    className="bg-emerald-500 border border-emerald-500 text-white py-2 px-4 w-full font-medium rounded-md hover:bg-transparent hover:text-emerald-500 transition-all duration-200"
                  >
                    Finalizar Compra
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
