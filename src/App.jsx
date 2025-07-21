import React, { useState } from "react";
import "./style.css";

function detectarCaracteres(texto) {
  const chars = {
    tracos: ["—", "–", "―"],
    espacosEspeciais: [" ", " ", " ", " ", " ", "\u00A0"],
    invisiveis: ["\u200B", "\u200C", "\u200D", "\u2060"],
    aspas: ["“", "”", "‘", "’", "‹", "›", "«", "»"],
    hifensEspeciais: ["‐", "‑", "‒", "−"],
    controlesDirecionais: ["\u200E", "\u200F", "\u202A", "\u202B", "\u202C", "\u202D", "\u202E"],
    invisiveisFuncionais: ["\u2061", "\u2062", "\u2063", "\u2064"],
    especiais: ["⠀", "ㅤ"]
  };

  const countChars = (text, charsArr) =>
    text.split("").filter(c => charsArr.includes(c)).length;

  return {
    tracos: countChars(texto, chars.tracos),
    espacosEspeciais: countChars(texto, chars.espacosEspeciais),
    invisiveis: countChars(texto, chars.invisiveis),
    aspas: countChars(texto, chars.aspas),
    hifensEspeciais: countChars(texto, chars.hifensEspeciais),
    controlesDirecionais: countChars(texto, chars.controlesDirecionais),
    invisiveisFuncionais: countChars(texto, chars.invisiveisFuncionais),
    especiais: countChars(texto, chars.especiais)
  };
}

const mapa = {
  "—": "vermelho", "–": "vermelho", "―": "vermelho",
  " ": "azul", " ": "azul", " ": "azul", " ": "azul", "\u00A0": "azul",
  "\u200B": "amarelo", "\u200C": "amarelo", "\u200D": "amarelo", "\u2060": "amarelo",
  "“": "roxo", "”": "roxo", "‘": "roxo", "’": "roxo", "‹": "roxo", "›": "roxo", "«": "roxo", "»": "roxo",
  "‐": "rosa", "‑": "rosa", "‒": "rosa", "−": "rosa",
  "\u200E": "verde", "\u200F": "verde", "\u202A": "verde", "\u202B": "verde", "\u202C": "verde", "\u202D": "verde", "\u202E": "verde",
  "\u2061": "verde-claro", "\u2062": "verde-claro", "\u2063": "verde-claro", "\u2064": "verde-claro",
  "⠀": "amarelo-claro", "ㅤ": "amarelo-claro"
};

// Função para remover caracteres indesejados
function limparCaracteres(texto) {
  let resultado = texto;
  Object.keys(mapa).forEach(caractere => {
    const regex = new RegExp(caractere.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'), "g");
    resultado = resultado.replace(regex, "");
  });
  return resultado;
}

// FUNÇÃO NOVA — DESTAQUE EXATAMENTE IGUAL AO PRINT
function destacarCaracteres(texto) {
  return texto.split("").map((c, i) =>
    mapa[c]
      ? (
        <span
          key={i}
          className={`char-destaque ${mapa[c]}`}
          style={{
            fontWeight: 700,
            padding: "2px 6px",
            margin: "0 1px",
            borderRadius: "7px",
            background: "#fff",
            fontSize: "1.05em",
            display: "inline-block"
          }}
          title={c.codePointAt(0).toString(16)}
        >
          {getNomeCurtoCaracter(c)}
        </span>
      )
      : c
  );
}

// Função auxiliar para mostrar sigla igual ao print (ex: EN SPACE, LRM etc.)
function getNomeCurtoCaracter(c) {
  switch (c) {
    case " ": return "EM SPACE";
    case " ": return "EN SPACE";
    case " ": return "FIGURE SPACE";
    case "\u00A0": return "NBSP";
    case "\u200B": return "ZWSP";
    case "\u200C": return "ZWNJ";
    case "\u200D": return "ZWJ";
    case "\u2060": return "WORD JOINER";
    case "\u200E": return "LRM";
    case "\u200F": return "RLM";
    case "\u202A": return "LRE";
    case "\u202B": return "RLE";
    case "\u202C": return "PDF";
    case "\u202D": return "LRO";
    case "\u202E": return "RLO";
    default: return c;
  }
}

export default function App() {
  const [textoOriginal, setTextoOriginal] = useState("");
  const [mensagem, setMensagem] = useState("");

  const analise = detectarCaracteres(textoOriginal);
  const totalCaracteres = textoOriginal.length;

  function handleLimpar() {
    if (textoOriginal) {
      const textoLimpo = limparCaracteres(textoOriginal);
      navigator.clipboard.writeText(textoLimpo).then(() => {
        setMensagem("Texto limpo copiado!");
        setTimeout(() => setMensagem(""), 2000);
      });
      setTextoOriginal("");
    }
  }

  return (
    <div className="container">
      <header>
        <span role="img" aria-label="Lupa" className="icon-lupa">🔍</span>
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
            {textoOriginal
              ? destacarCaracteres(textoOriginal)
              : "O texto analisado aparecerá aqui com os caracteres suspeitos destacados..."}
          </div>
        </div>
      </main>

      <section className="estatisticas">
        <div className="estatisticas-titulo">
          <span role="img" aria-label="Gráfico">📊</span> Estatísticas do Texto
        </div>
        <div className="estatisticas-grid">
          <div className="estat-box"><div className="valor">{totalCaracteres}</div> Total de Caracteres</div>
          <div className="estat-box"><div className="valor">{analise.tracos}</div> Travessões</div>
          <div className="estat-box"><div className="valor">{analise.espacosEspeciais}</div> Espaços Especiais</div>
          <div className="estat-box"><div className="valor">{analise.invisiveis}</div> Caracteres Invisíveis</div>
          <div className="estat-box"><div className="valor">{analise.aspas}</div> Aspas Tipográficas</div>
          <div className="estat-box"><div className="valor">{analise.controlesDirecionais}</div> Controles Direcionais</div>
          <div className="estat-box"><div className="valor">{analise.invisiveisFuncionais}</div> Invisíveis Funcionais</div>
          <div className="estat-box"><div className="valor">{analise.especiais}</div> Caracteres Especiais</div>
          <div className="estat-box"><div className="valor">{analise.hifensEspeciais}</div> Hífens Especiais</div>
        </div>
        <button className="btn-limpar" onClick={handleLimpar}>✨ Limpar Caracteres</button>
        {mensagem && <div style={{ marginTop: 8, color: "#16a34a", fontWeight: 700 }}>{mensagem}</div>}
      </section>
    </div>
  );
}
