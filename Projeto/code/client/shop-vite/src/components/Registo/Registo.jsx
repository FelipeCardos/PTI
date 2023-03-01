import React, { useState } from "react";

export default function Registo(props) {
  let tipoDeRegisto = props.tipo;
  const [formData, setFormData] = useState({
    primeiroNome: "",
    ultimoNome: "",
    password: "",
    morada: {
      rua: "",
      pais: "",
      distrito: "",
      concelho: "",
      freguesia: "",
      codPostal: "",
    },
    nif: "",
    telemovel: "",
    email: "",
    utilizador: "",
    tipo: tipoDeRegisto,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // submitToApi(formData)
    console.log(formData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Primeiro nome'
          onChange={handleChange}
          name='primeiroNome'
          value={formData.primeiroNome}
        />
        <input
          type='text'
          placeholder='Último nome'
          onChange={handleChange}
          name='ultimoNome'
          value={formData.ultimoNome}
        />
        <select
          name='pais'
          value={formData.morada.pais}
          onChange={handleChange}
        >
          <option value=''>-- Selecione o seu país --</option>
        </select>
        <select
          name='distrito'
          value={formData.morada.distrito}
          onChange={handleChange}
        >
          <option value=''>-- Selecione o seu distrito --</option>
        </select>
        <select
          name='concelho'
          value={formData.morada.concelho}
          onChange={handleChange}
        >
          <option value=''>-- Selecione o seu concelho --</option>
        </select>
        <select
          name='freguesia'
          value={formData.morada.freguesia}
          onChange={handleChange}
        >
          <option value=''>-- Selecione a sua freguesia --</option>
        </select>
        <input
          type='text'
          placeholder='Morada'
          onChange={handleChange}
          name='rua'
          value={formData.morada.rua}
        />
        <input
          type='text'
          placeholder='Código postal'
          onChange={handleChange}
          name='codPostal'
          value={formData.morada.codPostal}
        />
        <input
          type='text'
          placeholder='NIF'
          onChange={handleChange}
          name='nif'
          value={formData.nif}
        />
        <input
          type='text'
          placeholder='Telemóvel'
          onChange={handleChange}
          name='telemovel'
          value={formData.telemovel}
        />
        <input
          type='text'
          placeholder='E-mail'
          onChange={handleChange}
          name='email'
          value={formData.email}
        />
        <input
          type='password'
          placeholder='Palavra-passe'
          onChange={handleChange}
          name='password'
          value={formData.password}
        />
        <button type='submit'>Registar</button>
      </form>
    </div>
  );
}
