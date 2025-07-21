import React, { useState } from "react";
import "./style.css"; // nome correto do arquivo!

export default function App() {
  const [texto, setTexto] = useState("");

  // O restante da lógica você já tem, vou focar só na estrutura/visual!

  return (
    <div className="app-bg">
      <div>
        <h1 className="header-title">
          <span role="img" aria-label="Lupa">🔍</span> LIMPA RASTROS DE IA
        </h1>
        <div className="header-subtitle">
          Identifique e remova caracteres que podem indicar texto gerado por IA.
        </div>
      </div>
      {/* LEGENDA */}
      <div className="legend-box">
        <div style={{ fontWeight: 700, fontFamily: "Poppins,Montserrat", fontSize: "1.15rem" }}>
          Tipos de Caracteres Detectados:
        </div>
        <div className="legend-list">
          <div className="legend-item"><span className="legend-color lg-trav"></span> Travessões (Em Dash, En Dash, Three-Em Dash)</div>
          <div className="legend-item"><span className="legend-color lg-esp"></span> Espaços Especiais (Em Space, En Space, NBSP, etc.)</div>
          <div className="legend-item"><span className="legend-color lg-inv"></span> Espaços Invisíveis (ZWSP, ZWNJ, ZWJ, etc.)</div>
          <div className="legend-item"><span className="legend-color lg-tip"></span> Aspas Tipográficas (Left/Right Single/Double Quotes)</div>
          <div className="legend-item"><span className="legend-color lg-hif"></span> Hífens Especiais (Soft Hyphen, Non-Breaking Hyphen, Minus)</div>
          <div className="legend-item"><span className="legend-color lg-ctrl"></span> Controles Direcionais (LRM, RLM, RLO)</div>
          <div className="legend-item"><span className="legend-color lg-func"></span> Caracteres Invisíveis (Function App, Invisible Times, etc.)</div>
          <div className="legend-item"><span className="legend-color lg-braille"></span> Caracteres Especiais (Braille Blank, Hangul Filler)</div>
        </div>
      </div>
      {/* MAIN */}
      <div className="main-container">
        <div className="top-section">
          <div className="text-box">
            <label>
              <span role="img" aria-label="lápis">📝</span> Texto Original
            </label>
            <textarea
              className="text-area"
              value={texto}
              onChange={e => setTexto(e.target.value)}
              placeholder="Cole ou digite seu texto aqui..."
              rows={8}
            />
          </div>
          <div className="result-box">
            <label>
              <span role="img" aria-label="lupa">🔎</span> Análise dos Caracteres
            </label>
            <div className="result-area">
              O texto analisado aparecerá aqui com os caracteres suspeitos destacados...
            </div>
          </div>
        </div>
        {/* ESTATÍSTICAS */}
        <div className="stats-section">
          <div className="stats-title">
            <span role="img" aria-label="gráfico">📊</span> Estatísticas do Texto
          </div>
          <div className="stats-cards">
            <div className="stats-card">
              <div className="stats-value">0</div>
              Total de Caracteres
            </div>
            <div className="stats-card">
              <div className="stats-value">0</div>
              Travessões
            </div>
            <div className="stats-card">
              <div className="stats-value">0</div>
              Espaços Especiais
            </div>
            <div className="stats-card">
              <div className="stats-value">0</div>
              Caracteres Invisíveis
            </div>
            <div className="stats-card">
              <div className="stats-value">0</div>
              Aspas Tipográficas
            </div>
            <div className="stats-card">
              <div className="stats-value">0</div>
              Controles Direcionais
            </div>
            <div className="stats-card">
              <div className="stats-value">0</div>
              Invisíveis Funcionais
            </div>
            <div className="stats-card">
              <div className="stats-value">0</div>
              Caracteres Especiais
            </div>
            <div className="stats-card">
              <div className="stats-value">0</div>
              Hífens Especiais
            </div>
          </div>
        </div>
        <button className="btn-limpar">✨ Limpar Caracteres</button>
      </div>
    </div>
  );
}
