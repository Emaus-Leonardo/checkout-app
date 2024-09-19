import React, { useState } from "react";
import { navigate } from "gatsby";
import pagamentoImg from "../images/pagamentoImg.png";
import { z } from "zod";

import Loading from "../components/Loading";

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

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="mt-4">
        <Loading/>
      </div>
    </div>
  </div>
);

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
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="flex items-center justify-center h-screen p-4">
          <div className="flex max-w-[900px] w-full bg-white rounded-xl shadow-lg">
            <div className="flex-1">
              <img
                src={pagamentoImg}
                alt="imagem pagamento"
                className="w-full h-full object-cover rounded-l-xl"
              />
            </div>

            <div className="flex-1 p-8">
              {step === 1 && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">Informações Pessoais</h1>

                  <form role="form" className="flex flex-col w-[400px]">
                    <div className="flex flex-col">
                      <label htmlFor="nome">Nome</label>
                      <input
                        type="text"
                        name="nome"
                        className={`border p-2 w-full mb-2 outline-none rounded-md bg-slate-50 ${
                          errors.nome ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Digite o Nome Completo"
                        value={formData.nome}
                        onChange={handleChange}
                      />
                      {errors.nome && (
                        <span className="text-red-500 text-sm">
                          {errors.nome._errors[0]}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="cpf">CPF</label>
                      <input
                        type="text"
                        name="cpf"
                        className={`border p-2 w-full mb-2 outline-none rounded-md bg-slate-50 ${
                          errors.cpf ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Digite o CPF"
                        value={formData.cpf}
                        onChange={handleChange}
                      />
                      {errors.cpf && (
                        <span className="text-red-500 text-sm">
                          {errors.cpf._errors[0]}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        className={`border p-2 w-full mb-2 outline-none rounded-md bg-slate-50 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Digite seu Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors?.email && (
                        <span className="text-red-600">
                          {errors.email._errors[0]}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="telefone">Telefone</label>
                      <input
                        type="text"
                        name="telefone"
                        className={`border p-2 w-full mb-2 outline-none rounded-md bg-slate-50 ${
                          errors.telefone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Digite seu Telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                      />
                      {errors?.telefone && (
                        <span className="text-red-600">
                          {errors.telefone._errors[0]}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="endereco">Endereço</label>
                      <input
                        type="text"
                        name="endereco"
                        className={`border p-2 w-full mb-2 outline-none rounded-md bg-slate-50 ${
                          errors.endereco ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Digite o Endereço"
                        value={formData.endereco}
                        onChange={handleChange}
                      />
                      {errors?.endereco && (
                        <span className="text-red-600">
                          {errors.endereco._errors[0]}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleNextStep}
                      className="mt-3 bg-blue-600 border border-blue-600 text-white py-2 px-4 w-full font-medium rounded-md hover:bg-transparent hover:text-blue-600 transition-all duration-200"
                    >
                      Próximo
                    </button>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="flex justify-between items-center">
                    <div
                      className="order-1 mb-4 cursor-pointer"
                      onClick={() => setStep(1)}
                    >
                      <p className="text-blue-600 underline">Voltar</p>
                    </div>

                    <h1 className="text-2xl font-bold mb-4">
                      Pagamento - Valor: R${valor}
                    </h1>
                  </div>

                  <form role="form" className="flex flex-col gap-1 w-[400px]">
                    <div className="flex flex-col">
                      <label className="block mb-2">Forma de Pagamento:</label>
                      <select
                        name="pagamento"
                        className={`border p-2 w-full mb-2 outline-none rounded-md bg-slate-50 ${
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
                      {errors.pagamento && (
                        <span className="text-red-500 text-sm">
                          {errors.pagamento._errors[0]}
                        </span>
                      )}
                    </div>

                    {formData.pagamento === "cartao" && (
                      <>
                        <div className="flex flex-col">
                          <label htmlFor="numero">Número do Cartão</label>
                          <input
                            type="text"
                            name="cartao.numero"
                            className={`border p-2 w-full mb-2 outline-none rounded-md bg-slate-50 ${
                              errors.cartao?.numero ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Digite o Número do Cartão"
                            value={formData.cartao.numero}
                            onChange={handleChange}
                          />
                          {errors.cartao?.numero && (
                            <span className="text-red-500 text-sm">
                              {errors.cartao.numero._errors[0]}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="titular">Nome do Titular</label>
                          <input
                            type="text"
                            name="cartao.titular"
                            className={`border p-2 w-full mb-2 outline-none rounded-md bg-slate-50 ${
                              errors.cartao?.titular ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Digite o Nome do Titular"
                            value={formData.cartao.titular}
                            onChange={handleChange}
                          />
                          {errors.cartao?.titular && (
                            <span className="text-red-500 text-sm">
                              {errors.cartao.titular._errors[0]}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="vencimento">Data de Vencimento</label>
                          <input
                            type="date"
                            name="cartao.vencimento"
                            className={`border p-2 w-full mb-2 outline-none rounded-md bg-slate-50 ${
                              errors.cartao?.vencimento ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="MM/AA"
                            value={formData.cartao.vencimento}
                            onChange={handleChange}
                          />
                          {errors.cartao?.vencimento && (
                            <span className="text-red-500 text-sm">
                              {errors.cartao.vencimento._errors[0]}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="cvv">CVV</label>
                          <input
                            type="text"
                            name="cartao.cvv"
                            className={`border p-2 w-full mb-2 outline-none rounded-md bg-slate-50 ${
                              errors.cartao?.cvv ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Digite o CVV"
                            value={formData.cartao.cvv}
                            onChange={handleChange}
                          />
                          {errors.cartao?.cvv && (
                            <span className="text-red-500 text-sm">
                              {errors.cartao.cvv._errors[0]}
                            </span>
                          )}
                        </div>
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
        </div>
      )}
    </>
  );
};

export default Checkout;
