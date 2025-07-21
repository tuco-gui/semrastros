import React, { useState } from "react";
import "./style.css";

export default function App() {
  const [textoOriginal, setTextoOriginal] = useState("");

  return (
    <div className="container">
      <header>
        <span role="img" aria-label="Lupa" style={{ fontSize: 36, verticalAlign: "middle" }}>🔍</span>
        <span className="titulo">LIMPA RASTROS DE IA</span>
        <p className="subtitulo">
          Identifique e remova caracteres que podem indicar texto gerado por IA.
        </p>
      </header>

      <section className="tipos-caracteres">
        <h3>Tipos de Caracteres Detectados:</h3>
        <div className="tipos-lista">
          <div className="tipo-caractere vermelho">
            — Travessões (Em Dash, En Dash, Three-Em Dash)
          </div>
          <div className="tipo-caractere azul">
            ▭ Espaços Especiais (Em Space, En Space, NBSP, etc.)
          </div>
          <div className="tipo-caractere amarelo">
            ⎵ Espaços Invisíveis (ZWSP, ZWNJ, ZWJ, etc.)
          </div>
          <div className="tipo-caractere roxo">
            “ Aspas Tipográficas (Left/Right Single/Double Quotes)
          </div>
          <div className="tipo-caractere rosa">
            - Hífens Especiais (Soft Hyphen, Non-Breaking Hyphen, Minus)
          </div>
          <div className="tipo-caractere verde">
            ← Controles Direcionais (LRM, RLM, RLO)
          </div>
          <div className="tipo-caractere verde-claro">
            ⋅ Caracteres Invisíveis (Function App, Invisible Times, etc.)
          </div>
          <div className="tipo-caractere amarelo-claro">
            ⠿ Caracteres Especiais (Braille Blank, Hangul Filler)
          </div>
        </div>
      </section>

      <main className="area-main">
        <div className="box-texto">
          <div className="label">
            <span role="img" aria-label="Lápis">📝</span>
            <span>Texto Original</span>
          </div>
          <textarea
            value={textoOriginal}
            onChange={e => setTextoOriginal(e.target.value)}
            placeholder="Cole ou digite seu texto aqui..."
          />
        </div>
        <div className="box-analise">
          <div className="label">
            <span role="img" aria-label="Lupa">🔎</span>
            <span>Análise dos Caracteres</span>
          </div>
          <div className="analise-area">
            O texto analisado aparecerá aqui com os caracteres suspeitos destacados...
          </div>
        </div>
      </main>

      <section className="estatisticas">
        <div className="estatisticas-titulo">
          <span role="img" aria-label="Gráfico">📊</span> Estatísticas do Texto
        </div>
        <div className="estatisticas-grid">
          <div className="estat-box"><div className="valor">0</div> Total de Caracteres</div>
          <div className="estat-box"><div className="valor">0</div> Travessões</div>
          <div className="estat-box"><div className="valor">0</div> Espaços Especiais</div>
          <div className="estat-box"><div className="valor">0</div> Caracteres Invisíveis</div>
          <div className="estat-box"><div className="valor">0</div> Aspas Tipográficas</div>
          <div className="estat-box"><div className="valor">0</div> Controles Direcionais</div>
          <div className="estat-box"><div className="valor">0</div> Invisíveis Funcionais</div>
          <div className="estat-box"><div className="valor">0</div> Caracteres Especiais</div>
          <div className="estat-box"><div className="valor">0</div> Hífens Especiais</div>
        </div>
        <button className="btn-limpar">✨ Limpar Caracteres</button>
      </section>
    </div>
  );
}
