import { useState, useEffect } from "react";

const REDES = ["Instagram Feed", "Instagram Stories", "Facebook", "LinkedIn", "TikTok"];

const SYSTEM_PROMPT = `Sos un estratega de contenido senior para agencias de marketing digital en Latinoamérica. Tu trabajo no es generar contenido, es construir estrategia que se traduce en contenido ejecutable. Cada pieza tiene un rol dentro del mes, una posición en el funnel y un objetivo medible.

━━━ LÓGICA ESTRATÉGICA DEL MES ━━━
Antes de generar, pensá el arco del mes completo:
- Semana 1: Activar atención — contenido de alto alcance, hooks disruptivos, posicionamiento de marca
- Semana 2: Generar interés — educación, diferenciación, prueba social
- Semana 3: Mover hacia conversión — urgencia, objeciones, casos reales, ofertas
- Semana 4: Fidelizar y retener — comunidad, behind the scenes, agradecimiento, próximo mes

Cada pieza debe poder responder: ¿por qué esta pieza en esta semana y no en otra?

━━━ HOOKS: REGLAS DE ORO ━━━
El hook es el 80% del resultado. Nunca uses hooks genéricos. Cada hook debe activar uno de estos disparadores:

CURIOSIDAD: "Lo que nadie te dijo sobre..." / "La razón real por la que..." / "Esto no lo vas a encontrar en otro lado"
CONTRASTE/SORPRESA: "Dejé de hacer X y pasó esto" / "El error que cometemos todos" / "Esto no es lo que parece"
IDENTIFICACIÓN: "Si alguna vez te pasó X, esto es para vos" / "Para los que todavía creen que..."
FOMO/URGENCIA: "Hasta cuándo vas a esperar para..." / "Ya no hay excusas para no..."
DATO/ESTADÍSTICA: "El X% de [público] no sabe esto" / "Solo 1 de cada 10 [acción]"
PROMESA CLARA: "En 60 segundos entendés por qué..." / "3 cosas que cambian todo sobre..."

El hook debe ser específico al cliente, su rubro y su público. NUNCA genérico.

━━━ CTAs: ESTRATEGIA POR RED Y MOMENTO DEL FUNNEL ━━━
El CTA depende de dónde está el usuario en su journey CON LA MARCA:

AWARENESS (nuevos seguidores / top of funnel):
  → "Guardá esto para cuando lo necesites"
  → "Seguinos para ver más de esto"
  → "Mandáselo a alguien que necesita leer esto"

CONSIDERACIÓN (ya nos conocen, evalúan):
  → "Escribinos y te contamos cómo funciona"
  → "Comentá INFO y te mandamos los detalles"
  → "Agendá una llamada sin compromiso"

CONVERSIÓN (listos para comprar/contratar):
  → "Reservá tu lugar ahora — quedan X"
  → "Escribinos HOY por WhatsApp"
  → "Hacé click en el link de la bio"

RETENCIÓN (ya son clientes):
  → "Contanos cómo te fue en los comentarios"
  → "Etiquetá a alguien que también lo necesita"
  → "Mandanos tu resultado por DM"

Por red social:
  Instagram Feed: CTAs de guardado, comentario, compartido
  Instagram Stories: CTAs de swipe up, respuesta directa, encuesta
  LinkedIn: CTAs de debate, opinión, reflexión profesional
  TikTok: CTAs de duet, comentario con respuesta, guardar
  Facebook: CTAs de compartido en grupos, comentario largo

━━━ REGLAS DE PRODUCCIÓN ━━━
- TITULO: descriptivo y específico. "Cómo elegir [producto] según tu presupuesto (Guía 2026)" no "Contenido educativo"
- GUION: instrucción de producción ejecutable. QUÉ grabar/diseñar, con qué ángulo, en qué orden, con qué texto en pantalla. Mínimo 3 oraciones. Incluir el hook exacto de apertura.
- COPY: voz humana de la marca. Máximo 4 líneas. 1-2 emojis en lugares naturales. Sin frases corporativas ("en nuestra empresa nos dedicamos a...").
- RECURSOS: listado concreto de lo que el equipo necesita antes de producir. Específico: "foto del producto X en fondo blanco" no "material gráfico".
- Días: Lunes a Viernes. No poner 2 piezas el mismo día a menos que sean redes distintas.
- Formatos: variá entre Reel (alcance), Carrusel (educativo/guardado), Story (comunidad), Imagen (branding). No repetir el mismo formato más de 2 veces seguidas.

RESPONDE ÚNICAMENTE con un JSON válido con esta estructura exacta (sin markdown, sin explicaciones):
{
  "resumen": "string con resumen estratégico del planning en 2-3 oraciones",
  "formato_ganador": "string - el formato que más se repite o el más relevante",
  "pilar_principal": "string - el pilar dominante",
  "objetivo": "string - objetivo principal del mes",
  "semanas": [
    {
      "numero": 1,
      "foco": "string - foco estratégico de la semana en 5-8 palabras",
      "piezas": [
        {
          "dia": "Lunes",
          "semana": 1,
          "red": "Instagram Feed",
          "formato": "Reel",
          "pilar": "Educativo",
          "titulo": "string - título descriptivo del contenido real",
          "guion": "string - instrucción concreta de producción: qué grabar/diseñar, ángulo, secuencia, duración. Mínimo 2 oraciones.",
          "copy": "string - caption final humano, máximo 4 líneas, 1-2 emojis",
          "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
          "cta": "string - llamada a la acción específica",
          "recursos": "string - qué necesita el equipo para producir esta pieza"
        }
      ]
    }
  ]
}`;

const SYSTEM_PROMPT_PIEZA = `Sos un estratega de contenido senior. Vas a generar UNA sola pieza de contenido para completar un planning existente.

La pieza debe:
- Tener un rol estratégico claro dentro de la semana (no repetir lo que ya existe)
- Usar un hook basado en disparadores psicológicos concretos (curiosidad, contraste, FOMO, identificación, dato, promesa)
- Tener un CTA adaptado a la red social y al momento del funnel
- Tener un guion de producción ejecutable con al menos 3 oraciones
- Complementar (no repetir) los formatos y pilares de las otras piezas de esa semana

RESPONDE ÚNICAMENTE con un JSON válido con esta estructura (sin markdown, sin texto extra):
{
  "dia": "Lunes",
  "semana": 1,
  "red": "Instagram Feed",
  "formato": "Reel",
  "pilar": "Educativo",
  "titulo": "string",
  "guion": "string - mínimo 3 oraciones con hook de apertura explícito",
  "copy": "string - máximo 4 líneas, 1-2 emojis, voz humana",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
  "cta": "string - específico a la red y al funnel",
  "recursos": "string - qué necesita el equipo para producirla"
}`;

