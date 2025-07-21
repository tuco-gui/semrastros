import React, { useState } from "react";
import "./style.css";

export default function App() {
  const [textoOriginal, setTextoOriginal] = useState("");

  return (
    <div className="app-container">
      <div className="titulo-app">
        <span role="img" aria-label="Lupa">
          🔍
        </span>
        LIMPA RASTROS DE IA
      </div>
      <div className="subtitulo-app">
        Identifique e remova caracteres que podem indicar texto gerado por IA.
      </div>

      <div className="tipos-caracteres">
        <strong>Tipos de Caracteres Detectados:</strong>
        <div className="tipos-caracteres-lista">
          <span className="tipo-caractere tipo-1">
            <span className="tipo-icone">—</span>
            Travessões (Em Dash, En Dash, Three-Em Dash)
          </span>
          <span className="tipo-caractere tipo-2">
            <span className="tipo-icone">⎵</span>
            Espaços Especiais (Em Space, En Space, NBSP, etc.)
          </span>
          <span className="tipo-caractere tipo-3">
            <span className="tipo-icone">␣</span>
            Espaços Invisíveis (ZWSP, ZWNJ, ZWJ, etc.)
          </span>
          <span className="tipo-caractere tipo-4">
            <span className="tipo-icone">“</span>
            Aspas Tipográficas (Left/Right Single/Double Quotes)
          </span>
          <span className="tipo-caractere tipo-5">
