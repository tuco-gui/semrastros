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
            <span className="tipo-icone">‐</span>
            Hífens Especiais (Soft Hyphen, Non-Breaking Hyphen, Minus)
          </span>
          <span className="tipo-caractere tipo-6">
            <span className="tipo-icone">⟵</span>
            Controles Direcionais (LRM, RLM, RLO)
          </span>
          <span className="tipo-caractere tipo-7">
            <span className="tipo-icone">␄</span>
            Caracteres Invisíveis (Function App, Invisible Times, etc.)
          </span>
          <span className="tipo-caractere tipo-8">
            <span className="tipo-icone">⠿</span>
            Caracteres Especiais (Braille Blank, Hangul Filler)
          </span>
        </div>
      </div>

      <div className="caixas-texto-container">
        <div className="caixa-bloco">
          <div className="caixa-titulo">
            <span className="caixa-icone" role="img" aria-label="Lápis">
              📝
            </span>
            Texto Original
          </div>
          <textarea
            className="textarea-original"
            placeholder="Cole ou digite seu texto aqui..."
            value={textoOriginal}
            onChange={(e) => setTextoOriginal(e.target.value)}
          />
        </div>

        <div className="caixa-bloco">
          <div className="caixa-titulo">
            <span className="caixa-icone" role="img" aria-label="Lupa">
              🔎
            </span>
            Análise dos Caracteres
          </div>
          <div className="caixa-analise">
            O texto analisado aparecerá aqui com os caracteres suspeitos destacados...
          </div>
        </div>
      </div>

      <div className="estatisticas-container">
        <div className="estatisticas-titulo">
          <span role="img" aria-label="Gráfico">
            📊
          </span>
          &nbsp;Estatísticas do Texto
        </div>
        <div className="estatisticas-lista">
          <div className="estatistica-bloco">
            <div className="estatistica-numero">0</div>
            <div className="estatistica-label">Total de Caracteres</div>
          </div>
          <div className="estatistica-bloco">
            <div className="estatistica-numero">0</div>
            <div className="estatistica-label">Travessões</div>
          </div>
          <div className="estatistica-bloco">
            <div className="estatistica-numero">0</div>
            <div className="estatistica-label">Espaços Especiais</div>
          </div>
          <div className="estatistica-bloco">
            <div className="estatistica-numero">0</div>
            <div className="estatistica-label">Caracteres Invisíveis</div>
          </div>
          <div className="estatistica-bloco">
            <div className="estatistica-numero">0</div>
            <div className="estatistica-label">Aspas Tipográficas</div>
          </div>
          <div className="estatistica-bloco">
            <div className="estatistica-numero">0</div>
            <div className="estatistica-label">Controles Direcionais</div>
          </div>
          <div className="estatistica-bloco">
            <div className="estatistica-numero">0</div>
            <div className="estatistica-label">Invisíveis Funcionais</div>
          </div>
          <div className="estatistica-bloco">
            <div className="estatistica-numero">0</div>
            <div className="estatistica-label">Caracteres Especiais</div>
          </div>
          <div className="estatistica-bloco">
            <div className="estatistica-numero">0</div>
            <div className="estatistica-label">Hífens Especiais</div>
          </div>
        </div>
      </div>
    </div>
  );
}
