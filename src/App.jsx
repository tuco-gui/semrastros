import React, { useState } from "react";
import "./style.css";

export default function App() {
  const [texto, setTexto] = useState("");

  return (
    <div className="container-bg">
      <div className="container">
        <h1 className="titulo-app">
          <span role="img" aria-label="lupa">
            🔍
          </span>{" "}
          LIMPA RASTROS DE IA
        </h1>
        <p className="subtitulo-app">
          Identifique e remova caracteres que podem indicar texto gerado por IA.
        </p>

        {/* Tipos de Caracteres Detectados */}
        <div className="tipos-caracteres">
          <b>Tipos de Caracteres Detectados:</b>
          <ul>
            <li className="cor-vermelho">
              <span className="badge vermelho" /> Travessões (Em Dash, En Dash, Three-Em Dash)
            </li>
            <li className="cor-azul">
              <span className="badge azul" /> Espaços Especiais (Em Space, En Space, NBSP, etc.)
            </li>
            <li className="cor-laranja">
              <span className="badge laranja" /> Espaços Invisíveis (ZWSP, ZWNJ, ZWJ, etc.)
            </li>
            <li className="cor-roxo">
              <span className="badge roxo" /> Aspas Tipográficas (Left/Right Single/Double Quotes)
            </li>
            <li className="cor-rosa">
              <span className="badge rosa" /> Hífens Especiais (Soft Hyphen, Non-Breaking Hyphen, Minus)
            </li>
            <li className="cor-verde">
              <span className="badge verde" /> Caracteres Invisíveis (Function App, Invisible Times, etc.)
            </li>
            <li className="cor-ciano">
              <span className="badge ciano" /> Controles Direcionais (LRM, RLM, RLO)
            </li>
            <li className="cor-amarelo">
              <span className="badge amarelo" /> Caracteres Especiais (Braille Blank, Hangul Filler)
            </li>
          </ul>
        </div>

        {/* Caixas lado a lado */}
        <div className="caixas-flex">
          {/* Texto original */}
          <div className="caixa-texto">
            <div className="caixa-titulo">
              <span role="img" aria-label="documento">📄</span> Texto Original
            </div>
            <textarea
              className="textarea-app"
              placeholder="Cole ou digite seu texto aqui..."
              value={texto}
              onChange={e => setTexto(e.target.value)}
              rows={7}
            />
          </div>

          {/* Análise dos caracteres */}
          <div className="caixa-texto">
            <div className="caixa-titulo">
              <span role="img" aria-label="lupa">🔍</span> Análise dos Caracteres
            </div>
            <div className="caixa-analise">
              O texto analisado aparecerá aqui com os caracteres suspeitos destacados...
            </div>
          </div>
        </div>

        {/* Estatísticas do Texto */}
        <div className="caixa-estatisticas">
          <div className="estatisticas-titulo">
            <span role="img" aria-label="gráfico">📊</span> Estatísticas do Texto
          </div>
          <div className="estatisticas-flex">
            <div className="estatistica-box">
              <div className="estatistica-valor">0</div>
              <div className="estatistica-label">Total de Caracteres</div>
            </div>
            <div className="estatistica-box">
              <div className="estatistica-valor">0</div>
              <div className="estatistica-label">Total de Marcas</div>
            </div>
            <div className="estatistica-box">
              <div className="estatistica-valor">0</div>
              <div className="estatistica-label">Aspas Simples</div>
            </div>
            <div className="estatistica-box">
              <div className="estatistica-valor">0</div>
              <div className="estatistica-label">Aspas Duplas</div>
            </div>
            <div className="estatistica-box">
              <div className="estatistica-valor">0</div>
              <div className="estatistica-label">Travessões</div>
            </div>
            <div className="estatistica-box">
              <div className="estatistica-valor">0</div>
              <div className="estatistica-label">Hífens Especiais</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
