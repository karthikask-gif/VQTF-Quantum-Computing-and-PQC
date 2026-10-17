(()=>{const g=id=>document.getElementById(id),pick=(btns,b)=>btns.forEach(x=>x.classList.toggle('go',x===b));
const md=(a,q)=>((a%q)+q)%q,ri=(lo,hi)=>lo+Math.floor(Math.random()*(hi-lo+1)),F='font-family="system-ui"';

// ---- 9.1 Mosca
function moShow(){const x=+g('moXi').value,y=+g('moYi').value,z=+g('moZi').value,S=v=>20+v/45*360;g('moX').textContent=x+' yr';g('moY').textContent=y+' yr';g('moZ').textContent=z+' yr';
 let h='<line x1="20" y1="100" x2="380" y2="100" stroke="var(--mu)"/>';for(let t=0;t<=45;t+=5)h+='<text x="'+S(t)+'" y="118" text-anchor="middle" font-size="11" fill="var(--mu)" '+F+'>'+t+'</text>';
 h+='<rect x="20" y="22" width="'+(S(x)-20)+'" height="26" rx="4" fill="var(--a2)"/><rect x="'+S(x)+'" y="22" width="'+(S(x+y)-S(x))+'" height="26" rx="4" fill="var(--ac)"/>';
 h+='<text x="24" y="40" font-size="12" fill="#fff" '+F+'>x</text><text x="'+(S(x)+4)+'" y="40" font-size="12" fill="#fff" '+F+'>y</text><text x="'+(S(x+y)+4)+'" y="40" font-size="12" fill="var(--tx)" '+F+'>x + y = '+(x+y)+'</text>';
 h+='<rect x="20" y="60" width="'+(S(z)-20)+'" height="26" rx="4" fill="#e0576b" opacity=".85"/><text x="'+(S(z)+4)+'" y="78" font-size="12" fill="var(--tx)" '+F+'>z = '+z+'</text>';
 g('moC').innerHTML=h;const bad=x+y>z;
 g('moO').innerHTML='x + y = '+x+' + '+y+' = <b>'+(x+y)+'</b> '+(bad?'&gt;':'≤')+' z = <b>'+z+'</b>. '+(bad?'<b>Too late:</b> data protected today could be exposed by a quantum computer while it still needs to be secret. Start migrating now.':'<b>Safe for now</b>, as long as migration starts on time and the quantum estimate holds.')}
['moXi','moYi','moZi'].forEach(i=>g(i).addEventListener('input',moShow));moShow();
})();
// ---- 1.2 elliptic curve over the 17-clock: multiples of G
(()=>{const C=document.getElementById('ecC');if(!C)return;const p=17,m=v=>((v%p)+p)%p,inv=v=>{v=m(v);for(let i=1;i<p;i++)if(v*i%p==1)return i};
const add=(P,Q)=>{if(!P)return Q;if(!Q)return P;if(P[0]==Q[0]&&m(P[1]+Q[1])==0)return null;
 const l=P[0]==Q[0]?m((3*P[0]*P[0]+2)*inv(2*P[1])):m((Q[1]-P[1])*inv(Q[0]-P[0]));const x=m(l*l-P[0]-Q[0]);return [x,m(l*(P[0]-x)-P[1])]};
const pts=[];for(let x=0;x<p;x++)for(let y=0;y<p;y++)if(m(y*y-x*x*x-2*x-2)==0)pts.push([x,y]);
const M=[null];let R=null;for(let k=1;k<=19;k++){R=add(R,[5,1]);M.push(R)}
const X=x=>40+x*19.5,Y=y=>350-y*19.5;let k=1,run=!matchMedia('(prefers-reduced-motion: reduce)').matches,t;
function draw(){let h='';for(let i=0;i<p;i+=4)h+='<text x="'+X(i)+'" y="374" text-anchor="middle" font-size="11" fill="var(--mu)">'+i+'</text><text x="22" y="'+(Y(i)+4)+'" text-anchor="middle" font-size="11" fill="var(--mu)">'+i+'</text>';
 h+='<line x1="32" y1="358" x2="362" y2="358" stroke="var(--bd)"/><line x1="32" y1="358" x2="32" y2="28" stroke="var(--bd)"/>';
 pts.forEach(q=>h+='<circle cx="'+X(q[0])+'" cy="'+Y(q[1])+'" r="4.5" fill="var(--mu)" opacity=".55"/>');
 let path='';for(let i=1;i<=k&&i<19;i++)path+=X(M[i][0])+','+Y(M[i][1])+' ';
 if(k>1)h+='<polyline points="'+path+'" fill="none" stroke="var(--a2)" stroke-width="1.5" opacity=".6"/>';
 for(let i=1;i<k&&i<19;i++)h+='<circle cx="'+X(M[i][0])+'" cy="'+Y(M[i][1])+'" r="5" fill="var(--a2)"/>';
 if(M[k])h+='<circle cx="'+X(M[k][0])+'" cy="'+Y(M[k][1])+'" r="9" fill="var(--hv2)"/><text x="'+(X(M[k][0])+12)+'" y="'+(Y(M[k][1])-10)+'" font-size="13" font-weight="700" fill="var(--tx)">'+k+'G</text>';
 h+='<text x="200" y="18" text-anchor="middle" font-size="13" fill="var(--tx)">y² = x³ + 2x + 2 (mod 17)</text>';
 C.innerHTML=h;document.getElementById('ecO').textContent=M[k]?k+'·G = ('+M[k][0]+', '+M[k][1]+')'+(k==1?': the base point G':''):'19·G = the zero point. The next hop is G again: the pattern repeats every 19.'}
const step=d=>{k=((k-1+d)%19+19)%19+1;draw()},b=document.getElementById('ecA');
function setRun(r){run=r;b.textContent=r?'Pause':'Play';b.classList.toggle('go',r);clearInterval(t);if(r)t=setInterval(()=>{if(C.getBoundingClientRect().width)step(1)},1300)}
document.getElementById('ecN').onclick=()=>{setRun(false);step(1)};document.getElementById('ecB').onclick=()=>{setRun(false);step(-1)};b.onclick=()=>setRun(!run);
draw();setRun(run)})();
