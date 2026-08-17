window.addEventListener('load', ()=>{
    setTimeout(()=>{ document.getElementById('preloader').classList.add('done'); }, 500);
  });
  window.addEventListener('mousemove', e=>{
    document.getElementById('spotlight').style.setProperty('--mx', e.clientX+'px');
    document.getElementById('spotlight').style.setProperty('--my', e.clientY+'px');
  });
  const progressBar = document.getElementById('progressBar');
  const nav = document.getElementById('mainNav');
  let lastY = window.scrollY;
  window.addEventListener('scroll', ()=>{
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
    const y = window.scrollY;
    if(y > 140 && y > lastY){ nav.classList.add('nav-hidden'); } else { nav.classList.remove('nav-hidden'); }
    nav.classList.toggle('nav-scrolled', y > 40);
    lastY = y;
    document.getElementById('toTop').classList.toggle('show', y > 700);
  });
  document.querySelectorAll('.magnetic').forEach(btn=>{
    btn.addEventListener('mousemove', e=>{
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      btn.style.transform = `translate(${x*0.25}px, ${y*0.35}px)`;
    });
    btn.addEventListener('mouseleave', ()=>{ btn.style.transform=''; });
  });
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        if(e.target.id === 'radarBox'){ document.getElementById('radarShape').classList.add('animate'); }
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el=>io.observe(el));
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const dur = 1400; const start = performance.now();
        function tick(now){
          const p = Math.min((now-start)/dur, 1);
          const eased = 1 - Math.pow(1-p, 3);
          el.textContent = Math.floor(eased * target);
          if(p < 1) requestAnimationFrame(tick); else el.textContent = target;
        }
        requestAnimationFrame(tick);
        cio.unobserve(el);
      }
    });
  }, {threshold:0.6});
  counters.forEach(el=>cio.observe(el));
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navlinks a');
  const navIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        navLinks.forEach(l=>l.classList.remove('active'));
        const active = document.querySelector(`.navlinks a[href="#${entry.target.id}"]`);
        if(active) active.classList.add('active');
      }
    });
  }, {threshold:0.5});
  sections.forEach(s=>navIO.observe(s));
  document.querySelectorAll('.proj-expand-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btn.closest('.project').classList.toggle('expanded');
    });
  });
  const marquee = document.getElementById('certMarquee');
  marquee.innerHTML += marquee.innerHTML;
  const copyChip = document.getElementById('copyEmail');
  copyChip.addEventListener('click', ()=>{
    navigator.clipboard.writeText('connectwitharulselvan@gmail.com').then(()=>{
      const original = copyChip.textContent;
      copyChip.textContent = '✓ copied to clipboard';
      setTimeout(()=>{ copyChip.textContent = original; }, 1800);
    });
  });
  const toggle = document.getElementById('themeToggle');
  let isDark = false;
  toggle.addEventListener('click', ()=>{
    isDark = !isDark;
    document.documentElement.style.setProperty('--bg', isDark ? '#111214' : '#ffffff');
    document.documentElement.style.setProperty('--bg-1', isDark ? '#17181a' : '#fafafa');
    document.documentElement.style.setProperty('--ink', isDark ? '#f4f4f5' : '#17181a');
    document.documentElement.style.setProperty('--ink-dim', isDark ? '#b4b7bb' : '#55585c');
    document.documentElement.style.setProperty('--ink-faint', isDark ? '#84878b' : '#8b8e92');
    document.documentElement.style.setProperty('--line', isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)');
    document.documentElement.style.setProperty('--line-soft', isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)');
    toggle.textContent = isDark ? '☀' : '☾';
  });
  document.getElementById('toTop').addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  });
