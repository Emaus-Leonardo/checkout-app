import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import InputMask from "react-input-mask";
import { navigate } from "gatsby";
import { z } from "zod";

import pagamentoImg from "../images/pagamentoImg.png";
import LoadingScreen from "../components/LoadingScreen";
import InputField from "../components/InputFiel";

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

const initialFormData = {
  nome: "",
  cpf: "",
  email: "",
  telefone: "",
  endereco: "",
  pagamento: "",
  cartao: { numero: "", titular: "", vencimento: "", cvv: "" },
};

// Mascara dos inputs
const MaskedInputField = ({ label, name, mask, value, onChange, error, placeholder, }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 capitalize">
      {label}
    </label>
    <InputMask mask={mask} value={value} onChange={onChange}>
      {() => (
        <input
          type="text"
          name={name}
          id={name}
          className={`border p-2 w-full outline-none rounded-md bg-slate-50 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
        />
      )}
    </InputMask>
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

// Formulario de Informações Pessoais 
const PersonalInfoForm = ({ formData, handleChange, handleNextStep, errors, }) => (
  <div>
    <h1 className="text-xl font-bold mb-4">Informações Pessoais</h1>
    <form className="flex flex-col gap-4">
      <InputField
        label="Nome"
        type="text"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        error={errors.nome?._errors[0]}
        placeholder="Digite seu Nome"
      />
      <MaskedInputField
        label="CPF"
        name="cpf"
        mask="999.999.999-99"
        value={formData.cpf}
        onChange={handleChange}
        error={errors.cpf?._errors[0]}
        placeholder="Digite seu CPF"
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email?._errors[0]}
        placeholder="Digite seu Email"
      />
      <MaskedInputField
        label="Telefone"
        name="telefone"
        mask="(99) 99999-9999"
        value={formData.telefone}
        onChange={handleChange}
        error={errors.telefone?._errors[0]}
        placeholder="Digite seu Telefone"
      />
      <InputField
        label="Endereço"
        type="text"
        name="endereco"
        value={formData.endereco}
        onChange={handleChange}
        error={errors.endereco?._errors[0]}
        placeholder="Digite seu Endereço"
      />
      <button
        onClick={handleNextStep}
        className="bg-blue-600 border border-blue-600 text-white py-2 px-4 w-full font-medium rounded-md hover:bg-transparent hover:text-blue-600 transition-all duration-200"
      >
        Próximo
      </button>
    </form>
  </div>
);

// Formulario de Pagamento
const PaymentInfoForm = ({ formData, handleChange, handleSubmit, errors, valor, setStep,}) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <div
        className="cursor-pointer order-1 p-1 hover:bg-slate-200 rounded-full transition duration-200 ease-in-out"
        onClick={() => setStep(1)}
        onKeyDown={(e) => e.key === "Enter" && setStep(1)}
        tabIndex={0}
        role="button"
      >
        <IoIosArrowBack size={25} color="black" />
      </div>
      <h1 className="text-xl font-bold">Pagamento - Valor: R${valor}</h1>
    </div>

    <form className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="pagamento" className="block mb-2">
          Forma de Pagamento:
        </label>
        <select
          id="pagamento"
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
        {errors.pagamento && (
          <span className="text-red-500 text-sm">
            {errors.pagamento._errors[0]}
          </span>
        )}
      </div>

      {formData.pagamento === "cartao" && (
        <>
          <MaskedInputField
            label="Número do Cartão"
            name="cartao.numero"
            mask="9999 9999 9999 9999"
            value={formData.cartao.numero}
            onChange={handleChange}
            error={errors.cartao?.numero?._errors[0]}
            placeholder="Digite o Número do Cartão"
          />
          <InputField
            label="Nome do Titular"
            type="text"
            name="cartao.titular"
            value={formData.cartao.titular}
            onChange={handleChange}
            error={errors.cartao?.titular?._errors[0]}
            placeholder="Nome do Titular"
          />
          <InputField
            label="Data de Vencimento"
            type="date"
            name="cartao.vencimento"
            value={formData.cartao.vencimento}
            onChange={handleChange}
            error={errors.cartao?.vencimento?._errors[0]}
          />
          <MaskedInputField
            label="CVV"
            name="cartao.cvv"
            mask="9999"
            value={formData.cartao.cvv}
            onChange={handleChange}
            error={errors.cartao?.cvv?._errors[0]}
            placeholder="CVV"
          />
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
);

// Componente Main
const Checkout = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const valor = queryParams.get("valor");

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("cartao")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        cartao: { ...formData.cartao, [field]: value },
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
        setErrors(error.format());
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

      setTimeout(() => navigate("/sucesso"), 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.format());
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
            {step === 1 ? (
              <PersonalInfoForm
                formData={formData}
                handleChange={handleChange}
                handleNextStep={handleNextStep}
                errors={errors}
              />
            ) : (
              <PaymentInfoForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
                valor={valor}
                setStep={setStep}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
