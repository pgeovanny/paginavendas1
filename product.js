// ---------------- CONFIG GERAL ----------------
const whatsappConfig = {
  numero: "5511999999999", // DDI+DDD+numero (apenas dígitos)
  mensagem: "Olá! Tenho interesse em saber mais sobre os produtos da PG Concursos."
};

// ---------------- DADOS ----------------
const productsData = {
  manual: {
    slug: "manual",
    titulo: "Manual do Aprovado",
    subtitulo: "O passo a passo definitivo para aprender a estudar do jeito certo e passar mais rápido.",
    imagem: "./assets/manual-placeholder.jpg",
    preco: "R$ 97,00",
    sampleUrl: "", // coloque um link de amostra (PDF) se quiser exibir o botão "Ver amostra"
    copy: `
      Você já gastou horas, dias e até anos estudando para concursos, mas sente que não sai do lugar?
      Que parece estar sempre perdido, sem saber se o que está fazendo realmente funciona?<br><br>
      O Manual do Aprovado foi criado para mudar essa realidade — por quem já passou por isso e testou o que funciona.
      Você vai aprender a organizar os estudos, revisar sem esquecer e resolver questões para ganhar experiência real.<br><br>
      Pare de perder tempo fazendo errado. Estude com foco, segurança e acelere sua aprovação.
    `,
    checkout: "https://link-do-checkout-manual.com"
  },
  legislacao: {
    slug: "legislacao",
    titulo: "Legislação Interna TJ-SP 2025",
    subtitulo: "Simplifique o estudo da legislação com um conteúdo direto, tabelado e com questões inéditas.",
    imagem: "./assets/legislacao-placeholder.jpg",
    preco: "R$ 79,00",
    sampleUrl: "", // opcional
    copy: `
      Se preparar para o concurso do TJ-SP exige mais do que decorar lei seca: é preciso dominar prazos, competências e detalhes que caem com frequência.<br><br>
      Este PDF reúne toda a legislação cobrada no edital com didática: tabelas claras (prazos, quóruns, composições e competências) e questões inéditas para treinar.<br><br>
      Estude com foco no que realmente cai e aumente suas chances de aprovação.
    `,
    checkout: "https://link-do-checkout-legislacao.com"
  },
  mentoria: {
    slug: "mentoria",
    titulo: "Mentoria",
    subtitulo: "Mentoria personalizada para planejar e acelerar sua aprovação.",
    imagem: "./assets/mentoria-placeholder.jpg",
    preco: "",
    copy: `
      A Mentoria oferece um plano de estudos individualizado (tempo, edital, nível por matéria), metas diárias separadas em teoria, revisão e questões, e acompanhamento direto 7 dias por semana via WhatsApp.<br><br>
      Temos duas modalidades: com material completo (Estratégia) ou apenas o plano + acompanhamento — em planos mensal e trimestral.
    `,
    opcoes: {
      comMaterial: {
        mensal: "https://checkout-mentoria-com-material-mensal.com",
        trimestral: "https://checkout-mentoria-com-material-trimestral.com"
      },
      semMaterial: {
        mensal: "https://checkout-mentoria-sem-material-mensal.com",
        trimestral: "https://checkout-mentoria-sem-material-trimestral.com"
      }
    }
  }
};

// ---------------- SUPORTE ----------------
function getProductFromURL() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("p");
  return productsData[slug] || null;
}

function loadProductPage() {
  const product = getProductFromURL();
  const content = document.getElementById("product-content");
  if (!product) {
    if (content) content.innerHTML = `<p>Produto não encontrado. <a href="./" class="btn-ghost" style="margin-left:.4rem;">← Voltar</a></p>`;
    return;
  }

  // preencher dados
  document.getElementById("product-title").textContent = product.titulo;
  document.getElementById("product-subtitle").textContent = product.subtitulo;
  document.getElementById("product-image").src = product.imagem;
  document.getElementById("product-copy").innerHTML = normalizeCopy(product.copy);

  // preço
  const priceEl = document.getElementById("product-price");
  if (product.preco) { priceEl.textContent = `Preço: ${product.preco}`; priceEl.style.display = "inline-flex"; }
  else { priceEl.style.display = "none"; }

  // badge
  const badge = document.getElementById("product-badge");
  if (badge) badge.style.display = "inline-flex";

  // botões
  const buyBtn = document.getElementById("buy-button");
  const sampleBtn = document.getElementById("sample-button");
  const optionsContainer = document.getElementById("mentoria-options");
  const plansContainer = document.getElementById("mentoria-plans");

  if (product.slug === "mentoria") {
    // fluxo especial
    buyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      optionsContainer.style.display = "flex";
      buyBtn.style.display = "none";
      if (sampleBtn) sampleBtn.style.display = "none";
    });

    document.getElementById("with-material").addEventListener("click", () => {
      plansContainer.innerHTML = `
        <a href="${product.opcoes.comMaterial.mensal}" target="_blank" rel="noopener">Plano mensal</a>
        <a href="${product.opcoes.comMaterial.trimestral}" target="_blank" rel="noopener">Plano trimestral</a>
      `;
    });

    document.getElementById("without-material").addEventListener("click", () => {
      plansContainer.innerHTML = `
        <a href="${product.opcoes.semMaterial.mensal}" target="_blank" rel="noopener">Plano mensal</a>
        <a href="${product.opcoes.semMaterial.trimestral}" target="_blank" rel="noopener">Plano trimestral</a>
      `;
    });
  } else {
    // produtos normais
    buyBtn.href = product.checkout; buyBtn.target = "_blank"; buyBtn.rel = "noopener";
    if (product.sampleUrl) {
      sampleBtn.href = product.sampleUrl;
      sampleBtn.style.display = "inline-flex";
    }
  }

  // WhatsApp flutuante
  const wf = document.getElementById("whatsapp-float");
  if (wf && typeof whatsappConfig !== "undefined") {
    const msg = encodeURIComponent(whatsappConfig.mensagem);
    wf.href = `https://wa.me/${whatsappConfig.numero}?text=${msg}`;
  }
}

// normaliza copy para <p> quando vier com quebras
function normalizeCopy(html) {
  // troca quebras duplas por parágrafos, mantendo <br> existentes
  const parts = html.split(/<br\s*\/?>\s*<br\s*\/?>/i).map(s => s.trim()).filter(Boolean);
  if (parts.length <= 1) return `<p>${html}</p>`;
  return parts.map(p => `<p>${p}</p>`).join("");
}

// init
if (typeof window !== "undefined" && window.location.pathname.includes("product.html")) {
  document.addEventListener("DOMContentLoaded", loadProductPage);
}
