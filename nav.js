// Shared script: set year, enable tap-to-open dropdowns on mobile.
document.querySelectorAll('.cyear').forEach(function(e){ e.textContent = new Date().getFullYear(); });

// On touch / small screens, tapping a dropdown label toggles it.
document.querySelectorAll('.has-drop > span').forEach(function(label){
  label.addEventListener('click', function(e){
    if (window.innerWidth <= 820) {
      e.preventDefault();
      var dd = label.nextElementSibling;
      if (dd) dd.classList.toggle('open');
    }
  });
});

// Close the mobile menu after tapping a real link.
document.querySelectorAll('.menu a[href]').forEach(function(a){
  a.addEventListener('click', function(){
    var m = document.getElementById('menu');
    if (m) m.classList.remove('open');
  });
});

// Add profile links to the footer of every page.
(function(){
  var ft = document.querySelector('footer');
  if (!ft) return;
  var links = [
    ['LinkedIn', 'https://www.linkedin.com/in/juliarchandler/'],
    ['Google Scholar', 'https://scholar.google.com/citations?user=jN-2eJwAAAAJ&hl=en'],
    ['GitHub', 'https://github.com/juliachandler'],
    ['ResearchGate', 'https://www.researchgate.net/profile/Julia-Chandler']
  ];
  var row = document.createElement('div');
  row.className = 'wrap profile-links';
  links.forEach(function(p){
    var a = document.createElement('a');
    a.href = p[1]; a.target = '_blank'; a.rel = 'noopener'; a.textContent = p[0];
    row.appendChild(a);
  });
  ft.appendChild(row);
})();

// Click-to-enlarge lightbox for figures.
(function(){
  var imgs = document.querySelectorAll('.fig img');
  if (!imgs.length) return;
  var lb = document.createElement('div'); lb.className = 'lightbox';
  var full = document.createElement('img');
  var cap = document.createElement('div'); cap.className = 'lb-cap';
  var close = document.createElement('button'); close.className = 'lb-close'; close.innerHTML = '&times;'; close.setAttribute('aria-label','Close');
  lb.appendChild(close); lb.appendChild(full); lb.appendChild(cap);
  document.body.appendChild(lb);
  function hide(){ lb.classList.remove('open'); full.src=''; }
  imgs.forEach(function(i){
    i.addEventListener('click', function(){
      full.src = i.currentSrc || i.src; full.alt = i.alt || '';
      var fc = i.closest('.fig'); var c = fc && fc.querySelector('figcaption');
      cap.textContent = c ? c.textContent : (i.alt || '');
      lb.classList.add('open');
    });
  });
  lb.addEventListener('click', hide);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') hide(); });
})();
