import React, { useState } from "react";

// Tipos de marcas/caracteres IA
const tiposMarcas = [
  {
    nome: "Travessões (Em Dash, En Dash, Three-Em Dash)",
    cor: "#E57373",
    regex: /[\u2013\u2014\u2015]/g,
    label: "Travessão",
    exemplo: "—"
  },
  {
    nome: "Espaços Especiais (Em Space, En Space, NBSP, etc.)",
    cor: "#42A5F5",
    regex: /[\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u00A0]/g,
    label: "Esp. Especial",
    exemplo: " "
  },
  {
    nome: "Espaços Invisíveis (ZWSP, ZWNJ, ZWJ, etc.)",
    cor: "#FFA726",
    regex: /[\u200B\u200C\u200D]/g,
    label: "Esp. Invisível",
    exemplo: "‎"
  },
  {
    nome: "Aspas Tipográficas (Left/Right Single/Double Quotes)",
    cor: "#AB47BC",
    regex: /[\u2018\u2019\u201A\u201B\u201C\u201D\u201E\u201F]/g,
    label: "Aspa Tipográfica",
    exemplo: "“"
  },
  {
    nome: "Controles Direcionais (LRM, RLM, RLO)",
    cor: "#26A69A",
    regex: /[\u200E\u200F\u202A-\u202E]/g,
    label: "Controle Dir.",
    exemplo: "‎"
  },
  {
    nome: "Caracteres Invisíveis (Function App, Invisible Times, etc.)",
    cor: "#66BB6A",
    regex: /[\u2060\uFEFF]/g,
    label: "Inv. Funcional",
    exemplo: "⁠"
  },
  {
    nome: "Caracteres Especiais (Braille Blank, Hangul Filler)",
    cor: "#BDB76B",
    regex: /[\u2800\u3164]/g,
    label: "Esp. Especial",
    exemplo: "⠀"
  },
  {
    nome: "Hífens Especiais (Soft Hyphen, Non-Breaking Hyphen, Minus)",
    cor: "#EC407A",
    regex: /[\u00AD\u2010\u2011\u2212]/g,
    label: "Hífen Especial",
    exemplo: "­"
  }
];

// Função para detectar todas as marcas no texto
function detectarMarcas(texto) {
  let encontrados = [];
  tiposMarcas.forEach((tipo, idx) => {
    let regex = new RegExp(tipo.regex);
    let resultado;
    while ((resultado = regex.exec(texto)) !== null) {
      encontrados.push({
        caractere: resultado[0],
        tipo,
        idx,
        posicao: resultado.index
      });
    }
  });
  return encontrados.sort((a, b) => a.posicao - b.posicao);
}

// Função para limpar o texto das marcas
function limparTexto(texto) {
  let textoLimpo = texto;
  tiposMarcas.forEach((tipo) => {
    textoLimpo = textoLimpo.replace(tipo.regex, "");
  });
  return textoLimpo;
}

