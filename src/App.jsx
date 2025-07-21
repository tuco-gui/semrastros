import React, { useState } from "react";
import "./style.css";

function detectarCaracteres(texto) {
  // Define grupos de caracteres suspeitos
  // Grupos de caracteres suspeitos
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

  // Função de contagem
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

function destacarCaracteres(texto) {
  const mapa = {
    "—": "vermelho", "–": "vermelho", "―": "vermelho",
    " ": "azul", " ": "azul", " ": "azul", " ": "azul", " ": "azul", "\u00A0": "azul",
    "\u200B": "amarelo", "\u200C": "amarelo", "\u200D": "amarelo", "\u2060": "amarelo",
    "“": "roxo", "”": "roxo", "‘": "roxo", "’": "roxo", "‹": "roxo", "›": "roxo", "«": "roxo", "»": "roxo",
    "‐": "rosa", "‑": "rosa", "‒": "rosa", "−": "rosa",
    "\u200E": "verde", "\u200F": "verde", "\u202A": "verde", "\u202B": "verde", "\u202C": "verde", "\u202D": "verde", "\u202E": "verde",
    "\u2061": "verde-claro", "\u2062": "verde-claro", "\u2063": "verde-claro", "\u2064": "verde-claro",
    "⠀": "amarelo-claro", "ㅤ": "amarelo-claro"
  };
// Mapeamento das cores para span (NÃO ALTERAR pois já está linkado com seu CSS)
const mapa = {
  "—": "vermelho", "–": "vermelho", "―": "vermelho",
  " ": "azul", " ": "azul", " ": "azul", " ": "azul", " ": "azul", "\u00A0": "azul",
  "\u200B": "amarelo", "\u200C": "amarelo", "\u200D": "amarelo", "\u2060": "amarelo",
  "“": "roxo", "”": "roxo", "‘": "roxo", "’": "roxo", "‹": "roxo", "›": "roxo", "«": "roxo", "»": "roxo",
  "‐": "rosa", "‑": "rosa", "‒": "rosa", "−": "rosa",
  "\u200E": "verde", "\u200F": "verde", "\u202A": "verde", "\u202B": "verde", "\u202C": "verde", "\u202D": "verde", "\u202E": "verde",
  "\u2061": "verde-claro", "\u2062": "verde-claro", "\u2063": "verde-claro", "\u2064": "verde-claro",
  "⠀": "amarelo-claro", "ㅤ": "amarelo-claro"
};

// Função para remover caracteres indesejados
function limparCaracteres(texto) {
  const todosCaracteres = [
    ...Object.values(mapa).map(cor =>
      Object.keys(mapa).filter(char => mapa[char] === cor)
    )
  ].flat();

  let resultado = texto;
  // Remove todos os caracteres definidos no mapa
  Object.keys(mapa).forEach(caractere => {
    const regex = new RegExp(caractere.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'), "g");
    resultado = resultado.replace(regex, "");
  });
  return resultado;
}

// Função para destacar caracteres
function destacarCaracteres(texto) {
  return texto.split("").map((c, i) =>
    mapa[c] ?
      <span key={i} className={`char-destaque ${mapa[c]}`} title={c.codePointAt(0).toString(16)}>
        {c}
      </span>
    mapa[c]
      ? <span key={i} className={`char-destaque ${mapa[c]}`} title={c.codePointAt(0).toString(16)}>{c}</span>
      : c
  );
}

export default function App() {
  const [textoOriginal, setTextoOriginal] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Análise em tempo real
  const analise = detectarCaracteres(textoOriginal);
  const totalCaracteres = textoOriginal.length;

  // Limpa, copia e mostra mensagem
  function handleLimpar() {
    if (textoOriginal) {
      navigator.clipboard.writeText(textoOriginal).then(() => {
        setMensagem("Texto copiado!");
      const textoLimpo = limparCaracteres(textoOriginal);
      navigator.clipboard.writeText(textoLimpo).then(() => {
        setMensagem("Texto limpo copiado!");
        setTimeout(() => setMensagem(""), 2000);
      });
      setTextoOriginal("");
    }
    setTextoOriginal("");
  }

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
          <div className="analise-area" style={{minHeight: 70, wordBreak: "break-all"}}>
          <div className="analise-area" style={{ minHeight: 70, wordBreak: "break-all" }}>
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
        <div style={{marginTop:8, color:"green"}}>{mensagem}</div>
        <div style={{ marginTop: 8, color: "green" }}>{mensagem}</div>
      </section>
    </div>
  );
