// script.js — funcionalidade de pesquisa e interações
document.addEventListener('DOMContentLoaded', function(){
  const input = document.getElementById('pesquisa');
  const cards = Array.from(document.querySelectorAll('.card'));

  function normalize(text){
    return text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'');
  }

  function filterCards(query){
    const q = normalize(query.trim());
    if(!q){
      cards.forEach(c=>c.style.display='block');
      return;
    }
    cards.forEach(c=>{
      const title = c.getAttribute('data-title') || '';
      const body = c.textContent || '';
      const hay = normalize(title + ' ' + body);
      c.style.display = hay.includes(q) ? 'block' : 'none';
    });
  }

  let debounceTimer = null;
  input.addEventListener('input', function(e){
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(()=>filterCards(e.target.value), 150);
  });

  // Attach click handlers for view buttons
  document.querySelectorAll('.view-btn').forEach(btn=>{
    btn.addEventListener('click', function(){
      const subj = btn.getAttribute('data-subject') || 'material';
      mostrarMensagem(subj);
    });
  });

  // Enable Enter/Space to activate a card
  cards.forEach(card=>{
    card.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        const btn = card.querySelector('.view-btn');
        if(btn) btn.click();
        e.preventDefault();
      }
    });
  });
});

function mostrarMensagem(assunto){
  // Placeholder — aqui iremos mostrar ou navegar para os materiais reais
  alert('Ver materiais de: ' + assunto);
}
