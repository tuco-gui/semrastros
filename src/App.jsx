import React, { useState } from "react";
import "./style.css";

export default function App() {
  const [texto, setTexto] = useState("");

  return (
    <div className="container-principal">
      <header>
        <h1 className="titulo-app">
          <span role="img" aria-label="lupa">🔍</span> LIMPA RASTROS DE IA
        </h1>
        <p className="subtitulo-app">
          Identifique e remova caracteres que podem indicar texto gerado por IA.
        </p>
      </header>

      {/* TIPOS DE CARACTERES */}
      <div className="tipos-caracteres">
        <b>Tipos de Caracteres Detectados:</b>
        <ul>
          <li><span className="legenda legenda-red" /> Travessões (Em Dash, En Dash, Three-Em Dash)</li>
          <li><span className="legenda legenda-blue" /> Espaços Especiais (Em Space, En Space, NBSP, etc.)</li>
          <li><span className="legenda legenda-orange" /> Espaços Invisíveis (ZWSP, ZWNJ, ZWJ, etc.)</li>
          <li><span className="legenda legenda-purple" /> Aspas Tipográficas (Left/Right Single/Double Quotes)</li>
          <li><span className="legenda legenda-pink" /> Hífens Especiais (Soft Hyphen, Non-Breaking Hyphen, Minus)</li>
          <li><span className="legenda legenda-teal" /> Controles Direcionais (LRM, RLM, RLO)</li>
          <li><span className="legenda legenda-green" /> Caracteres Invisíveis (Function App, Invisible Times, etc.)</li>
          <li><span className="legenda legenda-yellow" /> Caracteres Especiais (Braille Blank, Hangul Filler)</li>
        </ul>
      </div>

      {/* CAIXAS DE TEXTO */}
      <div className="caixas-texto-container">
        <div className="caixa-texto">
          <div className="caixa-titulo">
            <span role="img" aria-label="lápis">📝</span> Texto Original
          </div>
          <textarea
            className="textarea-entrada"
            value={texto}
            onChange={e => setTexto(e.target.value)}
            placeholder="Cole ou digite seu texto aqui..."
          />
        </div>
        <div className="caixa-texto">
          <div className="caixa-titulo">
            <span role="img" aria-label="lupa">🔍</span> Análise dos Caracteres
          </div>
          <div className="textarea-analise">
            O texto analisado aparecerá aqui com os caracteres suspeitos destacados...
          </div>
        </div>
      </div>

      {/* ESTATÍSTICAS */}
      <div className="estatisticas-container">
        <div className="estatisticas-titulo">
          <span role="img" aria-label="gráfico">📊</span> Estatísticas do Texto
        </div>
        <div className="estatisticas-grid">
          <div className="estat-card"><span>0</span><div>Total de Caracteres</div></div>
          <div className="estat-card"><span>0</span><div>Travessões</div></div>
          <div className="estat-card"><span>0</span><div>Espaços Especiais</div></div>
          <div className="estat-card"><span>0</span><div>Caracteres Invisíveis</div></div>
          <div className="estat-card"><span>0</span><div>Aspas Tipográficas</div></div>
          <div className="estat-card"><span>0</span><div>Controles Direcionais</div></div>
          <div className="estat-card"><span>0</span><div>Invisíveis Funcionais</div></div>
          <div className="estat-card"><span>0</span><div>Caracteres Especiais</div></div>
          <div className="estat-card"><span>0</span><div>Hífens Especiais</div></div>
        </div>
        <div style={{textAlign:"center", marginTop:24}}>
          <button className="btn-limpar">✨ Limpar Caracteres</button>
        </div>
      </div>
    </div>
  );
}