export default function App() {
  const [texto, setTexto] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [textoLimpo, setTextoLimpo] = useState("");
  const [copiado, setCopiado] = useState(false);

  // Detecta marcas sempre que o texto muda
  React.useEffect(() => {
    setMarcas(detectarMarcas(texto));
    setTextoLimpo("");
    setCopiado(false);
  }, [texto]);

  // Limpa texto e copia
  function handleLimpar() {
    const limpo = limparTexto(texto);
    setTextoLimpo(limpo);
    navigator.clipboard.writeText(limpo);
    setCopiado(true);
  }

  // Gera análise do texto com destaques coloridos
  function renderAnalise() {
    if (!texto) {
      return (
        <span style={{ color: "#888" }}>
          O texto analisado aparecerá aqui com os caracteres suspeitos destacados...
        </span>
      );
    }
    if (marcas.length === 0) {
      return (
        <span style={{ color: "#4CAF50", fontWeight: 500 }}>
          Nenhuma marca suspeita encontrada!
        </span>
      );
    }
    // Monta o texto destacando as marcas
    let resultado = [];
    let lastIndex = 0;
    marcas.forEach((m, i) => {
      if (m.posicao > lastIndex)
        resultado.push(texto.slice(lastIndex, m.posicao));
      resultado.push(
        <span
          key={i}
          style={{
            background: m.tipo.cor,
            color: "#fff",
            borderRadius: 3,
            padding: "1px 4px",
            margin: "0 1px",
            fontWeight: 600,
            fontSize: "inherit"
          }}
          title={m.tipo.nome}
        >
          {m.caractere}
        </span>
      );
      lastIndex = m.posicao + m.caractere.length;
    });
    resultado.push(texto.slice(lastIndex));
    return resultado;
  }

  // Estatísticas
  const estatisticas = React.useMemo(() => {
    let obj = {};
    tiposMarcas.forEach((t) => (obj[t.nome] = 0));
    marcas.forEach((m) => (obj[m.tipo.nome] = obj[m.tipo.nome] + 1));
    return obj;
  }, [marcas]);

  // Contagem total de marcas
  const totalMarcas = marcas.length;

  return (
    <div style={{
      fontFamily: "Lato, Arial, sans-serif",
      background: "#e7eaf6",
      minHeight: "100vh",
      padding: 0,
      margin: 0
    }}>
      {/* Topo */}
      <div style={{ textAlign: "center", padding: "36px 10px 12px 10px" }}>
        <span
          className="material-icons"
          style={{ color: "#6c63ff", fontSize: 44, verticalAlign: "middle" }}
        >search</span>
        <div style={{
          fontFamily: "Poppins, Arial, sans-serif",
          fontWeight: 900,
          fontSize: 38,
          letterSpacing: -2,
          color: "#E31937",
          marginBottom: 3
        }}>
          LIMPA RASTROS DE IA
        </div>
        <div style={{ color: "#555", fontSize: 18, marginBottom: 24 }}>
          Identifique e remova caracteres que podem indicar texto gerado por IA.
        </div>
      </div>

      {/* Tipos de caracteres detectados (legenda) */}
      <div style={{
        maxWidth: 950,
        margin: "0 auto 18px auto",
        background: "#fff",
        borderRadius: 12,
        padding: "18px 18px 6px 18px",
        border: "1px solid #eee",
        boxShadow: "0 2px 10px #0001"
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: 17,
          marginBottom: 10,
          color: "#232323"
        }}>
          Tipos de Caracteres Detectados:
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "14px 32px"
        }}>
          {tiposMarcas.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", fontSize: 15 }}>
              <span style={{
                display: "inline-block",
                width: 18,
                height: 18,
                borderRadius: 4,
                background: t.cor,
                marginRight: 8,
                border: "1px solid #ddd",
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                lineHeight: "18px"
              }}>{t.exemplo}</span>
              {t.nome}
            </div>
          ))}
        </div>
      </div>

      {/* Área principal */}
      <div style={{
        maxWidth: 950,
        margin: "0 auto",
        display: "flex",
        gap: 28,
        alignItems: "flex-start",
        flexWrap: "wrap"
      }}>
        {/* Caixa Texto Original */}
        <div style={{
          flex: 1,
          minWidth: 260,
          background: "#fff",
          borderRadius: 12,
          border: "1px solid #eee",
          padding: 16,
          boxShadow: "0 1px 8px #0001",
          marginBottom: 14
        }}>
          <div style={{
            fontWeight: 700,
            fontSize: 17,
            marginBottom: 8,
            color: "#222",
            display: "flex",
            alignItems: "center"
          }}>
            <span className="material-icons" style={{
              fontSize: 22, color: "#666", marginRight: 6
            }}>description</span>
            Texto Original
          </div>
          <textarea
            value={texto}
            onChange={e => setTexto(e.target.value)}
            rows={10}
            style={{
              width: "100%",
              resize: "vertical",
              borderRadius: 8,
              border: "1.5px solid #d3d3d3",
              padding: 12,
              fontSize: 16,
              minHeight: 160
            }}
            placeholder="Cole ou digite seu texto aqui..."
          />
        </div>
        {/* Caixa Análise dos Caracteres */}
        <div style={{
          flex: 1,
          minWidth: 260,
          background: "#fff",
          borderRadius: 12,
          border: "1px solid #eee",
          padding: 16,
          boxShadow: "0 1px 8px #0001",
          marginBottom: 14,
          minHeight: 201
        }}>
          <div style={{
            fontWeight: 700,
            fontSize: 17,
            marginBottom: 8,
            color: "#222",
            display: "flex",
            alignItems: "center"
          }}>
            <span className="material-icons" style={{
              fontSize: 22, color: "#666", marginRight: 6
            }}>search</span>
            Análise dos Caracteres
          </div>
          <div style={{
            fontFamily: "Lato, Arial, sans-serif",
            fontSize: 16,
            minHeight: 160,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            background: "#f8fafc",
            borderRadius: 8,
            padding: 10,
            color: "#222"
          }}>
            {renderAnalise()}
          </div>
        </div>
      </div>

      {/* Estatísticas do Texto */}
      <div style={{
        maxWidth: 950,
        margin: "0 auto 22px auto",
        background: "#f8fafc",
        borderRadius: 12,
        border: "1px solid #eee",
        boxShadow: "0 2px 10px #0001",
        padding: "18px 10px 12px 10px",
        display: "flex",
        flexWrap: "wrap",
        gap: 18,
        justifyContent: "center"
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: 18,
          width: "100%",
          marginBottom: 12,
          color: "#232323",
          textAlign: "center"
        }}>
          <span className="material-icons" style={{
            fontSize: 21, color: "#6c63ff", verticalAlign: "middle"
          }}>insights</span>
          {" "}Estatísticas do Texto
        </div>
        {/* Total de marcas */}
        <div style={estatCardStyle}>
          <span className="material-icons" style={iconStyle("#E57373")}>flag</span>
          <div style={statNum}>{totalMarcas}</div>
          <div style={statLabel}>Total de Marcas</div>
        </div>
        {/* Um card para cada tipo de marca */}
        {tiposMarcas.map((t, i) => (
          <div key={i} style={estatCardStyle}>
            <span className="material-icons" style={iconStyle(t.cor)}>check_box</span>
            <div style={statNum}>{estatisticas[t.nome]}</div>
            <div style={statLabel}>{t.label}</div>
          </div>
        ))}
      </div>

      {/* Botão Limpar */}
      <div style={{
        textAlign: "center",
        marginBottom: 38
      }}>
        <button
          onClick={handleLimpar}
          disabled={!texto}
          style={{
            background: "#E31937",
            color: "#fff",
            fontWeight: 700,
            fontSize: 18,
            border: "none",
            borderRadius: 8,
            padding: "16px 36px",
            cursor: texto ? "pointer" : "not-allowed",
            opacity: texto ? 1 : 0.5,
            minWidth: 240,
            boxShadow: "0 2px 8px #0002",
            transition: "all .15s"
          }}
        >
          <span className="material-icons" style={{
            fontSize: 22,
            verticalAlign: "middle",
            marginRight: 6
          }}>cleaning_services</span>
          Limpar Texto e Copiar
        </button>
        {copiado &&
          <div style={{
            marginTop: 10,
            color: "#229954",
            fontWeight: 600,
            fontSize: 16
          }}>
            Texto limpo copiado para a área de transferência!
          </div>
        }
      </div>
    </div>
  );
}

// Estilos para estatísticas
const estatCardStyle = {
  minWidth: 120,
  flex: "1 0 120px",
  background: "#fff",
  borderRadius: 8,
  padding: "14px 10px",
  margin: "6px 4px",
  textAlign: "center",
  boxShadow: "0 1px 8px #0001",
  border: "1px solid #eee",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const iconStyle = (cor) => ({
  fontSize: 30,
  color: cor,
  marginBottom: 4
});

const statNum = {
  fontSize: 25,
  fontWeight: 800,
  color: "#222"
};

const statLabel = {
  fontSize: 15,
  color: "#666"
};
