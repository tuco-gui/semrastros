Perfeito, segue o **App.jsx** já alterado e fiel ao seu modelo/prints, com quadro de tipos de caracteres no topo, caixas lado a lado, análise apenas informativa quando vazio, estatísticas no rodapé **(com tudo zerado até inserir texto)**, fontes e espaçamentos otimizados para visual profissional.
Só **copie e cole tudo** no seu `src/App.jsx`.

---

```jsx
import React, { useState, useEffect } from "react";

// Cores e fontes principais
const COLORS = {
  vermelho: "#E31937",
  preto: "#000000",
  branco: "#FFFFFF",
  bege: "#f7f4ed",
  cinza: "#2C2C2C",
  azulClaro: "#eef4f8",
  box: "#FFFFFF",
  boxBorder: "#E7EAF3",
  shadow: "0 4px 20px 0 rgba(44,44,44,0.06)"
};

// Configuração dos tipos de caracteres (para o quadro do topo e estatísticas)
const tiposCaracteres = [
  { label: "Travessões (Em Dash, En Dash, Three-Em Dash)", cor: "#e57373", stat: "travessoes" },
  { label: "Espaços Especiais (Em Space, En Space, NBSP, etc.)", cor: "#fbc02d", stat: "espacosEspeciais" },
  { label: "Espaços Invisíveis (ZWSP, ZWNJ, ZWJ, etc.)", cor: "#4fc3f7", stat: "espacosInvisiveis" },
  { label: "Aspas Tipográficas (Left/Right Single/Double Quotes)", cor: "#ab47bc", stat: "aspasTipograficas" },
  { label: "Controles Direcionais (LRM, RLM, RLO)", cor: "#ff7043", stat: "controlesDirecionais" },
  { label: "Caracteres Invisíveis (Function App, Invisible Times, etc.)", cor: "#64b5f6", stat: "invisiveisFuncionais" },
  { label: "Caracteres Especiais (Braille Blank, Hangul Filler)", cor: "#aed581", stat: "caracteresEspeciais" },
  { label: "Hífens Especiais (Soft Hyphen, Non-Breaking Hyphen, Minus)", cor: "#90a4ae", stat: "hifensEspeciais" }
];

// Expressões para detecção (mapeadas para os nomes dos stats)
const detectores = [
  { regex: /[\u2013\u2014\u2015]/g, stat: "travessoes" }, // En dash, em dash, three-em dash
  { regex: /[\u2000-\u200A\u00A0]/g, stat: "espacosEspeciais" }, // Em/En Space, NBSP, Thin, Hair, etc.
  { regex: /[\u200B\u200C\u200D]/g, stat: "espacosInvisiveis" }, // ZWSP, ZWNJ, ZWJ
  { regex: /[\u2018\u2019\u201A\u201B\u201C\u201D\u201E\u201F]/g, stat: "aspasTipograficas" }, // Tipográficas
  { regex: /[\u200E\u200F\u202A-\u202E]/g, stat: "controlesDirecionais" }, // LRM, RLM, RLO, etc.
  { regex: /[\u2060\u2061\u2062\u2063\u2064\uFEFF]/g, stat: "invisiveisFuncionais" }, // Funcionais
  { regex: /[\u2800\u3164]/g, stat: "caracteresEspeciais" }, // Braille Blank, Hangul Filler
  { regex: /[\u00AD\u2010\u2011\u2212]/g, stat: "hifensEspeciais" } // Hífens especiais
];

// Função para detectar todos os caracteres e estatísticas
function analisarTexto(texto) {
  let stats = {
    total: texto.length,
    travessoes: 0,
    espacosEspeciais: 0,
    espacosInvisiveis: 0,
    aspasTipograficas: 0,
    controlesDirecionais: 0,
    invisiveisFuncionais: 0,
    caracteresEspeciais: 0,
    hifensEspeciais: 0
  };
  let encontrados = [];
  detectores.forEach(({ regex, stat }) => {
    let resultado;
    let local = 0;
    let rgx = new RegExp(regex);
    while ((resultado = rgx.exec(texto)) !== null) {
      stats[stat]++;
      encontrados.push({
        caractere: resultado[0],
        tipo: stat,
        posicao: resultado.index
      });
      local++;
      // segurança contra loop infinito em regex global
      if (local > 2000) break;
    }
  });
  return { stats, encontrados };
}

// Função para limpar todos os caracteres indesejados
function limpaTexto(texto) {
  let textoLimpo = texto;
  detectores.forEach(({ regex }) => {
    textoLimpo = textoLimpo.replace(regex, "");
  });
  return textoLimpo;
}

export default function App() {
  const [texto, setTexto] = useState("");
  const [analise, setAnalise] = useState({ stats: {}, encontrados: [] });
  const [textoLimpo, setTextoLimpo] = useState("");
  const [avisocopiado, setAvisoCopiado] = useState(false);

  useEffect(() => {
    setAnalise(analisarTexto(texto));
    setTextoLimpo("");
    setAvisoCopiado(false);
  }, [texto]);

  function handleLimpaTexto() {
    const limpo = limpaTexto(texto);
    setTextoLimpo(limpo);
    if (limpo) {
      navigator.clipboard.writeText(limpo);
      setAvisoCopiado(true);
    }
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.type === "text/plain") {
      file.text().then(setTexto);
    } else {
      alert("Apenas arquivos .txt são suportados.");
    }
  }

  // --------------------------------------------
  // INÍCIO DO RETORNO DO COMPONENTE (LAYOUT)
  // --------------------------------------------
  return (
    <div style={{ background: COLORS.bege, minHeight: "100vh", fontFamily: "Lato" }}>
      {/* Título e quadro de tipos de caracteres */}
      <div style={{ padding: "38px 0 16px 0", textAlign: "center" }}>
        <div style={{
          fontFamily: "Poppins",
          fontWeight: 700,
          fontSize: 36,
          color: COLORS.vermelho,
          letterSpacing: "-1.5px",
          marginBottom: 4
        }}>
          LIMPA RASTROS DE IA
        </div>
        <div style={{
          color: COLORS.cinza,
          fontFamily: "Montserrat",
          fontSize: 17,
          marginBottom: 16
        }}>
          Identifica caracteres Unicode que podem indicar texto gerado por inteligência artificial
        </div>
        {/* Quadro horizontal de tipos de caracteres */}
        <div style={{
          background: COLORS.branco,
          borderRadius: 18,
          boxShadow: COLORS.shadow,
          border: `1.5px solid ${COLORS.boxBorder}`,
          padding: "20px 18px",
          maxWidth: 900,
          margin: "0 auto 30px auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 16
        }}>
          {tiposCaracteres.map((tipo, i) => (
            <span key={i} style={{
              borderRadius: 8,
              background: tipo.cor + "20",
              color: tipo.cor,
              fontWeight: 600,
              fontFamily: "Montserrat",
              fontSize: 13,
              border: `1.5px solid ${tipo.cor}70`,
              padding: "5px 13px",
              marginBottom: 6,
              marginRight: 5,
              display: "inline-block"
            }}>
              {tipo.label}
            </span>
          ))}
        </div>
      </div>

      {/* Caixas lado a lado */}
      <div style={{
        maxWidth: 980,
        margin: "0 auto",
        display: "flex",
        gap: 24,
        justifyContent: "center",
        alignItems: "flex-start"
      }}>
        {/* Caixa texto original */}
        <div style={{
          flex: 1,
          minWidth: 325,
          background: COLORS.branco,
          borderRadius: 18,
          boxShadow: COLORS.shadow,
          border: `1.5px solid ${COLORS.boxBorder}`,
          padding: "18px 18px 15px 18px",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <span className="material-icons" style={{ color: COLORS.vermelho, fontSize: 22, marginRight: 6 }}>description</span>
            <span style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 16,
              color: COLORS.cinza
            }}>Texto Original</span>
          </div>
          <textarea
            value={texto}
            onChange={e => setTexto(e.target.value)}
            rows={10}
            style={{
              width: "100%",
              padding: 12,
              border: `1.5px solid ${COLORS.boxBorder}`,
              borderRadius: 10,
              fontSize: 15,
              fontFamily: "Lato",
              marginBottom: 10,
              minHeight: 164,
              background: "#f7f4ed"
            }}
            placeholder="Cole aqui seu texto ou faça upload de .txt"
          />
          <input
            type="file"
            accept=".txt"
            style={{ fontFamily: "Lato", fontSize: 14 }}
            onChange={handleFileUpload}
          />
        </div>
        {/* Caixa análise dos caracteres */}
        <div style={{
          flex: 1,
          minWidth: 325,
          background: COLORS.branco,
          borderRadius: 18,
          boxShadow: COLORS.shadow,
          border: `1.5px solid ${COLORS.boxBorder}`,
          padding: "18px 18px 15px 18px",
          display: "flex",
          flexDirection: "column",
          minHeight: 227,
          maxHeight: 280
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <span className="material-icons" style={{ color: COLORS.azulClaro, fontSize: 22, marginRight: 6 }}>search</span>
            <span style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 16,
              color: COLORS.cinza
            }}>Análise dos Caracteres</span>
          </div>
          <div style={{
            borderRadius: 10,
            minHeight: 160,
            background: "#f7f4ed",
            fontFamily: "Lato",
            fontSize: 15,
            color: COLORS.cinza,
            padding: "14px 10px",
            overflowY: "auto"
          }}>
            {texto.length === 0 ? (
              <span style={{ color: "#969696" }}>
                O texto analisado aparecerá aqui com os caracteres suspeitos destacados...
              </span>
            ) : (
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {analise.encontrados.length === 0 ? (
                  <li style={{ color: "#19A647", fontWeight: 600 }}>Nenhum caractere suspeito encontrado.</li>
                ) : (
                  analise.encontrados.map((m, i) => (
                    <li key={i}>
                      <span style={{
                        fontWeight: 700,
                        color: tiposCaracteres.find(t => t.stat === m.tipo)?.cor || COLORS.vermelho
                      }}>
                        {m.caractere === " " ? "[Espaço]" : m.caractere}
                      </span>{" "}
                      <span style={{ color: COLORS.cinza, fontWeight: 500 }}>
                        ({tiposCaracteres.find(t => t.stat === m.tipo)?.label || m.tipo})
                      </span>{" "}
                      <span style={{ color: "#bbb" }}>
                        Posição: {m.posicao}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* Estatísticas do texto */}
      <div style={{
        maxWidth: 980,
        margin: "24px auto 0 auto",
        background: COLORS.branco,
        borderRadius: 16,
        border: `1.5px solid ${COLORS.boxBorder}`,
        boxShadow: COLORS.shadow,
        padding: "18px 0 8px 0",
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        justifyContent: "space-around"
      }}>
        <Stat label="Total de Caracteres" value={texto ? analise.stats.total : 0} icon="123" cor={COLORS.vermelho} />
        <Stat label="Travessões" value={texto ? analise.stats.travessoes : 0} icon="drag_handle" cor="#e57373" />
        <Stat label="Espaços Especiais" value={texto ? analise.stats.espacosEspeciais : 0} icon="space_bar" cor="#fbc02d" />
        <Stat label="Espaços Invisíveis" value={texto ? analise.stats.espacosInvisiveis : 0} icon="blur_on" cor="#4fc3f7" />
        <Stat label="Aspas Tipográficas" value={texto ? analise.stats.aspasTipograficas : 0} icon="format_quote" cor="#ab47bc" />
        <Stat label="Controles Direcionais" value={texto ? analise.stats.controlesDirecionais : 0} icon="sync_alt" cor="#ff7043" />
        <Stat label="Invisíveis Funcionais" value={texto ? analise.stats.invisiveisFuncionais : 0} icon="block" cor="#64b5f6" />
        <Stat label="Caracteres Especiais" value={texto ? analise.stats.caracteresEspeciais : 0} icon="extension" cor="#aed581" />
        <Stat label="Hífens Especiais" value={texto ? analise.stats.hifensEspeciais : 0} icon="remove" cor="#90a4ae" />
      </div>

      {/* Botões */}
      <div style={{
        margin: "32px 0 18px 0",
        textAlign: "center"
      }}>
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
          Limpar Caracteres
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
      {/* Rodapé */}
      <footer
        style={{
          marginTop: 32,
          textAlign: "center",
          color: COLORS.cinza,
          fontFamily: "Montserrat",
          fontWeight: 400,
          fontSize: 15,
          paddingBottom: 26
        }}
      >
        Limpa Rastros de IA &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

// Componente para cada estatística
function Stat({ label, value, icon, cor }) {
  return (
    <div style={{
      background: "#f7f4ed",
      borderRadius: 12,
      minWidth: 110,
      minHeight: 58,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "7px 18px 7px 10px",
      fontFamily: "Montserrat",
      fontWeight: 600,
      box
```