const DEMO_PLANNING = {
  resumen: "Planning de demostración para una marca de lifestyle. Foco en contenido educativo y comunidad con distribución equilibrada entre reels y carruseles para maximizar alcance orgánico.",
  formato_ganador: "Reel",
  pilar_principal: "Educativo",
  objetivo: "Aumentar alcance orgánico y engagement",
  semanas: [
    {
      numero: 1,
      foco: "Presentación de marca y propuesta de valor",
      piezas: [
        {
          dia: "Lunes", semana: 1, red: "Instagram Feed", formato: "Reel", pilar: "Educativo",
          titulo: "3 errores que cometés al elegir tu producto",
          guion: "Reel dinámico con texto en pantalla. Formato lista rápida: error 1 → corte → error 2 → corte → error 3. Cada error con close-up del problema y solución en texto. Hook primeros 2 segundos: '¿Seguís haciendo esto?' Música trending de IG.",
          copy: "El 80% de la gente lo hace mal. 👀\nTe contamos los 3 errores más comunes y cómo evitarlos.\n¿Cuál te pasó a vos?",
          hashtags: ["#tips", "#consejos", "#lifestyle", "#marcademo", "#aprende"],
          cta: "Guardá este video para no olvidarte",
          recursos: "Grabar en estudio con buena iluminación. Subtítulos obligatorios. Incluir texto en pantalla para cada error."
        },
        {
          dia: "Miércoles", semana: 1, red: "Instagram Feed", formato: "Carrusel", pilar: "Comunidad",
          titulo: "Así somos por dentro (Behind the scenes)",
          guion: "Carrusel 6 slides: Slide 1 = foto del equipo con pregunta gancho '¿Cómo hacemos lo que hacemos?'. Slides 2-5 = fotos reales del proceso/espacio con texto descriptivo corto. Slide 6 = CTA para seguirnos. Sin filtros excesivos, estilo auténtico.",
          copy: "Esto es lo que pasa cuando nadie mira. 📸\nTe mostramos cómo trabajamos cada día para traerte lo mejor.",
          hashtags: ["#behindthescenes", "#equipo", "#marcademo", "#transparencia", "#proceso"],
          cta: "Seguinos para ver más de esto",
          recursos: "Fotos reales del espacio de trabajo y equipo. Sin filtros excesivos. Incluir al equipo real."
        },
        {
          dia: "Viernes", semana: 1, red: "Instagram Stories", formato: "Story interactiva", pilar: "Comunidad",
          titulo: "Encuesta: ¿Qué contenido querés ver este mes?",
          guion: "Story con encuesta nativa de Instagram. Fondo sólido con color de marca. Pregunta clara arriba, dos opciones concretas. Segunda story al día siguiente mostrando resultados para generar expectativa de seguimiento.",
          copy: "¿Qué querés que te mostremos este mes? Vos decidís. 👇",
          hashtags: [],
          cta: "Votá en la encuesta",
          recursos: "Diseño simple en Canva con paleta de marca. Programar story de seguimiento con resultados."
        }
      ]
    },
    {
      numero: 2,
      foco: "Educación y posicionamiento de producto",
      piezas: [
        {
          dia: "Martes", semana: 2, red: "Instagram Feed", formato: "Reel", pilar: "Producto",
          titulo: "Cómo usar el producto en 60 segundos",
          guion: "Tutorial rápido formato reel. Manos mostrando el producto paso a paso con texto superpuesto en cada acción. Música upbeat. Cierre con resultado final y logo. Hook primeros 2 segundos: 'Esto nadie te lo explica.' Subtítulos obligatorios.",
          copy: "Tutorial express para que lo aprovechés al máximo. ⚡\n60 segundos y ya sabés todo lo que necesitás.",
          hashtags: ["#tutorial", "#howto", "#producto", "#marcademo", "#tips"],
          cta: "Probalo y contanos en comentarios",
          recursos: "Grabar close-up del producto con buena iluminación natural. Subtítulos. Música sin copyright."
        },
        {
          dia: "Jueves", semana: 2, red: "LinkedIn", formato: "Imagen", pilar: "Educativo",
          titulo: "El dato que cambia cómo ves el mercado",
          guion: "Imagen estática con estadística impactante en tipografía grande central. Fondo oscuro con color de acento de marca. Fuente del dato citada abajo en letra pequeña. Copy extenso en el caption para generar debate profesional.",
          copy: "El 73% de las marcas no mide esto correctamente.\n\nY ese es exactamente el problema.\n\nLo que no se mide, no se puede mejorar. ¿Tu equipo lo está haciendo?",
          hashtags: ["#marketing", "#datos", "#estrategia", "#marcademo", "#negocios"],
          cta: "¿Qué pensás? Comentá abajo",
          recursos: "Diseño en Figma o Canva. Buscar fuente confiable para el dato. Versión cuadrada y horizontal."
        }
      ]
    }
  ]
};

const redColor: Record<string, string> = {
  "Instagram Feed": "#E1306C",
  "Instagram Stories": "#833AB4",
  "Facebook": "#1877F2",
  "LinkedIn": "#0A66C2",
  "TikTok": "#AAAAAA",
};
const redIcon: Record<string, string> = {
  "Instagram Feed": "📸",
  "Instagram Stories": "⭕",
  "Facebook": "👥",
  "LinkedIn": "💼",
  "TikTok": "🎵",
};
const pilarColor: Record<string, string> = {
  "Educativo": "#3B82F6",
  "Entretenimiento": "#F59E0B",
  "Promocional": "#E1306C",
  "Comunidad": "#10B981",
  "Producto": "#833AB4",
  "Behind the scenes": "#888",
  "Experiencial": "#F97316",
  "Social Proof": "#06B6D4",
  "Lifestyle": "#84CC16",
  "Servicios": "#A855F7",
};
const DIAS_SEMANA = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const DIAS_SHORT = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];

const Y = "#D4E82A";
const BK = "#0D0D0D";
const DK = "#161616";
const GR = "#2A2A2A";
const CR = "#F5EFE0";

const PIEZA_VACIA = {
  dia: "Lunes", semana: 1, red: "Instagram Feed", formato: "Reel",
  pilar: "Educativo", titulo: "", guion: "", copy: "",
  hashtags: [] as string[], cta: "", recursos: ""
};

const AUTH_USER = "Pintamkt";
const AUTH_PASS = "P.intamkt2026";

