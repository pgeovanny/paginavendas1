// ---------------- CONFIGURAÇÕES GERAIS ----------------
const whatsappConfig = {
  numero: "5511999999999", // Coloque aqui o número com DDD e DDI sem sinais
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
      Que parece estar sempre perdido, sem saber se o que está fazendo realmente funciona?
      A verdade é que a maioria dos concurseiros começa errado, pulando de método em método,
      estudando sem organização e perdendo tempo com coisas que não trazem resultado.<br><br>
      O Manual do Aprovado foi criado justamente para mudar essa realidade — por quem já passou
      por tudo isso e aprendeu na prática o que funciona de verdade para passar em concursos.<br><br>
      Aqui você vai receber um passo a passo claro, prático e testado, que mostra exatamente
      o que fazer desde o primeiro dia de estudo até a aprovação.
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
      Se preparar para o concurso do Tribunal de Justiça de São Paulo exige muito mais do que decorar a lei seca:
      é preciso conhecer profundamente a legislação interna, os prazos, as competências e os detalhes que caem com frequência.<br><br>
      Pensando nisso, desenvolvemos o material Legislação Interna TJ-SP 2025, em formato PDF,
      organizado e visualmente acessível que reúne toda a legislação cobrada no edital de forma didática e prática.<br><br>
      Incluímos tabelas explicativas e questões inéditas para garantir que você esteja preparado para a prova.
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
      Conseguir a aprovação em concursos públicos exige planejamento estratégico, organização e acompanhamento correto — e é exatamente isso que nossa Mentoria oferece.<br><br>
      Na Mentoria, você recebe um plano de estudos totalmente individualizado, elaborado especificamente para o seu perfil.<br><br>
      Oferecemos duas opções: com material completo ou apenas o plano e acompanhamento, além de planos mensal e trimestral.
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

// ---------------- FUNÇÕES DE SUPORTE ----------------
function getProductFromURL() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("p");
  return productsData[slug] || null;
}

function loadProductPage() {
  const product = getProductFromURL();
  if (!product) {
    document.getElementById("product-content").innerHTML = `<p>Produto não encontrado.</p>`;
    return;
  }

  document.getElementById("product-title").textContent = product.titulo;
  document.getElementById("product-subtitle").textContent = product.subtitulo;
  document.getElementById("product-image").src = product.imagem;
  document.getElementById("product-copy").innerHTML = product.copy;

  // Exibe preço, se houver
  const precoEl = document.getElementById("product-price");
  if (product.preco) {
    precoEl.textContent = `Preço: ${product.preco}`;
    precoEl.style.display = "block";
  } else {
    precoEl.style.display = "none";
  }

  const buyBtn = document.getElementById("buy-button");
  const optionsContainer = document.getElementById("mentoria-options");
  const plansContainer = document.getElementById("mentoria-plans");

  if (product.slug === "mentoria") {
    // Fluxo especial para Mentoria
    buyBtn.addEventListener("click", () => {
      optionsContainer.style.display = "flex";
      buyBtn.style.display = "none";
    });

    document.getElementById("with-material").addEventListener("click", () => {
      plansContainer.innerHTML = `
        <a href="${product.opcoes.comMaterial.mensal}" class="plan-btn" target="_blank">Plano Mensal</a>
        <a href="${product.opcoes.comMaterial.trimestral}" class="plan-btn" target="_blank">Plano Trimestral</a>
      `;
    });

    document.getElementById("without-material").addEventListener("click", () => {
      plansContainer.innerHTML = `
        <a href="${product.opcoes.semMaterial.mensal}" class="plan-btn" target="_blank">Plano Mensal</a>
        <a href="${product.opcoes.semMaterial.trimestral}" class="plan-btn" target="_blank">Plano Trimestral</a>
      `;
    });
  } else {
    // Produtos normais
    buyBtn.href = product.checkout;
    buyBtn.target = "_blank";
  }

  // Botão WhatsApp flutuante
  const waBtn = document.getElementById("whatsapp-float");
  if (waBtn) {
    const msg = encodeURIComponent(whatsappConfig.mensagem);
    waBtn.href = `https://wa.me/${whatsappConfig.numero}?text=${msg}`;
  }
}

// ---------------- EXPORTS PARA index.html ----------------
if (window.location.pathname.includes("product.html")) {
  document.addEventListener("DOMContentLoaded", loadProductPage);
}
