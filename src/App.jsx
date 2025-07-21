import React, { useState, useEffect } from "react";

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

// Detecta marcas e retorna array de objetos
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

// Limpa todas as marcas do texto
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

  // Analisa automaticamente quando texto muda
  useEffect(() => {
    setMarcasDetectadas(detectaMarcas(texto));
    setTextoLimpo("");
    setAvisoCopiado(false);
  }, [texto]);

  // Limpa e copia texto limpo
  const handleLimpaTexto = () => {
    const limpo = limpaTexto(texto);
    setTextoLimpo(limpo);
    if (limpo) {
      navigator.clipboard.writeText(limpo);
      setAvisoCopiado(true);
    }
  };

  // Upload .txt
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.type === "text/plain") {
      const text = await file.text();
      setTexto(text);
    } else {
      alert("Apenas arquivos .txt são suportados.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        background: "#f7f7fa",
        minHeight: "100vh",
        padding: 0,
        margin: 0
      }}
    >
      <div
        style={{
          maxWidth: 950,
          margin: "0 auto",
          padding: 24
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Detector e Limpador de Marcas de IA</h2>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap"
          }}
        >
          {/* Caixa de texto */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <label style={{ fontWeight: 600, fontSize: 16 }}>
              Cole ou digite seu texto:
            </label>
            <textarea
              value={texto}
              onChange={e => setTexto(e.target.value)}
              rows={12}
              style={{
                width: "100%",
                marginTop: 8,
                padding: 12,
                border: "1px solid #bbb",
                borderRadius: 8,
                fontSize: 15
              }}
              placeholder="Cole aqui seu texto ou faça upload de .txt"
            />
            <input
              type="file"
              accept=".txt"
              style={{ marginTop: 8 }}
              onChange={handleFileUpload}
            />
          </div>

          {/* Caixa de análise */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <label style={{ fontWeight: 600, fontSize: 16 }}>
              Análise automática:
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
                maxHeight: 260,
                overflowY: "auto"
              }}
            >
              {marcasDetectadas.length === 0 ? (
                <span style={{ color: "#888" }}>
                  Nenhuma marca detectada.
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
                        Posição: {m.posicao}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Estatísticas */}
            <div
              style={{
                marginTop: 16,
                background: "#f9f9fc",
                border: "1px solid #e3e3ef",
                borderRadius: 8,
                padding: 10
              }}
            >
              <b>Resumo das marcas encontradas:</b>
              {marcasDetectadas.length === 0 ? (
                <span style={{ color: "#888", marginLeft: 8 }}>
                  Nenhuma marca foi identificada no texto.
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
          </div>
        </div>
        {/* Botão Limpar Texto */}
        <div style={{ margin: "24px 0 8px 0", textAlign: "center" }}>
          <button
            onClick={handleLimpaTexto}
            disabled={!texto}
            style={{
              padding: "12px 34px",
              borderRadius: 8,
              fontSize: 16,
              background: "#28a745",
              color: "#fff",
              border: "none",
              cursor: texto ? "pointer" : "not-allowed",
              opacity: texto ? 1 : 0.6,
              fontWeight: 600
            }}
          >
            Limpar Texto
          </button>
        </div>
        {/* Texto limpo e mensagem */}
        {textoLimpo && (
          <div
            style={{
              border: "1px solid #bbb",
              borderRadius: 8,
              padding: 12,
              background: "#f7fbfa",
              marginTop: 12
            }}
          >
            <label style={{ fontWeight: 600 }}>
              Texto limpo (copiado!):
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
              <div style={{ color: "#28a745", fontWeight: 500, marginTop: 4 }}>
                Texto limpo copiado para a área de transferência!
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
        Detector IA Text Cleaner | Desenvolvido para você
      </footer>
    </div>
  );
}