export default function AgentePlanning() {
  // ── Auth ──────────────────────────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    localStorage.getItem("pintamkt_auth") === "ok"
  );
  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [authError, setAuthError] = useState("");

  // ── Form ──────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    cliente: "",
    mes: "",
    objetivo: "",
    redes: [] as string[],
    piezasSemana: "3-5",
    brief: "",
    tono: "",
    publico: "",
    fechasEspeciales: "",
    reporteAnterior: "",
  });

  // ── UI State ──────────────────────────────────────────────────────────
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [planning, setPlanning] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeWeek, setActiveWeek] = useState(0);
  const [view, setView] = useState("calendar");
  const [selectedPieza, setSelectedPieza] = useState<any>(null);
  const [editando, setEditando] = useState<any>(null);
  const [historial, setHistorial] = useState<any[]>(() => {
    try { return JSON.parse(localStorage.getItem("pintamkt_historial") || "[]"); }
    catch { return []; }
  });

  // ── Persistencia ──────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pintamkt_planning");
      if (saved) {
        const { planning: p, formData } = JSON.parse(saved);
        setPlanning(p);
        setForm(f => ({ ...f, ...formData }));
        setStep("result");
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!planning) return;
    try {
      const formData = {
        cliente: form.cliente, mes: form.mes,
        objetivo: form.objetivo, redes: form.redes
      };
      localStorage.setItem("pintamkt_planning", JSON.stringify({ planning, formData }));
    } catch {}
  }, [planning, form.cliente, form.mes, form.objetivo, form.redes]);

  useEffect(() => {
    try { localStorage.setItem("pintamkt_historial", JSON.stringify(historial)); }
    catch {}
  }, [historial]);

  const guardarEnHistorial = (p: any, formData: any) => {
    const entrada = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }),
      cliente: formData.cliente,
      mes: formData.mes,
      totalPiezas: p.semanas?.flatMap((s: any) => s.piezas).length || 0,
      planning: p,
      formData,
    };
    setHistorial(prev => [entrada, ...prev]);
  };

  const eliminarDelHistorial = (id: number) => {
    setHistorial(prev => prev.filter(e => e.id !== id));
  };

  const cargarDesdeHistorial = (entrada: any) => {
    setPlanning(entrada.planning);
    setForm(f => ({ ...f, ...entrada.formData }));
    setActiveWeek(0);
    setStep("result");
  };

  // ── Helpers ───────────────────────────────────────────────────────────
  const calcularFecha = (dia: string, semana: number | undefined, mes: string): string => {
    try {
      const DIAS_MAP: Record<string, number> = {
        "Lunes": 1, "Martes": 2, "Miércoles": 3, "Jueves": 4,
        "Viernes": 5, "Sábado": 6, "Domingo": 0
      };
      const meses = ["enero","febrero","marzo","abril","mayo","junio","julio",
                     "agosto","septiembre","octubre","noviembre","diciembre"];
      const mesLower = mes.toLowerCase();
      let mesNum = -1, anio = new Date().getFullYear();
      meses.forEach((m, i) => { if (mesLower.includes(m)) mesNum = i; });
      const yearMatch = mes.match(/\d{4}/);
      if (yearMatch) anio = parseInt(yearMatch[0]);
      if (mesNum === -1 || semana === undefined || isNaN(semana)) return "";
      const primerDia = new Date(anio, mesNum, 1);
      const diaSemanaTarget = DIAS_MAP[dia];
      if (diaSemanaTarget === undefined) return "";
      let offset = diaSemanaTarget - primerDia.getDay();
      if (offset < 0) offset += 7;
      const fechaBase = new Date(anio, mesNum, 1 + offset);
      const fechaFinal = new Date(fechaBase);
      fechaFinal.setDate(fechaBase.getDate() + (semana - 1) * 7);
      if (isNaN(fechaFinal.getTime())) return "";
      const d = String(fechaFinal.getDate()).padStart(2, "0");
      const m2 = String(fechaFinal.getMonth() + 1).padStart(2, "0");
      return `${d}/${m2}/${anio}`;
    } catch { return ""; }
  };

  // ── Exports ───────────────────────────────────────────────────────────
  const exportarCSV = () => {
    if (!planning) return;
    const headers = ["Nombre de la tarea", "Descripción", "Estado", "Etiquetas", "Fecha"];
    const rows = planning.semanas.flatMap((s: any) =>
      s.piezas.map((p: any) => {
        const fecha = calcularFecha(p.dia, p.semana || s.numero, form.mes);
        const nombre = `${p.formato} - ${p.titulo}`;
        const descripcion = `Formato: ${p.formato}\nPlataformas: ${p.red}\nFecha de publicación: ${fecha}\nPilar: ${p.pilar}\n\nIdea / Guión:\n${p.guion}\n\nCopy:\n${p.copy}\n\nCTA:\n${p.cta}\n\nRecursos:\n${p.recursos || "A definir"}\n\nHashtags:\n${(p.hashtags || []).join(" ")}`;
        const etiquetas = p.red.toLowerCase().replace(/ /g, "_");
        return [nombre, descripcion, "PENDIENTES", etiquetas, fecha];
      })
    );
    const escapeCSV = (val: any) => {
      if (val == null) return "";
      const str = String(val);
      if (str.includes(",") || str.includes("\n") || str.includes('"')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    };
    const csvContent = [headers, ...rows].map((row: any[]) => row.map(escapeCSV).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Planning_${form.cliente.replace(/ /g,"_")}_${form.mes.replace(/ /g,"_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportarPDF = () => {
    if (!planning) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Planning ${form.cliente} - ${form.mes}</title>
<style>* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0D0D0D; color: #F5EFE0; font-family: sans-serif; padding: 32px; }
@media print { body { padding: 16px; } @page { margin: 12mm; size: A4; } }</style>
</head><body>
<div style="border-bottom:3px solid #D4E82A;padding-bottom:20px;margin-bottom:24px;">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
    <div style="background:#D4E82A;color:#000;font-size:18px;font-weight:900;padding:4px 12px;">🐝 PINTAMKT</div>
    <div style="font-size:13px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:.12em;">AGENTE DE PLANNING</div>
  </div>
  <div style="font-size:28px;font-weight:900;text-transform:uppercase;color:#F5EFE0;margin-bottom:6px;">${form.cliente.toUpperCase()} · ${form.mes.toUpperCase()}</div>
  <div style="font-size:13px;color:#888;line-height:1.6;max-width:600px;margin-bottom:14px;">${planning.resumen}</div>
  <div style="display:flex;gap:24px;flex-wrap:wrap;">
    <div><div style="font-size:9px;color:#555;font-weight:700;text-transform:uppercase;">PIEZAS</div><div style="font-size:22px;font-weight:900;color:#D4E82A;">${planning.semanas.flatMap((s: any) => s.piezas).length}</div></div>
    <div><div style="font-size:9px;color:#555;font-weight:700;text-transform:uppercase;">FORMATO GANADOR</div><div style="font-size:14px;font-weight:700;color:#F5EFE0;">${planning.formato_ganador}</div></div>
    <div><div style="font-size:9px;color:#555;font-weight:700;text-transform:uppercase;">PILAR PRINCIPAL</div><div style="font-size:14px;font-weight:700;color:#F5EFE0;">${planning.pilar_principal}</div></div>
  </div>
</div>
${planning.semanas.map((s: any) => `
<div style="background:#D4E82A;padding:8px 14px;margin-bottom:8px;display:inline-block;">
  <span style="font-size:13px;font-weight:900;color:#000;text-transform:uppercase;">SEMANA ${s.numero} — ${(s.foco||"").toUpperCase()}</span>
</div>
<div style="margin-bottom:28px;margin-top:4px;">
  ${s.piezas.map((p: any) => {
    const fecha = calcularFecha(p.dia, p.semana || s.numero, form.mes);
    const pc = (pilarColor as any)[p.pilar] || "#888";
    return `<div style="break-inside:avoid;border:1px solid #333;border-left:4px solid ${pc};padding:16px;margin-bottom:12px;background:#1a1a1a;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
        <div>
          <span style="background:#D4E82A;color:#000;font-size:10px;font-weight:900;padding:2px 8px;text-transform:uppercase;">${p.formato}</span>
          <span style="margin-left:8px;font-size:11px;color:#666;">${p.red} · ${p.dia}${fecha ? " · " + fecha : ""}</span>
        </div>
        <span style="font-size:10px;color:${pc};font-weight:700;text-transform:uppercase;">${p.pilar}</span>
      </div>
      <div style="font-weight:900;font-size:15px;color:#F5EFE0;text-transform:uppercase;margin-bottom:10px;">${p.titulo}</div>
      <div style="margin-bottom:8px;"><div style="font-size:9px;color:#555;font-weight:700;text-transform:uppercase;margin-bottom:3px;">IDEA / GUIÓN</div><div style="font-size:12px;color:#CCC;line-height:1.6;background:#111;padding:10px;border-left:2px solid #D4E82A55;">${p.guion}</div></div>
      <div style="margin-bottom:8px;"><div style="font-size:9px;color:#555;font-weight:700;text-transform:uppercase;margin-bottom:3px;">COPY</div><div style="font-size:12px;color:#AAA;line-height:1.6;white-space:pre-line;background:#111;padding:10px;">${p.copy}</div></div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;">
        <div><div style="font-size:9px;color:#555;font-weight:700;text-transform:uppercase;margin-bottom:3px;">CTA</div><div style="font-size:12px;color:#D4E82A;font-weight:700;">${p.cta}</div></div>
        ${p.recursos ? `<div style="flex:2;"><div style="font-size:9px;color:#555;font-weight:700;text-transform:uppercase;margin-bottom:3px;">RECURSOS</div><div style="font-size:11px;color:#888;">${p.recursos}</div></div>` : ""}
      </div>
      ${p.hashtags?.length ? `<div style="margin-top:8px;font-size:10px;color:#D4E82A88;">${p.hashtags.join(" ")}</div>` : ""}
    </div>`;
  }).join("")}
</div>`).join("")}
<script>window.onload = () => window.print();</script>
</body></html>`);
    printWindow.document.close();
  };

  // ── Edit ──────────────────────────────────────────────────────────────
  const abrirEditor = (semanaIdx: number, piezaIdx: number, pieza: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditando({ semanaIdx, piezaIdx, pieza: { ...pieza } });
  };

  const [generandoPieza, setGenerandoPieza] = useState(false);

  const abrirNuevaPieza = (semanaIdx: number) => {
    setEditando({
      semanaIdx,
      piezaIdx: null,
      pieza: { ...PIEZA_VACIA, semana: semanaIdx + 1, red: form.redes[0] || "Instagram Feed" }
    });
  };

  const generarPiezaConIA = async (semanaIdx: number) => {
    setGenerandoPieza(true);
    const semana = planning.semanas[semanaIdx];
    const piezasExistentes = semana.piezas.map((p: any) =>
      `${p.dia} — ${p.red} — ${p.formato} — ${p.pilar} — "${p.titulo}"`
    ).join("\n");

    const userPrompt = `Cliente: ${form.cliente}
Mes: ${form.mes}
Objetivo del mes: ${form.objetivo}
Público: ${form.publico || "No especificado"}
Tono: ${form.tono || "No especificado"}
Brief: ${form.brief || "No especificado"}
Redes activas: ${form.redes.join(", ")}

Semana ${semana.numero} — Foco: ${semana.foco}

Piezas que ya existen en esta semana (NO repetir día, formato ni pilar si podés evitarlo):
${piezasExistentes || "Ninguna todavía"}

Generá UNA pieza nueva que complemente estratégicamente lo que ya hay.`;

    try {
      const response = await fetch("/api/planning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT_PIEZA, userPrompt })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      const text = data.content?.map((c: any) => c.text || "").join("") || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No se encontró JSON");
      const pieza = JSON.parse(jsonMatch[0]);
      setEditando({ semanaIdx, piezaIdx: null, pieza: { ...pieza, semana: semana.numero } });
    } catch (e: any) {
      setEditando({
        semanaIdx,
        piezaIdx: null,
        pieza: { ...PIEZA_VACIA, semana: semanaIdx + 1, red: form.redes[0] || "Instagram Feed" }
      });
    } finally {
      setGenerandoPieza(false);
    }
  };

  const guardarEdicion = () => {
    if (!editando) return;
    setPlanning((prev: any) => ({
      ...prev,
      semanas: prev.semanas.map((s: any, si: number) => si !== editando.semanaIdx ? s : {
        ...s,
        piezas: editando.piezaIdx === null
          ? [...s.piezas, editando.pieza]
          : s.piezas.map((p: any, pi: number) => pi !== editando.piezaIdx ? p : editando.pieza)
      })
    }));
    setEditando(null);
  };

  const eliminarPieza = () => {
    if (!editando || editando.piezaIdx === null) return;
    setPlanning((prev: any) => ({
      ...prev,
      semanas: prev.semanas.map((s: any, si: number) => si !== editando.semanaIdx ? s : {
        ...s, piezas: s.piezas.filter((_: any, pi: number) => pi !== editando.piezaIdx)
      })
    }));
    setEditando(null);
  };

  const toggleRed = (red: string) => {
    setForm(f => ({
      ...f,
      redes: f.redes.includes(red) ? f.redes.filter(r => r !== red) : [...f.redes, red]
    }));
  };

  // ── Generate ──────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!form.cliente || !form.mes || !form.objetivo || form.redes.length === 0) {
      setError("Completá cliente, mes, objetivo y al menos una red.");
      return;
    }
    setError(null);
    setLoading(true);
    setStep("loading");

    const userPrompt = `Cliente: ${form.cliente}
Mes a planificar: ${form.mes}
Objetivo de campaña: ${form.objetivo}
Redes sociales: ${form.redes.join(", ")}
Piezas por semana: ${form.piezasSemana}
Tono de comunicación: ${form.tono || "No especificado"}
Público objetivo: ${form.publico || "No especificado"}
Brief del cliente: ${form.brief || "No proporcionado"}
Fechas especiales del mes: ${form.fechasEspeciales || "Ninguna especificada"}
Insights del mes anterior: ${form.reporteAnterior || "No disponible"}

Genera el planning mensual completo para 4 semanas. Distribuí las piezas en días específicos de la semana (Lunes a Viernes principalmente). Cada pieza debe tener guion de producción detallado (mínimo 3 oraciones), copy completo con emojis y CTA específico.`;

    try {
      const response = await fetch("/api/planning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT, userPrompt })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const text = data.content?.map((c: any) => c.text || "").join("") || "";
      // Robust JSON extraction
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No se encontró JSON en la respuesta del modelo");
      const parsed = JSON.parse(jsonMatch[0]);

      setPlanning(parsed);
      setActiveWeek(0);
      setStep("result");
      guardarEnHistorial(parsed, {
        cliente: form.cliente, mes: form.mes,
        objetivo: form.objetivo, redes: form.redes
      });
    } catch (e: any) {
      setError("Error: " + e.message);
      setStep("form");
    } finally {
      setLoading(false);
    }
  };

  const cargarDemo = () => {
    setPlanning(DEMO_PLANNING);
    setForm(f => ({
      ...f,
      cliente: "Marca Demo",
      mes: "Mayo 2026",
      objetivo: "Aumentar alcance orgánico y engagement",
      redes: ["Instagram Feed", "Instagram Stories", "LinkedIn"]
    }));
    setActiveWeek(0);
    setStep("result");
  };

  const allPiezas = planning?.semanas?.flatMap((s: any) => s.piezas) || [];
  const totalPiezas = allPiezas.length;

  // ── Login Screen ─────────────────────────────────────────────────────
  if (!isAuthenticated) {
    const handleLogin = () => {
      if (userInput === AUTH_USER && passInput === AUTH_PASS) {
        localStorage.setItem("pintamkt_auth", "ok");
        setIsAuthenticated(true);
        setAuthError("");
      } else {
        setAuthError("Usuario o contraseña incorrectos");
        setPassInput("");
      }
    };
    return (
      <div style={{ minHeight: "100vh", background: BK, fontFamily: "'Barlow', sans-serif", color: CR, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600;700&display=swap'); * { box-sizing: border-box; }`}</style>
        <div style={{ background: DK, border: `2px solid ${Y}`, padding: "40px 44px", maxWidth: 400, width: "100%", margin: "0 20px" }}>
          <div style={{ background: Y, color: BK, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 18, padding: "4px 12px", display: "inline-block", marginBottom: 24 }}>🐝 PINTAMKT</div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 30, textTransform: "uppercase", marginBottom: 4 }}>AGENTE DE PLANNING</div>
          <div style={{ fontSize: 13, color: "#555", marginBottom: 28, fontFamily: "'Barlow',sans-serif" }}>Ingresá tus credenciales para continuar.</div>
          {authError && (
            <div style={{ background: "#2A0A0A", border: "2px solid #E1306C", color: "#E1306C", padding: "10px 14px", marginBottom: 18, fontSize: 13, fontWeight: 600 }}>
              ⚠ {authError}
            </div>
          )}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: "#555", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>USUARIO</div>
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleLogin(); }}
              placeholder="Usuario"
              style={{ width: "100%", padding: "13px 16px", background: "#0D0D0D", border: `2px solid ${GR}`, color: CR, fontFamily: "'Barlow',sans-serif", fontSize: 15, outline: "none" }}
              autoFocus
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, color: "#555", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>CONTRASEÑA</div>
            <input
              type="password"
              value={passInput}
              onChange={e => setPassInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleLogin(); }}
              placeholder="Contraseña"
              style={{ width: "100%", padding: "13px 16px", background: "#0D0D0D", border: `2px solid ${GR}`, color: CR, fontFamily: "'Barlow',sans-serif", fontSize: 15, outline: "none" }}
            />
          </div>
          <button
            onClick={handleLogin}
            style={{ width: "100%", padding: "15px", background: Y, border: "none", color: BK, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: "0.1em", cursor: "pointer", textTransform: "uppercase" }}
          >
            INGRESAR
          </button>
        </div>
      </div>
    );
  }

  // ── Main Render ───────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: BK, fontFamily: "'Barlow', sans-serif", color: CR }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .pi { padding: 12px 16px; background: ${DK}; border: 2px solid ${GR}; color: ${CR}; font-size: 14px; font-family: 'Barlow', sans-serif; outline: none; transition: border-color 0.15s; resize: vertical; width: 100%; }
        .pi:focus { border-color: ${Y}; }
        .pi::placeholder { color: #444; }
        .btn-tag { padding: 7px 14px; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 0.06em; border: 2px solid ${GR}; background: transparent; color: #666; transition: all 0.12s; text-transform: uppercase; }
        .btn-tag:hover { border-color: ${Y}; color: ${Y}; }
        .btn-tag.on { border-color: ${Y}; background: ${Y}; color: ${BK}; }
        .gen-btn { width: 100%; padding: 18px; background: ${Y}; border: none; color: ${BK}; font-size: 18px; font-weight: 900; font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.1em; cursor: pointer; text-transform: uppercase; transition: all 0.12s; }
        .gen-btn:hover { background: #e8ff22; transform: translateY(-1px); }
        .demo-btn { width: 100%; padding: 14px; background: transparent; border: 2px solid ${GR}; color: #666; font-size: 14px; font-weight: 700; font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.08em; cursor: pointer; text-transform: uppercase; margin-bottom: 10px; transition: all 0.12s; }
        .demo-btn:hover { border-color: ${Y}55; color: #999; }
        .view-btn { padding: 8px 20px; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.08em; border: 2px solid ${GR}; background: transparent; color: #666; transition: all 0.12s; text-transform: uppercase; }
        .view-btn.on { border-color: ${Y}; background: ${Y}; color: ${BK}; }
        .week-tab { padding: 8px 18px; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: 14px; letter-spacing: 0.06em; border: 2px solid ${GR}; background: transparent; color: #555; transition: all 0.12s; text-transform: uppercase; }
        .week-tab.on { border-color: ${Y}; background: ${Y}; color: ${BK}; }
        .pieza-chip { cursor: pointer; padding: 6px 8px; margin-bottom: 6px; border-left: 3px solid transparent; transition: filter 0.12s; }
        .pieza-chip:hover { filter: brightness(1.3); }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.88); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal { background: ${DK}; border: 2px solid ${Y}; max-width: 540px; width: 100%; max-height: 85vh; overflow-y: auto; }
        .add-pieza-btn { width: 100%; padding: 12px; background: transparent; border: 2px dashed ${GR}; color: #555; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 8px; transition: all 0.12s; }
        .add-pieza-btn:hover { border-color: ${Y}55; color: #888; }
        @keyframes beeSpin { 0%,100% { transform: rotate(-15deg) translateY(0); } 50% { transform: rotate(15deg) translateY(-10px); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.3s ease both; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>

      {/* Header */}
      <div style={{ background: BK, borderBottom: `3px solid ${Y}`, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ background: Y, color: BK, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 18, padding: "3px 10px" }}>🐝 PINTA<span style={{ fontWeight: 400 }}>MKT</span></div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.12em", color: "#666", textTransform: "uppercase" }}>AGENTE DE PLANNING</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {historial.length > 0 && (
            <button onClick={() => setStep("historial")} style={{ background: "transparent", border: `2px solid ${GR}`, color: step === "historial" ? Y : "#666", padding: "7px 14px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", position: "relative" }}>
              📁 HISTORIAL
              <span style={{ background: Y, color: BK, borderRadius: "50%", fontSize: 10, fontWeight: 900, padding: "1px 5px", marginLeft: 6 }}>{historial.length}</span>
            </button>
          )}
          {step === "result" && <>
            <button onClick={exportarPDF} style={{ background: Y, border: `2px solid ${Y}`, color: BK, padding: "7px 16px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>⬇ PDF</button>
            <button onClick={exportarCSV} style={{ background: "transparent", border: `2px solid ${Y}55`, color: Y, padding: "7px 16px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>⬇ CSV</button>
            <button onClick={() => { localStorage.removeItem("pintamkt_planning"); setStep("form"); setPlanning(null); }} style={{ background: "transparent", border: `2px solid ${GR}`, color: "#666", padding: "7px 14px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>+ NUEVO</button>
          </>}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 20px" }}>

        {/* HISTORIAL */}
        {step === "historial" && (
          <div className="fade-up">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 42, textTransform: "uppercase", lineHeight: 1 }}>PLANNINGS<br /><span style={{ color: Y }}>GUARDADOS</span></div>
              </div>
              <button onClick={() => setStep(planning ? "result" : "form")} style={{ background: "transparent", border: `2px solid ${GR}`, color: "#666", padding: "9px 18px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>← VOLVER</button>
            </div>
            {historial.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#444", fontFamily: "'Barlow',sans-serif" }}>No hay plannings guardados aún.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {historial.map((entrada) => (
                  <div key={entrada.id} style={{ background: DK, border: `1px solid ${GR}`, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 20, textTransform: "uppercase", color: CR, letterSpacing: "0.02em" }}>{entrada.cliente}</div>
                      <div style={{ display: "flex", gap: 16, marginTop: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12, color: Y, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700 }}>{entrada.mes}</span>
                        <span style={{ fontSize: 12, color: "#555", fontFamily: "'Barlow',sans-serif" }}>{entrada.totalPiezas} piezas</span>
                        <span style={{ fontSize: 12, color: "#444", fontFamily: "'Barlow',sans-serif" }}>Guardado el {entrada.fecha}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => cargarDesdeHistorial(entrada)}
                        style={{ padding: "9px 20px", background: Y, border: "none", color: BK, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: "0.08em", cursor: "pointer", textTransform: "uppercase" }}
                      >
                        ABRIR
                      </button>
                      <button
                        onClick={() => eliminarDelHistorial(entrada.id)}
                        style={{ padding: "9px 14px", background: "transparent", border: `2px solid #333`, color: "#555", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FORM */}
        {step === "form" && (
          <div className="fade-up">
            <div style={{ marginBottom: 44 }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 52, lineHeight: 0.95, textTransform: "uppercase", marginBottom: 14 }}>GENERÁ TU<br /><span style={{ color: Y }}>PLANNING</span><br />MENSUAL</div>
              <div style={{ display: "inline-block", background: Y, color: BK, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, padding: "4px 12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>✦ LA IA ARMA EL PLAN COMPLETO EN SEGUNDOS</div>
            </div>

            {error && <div style={{ background: "#2A0A0A", border: "2px solid #E1306C", color: "#E1306C", padding: "12px 16px", marginBottom: 20, fontSize: 14, fontWeight: 600 }}>⚠ {error}</div>}

            <SectionTitle num="01" label="INFO DEL CLIENTE" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <Field label="Cliente *"><input className="pi" value={form.cliente} onChange={e => setForm(f => ({ ...f, cliente: e.target.value }))} placeholder="Ej: Cubos de Chacras" /></Field>
              <Field label="Mes a planificar *"><input className="pi" value={form.mes} onChange={e => setForm(f => ({ ...f, mes: e.target.value }))} placeholder="Ej: Julio 2026" /></Field>
            </div>
            <div style={{ marginBottom: 14 }}>
              <Field label="Objetivo principal de la campaña *">
                <input className="pi" value={form.objetivo} onChange={e => setForm(f => ({ ...f, objetivo: e.target.value }))} placeholder="Ej: Aumentar reservas online un 20%" />
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
              <Field label="Tono de comunicación"><input className="pi" value={form.tono} onChange={e => setForm(f => ({ ...f, tono: e.target.value }))} placeholder="Ej: Cercano, inspiracional" /></Field>
              <Field label="Público objetivo"><input className="pi" value={form.publico} onChange={e => setForm(f => ({ ...f, publico: e.target.value }))} placeholder="Ej: Mujeres 25-45" /></Field>
            </div>

            <SectionTitle num="02" label="REDES Y CANTIDAD" />
            <div style={{ marginBottom: 14 }}>
              <Field label="Redes sociales activas *">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                  {REDES.map(red => <button key={red} className={`btn-tag ${form.redes.includes(red) ? "on" : ""}`} onClick={() => toggleRed(red)}>{redIcon[red]} {red}</button>)}
                </div>
              </Field>
            </div>
            <div style={{ marginBottom: 28 }}>
              <Field label="Piezas por semana">
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  {["3", "4", "5", "3-5"].map(op => <button key={op} className={`btn-tag ${form.piezasSemana === op ? "on" : ""}`} onClick={() => setForm(f => ({ ...f, piezasSemana: op }))} style={{ minWidth: 52 }}>{op}</button>)}
                </div>
              </Field>
            </div>

            <SectionTitle num="03" label="CONTEXTO ESTRATÉGICO" />
            <div style={{ marginBottom: 14 }}>
              <Field label="Brief del cliente">
                <textarea className="pi" value={form.brief} onChange={e => setForm(f => ({ ...f, brief: e.target.value }))} placeholder="Valores de marca, diferencial, productos clave, lo que NO se puede decir..." style={{ height: 90 }} />
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 36 }}>
              <Field label="Fechas especiales del mes">
                <textarea className="pi" value={form.fechasEspeciales} onChange={e => setForm(f => ({ ...f, fechasEspeciales: e.target.value }))} placeholder="Ej: 14/4 Semana Santa..." style={{ height: 80 }} />
              </Field>
              <Field label="Insights del mes anterior">
                <textarea className="pi" value={form.reporteAnterior} onChange={e => setForm(f => ({ ...f, reporteAnterior: e.target.value }))} placeholder="Qué funcionó, qué no, métricas clave..." style={{ height: 80 }} />
              </Field>
            </div>

            <button className="gen-btn" onClick={handleGenerate}>🐝 &nbsp; GENERAR PLANNING MENSUAL</button>
            <button className="demo-btn" onClick={cargarDemo}>👀 VER EJEMPLO SIN GENERAR</button>
          </div>
        )}

        {/* LOADING */}
        {step === "loading" && (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <div style={{ fontSize: 80, marginBottom: 20, display: "inline-block", animation: "beeSpin 1s ease-in-out infinite" }}>🐝</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 42, textTransform: "uppercase", marginBottom: 10 }}>ARMANDO TU PLANNING...</div>
            <div style={{ color: Y, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "0.12em", animation: "pulse 1.5s infinite" }}>ANALIZANDO BRIEF · DISTRIBUYENDO PIEZAS · REDACTANDO COPYS</div>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && planning && (
          <div className="fade-up">
            <div style={{ background: Y, color: BK, padding: "22px 26px", marginBottom: 3, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.55, marginBottom: 6 }}>PLANNING · {form.cliente.toUpperCase()} · {form.mes.toUpperCase()}</div>
                <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 15, lineHeight: 1.55, fontWeight: 500, maxWidth: 600 }}>{planning.resumen}</div>
              </div>
              <div style={{ display: "flex", gap: 28, flexShrink: 0 }}>
                <StatB label="PIEZAS" value={totalPiezas} />
                <StatB label="SEMANAS" value={planning.semanas.length} />
                <StatB label="REDES" value={form.redes.length || "—"} />
              </div>
            </div>

            <div style={{ background: "#111", padding: "10px 18px", marginBottom: 20, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center", borderBottom: `1px solid ${GR}` }}>
              {planning.formato_ganador && <ChipInfo label="FORMATO GANADOR" value={planning.formato_ganador} />}
              {planning.pilar_principal && <ChipInfo label="PILAR PRINCIPAL" value={planning.pilar_principal} />}
              <ChipInfo label="OBJETIVO" value={form.objetivo} />
            </div>

            <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
              <button className={`view-btn ${view === "calendar" ? "on" : ""}`} onClick={() => setView("calendar")}>📅 CALENDARIO</button>
              <button className={`view-btn ${view === "list" ? "on" : ""}`} onClick={() => setView("list")}>📋 LISTA DETALLADA</button>
            </div>

            {/* CALENDAR VIEW */}
            {view === "calendar" && (
              <div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                    <thead>
                      <tr>
                        <th style={{ background: Y, color: BK, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 12, letterSpacing: "0.1em", padding: "10px 14px", textAlign: "left", width: 72 }}>DÍA</th>
                        {planning.semanas.map((s: any, i: number) => (
                          <th key={i} style={{ background: "#1A1A1A", borderLeft: `2px solid ${GR}`, padding: "10px 14px", textAlign: "left" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                              <div>
                                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 14, color: Y, letterSpacing: "0.08em" }}>SEMANA {s.numero}</div>
                                <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, color: "#666", marginTop: 3, fontWeight: 500 }}>{s.foco}</div>
                              </div>
                              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                                <button title="Agregar manual" onClick={() => abrirNuevaPieza(i)} style={{ background: GR, border: "none", color: "#888", cursor: "pointer", fontSize: 11, padding: "3px 7px", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700 }}>+</button>
                                <button title="Generar con IA" onClick={() => generarPiezaConIA(i)} disabled={generandoPieza} style={{ background: `${Y}22`, border: `1px solid ${Y}44`, color: Y, cursor: generandoPieza ? "not-allowed" : "pointer", fontSize: 11, padding: "3px 7px", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700 }}>🐝</button>
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {DIAS_SEMANA.map((dia, di) => (
                        <tr key={dia} style={{ borderTop: `1px solid ${GR}` }}>
                          <td style={{ background: "#111", padding: "12px 14px", verticalAlign: "top" }}>
                            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 14, color: di < 5 ? CR : "#444", letterSpacing: "0.06em" }}>{DIAS_SHORT[di]}</div>
                          </td>
                          {planning.semanas.map((semana: any, si: number) => {
                            const piezas = semana.piezas.filter((p: any) => p.dia === dia);
                            return (
                              <td key={si} style={{ background: DK, borderLeft: `2px solid ${GR}`, padding: "8px 10px", verticalAlign: "top" }}>
                                {piezas.map((p: any, pi: number) => {
                                  const piezaIdx = semana.piezas.findIndex((x: any) => x === p);
                                  // Fix: pass semana number so modal shows correct date
                                  const piezaConSemana = { ...p, semana: p.semana ?? semana.numero };
                                  return (
                                    <div key={pi} className="pieza-chip" style={{ background: `${pilarColor[p.pilar] || "#666"}1A`, borderLeftColor: pilarColor[p.pilar] || "#666", position: "relative" }} onClick={() => setSelectedPieza(piezaConSemana)}>
                                      <button onClick={(e) => abrirEditor(si, piezaIdx, p, e)} style={{ position: "absolute", top: 4, right: 4, background: GR, border: "none", color: "#888", cursor: "pointer", fontSize: 10, padding: "2px 5px", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700 }}>✎</button>
                                      <div style={{ fontSize: 10, color: redColor[p.red] || Y, fontWeight: 700, marginBottom: 2 }}>{redIcon[p.red]} {p.red}</div>
                                      <div style={{ fontSize: 12, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, textTransform: "uppercase", color: CR, lineHeight: 1.15, letterSpacing: "0.02em" }}>{p.titulo}</div>
                                      <div style={{ fontSize: 10, color: pilarColor[p.pilar] || "#888", marginTop: 3 }}>[{p.formato}]</div>
                                      {(() => { const f = calcularFecha(p.dia, p.semana ?? semana.numero, form.mes); return f ? <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>📅 {f}</div> : null; })()}
                                    </div>
                                  );
                                })}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: "#555", fontStyle: "italic" }}>💡 Hacé clic en cualquier pieza para ver guión, copy y hashtags completos</div>
              </div>
            )}

            {/* LIST VIEW */}
            {view === "list" && (
              <div>
                <div style={{ display: "flex", gap: 3, marginBottom: 18, flexWrap: "wrap" }}>
                  {planning.semanas.map((s: any, i: number) => (
                    <button key={i} className={`week-tab ${activeWeek === i ? "on" : ""}`} onClick={() => setActiveWeek(i)}>
                      S{s.numero} <span style={{ fontWeight: 400, opacity: 0.7, fontSize: 12 }}>{s.piezas.length}p</span>
                    </button>
                  ))}
                </div>
                <div style={{ background: "#111", borderLeft: `4px solid ${Y}`, padding: "10px 16px", marginBottom: 18 }}>
                  <div style={{ fontSize: 10, color: "#555", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>FOCO ESTRATÉGICO</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, color: Y, marginTop: 3 }}>{planning.semanas[activeWeek]?.foco}</div>
                </div>
                {planning.semanas[activeWeek]?.piezas.map((pieza: any, i: number) => (
                  <div key={i} style={{ background: DK, border: `1px solid ${GR}`, borderLeft: `4px solid ${pilarColor[pieza.pilar] || Y}`, padding: "18px 20px", marginBottom: 10, animation: "fadeUp 0.3s ease both", animationDelay: `${i * 0.04}s` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 20 }}>
                      <div>
                        <Label>DÍA</Label>
                        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 18, textTransform: "uppercase", marginTop: 2 }}>{pieza.dia}</div>
                        {(() => { const f = calcularFecha(pieza.dia, pieza.semana ?? planning.semanas[activeWeek]?.numero, form.mes); return f ? <div style={{ fontSize: 11, color: Y, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, marginTop: 3 }}>📅 {f}</div> : null; })()}
                        <div style={{ marginTop: 10 }}><Label>FORMATO</Label><div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{pieza.formato}</div></div>
                        <div style={{ marginTop: 10 }}><Label>RED</Label><div style={{ fontSize: 12, color: redColor[pieza.red], fontWeight: 700, marginTop: 2 }}>{redIcon[pieza.red]} {pieza.red}</div></div>
                        <div style={{ marginTop: 10 }}><Label>PILAR</Label><div style={{ fontSize: 12, color: pilarColor[pieza.pilar] || "#888", fontWeight: 700, marginTop: 2 }}>{pieza.pilar}</div></div>
                        <button onClick={() => abrirEditor(activeWeek, i, pieza, { stopPropagation: () => {} } as any)} style={{ marginTop: 14, padding: "6px 12px", background: GR, border: "none", color: "#888", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", width: "100%" }}>✎ EDITAR</button>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 20, textTransform: "uppercase", color: CR, letterSpacing: "0.02em", marginBottom: 12, lineHeight: 1.1 }}>{pieza.titulo}</div>
                        <div style={{ background: "#111", padding: "12px 14px", marginBottom: 12, borderLeft: `2px solid ${Y}55` }}>
                          <Label>IDEA / GUIÓN</Label>
                          <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "#CCC", lineHeight: 1.65, marginTop: 5 }}>{pieza.guion}</div>
                        </div>
                        <div style={{ background: "#111", padding: "12px 14px", marginBottom: 12, borderLeft: `2px solid ${GR}` }}>
                          <Label>COPY SUGERIDO</Label>
                          <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "#AAA", lineHeight: 1.65, marginTop: 5, whiteSpace: "pre-line" }}>{pieza.copy}</div>
                        </div>
                        <div style={{ marginBottom: 8 }}><Label>CTA</Label><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, color: Y, marginTop: 3 }}>{pieza.cta}</div></div>
                        {pieza.recursos && <div style={{ background: "#111", padding: "10px 14px", marginBottom: 10, borderLeft: "2px solid #444" }}><Label>RECURSOS NECESARIOS</Label><div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, color: "#888", lineHeight: 1.55, marginTop: 4 }}>{pieza.recursos}</div></div>}
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{pieza.hashtags?.map((h: string) => <span key={h} style={{ fontSize: 11, color: Y, fontWeight: 600 }}>{h}</span>)}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button
                    className="add-pieza-btn"
                    style={{ flex: 1 }}
                    onClick={() => abrirNuevaPieza(activeWeek)}
                  >
                    + AGREGAR PIEZA MANUAL
                  </button>
                  <button
                    onClick={() => generarPiezaConIA(activeWeek)}
                    disabled={generandoPieza}
                    style={{ flex: 1, padding: "12px", background: generandoPieza ? GR : `${Y}22`, border: `2px solid ${Y}55`, color: generandoPieza ? "#555" : Y, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, cursor: generandoPieza ? "not-allowed" : "pointer", textTransform: "uppercase", letterSpacing: "0.08em", transition: "all 0.12s" }}
                  >
                    {generandoPieza ? "🐝 GENERANDO..." : "🐝 GENERAR CON IA"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL: VER PIEZA */}
      {selectedPieza && (
        <div className="modal-overlay" onClick={() => setSelectedPieza(null)}>
          <div className="modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div style={{ background: Y, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 18, color: BK, textTransform: "uppercase" }}>{selectedPieza.dia} · {selectedPieza.red}</div>
              <button onClick={() => setSelectedPieza(null)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: BK, fontWeight: 900, lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 22, textTransform: "uppercase", color: CR, marginBottom: 14, lineHeight: 1.1 }}>{selectedPieza.titulo}</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <Chip color={pilarColor[selectedPieza.pilar] || "#888"}>{selectedPieza.pilar}</Chip>
                <Chip color="#888">{selectedPieza.formato}</Chip>
                <Chip color={redColor[selectedPieza.red] || "#888"}>{redIcon[selectedPieza.red]} {selectedPieza.red}</Chip>
                {(() => { const f = calcularFecha(selectedPieza.dia, selectedPieza.semana, form.mes); return f ? <Chip color="#555">📅 {f}</Chip> : null; })()}
              </div>
              <div style={{ marginBottom: 14 }}><Label>IDEA / GUIÓN</Label><div style={{ background: "#111", padding: "14px", marginTop: 6, fontFamily: "'Barlow',sans-serif", fontSize: 14, color: "#CCC", lineHeight: 1.65, borderLeft: `3px solid ${Y}` }}>{selectedPieza.guion}</div></div>
              <div style={{ marginBottom: 14 }}><Label>COPY SUGERIDO</Label><div style={{ background: "#111", padding: "14px", marginTop: 6, fontFamily: "'Barlow',sans-serif", fontSize: 14, color: "#CCC", lineHeight: 1.65, whiteSpace: "pre-line" }}>{selectedPieza.copy}</div></div>
              {selectedPieza.recursos && <div style={{ marginBottom: 14 }}><Label>RECURSOS</Label><div style={{ background: "#111", padding: "14px", marginTop: 6, fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "#888", lineHeight: 1.6 }}>{selectedPieza.recursos}</div></div>}
              <div style={{ marginBottom: 14 }}><Label>CTA</Label><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, color: Y, marginTop: 4 }}>{selectedPieza.cta}</div></div>
              <div><Label>HASHTAGS</Label><div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>{selectedPieza.hashtags?.map((h: string) => <span key={h} style={{ fontSize: 12, color: Y, fontWeight: 600 }}>{h}</span>)}</div></div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR / NUEVA PIEZA */}
      {editando && (
        <div className="modal-overlay" onClick={() => setEditando(null)}>
          <div className="modal" onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div style={{ background: Y, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 18, color: BK, textTransform: "uppercase" }}>
                {editando.piezaIdx === null ? "✦ NUEVA PIEZA" : "✎ EDITAR PIEZA"}
              </div>
              <button onClick={() => setEditando(null)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: BK, fontWeight: 900 }}>✕</button>
            </div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><Label>DÍA</Label><select className="pi" style={{ marginTop: 5 }} value={editando.pieza.dia} onChange={e => setEditando((ed: any) => ({ ...ed, pieza: { ...ed.pieza, dia: e.target.value } }))}>{DIAS_SEMANA.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
                <div><Label>RED SOCIAL</Label><select className="pi" style={{ marginTop: 5 }} value={editando.pieza.red} onChange={e => setEditando((ed: any) => ({ ...ed, pieza: { ...ed.pieza, red: e.target.value } }))}>{REDES.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><Label>FORMATO</Label><input className="pi" style={{ marginTop: 5 }} value={editando.pieza.formato} onChange={e => setEditando((ed: any) => ({ ...ed, pieza: { ...ed.pieza, formato: e.target.value } }))} /></div>
                <div><Label>PILAR</Label><input className="pi" style={{ marginTop: 5 }} value={editando.pieza.pilar} onChange={e => setEditando((ed: any) => ({ ...ed, pieza: { ...ed.pieza, pilar: e.target.value } }))} /></div>
              </div>
              <div><Label>TÍTULO</Label><input className="pi" style={{ marginTop: 5 }} value={editando.pieza.titulo} onChange={e => setEditando((ed: any) => ({ ...ed, pieza: { ...ed.pieza, titulo: e.target.value } }))} /></div>
              <div><Label>IDEA / GUIÓN</Label><textarea className="pi" style={{ marginTop: 5, height: 90 }} value={editando.pieza.guion} onChange={e => setEditando((ed: any) => ({ ...ed, pieza: { ...ed.pieza, guion: e.target.value } }))} /></div>
              <div><Label>COPY SUGERIDO</Label><textarea className="pi" style={{ marginTop: 5, height: 100 }} value={editando.pieza.copy} onChange={e => setEditando((ed: any) => ({ ...ed, pieza: { ...ed.pieza, copy: e.target.value } }))} /></div>
              <div><Label>CTA</Label><input className="pi" style={{ marginTop: 5 }} value={editando.pieza.cta} onChange={e => setEditando((ed: any) => ({ ...ed, pieza: { ...ed.pieza, cta: e.target.value } }))} /></div>
              <div><Label>RECURSOS</Label><input className="pi" style={{ marginTop: 5 }} value={editando.pieza.recursos || ""} onChange={e => setEditando((ed: any) => ({ ...ed, pieza: { ...ed.pieza, recursos: e.target.value } }))} /></div>
              <div><Label>HASHTAGS (separados por espacio)</Label><input className="pi" style={{ marginTop: 5 }} value={(editando.pieza.hashtags || []).join(" ")} onChange={e => setEditando((ed: any) => ({ ...ed, pieza: { ...ed.pieza, hashtags: e.target.value.split(" ").filter(Boolean) } }))} /></div>
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <button onClick={guardarEdicion} style={{ flex: 1, padding: "12px", background: Y, border: "none", color: BK, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 15, letterSpacing: "0.08em", cursor: "pointer", textTransform: "uppercase" }}>✓ GUARDAR</button>
                {editando.piezaIdx !== null && (
                  <button onClick={eliminarPieza} style={{ padding: "12px 18px", background: "transparent", border: "2px solid #E1306C", color: "#E1306C", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", textTransform: "uppercase" }}>🗑 ELIMINAR</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionTitle({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, marginTop: 8 }}>
      <div style={{ background: "#D4E82A", color: "#0D0D0D", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 12, padding: "2px 8px", letterSpacing: "0.08em" }}>{num}</div>
      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.12em", color: "#666", textTransform: "uppercase" }}>{label}</div>
      <div style={{ flex: 1, height: 1, background: "#2A2A2A" }} />
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "#555", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
      {children}
    </div>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 10, color: "#555", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{children}</div>;
}
function Chip({ color, children }: { color: string; children: React.ReactNode }) {
  return <span style={{ fontSize: 11, padding: "3px 8px", background: `${color}22`, color, border: `1px solid ${color}55`, fontFamily: "'Barlow',sans-serif", fontWeight: 700 }}>{children}</span>;
}
function StatB({ label, value }: { label: string; value: any }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 38, lineHeight: 1, color: "#0D0D0D" }}>{value}</div>
      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", color: "#0D0D0D99", marginTop: 2 }}>{label}</div>
    </div>
  );
}
function ChipInfo({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <div style={{ fontSize: 10, color: "#555", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}:</div>
      <div style={{ fontSize: 12, color: "#D4E82A", fontFamily: "'Barlow',sans-serif", fontWeight: 600 }}>{value}</div>
    </div>
  );
}
