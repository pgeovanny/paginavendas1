// WhatsApp config
const whatsappConfig = {
  numero: "5511999999999", // DDI+DDD+numero
  mensagem: "Olá! Tenho interesse em saber mais sobre os produtos."
};

// Dados
const productsData = {
  manual: {
    slug: "manual",
    titulo: "Manual do Aprovado",
    subtitulo: "O passo a passo definitivo para aprender a estudar do jeito certo e passar mais rápido.",
    preco: "R$ 97,00",
    sampleUrl: "", // se quiser exibir "Ver amostra", coloque um link PDF aqui
    copy: `
      Você já gastou horas, dias e até anos estudando para concursos, mas sente que não sai do lugar?
      O Manual do Aprovado foi criado para mudar isso: organização, revisão que fixa e questões do jeito certo.<br><br>
      Estude com foco, segurança e acelere sua aprovação.
    `,
    checkout: "https://link-do-checkout-manual.com"
  },
  legislacao: {
    slug: "legislacao",
    titulo: "Legislação Interna TJ-SP 2025",
    subtitulo: "Simplifique o estudo da legislação com um conteúdo direto, tabelado e com questões inéditas.",
    preco: "R$ 79,00",
    sampleUrl: "",
    copy: `
      Domine prazos, competências e detalhes que caem na prova com tabelas claras e questões inéditas.<br><br>
      Material visual, direto e prático — foque no que realmente cai.
    `,
    checkout: "https://link-do-checkout-legislacao.com"
  },
  mentoria: {
    slug: "mentoria",
    titulo: "Mentoria",
    subtitulo: "Mentoria personalizada para planejar e acelerar sua aprovação.",
    copy: `
      Plano de estudos individualizado (tempo, edital, nível por matéria), metas diárias (teoria, revisão e questões)
      e suporte direto 7 dias/semana via WhatsApp.<br><br>
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

// Helpers
function byId(id){ return document.getElementById(id); }
function getProduct(){
  const slug = new URLSearchParams(location.search).get('p');
  return productsData[slug] || null;
}
function normalizeCopy(html){
  const parts = String(html).split(/<br\s*\/?>\s*<br\s*\/?>/i).map(s=>s.trim()).filter(Boolean);
  return parts.length > 1 ? parts.map(p=>`<p>${p}</p>`).join("") : `<p>${html}</p>`;
}

// Página de produto
(function(){
  if(!/product\.html$/i.test(location.pathname)) return;

  const loading = byId('pg-loading');
  const p = getProduct();
  const contentMissing = !p;

  if(loading) loading.classList.add('open');

  if(contentMissing){
    document.querySelector('.product-title').textContent = "Produto não encontrado";
    document.querySelector('.product-subtitle').textContent = "";
    if(loading) loading.classList.remove('open');
    return;
  }

  // Preenche
  byId('product-title').textContent = p.titulo;
  byId('product-subtitle').textContent = p.subtitulo || "";
  byId('product-copy').innerHTML   = normalizeCopy(p.copy || "");

  const priceWrap = byId('product-price');
  if(p.preco){
    priceWrap.style.display = "block";
    priceWrap.querySelector('span').textContent = p.preco;
  }

  // CTAs
  const waMsg = encodeURIComponent(whatsappConfig.mensagem);
  const waURL = `https://wa.me/${whatsappConfig.numero}?text=${waMsg}`;
  byId('whatsapp-cta').href = waURL;
  byId('whatsapp-float').href = waURL;

  const buy = byId('buy-button');
  const sample = byId('sample-button');

  if(p.slug === 'mentoria'){
    const opts  = byId('mentoria-options');
    const plans = byId('mentoria-plans');

    buy.addEventListener('click', (e)=>{
      e.preventDefault();
      opts.style.display = "flex";
      buy.classList.add('voted'); // só um feedbackzinho visual
      if(sample) sample.style.display = "none";
    });

    byId('with-material').addEventListener('click', ()=>{
      plans.innerHTML = `
        <a class="btn-primary" href="${p.opcoes.comMaterial.mensal}" target="_blank" rel="noopener">Plano mensal</a>
        <a class="btn-primary" href="${p.opcoes.comMaterial.trimestral}" target="_blank" rel="noopener">Plano trimestral</a>
      `;
    });

    byId('without-material').addEventListener('click', ()=>{
      plans.innerHTML = `
        <a class="btn-primary" href="${p.opcoes.semMaterial.mensal}" target="_blank" rel="noopener">Plano mensal</a>
        <a class="btn-primary" href="${p.opcoes.semMaterial.trimestral}" target="_blank" rel="noopener">Plano trimestral</a>
      `;
    });
  } else {
    buy.href = p.checkout;
    buy.target = "_blank";
    buy.rel = "noopener";
    if(p.sampleUrl){
      sample.style.display = "inline-flex";
      sample.href = p.sampleUrl;
    }
  }

  if(loading) loading.classList.remove('open');
})();
