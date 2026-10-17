// Shared behaviour for every page: in-page links, step splitter, section pager.
const PAGE=document.querySelector('.pg');PAGE.classList.add('on');
document.querySelectorAll('.top a').forEach(a=>a.classList.toggle('on',(location.pathname.split('/').pop()||'index.html')===a.getAttribute('href')));
// Handle in-page links ourselves so they also work inside previews and embedded frames
document.addEventListener('click',e=>{const j=e.target.closest&&e.target.closest('a[href^="#"]:not([href^="#/"])');if(j){const t=document.getElementById(j.getAttribute('href').slice(1));if(t){e.preventDefault();if(window.revealEl)revealEl(t);t.scrollIntoView({behavior:'smooth'})}return}});
// Split long sections into steps, shown one at a time
document.querySelectorAll('section[data-split]').forEach(sec=>{const sel=sec.dataset.split,kids=[...sec.children].filter(e=>e.tagName!=='H2');
 const starts=kids.filter(e=>e.matches(sel));if(starts.length<2)return;const chunks=[];let cur=null;const intro=kids.slice(0,kids.indexOf(starts[0]));
 if(intro.length>3){cur=document.createElement('div');cur.className='sub';cur.dataset.name='The idea';chunks.push(cur);intro[0].before(cur)}
 kids.forEach(e=>{if(e.matches(sel)){cur=document.createElement('div');cur.className='sub';chunks.push(cur);e.before(cur)}if(cur)cur.appendChild(e)});
 const nav=document.createElement('div');nav.className='subnav';const nm=c=>{if(c.dataset.name)return c.dataset.name;const t=c.firstElementChild.textContent,m=t.match(/^Step \d+:\s*(.*)$/);const r=(m?m[1]:t.split(':')[0]).trim();return r.charAt(0).toUpperCase()+r.slice(1)};
 chunks.forEach((c,i)=>{const b=document.createElement('button');b.textContent=(i+1)+'. '+nm(c);b.onclick=()=>go(i);nav.appendChild(b)});chunks[0].before(nav);
 const nb=document.createElement('button');nb.className='subnext';sec.appendChild(nb);
 function go(i){chunks.forEach((c,j)=>c.hidden=j!==i);[...nav.children].forEach((b,j)=>b.classList.toggle('on',j===i));nb.hidden=i===chunks.length-1;nb.textContent='Next: '+nm(chunks[Math.min(i+1,chunks.length-1)])+' →';nb.onclick=()=>{go(i+1);const y=nav.getBoundingClientRect().top+scrollY-110;if(scrollY>y)scrollTo(0,y)};dispatchEvent(new Event('resize'))}
 go(0)});
// Show each part one section at a time, with section tabs and previous/next buttons
(()=>{const SP={},top=document.querySelector('.top'),label=s=>{const h=s.querySelector('h2');return h?h.textContent.split(':')[0].trim():''};
document.querySelectorAll('.pg:not(#p-home)').forEach(pg=>{const main=pg.querySelector('main'),secs=[...main.querySelectorAll(':scope > section.s')],n=secs.length;
 const hero=pg.querySelector('.hero'),hd=document.createElement('div');hero.querySelectorAll(':scope > h1, :scope > p').forEach(e=>hd.appendChild(e));hero.appendChild(hd);
 const pn=main.querySelector(':scope > .pn'),links=pn?[...pn.querySelectorAll('a')]:[];if(pn)pn.hidden=true;
 const nav=document.createElement('nav');nav.className='secnav';nav.setAttribute('aria-label','Sections');
 secs.forEach((s,i)=>{const b=document.createElement('button');b.textContent=label(s)||'Section '+(i+1);b.onclick=()=>go(i,true);nav.appendChild(b)});main.prepend(nav);
 const bar=document.createElement('div');bar.className='pager';bar.innerHTML='<button class="pv"></button><span></span><button class="nx"></button>';main.appendChild(bar);
 const pv=bar.querySelector('.pv'),nx=bar.querySelector('.nx'),base=0;let cur=0;
 function go(i,scroll){cur=Math.max(0,Math.min(n-1,i));secs.forEach((s,j)=>s.hidden=j!==cur);[...nav.children].forEach((b,j)=>b.classList.toggle('on',j===cur));
  const prevLink=links.find(a=>a.textContent.includes('←')),nextLink=links.find(a=>a.textContent.includes('→'));
  pv.textContent=cur?'← '+label(secs[cur-1]):(prevLink?prevLink.textContent:'');pv.hidden=!pv.textContent;
  nx.textContent=cur<n-1?label(secs[cur+1])+' →':(nextLink?nextLink.textContent:'Contents');
  bar.querySelector('span').textContent=(cur+1)+' / '+n;
  const ch=nav.children[cur];nav.scrollLeft=ch.offsetLeft-nav.clientWidth/2+ch.clientWidth/2;
  nav.style.top=(top?top.offsetHeight:0)+'px';
  if(scroll){const y=nav.getBoundingClientRect().top+scrollY-(top?top.offsetHeight:0)-4;if(scrollY>y)scrollTo(0,y)}
  if(scroll)try{history.replaceState(null,'',location.pathname+(cur?'#'+cur:''))}catch(e){}
  dispatchEvent(new Event('resize'))}
 pv.onclick=()=>{if(cur)go(cur-1,true);else{const a=links.find(a=>a.textContent.includes('←'));a&&a.click()}};
 nx.onclick=()=>{if(cur<n-1)go(cur+1,true);else{const a=links.find(a=>a.textContent.includes('→'))||links[links.length-1];a&&a.click()}};
 SP[pg.id]={go,secs}});
window.onPart=(id,sec)=>{const p=SP[id];if(p)p.go(sec||0,false)};
window.revealEl=t=>{const pg=t.closest('.pg'),s=t.closest('section.s'),p=pg&&SP[pg.id];if(p&&s){const i=p.secs.indexOf(s);if(i>=0)p.go(i,false)}};
const sec=()=>{const n=parseInt((location.hash||'').slice(1),10);return isNaN(n)?0:n};onPart(PAGE.id,sec());addEventListener('hashchange',()=>{if(/^#\d+$/.test(location.hash))onPart(PAGE.id,sec())})})();
