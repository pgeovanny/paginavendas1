// ===== WhatsApp (edite) =====
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
      O Manual do Aprovado resolve isso com um passo a passo claro: organização, revisão que fixa e questões do jeito certo.
      Estude com foco e acelere sua aprovação.
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
      Domine prazos, competências e detalhes que caem na prova com tabelas claras e questões inéditas para treinar.
      Material visual, direto e prático — foque no que realmente cai.
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
      Plano de estudos individualizado (tempo, edital, nível por matéria) com metas diárias de teoria, revisão e questões.
      Suporte direto 7 dias por semana via WhatsApp. Opções com material completo ou apenas acompanhamento.
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
function normalizeCopy(txt){
  const parts = txt.split(/\n\s*\n|<br\s*\/?>\s*<br\s*\/?>/i).map(s=>s.trim()).filter(Boolean);
  return parts.map(p=>`<p>${p.replace(/<br\s*\/?>/gi,'<br>')}</p>`).join("");
}
function getProductFromURL(){
  const slug = new URLSearchParams(window.location.search).get("p");
  return productsData[slug] || null;
}

// ===== Página de Produto =====
function loadProductPage(){
  const product = getProductFromURL();
  const content = document.getElementById("product-content");
  if(!product){ if(content) content.innerHTML=`<p>Produto não encontrado. <a class="btn-ghost" href="./">← Voltar</a></p>`; return; }

  document.getElementById("product-title").textContent = product.titulo;
  document.getElementById("product-subtitle").textContent = product.subtitulo;
  document.getElementById("product-image").src = product.imagem;
  document.getElementById("product-copy").innerHTML = normalizeCopy(product.copy);

  const priceEl = document.getElementById("product-price");
  if(product.preco){ priceEl.textContent = `Preço: ${product.preco}`; priceEl.style.display="inline-flex"; }

  const buyBtn = document.getElementById("buy-button");
  const sampleBtn = document.getElementById("sample-button");
  const opt = document.getElementById("mentoria-options");
  const plans = document.getElementById("mentoria-plans");

  if(product.slug === "mentoria"){
    buyBtn.addEventListener("click", (e)=>{ e.preventDefault(); opt.style.display="flex"; buyBtn.style.display="none"; if(sampleBtn) sampleBtn.style.display="none"; });
    document.getElementById("with-material").addEventListener("click", ()=>{
      plans.innerHTML = `
        <a href="${product.opcoes.comMaterial.mensal}" target="_blank" rel="noopener">Plano mensal</a>
        <a href="${product.opcoes.comMaterial.trimestral}" target="_blank" rel="noopener">Plano trimestral</a>`;
    });
    document.getElementById("without-material").addEventListener("click", ()=>{
      plans.innerHTML = `
        <a href="${product.opcoes.semMaterial.mensal}" target="_blank" rel="noopener">Plano mensal</a>
        <a href="${product.opcoes.semMaterial.trimestral}" target="_blank" rel="noopener">Plano trimestral</a>`;
    });
  } else {
    buyBtn.href = product.checkout; buyBtn.target = "_blank"; buyBtn.rel = "noopener";
    if(product.sampleUrl){ sampleBtn.href = product.sampleUrl; sampleBtn.style.display="inline-flex"; }
  }

  // WhatsApp flutuante
  const wf = document.getElementById("whatsapp-float");
  if(wf && typeof whatsappConfig!=="undefined"){
    const msg = encodeURIComponent(whatsappConfig.mensagem);
    wf.href = `https://wa.me/${whatsappConfig.numero}?text=${msg}`;
  }
}

// init só na página product.html
if(typeof window!=="undefined" && /product\.html$/.test(window.location.pathname)){
  document.addEventListener("DOMContentLoaded", loadProductPage);
}
