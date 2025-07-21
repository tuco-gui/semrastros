import React, { useState } from "react";

// Lista de marcas (caracteres de IA)
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
  const [idioma, setIdioma] = useState("pt");

  // Upload .txt
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.type === "text/plain") {
      const text = await file.text();
      setTexto(text);
    } else {
      alert(
        idioma === "pt"
          ? "Apenas arquivos .txt são suportados nesta versão."
          : "Only .txt files are supported in this version."
      );
    }
  };

  // Ao alterar texto
  const onTextoChange = (e) => {
    setTexto(e.target.value);
    setTextoLimpo("");
    setAvisoCopiado(false);
  };

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
  };

  // Trocar idioma
  const trocaIdioma = () => {
    setIdioma((old) => (old === "pt" ? "en" : "pt"));
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        background: "#f8f9fa",
        minHeight: "100vh",
        padding: 0,
        margin: 0
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: 24
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>
            {idioma === "pt"
              ? "Detector e Limpador de Marcas de IA"
              : "AI Marks Detector & Cleaner"}
          </h2>
          <button onClick={trocaIdioma} style={{ fontSize: 16 }}>
            {idioma === "pt" ? "EN" : "PT"}
          </button>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap"
          }}
        >
          {/* Caixa de texto */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <label style={{ fontWeight: 600, fontSize: 16 }}>
              {idioma === "pt"
                ? "Cole ou digite seu texto:"
                : "Paste or type your text:"}
            </label>
            <textarea
              value={texto}
              onChange={onTextoChange}
              rows={12}
              style={{
                width: "100%",
                marginTop: 8,
                padding: 12,
                border: "1px solid #bbb",
                borderRadius: 8,
                fontSize: 15
              }}
              placeholder={
                idioma === "pt"
                  ? "Cole aqui seu texto ou faça upload de .txt"
                  : "Paste your text here or upload .txt"
              }
            />
            <input
              type="file"
              accept=".txt"
              style={{ marginTop: 8 }}
              onChange={handleFileUpload}
            />
          </div>
          {/* Caixa de análise */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <label style={{ fontWeight: 600, fontSize: 16 }}>
              {idioma === "pt" ? "Marcas detectadas:" : "Marks detected:"}
            </label>
            <div
              style={{
                marginTop: 8,
                border: "1px solid #bbb",
                borderRadius: 8,
                background: "#fff",
                padding: 12,
                minHeight: 180,
                fontSize: 15,
                maxHeight: 280,
                overflowY: "auto"
              }}
            >
              {marcasDetectadas.length === 0 ? (
                <span style={{ color: "#888" }}>
                  {idioma === "pt"
                    ? "Nenhuma marca detectada."
                    : "No marks detected."}
                </span>
              ) : (
                <ul style={{ paddingLeft: 18 }}>
                  {marcasDetectadas.map((m, i) => (
                    <li key={i}>
                      <span style={{ fontWeight: 600 }}>
                        {m.caractere === " " ? "[Espaço]" : m.caractere}
                      </span>{" "}
                      <span style={{ color: "#666" }}>({m.nome})</span>{" "}
                      <span style={{ color: "#bbb" }}>
                        {idioma === "pt" ? "Posição" : "Position"}: {m.posicao}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        {/* Estatísticas */}
        <div
          style={{
            margin: "18px 0 0 0",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 16
          }}
        >
          <h4 style={{ margin: "0 0 8px 0" }}>
            {idioma === "pt" ? "Resumo das marcas encontradas" : "Summary of marks found"}
          </h4>
          {marcasDetectadas.length === 0 ? (
            <span style={{ color: "#888" }}>
              {idioma === "pt"
                ? "Nenhuma marca foi identificada no texto."
                : "No marks were found in the text."}
            </span>
          ) : (
            <ul style={{ margin: 0 }}>
              {Object.entries(
                marcasDetectadas.reduce((acc, cur) => {
                  acc[cur.nome] = (acc[cur.nome] || 0) + 1;
                  return acc;
                }, {})
              ).map(([nome, qtd], i) => (
                <li key={i}>
                  <b>{nome}:</b> {qtd}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Botão Limpa Texto */}
        <div style={{ margin: "24px 0 8px 0", textAlign: "center" }}>
          <button
            onClick={handleLimpaTexto}
            disabled={!texto}
            style={{
              padding: "10px 28px",
              borderRadius: 8,
              fontSize: 16,
              background: "#1a82e2",
              color: "#fff",
              border: "none",
              cursor: texto ? "pointer" : "not-allowed",
              opacity: texto ? 1 : 0.6,
              fontWeight: 600
            }}
          >
            {idioma === "pt" ? "Limpa Texto" : "Clean Text"}
          </button>
        </div>
        {/* Texto limpo */}
        {textoLimpo && (
          <div
            style={{
              border: "1px solid #bbb",
              borderRadius: 8,
              padding: 12,
              background: "#f7fbfa",
              marginTop: 10
            }}
          >
            <label style={{ fontWeight: 600 }}>
              {idioma === "pt" ? "Texto limpo (copiado!):" : "Clean text (copied!)"}
            </label>
            <textarea
              readOnly
              value={textoLimpo}
              rows={Math.max(4, Math.min(12, textoLimpo.split("\n").length))}
              style={{
                width: "100%",
                marginTop: 6,
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 15,
                background: "#f9f9f9"
              }}
              onFocus={e => e.target.select()}
            />
            {avisocopiado && (
              <div style={{ color: "#27a745", fontWeight: 500, marginTop: 4 }}>
                {idioma === "pt"
                  ? "Texto limpo copiado para a área de transferência!"
                  : "Clean text copied to clipboard!"}
              </div>
            )}
          </div>
        )}
      </div>
      <footer
        style={{
          marginTop: 40,
          textAlign: "center",
          color: "#aaa",
          fontSize: 14
        }}
      >
        Detector IA Text Cleaner | Desenvolvido por ChatGPT para {window.location.hostname}
      </footer>
    </div>
  );
}
