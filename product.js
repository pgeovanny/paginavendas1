// ---------------- CONFIG GERAL ----------------
const whatsappConfig = {
  numero: "5511999999999", // DDI+DDD+numero (apenas dígitos)
  mensagem: "Olá! Tenho interesse em saber mais sobre os produtos da PG Concursos."
};

// ---------------- DADOS DOS PRODUTOS ----------------
const productsData = {
  manual: {
    slug: "manual",
    titulo: "Manual do Aprovado",
    subtitulo: "O passo a passo definitivo para aprender a estudar do jeito certo e passar mais rápido.",
    imagem: "./assets/manual-placeholder.jpg",
    preco: "R$ 97,00",
    copy: `
      Você já gastou horas, dias e até anos estudando para concursos, mas sente que não sai do lugar?
      Que parece estar sempre perdido, sem saber se o que está fazendo realmente funciona?<br><br>
      O Manual do Aprovado foi criado para mudar essa realidade com um passo a passo claro e testado, do primeiro dia até a aprovação.
      Organize seus estudos, revise com eficiência e resolva questões do jeito certo. Estude menos, estude melhor e passe mais rápido!
    `,
    checkout: "https://link-do-checkout-manual.com"
  },
  legislacao: {
    slug: "legislacao",
    titulo: "Legislação Interna TJ-SP 2025",
    subtitulo: "Simplifique o estudo da legislação com um conteúdo direto, tabelado e com questões inéditas.",
    imagem: "./assets/legislacao-placeholder.jpg",
    preco: "R$ 67,00",
    copy: `
      Estude a legislação interna do TJ-SP de forma didática: prazos, competências, quóruns e composições em tabelas claras — além de questões inéditas para treinar.
      Material em PDF, visualmente organizado e direto ao ponto para você acertar mais na prova.
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
      A Mentoria oferece planejamento estratégico individualizado, metas diárias (teoria, revisão e questões) e suporte direto 7 dias/semana pelo WhatsApp.
      Opções com material completo ou apenas acompanhamento, com planos mensal e trimestral.
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
  document.getElementById("product-copy").innerHTML = product.copy;

  const precoEl = document.getElementById("product-price");
  if (product.preco) {
    precoEl.textContent = `Preço: ${product.preco}`;
    precoEl.style.display = "inline-flex";
  } else {
    precoEl.style.display = "none";
  }

  const buyBtn = document.getElementById("buy-button");
  const optionsContainer = document.getElementById("mentoria-options");
  const plansContainer = document.getElementById("mentoria-plans");

  if (product.slug === "mentoria") {
    // botão abre opções
    buyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      optionsContainer.style.display = "flex";
      buyBtn.style.display = "none";
    });

    // handlers
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
    buyBtn.href = product.checkout;
    buyBtn.target = "_blank";
    buyBtn.rel = "noopener";
  }

  // WhatsApp flutuante
  const wf = document.getElementById("whatsapp-float");
  if (wf && typeof whatsappConfig !== "undefined") {
    const msg = encodeURIComponent(whatsappConfig.mensagem);
    wf.href = `https://wa.me/${whatsappConfig.numero}?text=${msg}`;
  }
}

// inicialização somente na página de produto
if (typeof window !== "undefined" && window.location.pathname.includes("product.html")) {
  document.addEventListener("DOMContentLoaded", loadProductPage);
}
