import React, { useState, useEffect } from "react";

// Paleta de cores e fontes
const COLORS = {
  vermelho: "#E31937",
  preto: "#000000",
  branco: "#FFFFFF",
  bege: "#f7f4ed",
  cinza: "#2C2C2C",
  box: "#FFFFFF",
  boxBorder: "#eee",
  shadow: "0 2px 16px 0 rgba(44,44,44,0.07)"
};

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

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{
      background: COLORS.box,
      border: `1.5px solid ${COLORS.boxBorder}`,
      borderRadius: 16,
      boxShadow: COLORS.shadow,
      display: "flex",
      alignItems: "center",
      padding: "14px 18px",
      minWidth: 140,
      marginRight: 12,
      marginBottom: 8
    }}>
      <span className="material-icons" style={{ color, fontSize: 28, marginRight: 10 }}>
        {icon}
      </span>
      <div>
        <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 17, color: COLORS.cinza }}>
          {value}
        </div>
        <div style={{ fontFamily: "Montserrat", fontSize: 13, color: COLORS.cinza, marginTop: -2 }}>
          {label}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [texto, setTexto] = useState("");
  const [marcasDetectadas, setMarcasDetectadas] = useState([]);
  const [textoLimpo, setTextoLimpo] = useState("");
  const [avisocopiado, setAvisoCopiado] = useState(false);

  useEffect(() => {
    setMarcasDetectadas(detectaMarcas(texto));
    setTextoLimpo("");
    setAvisoCopiado(false);
  }, [texto]);

  const handleLimpaTexto = () => {
    const limpo = limpaTexto(texto);
    setTextoLimpo(limpo);
    if (limpo) {
      navigator.clipboard.writeText(limpo);
      setAvisoCopiado(true);
    }
  };

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

  // Estatísticas resumidas
  const total = marcasDetectadas.length;
  const tipos = Object.entries(
    marcasDetectadas.reduce((acc, cur) => {
      acc[cur.nome] = (acc[cur.nome] || 0) + 1;
      return acc;
    }, {})
  );

  return (
    <div style={{ background: COLORS.bege, minHeight: "100vh", fontFamily: "Lato" }}>
      {/* Header */}
      <header style={{
        background: COLORS.branco,
        padding: "28px 0 18px 0",
        boxShadow: "0 2px 12px 0 rgba(44,44,44,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <span className="material-icons" style={{ color: COLORS.vermelho, fontSize: 44, marginBottom: 6 }}>
          search
        </span>
        <span style={{
          color: COLORS.vermelho,
          fontFamily: "Poppins",
          fontWeight: 700,
          fontSize: 34,
          letterSpacing: "-2px",
          textTransform: "uppercase"
        }}>
          LIMPA RASTROS DE IA
        </span>
      </header>
      {/* Conteúdo principal */}
      <div style={{
        maxWidth: 1100,
        margin: "36px auto 0 auto",
        padding: 24
      }}>
        {/* Áreas lado a lado */}
        <div style={{
          display: "flex",
          gap: 28,
          flexWrap: "wrap",
          marginBottom: 16
        }}>
          {/* Caixa de texto */}
          <div style={{
            flex: 1,
            minWidth: 340,
            background: COLORS.branco,
            borderRadius: 18,
            boxShadow: COLORS.shadow,
            border: `1.5px solid ${COLORS.boxBorder}`,
            padding: 24,
            display: "flex",
            flexDirection: "column"
          }}>
            <label style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 17,
              color: COLORS.cinza,
              marginBottom: 8
            }}>
              Texto original
            </label>
            <textarea
              value={texto}
              onChange={e => setTexto(e.target.value)}
              rows={10}
              style={{
                width: "100%",
                padding: 14,
                border: `1.5px solid ${COLORS.boxBorder}`,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Lato",
                marginBottom: 10,
                minHeight: 180,
                background: "#f7f4ed"
              }}
              placeholder="Cole aqui seu texto ou faça upload de .txt"
            />
            <input
              type="file"
              accept=".txt"
              style={{ marginTop: 6, fontFamily: "Lato", fontSize: 14 }}
              onChange={handleFileUpload}
            />
          </div>
          {/* Caixa de análise */}
          <div style={{
            flex: 1,
            minWidth: 340,
            background: COLORS.branco,
            borderRadius: 18,
            boxShadow: COLORS.shadow,
            border: `1.5px solid ${COLORS.boxBorder}`,
            padding: 24,
            display: "flex",
            flexDirection: "column"
          }}>
            <label style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 17,
              color: COLORS.cinza,
              marginBottom: 8
            }}>
              Análise dos caracteres
            </label>
            <div style={{
              border: `1.5px solid ${COLORS.boxBorder}`,
              borderRadius: 12,
              background: "#f7f4ed",
              padding: 12,
              minHeight: 88,
              maxHeight: 200,
              overflowY: "auto",
              fontFamily: "Lato",
              fontSize: 15,
              marginBottom: 10
            }}>
              {marcasDetectadas.length === 0 ? (
                <span style={{ color: "#888" }}>
                  Nenhuma marca detectada.
                </span>
              ) : (
                <ul style={{ paddingLeft: 18, margin: 0 }}>
                  {marcasDetectadas.map((m, i) => (
                    <li key={i}>
                      <span style={{ fontWeight: 700, color: COLORS.vermelho }}>
                        {m.caractere === " " ? "[Espaço]" : m.caractere}
                      </span>{" "}
                      <span style={{ color: COLORS.cinza, fontWeight: 500 }}>({m.nome})</span>{" "}
                      <span style={{ color: "#bbb" }}>
                        Posição: {m.posicao}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Estatística dos tipos */}
            <div style={{
              marginTop: 6,
              marginBottom: 6,
              fontFamily: "Poppins",
              fontWeight: 600,
              color: COLORS.cinza,
              fontSize: 15
            }}>
              Tipos de caracteres detectados:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <StatCard
                icon="done_all"
                label="Total de marcas"
                value={total}
                color={COLORS.vermelho}
              />
              {tipos.map(([nome, qtd], i) => (
                <StatCard
                  key={i}
                  icon="flag"
                  label={nome.replace(" tipográfica", "")}
                  value={qtd}
                  color={COLORS.cinza}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Botão Limpar Texto */}
        <div style={{ margin: "32px 0 18px 0", textAlign: "center" }}>
          <button
            onClick={handleLimpaTexto}
            disabled={!texto}
            style={{
              padding: "14px 38px",
              borderRadius: 10,
              fontSize: 18,
              background: COLORS.vermelho,
              color: "#fff",
              border: "none",
              cursor: texto ? "pointer" : "not-allowed",
              opacity: texto ? 1 : 0.5,
              fontFamily: "Poppins",
              fontWeight: 700,
              boxShadow: "0 2px 8px 0 rgba(227,25,55,0.09)",
              letterSpacing: "1px"
            }}
          >
            <span className="material-icons" style={{ fontSize: 22, verticalAlign: "middle", marginRight: 7 }}>cleaning_services</span>
            Limpar Texto e Copiar
          </button>
        </div>
        {/* Texto limpo e mensagem */}
        {textoLimpo && (
          <div
            style={{
              border: `1.5px solid ${COLORS.boxBorder}`,
              borderRadius: 16,
              boxShadow: COLORS.shadow,
              padding: 18,
              background: "#f7fbfa",
              margin: "0 auto 8px auto",
              maxWidth: 750
            }}
          >
            <label style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              color: COLORS.vermelho,
              fontSize: 15,
              marginBottom: 4
            }}>
              Texto limpo (copiado!):
            </label>
            <textarea
              readOnly
              value={textoLimpo}
              rows={Math.max(4, Math.min(10, textoLimpo.split("\n").length))}
              style={{
                width: "100%",
                marginTop: 6,
                padding: 12,
                borderRadius: 8,
                border: `1.5px solid ${COLORS.boxBorder}`,
                fontSize: 15,
                fontFamily: "Lato",
                background: "#f7f4ed"
              }}
              onFocus={e => e.target.select()}
            />
            {avisocopiado && (
              <div style={{ color: COLORS.vermelho, fontWeight: 700, fontFamily: "Montserrat", marginTop: 7 }}>
                <span className="material-icons" style={{ fontSize: 20, verticalAlign: "middle", marginRight: 6 }}>check_circle</span>
                Texto limpo copiado para a área de transferência!
              </div>
            )}
          </div>
        )}
      </div>
      <footer
        style={{
          marginTop: 50,
          textAlign: "center",
          color: COLORS.cinza,
          fontFamily: "Montserrat",
          fontWeight: 400,
          fontSize: 15,
          paddingBottom: 30
        }}
      >
        Limpa Rastros de IA | Desenvolvido para você
      </footer>
    </div>
  );
}
