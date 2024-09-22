import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import InputMask from "react-input-mask";
import { navigate } from "gatsby";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import pagamentoImg from "../images/pagamentoImg.png";
import LoadingScreen from "../components/LoadingScreen";
import InputField from "../components/InputField";

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

// Componente de Campo com Máscara
const MaskedInputField = ({
  label,
  name,
  control,
  mask,
  error,
  placeholder,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 capitalize">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputMask
          mask={mask}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        >
          {() => (
            <input
              type="text"
              id={name}
              className={`border p-2 w-full outline-none rounded-md bg-slate-50 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={placeholder}
            />
          )}
        </InputMask>
      )}
    />
    {error && <span className="text-red-500 text-sm">{error.message}</span>}
  </div>
);

// Formulário de Informações Pessoais
const PersonalInfoForm = ({ onSubmit, register, errors, control }) => (
  <div>
    <h1 className="text-xl font-bold mb-4">Informações Pessoais</h1>
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <InputField
        label="Nome"
        type="text"
        name="nome"
        register={register}
        error={errors.nome}
        placeholder="Digite seu Nome"
      />
      <MaskedInputField
        label="CPF"
        name="cpf"
        mask="999.999.999-99"
        control={control}
        error={errors.cpf}
        placeholder="Digite seu CPF"
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        register={register}
        error={errors.email}
        placeholder="Digite seu Email"
      />
      <MaskedInputField
        label="Telefone"
        name="telefone"
        mask="(99) 99999-9999"
        control={control}
        error={errors.telefone}
        placeholder="Digite seu Telefone"
      />
      <InputField
        label="Endereço"
        type="text"
        name="endereco"
        register={register}
        error={errors.endereco}
        placeholder="Digite seu Endereço"
      />
      <button
        type="submit"
        className="bg-blue-600 border border-blue-600 text-white py-2 px-4 w-full font-medium rounded-md hover:bg-transparent hover:text-blue-600 transition-all duration-200"
      >
        Próximo
      </button>
    </form>
  </div>
);

// Formulário de Pagamento
const PaymentInfoForm = ({ onSubmit, register, errors, control, valor, stepBack, watch }) => {
  const selectedPayment = watch("pagamento");

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div
          onClick={stepBack}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && stepBack()}
          role="button"
          tabIndex={0}
          className="cursor-pointer order-1 p-1 hover:bg-slate-200 rounded-full transition duration-200 ease-in-out"
        >
          <IoIosArrowBack size={25} color="black" />
        </div>

        <h1 className="text-xl font-bold">Pagamento - Valor: R${valor}</h1>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="pagamento" className="block mb-2">
            Forma de Pagamento:
          </label>
          <select
            id="pagamento"
            {...register("pagamento")}
            className={`border p-2 w-full outline-none rounded-md bg-slate-50 ${
              errors.pagamento ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Selecione</option>
            <option value="cartao">Cartão</option>
            <option value="boleto">Boleto</option>
            <option value="pix">Pix</option>
          </select>
          {errors.pagamento && (
            <span className="text-red-500 text-sm">
              {errors.pagamento.message}
            </span>
          )}
        </div>

        {selectedPayment === "cartao" && (
          <>
            <MaskedInputField
              label="Número do Cartão"
              name="cartao.numero"
              mask="9999 9999 9999 9999"
              control={control}
              error={errors.cartao?.numero}
              placeholder="Digite o Número do Cartão"
            />
            <InputField
              label="Nome do Titular"
              type="text"
              name="cartao.titular"
              register={register}
              error={errors.cartao?.titular}
              placeholder="Nome do Titular"
            />
            <InputField
              label="Data de Vencimento"
              type="date"
              name="cartao.vencimento"
              register={register}
              error={errors.cartao?.vencimento}
            />
            <MaskedInputField
              label="CVV"
              name="cartao.cvv"
              mask="999"
              control={control}
              error={errors.cartao?.cvv}
              placeholder="CVV"
            />
          </>
        )}
        <button
          type="submit"
          className="bg-emerald-500 border border-emerald-500 text-white py-2 px-4 w-full font-medium rounded-md hover:bg-transparent hover:text-emerald-500 transition-all duration-200"
        >
          Finalizar Compra
        </button>
      </form>
    </div>
  );
};

// Componente Main
const Checkout = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const valor = queryParams.get("valor");

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(step === 1 ? personalInfoSchema : paymentInfoSchema),
  });

  const onSubmitPersonalInfo = (data) => {
    console.log("Dados de informações pessoais:", data);
    setStep(2);
    reset(data);
  };

  const onSubmitPaymentInfo = (data) => {
    console.log("Dados de pagamento:", data);
    setIsLoading(true);
    setTimeout(() => {
      navigate("/sucesso");
    }, 1000);
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
                onSubmit={handleSubmit(onSubmitPersonalInfo)}
                register={register}
                errors={errors}
                control={control}
              />
            ) : (
              <PaymentInfoForm
                onSubmit={handleSubmit(onSubmitPaymentInfo)}
                register={register}
                errors={errors}
                control={control}
                valor={valor}
                stepBack={() => setStep(1)}
                watch={watch}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

