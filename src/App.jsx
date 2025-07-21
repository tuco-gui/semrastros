import React, { useState } from "react";
import "./style.css";

// Lista de marcas/caracteres especiais (mantenha conforme seu original)
const marcas = [
  { regex: /[\u2018\u2019]/g, nome: "Aspa simples tipográfica (‘ ’)" },
  { regex: /[\u201C\u201D]/g, nome: "Aspa dupla tipográfica (“ ”)" },
  { regex: /[\u2013]/g, nome: "En Dash (–)" },
  { regex: /[\u2014]/g, nome: "Em Dash (—)" },
  { regex: /[\u2026]/g, nome: "Reticências (…)" },
  { regex: /[\u00A0]/g, nome: "Espaço Não Quebrável (NBSP)" },
  { regex: /[\u200B-\u200D]/g, nome: "Espaço Invisível (ZWSP, ZWNJ, ZWJ)" },
  { regex: /[\u2060]/g, nome: "Word Joiner (invisível)" },
  { regex: /[\u202F]/g, nome: "Espaço Estreito (Narrow NBSP)" },
  { regex: /[\uFEFF]/g, nome: "Byte Order Mark (invisível)" },
  { regex: /[\u00AD]/g, nome: "Soft Hyphen (­)" },
  { regex: /[\u2212]/g, nome: "Minus Matemático (−)" },
  { regex: /[\u2010\u2011]/g, nome: "Hífen especial (‐ ‑)" },
  { regex: /[\u2800]/g, nome: "Braille Blank (⠀)" },
  { regex: /[\u3164]/g, nome: "Hangul Filler (ㅤ)" },
  { regex: /[\u200E\u200F]/g, nome: "Direcionalidade (LRM, RLM)" }
];

function detectaMarcas(texto) {
  let encontrados = [];
  marcas.forEach((marca) => {
    let resultado;
    let regex = new RegExp(marca.regex);
    while ((resultado = regex.exec(texto)) !== null) {
      encontrados.push({
        caractere: resultado[0],
        nome: marca.nome,
        posicao: resultado.index
      });
    }
  });
  return encontrados;
}

function limpaTexto(texto) {
  let textoLimpo = texto;
  marcas.forEach((marca) => {
    textoLimpo = textoLimpo.replace(marca.regex, "");
  });
  return textoLimpo;
}

export default function App() {
  const [texto, setTexto] = useState("");
  const [marcasDetectadas, setMarcasDetectadas] = useState([]);
  const [textoLimpo, setTextoLimpo] = useState("");
  const [avisocopiado, setAvisoCopiado] = useState(false);

  // Detectar marcas toda vez que o texto mudar
  React.useEffect(() => {
    if (!texto) {
      setMarcasDetectadas([]);
      return;
    }
    setMarcasDetectadas(detectaMarcas(texto));
  }, [texto]);

  // Limpar texto e copiar ao clicar no botão
  const handleLimpaTexto = () => {
    const limpo = limpaTexto(texto);
    setTextoLimpo(limpo);
    navigator.clipboard.writeText(limpo);
    setAvisoCopiado(true);
    setTimeout(() => setAvisoCopiado(false), 2000);
  };

  return (
    <div className="container-bg">
      {/* Topo */}
      <header className="header-topo">
        <div className="logo-titulo">
          <span className="material-icons search-icon">search</span>
          <h1>LIMPA RASTROS DE IA</h1>
        </div>
        <p className="subtitulo">
          Identifique e remova caracteres que podem indicar texto gerado por IA.
        </p>
      </header>

      {/* Legenda dos Tipos de Caracteres */}
      <section className="tipos-caracteres-bloco">
        <h2>Tipos de Caracteres Detectados:</h2>
        <ul className="tipos-lista">
          <li><span className="tag t1" /> Travessões (Em Dash, En Dash, Three-Em Dash)</li>
          <li><span className="tag t2" /> Espaços Especiais (Em Space, En Space, NBSP, etc.)</li>
          <li><span className="tag t3" /> Espaços Invisíveis (ZWSP, ZWNJ, ZWJ, etc.)</li>
          <li><span className="tag t4" /> Aspas Tipográficas (Left/Right Single/Double Quotes)</li>
          <li><span className="tag t5" /> Hífens Especiais (Soft Hyphen, Non-Breaking Hyphen, Minus)</li>
          <li><span className="tag t6" /> Controles Direcionais (LRM, RLM, RLO)</li>
          <li><span className="tag t7" /> Caracteres Invisíveis (Function App, Invisible Times, etc.)</li>
          <li><span className="tag t8" /> Caracteres Especiais (Braille Blank, Hangul Filler)</li>
        </ul>
      </section>

      {/* Duas caixas lado a lado */}
      <main className="caixas-area">
        <div className="caixa-texto">
          <div className="caixa-titulo">
            <span className="material-icons">description</span>
            <span>Texto Original</span>
          </div>
          <textarea
            className="text-area"
            placeholder="Cole ou digite seu texto aqui..."
            value={texto}
            onChange={e => {
              setTexto(e.target.value);
              setTextoLimpo("");
              setAvisoCopiado(false);
            }}
          />
        </div>
        <div className="caixa-texto">
          <div className="caixa-titulo">
            <span className="material-icons">search</span>
            <span>Análise dos Caracteres</span>
          </div>
          <div className="analise-box">
            {texto ? (
              marcasDetectadas.length ? (
                <ul className="lista-marcas">
                  {marcasDetectadas.map((m, i) => (
                    <li key={i}>
                      <b>{m.caractere}</b> <span className="desc">{m.nome}</span> <span className="pos">Posição: {m.posicao}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span>Nenhuma marca suspeita encontrada.</span>
              )
            ) : (
              <span className="analise-placeholder">
                O texto analisado aparecerá aqui com os caracteres suspeitos destacados...
              </span>
            )}
          </div>
        </div>
      </main>

      {/* Estatísticas */}
      <section className="estatisticas">
        <h3>📊 Estatísticas do Texto</h3>
        <div className="estat-cards">
          <div className="estat-card"><b>{texto.length}</b><span>Total de Caracteres</span></div>
          <div className="estat-card"><b>{marcasDetectadas.length}</b><span>Total de Marcas</span></div>
          <div className="estat-card"><b>{marcasDetectadas.filter(m => m.nome.includes("Aspa simples")).length}</b><span>Aspas Simples</span></div>
          <div className="estat-card"><b>{marcasDetectadas.filter(m => m.nome.includes("Aspa dupla")).length}</b><span>Aspas Duplas</span></div>
          <div className="estat-card"><b>{marcasDetectadas.filter(m => m.nome.includes("Em Dash") || m.nome.includes("En Dash")).length}</b><span>Travessões</span></div>
          <div className="estat-card"><b>{marcasDetectadas.filter(m => m.nome.includes("Espaço Não Quebrável") || m.nome.includes("NBSP")).length}</b><span>Espaços Especiais</span></div>
        </div>
      </section>

      {/* Botão Limpar e copiar */}
      <div className="botoes-area">
        <button className="btn-limpar" onClick={handleLimpaTexto} disabled={!texto}>
          Limpar Texto e Copiar
        </button>
        {avisocopiado && (
          <span className="aviso-copiado">Texto limpo copiado para a área de transferência!</span>
        )}
      </div>
    </div>
  );
}
