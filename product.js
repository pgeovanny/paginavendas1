// ===== WhatsApp (ajuste aqui) =====
const whatsappConfig = {
  numero: "5511999999999",
  mensagem: "Olá! Tenho interesse em saber mais sobre os produtos da PG Concursos."
};

// ===== Produtos =====
const productsData = {
  manual: {
    slug: "manual",
    titulo: "Manual do Aprovado",
    subtitulo: "O passo a passo definitivo para aprender a estudar do jeito certo e passar mais rápido.",
    imagem: "./assets/manual-placeholder.jpg",
    preco: "R$ 97,00",
    sampleUrl: "",
    copy: `
      Você já gastou horas, dias e até anos estudando para concursos, mas sente que não sai do lugar?
      Que parece estar sempre perdido, sem saber se o que está fazendo realmente funciona?<br><br>
      O Manual do Aprovado foi criado para mudar essa realidade — por quem já testou o que funciona.
      Organize seus estudos, revise sem esquecer e resolva questões do jeito certo.<br><br>
      Estude com foco, segurança e acelere sua aprovação.
    `,
    checkout: "https://link-do-checkout-manual.com"
  },
  legislacao: {
    slug: "legislacao",
    titulo: "Legislação Interna TJ-SP 2025",
    subtitulo: "Simplifique o estudo da legislação com um conteúdo direto, tabelado e com questões inéditas.",
    imagem: "./assets/legislacao-placeholder.jpg",
    preco: "R$ 79,00",
    sampleUrl: "",
    copy: `
      Domine prazos, competências e detalhes que caem na prova sem perder tempo em textos longos.
      Tabelas claras (prazos, quóruns, composições e competências) + questões inéditas para treinar.<br><br>
      PDF visual, direto e prático — foque no que realmente cai.
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
      Plano de estudos individualizado (tempo, edital, nível por matéria), metas diárias (teoria, revisão e questões)
      e suporte direto 7 dias por semana via WhatsApp.<br><br>
      Duas modalidades: com material completo (Estratégia) ou apenas plano + acompanhamento — planos mensal e trimestral.
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

// ===== Helpers =====
function normalizeCopy(html) {
  const parts = html.split(/<br\s*\/?>\s*<br\s*\/?>/i).map(s => s.trim()).filter(Boolean);
  if (parts.length <= 1) return `<p>${html}</p>`;
  return parts.map(p => `<p>${p}</p>`).join("");
}

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

  document.getElementById("product-title").textContent = product.titulo;
  document.getElementById("product-subtitle").textContent = product.subtitulo;
  document.getElementById("product-image").src = product.imagem;
  document.getElementById("product-copy").innerHTML = normalizeCopy(product.copy);

  const priceEl = document.getElementById("product-price");
  if (product.preco) { priceEl.textContent = `Preço: ${product.preco}`; priceEl.style.display = "inline-flex"; }
  else { priceEl.style.display = "none"; }

  const buyBtn = document.getElementById("buy-button");
  const sampleBtn = document.getElementById("sample-button");
  const options = document.getElementById("mentoria-options");
  const plans = document.getElementById("mentoria-plans");

  if (product.slug === "mentoria") {
    buyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      options.style.display = "flex";
      buyBtn.style.display = "none";
      if (sampleBtn) sampleBtn.style.display = "none";
    });

    document.getElementById("with-material").addEventListener("click", () => {
      plans.innerHTML = `
        <a href="${product.opcoes.comMaterial.mensal}" target="_blank" rel="noopener">Plano mensal</a>
        <a href="${product.opcoes.comMaterial.trimestral}" target="_blank" rel="noopener">Plano trimestral</a>
      `;
    });
    document.getElementById("without-material").addEventListener("click", () => {
      plans.innerHTML = `
        <a href="${product.opcoes.semMaterial.mensal}" target="_blank" rel="noopener">Plano mensal</a>
        <a href="${product.opcoes.semMaterial.trimestral}" target="_blank" rel="noopener">Plano trimestral</a>
      `;
    });
  } else {
    buyBtn.href = product.checkout; buyBtn.target = "_blank"; buyBtn.rel = "noopener";
    if (product.sampleUrl) { sampleBtn.href = product.sampleUrl; sampleBtn.style.display = "inline-flex"; }
  }

  // WhatsApp flutuante
  const wf = document.getElementById("whatsapp-float");
  if (wf && typeof whatsappConfig !== "undefined") {
    const msg = encodeURIComponent(whatsappConfig.mensagem);
    wf.href = `https://wa.me/${whatsappConfig.numero}?text=${msg}`;
  }
}

// init somente na página de produto
if (typeof window !== "undefined" && window.location.pathname.includes("product.html")) {
  document.addEventListener("DOMContentLoaded", loadProductPage);
}
