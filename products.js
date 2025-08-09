// ===== WhatsApp (edite) =====
const whatsappConfig = {
  numero: "5511999999999",
  mensagem: "Olá! Tenho interesse em saber mais sobre os produtos da PG Concursos."
};

// ===== Produtos =====
const products = {
  manual: {
    slug: "manual",
    titulo: "Manual do Aprovado",
    subtitulo: "O passo a passo definitivo para aprender a estudar do jeito certo e passar mais rápido.",
    preco: "R$ 97,00",
    imagem: "./assets/manual.jpg",
    checkout: "https://link-do-checkout-manual.com",
    sampleUrl: "",
    copy: `
      Você já gastou horas, dias e até anos estudando para concursos, mas sente que não sai do lugar?
      Que parece estar sempre perdido, sem saber se o que está fazendo realmente funciona? A verdade é que a maioria dos concurseiros começa errado, pulando de método em método, estudando sem organização e perdendo tempo com coisas que não trazem resultado.
      O Manual do Aprovado foi criado justamente para mudar essa realidade — por quem já passou por tudo isso e aprendeu na prática o que funciona de verdade para passar em concursos.
      Aqui você vai receber um passo a passo claro, prático e testado, que mostra exatamente o que fazer desde o primeiro dia de estudo até a aprovação.
      Você vai aprender a organizar seus estudos do jeito certo, com estratégias que aceleram o aprendizado e fazem você fixar o conteúdo com eficiência. Vai saber como revisar para não esquecer, como resolver questões para ganhar experiência e montar ciclos de estudo que otimizam seu tempo.
      Esse manual é para quem quer parar de perder tempo fazendo errado e finalmente ir direto ao que gera resultado. É para quem quer estudar com foco, segurança e saber que está no caminho certo.
      Ele foi feito por aprovados que passaram anos estudando errado, aprendendo na marra o que funciona e o que não funciona — e agora compartilham esse conhecimento com você, para que você não precise errar tanto quanto eles.
      Se você quer sair do lugar, eliminar a dúvida e acelerar sua aprovação, este manual em PDF é seu guia definitivo. Estude menos, estude melhor e conquiste sua vaga mais rápido!
    `
  },
  legislacao: {
    slug: "legislacao",
    titulo: "Legislação Interna TJ-SP 2025",
    subtitulo: "Simplifique o estudo da legislação com um conteúdo direto, tabelado e com questões inéditas",
    preco: "R$ 79,00",
    imagem: "./assets/legislacao.jpg",
    checkout: "https://link-do-checkout-legislacao.com",
    copy: `
      Se preparar para o concurso do Tribunal de Justiça de São Paulo exige muito mais do que decorar a lei seca: é preciso conhecer profundamente a legislação interna, os prazos, as competências, e os detalhes que caem com frequência nas provas.
      Pensando nisso, desenvolvemos o material Legislação Interna TJ-SP 2025, em formato PDF, organizado e visualmente acessível que reúne toda a legislação cobrada no edital de forma didática e prática.
      Aqui, você não vai perder tempo vasculhando textos longos e difíceis de entender: preparamos tabelas explicativas que destacam exatamente o que você precisa saber — prazos, quóruns, composições e competências — tudo organizado para facilitar seu aprendizado e memorização.
      Além disso, incluímos questões inéditas que foram cuidadosamente selecionadas para testar seu conhecimento e garantir que você esteja preparado para os tipos de perguntas que vão aparecer na prova.
      Este material é essencial para você que quer acertar o máximo em Legislação. Estude com foco, domine o que realmente cai no edital e aumente suas chances de aprovação.
    `
  },
  mentoria: {
    slug: "mentoria",
    titulo: "Mentoria",
    subtitulo: "Mentoria personalizada para planejar e acelerar sua aprovação.",
    imagem: "./assets/mentoria.jpg",
    copy: `
      Conseguir a aprovação em concursos públicos é um desafio que exige muito mais do que vontade: é preciso planejamento estratégico, organização, disciplina e acompanhamento correto — e é exatamente isso que nossa Mentoria oferece.
      Na Mentoria, você recebe um plano de estudos totalmente individualizado, elaborado especificamente para o seu perfil, considerando seu tempo disponível, o concurso que você pretende prestar, seu nível atual em cada matéria e o peso das disciplinas no edital.
      O plano é acessado por uma plataforma, onde suas metas diárias são divididas em teoria, revisão e resolução de questões.
      Mas não para por aí: você terá suporte direto e pessoal comigo, seu mentor, via WhatsApp. Pode tirar dúvidas, pedir orientações e receber feedback sempre que precisar, 7 dias por semana. Essa proximidade faz toda a diferença para manter seu foco, ajustar rotas e evitar a sensação de estar perdido.
      Oferecemos a mentoria com duas opções:
      • Com material completo do Estratégia Concursos, incluindo assinatura premium e acesso aos conteúdos mais atualizados e confiáveis;
      • Ou apenas o plano e o acompanhamento, para quem já possui material próprio ou prefere outras fontes.
      Além disso, fazemos uma reunião inicial para entender suas necessidades, dificuldades e objetivos, garantindo que seu plano seja realmente personalizado e adequado à sua realidade.
      Se você quer deixar de estudar sem rumo, perder tempo com métodos que não funcionam ou sentir que está sozinho nessa caminhada, a Mentoria é sua solução. Com acompanhamento, foco e estratégia, você acelera sua preparação e aumenta muito suas chances de passar.
      Esta é a oportunidade de estudar com quem entende do assunto, que vai acompanhar seu progresso e garantir que você esteja sempre no caminho certo rumo à aprovação.
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
function byId(id){ return document.getElementById(id); }
function param(name){ return new URLSearchParams(location.search).get(name); }
function toParagraphs(text){
  const parts = String(text).trim().split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  return parts.map(p=>`<p>${p}</p>`).join("");
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', function(){
  // Suporta /product e /product.html (Netlify/GitHub)
  const path = location.pathname.replace(/\/+$/,'');
  const isProduct = /\/product(?:\.html)?$/i.test(path);
  if(!isProduct) return;

  const slug = param('p');
  const p = products[slug];

  const title = byId('product-title');
  const sub   = byId('product-subtitle');
  const copy  = byId('product-copy');
  const price = byId('product-price');
  const img   = byId('product-image');

  const buy   = byId('buy-button');
  const sample= byId('sample-button');

  const step1 = byId('mentoria-step1');
  const step2 = byId('mentoria-step2');

  const waBtn = byId('whatsapp-cta');
  const waFab = byId('whatsapp-float');
  const waURL = `https://wa.me/${whatsappConfig.numero}?text=${encodeURIComponent(whatsappConfig.mensagem)}`;
  if(waBtn) waBtn.href = waURL;
  if(waFab) waFab.href = waURL;

  if(!p){
    if(title) title.textContent = "Produto não encontrado";
    if(copy)  copy.innerHTML = `<p><a class="btn-ghost" href="./">← Voltar</a></p>`;
    return;
  }

  if(title) title.textContent = p.titulo;
  if(sub)   sub.textContent   = p.subtitulo || "";
  if(copy)  copy.innerHTML    = toParagraphs(p.copy || "");
  if(img && p.imagem) img.src = p.imagem;

  if(price && p.preco){
    price.style.display = "block";
    price.querySelector('span').textContent = p.preco;
  }

  if(p.slug === 'mentoria'){
    if(buy){
      buy.addEventListener('click', function(e){
        e.preventDefault();
        if(step1) step1.style.display = "flex";
        if(sample) sample.style.display = "none";
      });
    }
    const withMat = byId('with-material');
    const withoutMat = byId('without-material');

    if(withMat) withMat.addEventListener('click', function(){
      step2.innerHTML = `
        <a class="btn-primary" href="${p.opcoes.comMaterial.mensal}" target="_blank" rel="noopener">Plano mensal</a>
        <a class="btn-primary" href="${p.opcoes.comMaterial.trimestral}" target="_blank" rel="noopener">Plano trimestral</a>
      `;
    });
    if(withoutMat) withoutMat.addEventListener('click', function(){
      step2.innerHTML = `
        <a class="btn-primary" href="${p.opcoes.semMaterial.mensal}" target="_blank" rel="noopener">Plano mensal</a>
        <a class="btn-primary" href="${p.opcoes.semMaterial.trimestral}" target="_blank" rel="noopener">Plano trimestral</a>
      `;
    });
  } else {
    if(buy){
      buy.href   = p.checkout;
      buy.target = "_blank";
      buy.rel    = "noopener";
    }
    if(sample && p.sampleUrl){
      sample.style.display = "inline-flex";
      sample.href = p.sampleUrl;
    }
  }
});
