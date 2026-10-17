(()=>{const g=id=>document.getElementById(id),pick=(btns,b)=>btns.forEach(x=>x.classList.toggle('go',x===b));
const md=(a,q)=>((a%q)+q)%q,ri=(lo,hi)=>lo+Math.floor(Math.random()*(hi-lo+1)),F='font-family="system-ui"';

// ---- 9.3 lattice CVP
const LB={g:[[2,0],[1,2]],b:[[7,2],[5,2]]},lbB=[...document.querySelectorAll('[data-lb]')];let lb='g',tg=[4.4,1.3];
const U=36,O=[54,246],P=([x,y])=>[O[0]+x*U,O[1]-y*U];
function laShow(){const B=LB[lb],[b1,b2]=B,det=b1[0]*b2[1]-b2[0]*b1[1],c1=(tg[0]*b2[1]-b2[0]*tg[1])/det,c2=(b1[0]*tg[1]-tg[0]*b1[1])/det,r1=Math.round(c1),r2=Math.round(c2),rp=[r1*b1[0]+r2*b2[0],r1*b1[1]+r2*b2[1]];
 let best=null,bd=1e9,h='';for(let i=-8;i<=8;i++)for(let j=-6;j<=6;j++){const p=[2*i+j,2*j],[X,Y]=P(p);if(X<-5||X>405||Y<-5||Y>305)continue;h+='<circle cx="'+X+'" cy="'+Y+'" r="4" fill="var(--mu)" opacity=".7"/>';const d=Math.hypot(p[0]-tg[0],p[1]-tg[1]);if(d<bd){bd=d;best=p}}
 h='<rect width="400" height="300" fill="transparent"/>'+h;const[ox,oy]=P([0,0]);
 [b1,b2].forEach((v,k)=>{const[X,Y]=P(v);h+='<line x1="'+ox+'" y1="'+oy+'" x2="'+X+'" y2="'+Y+'" stroke="'+(k?'var(--a2)':'var(--ac)')+'" stroke-width="3" opacity=".75" marker-end="url(#laAr'+k+')"/>'});
 h='<defs><marker id="laAr0" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--ac)"/></marker><marker id="laAr1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--a2)"/></marker></defs>'+h;
 const[tx,ty]=P(tg),[bx,by]=P(best),[rx,ry]=P(rp),ok=rp[0]===best[0]&&rp[1]===best[1];
 h+='<circle cx="'+bx+'" cy="'+by+'" r="9" fill="var(--hv2)"/><line x1="'+tx+'" y1="'+ty+'" x2="'+rx+'" y2="'+ry+'" stroke="'+(ok?'var(--a2)':'#e0576b')+'" stroke-width="2" stroke-dasharray="5 4"/><circle cx="'+rx+'" cy="'+ry+'" r="13" fill="none" stroke="'+(ok?'var(--a2)':'#e0576b')+'" stroke-width="3"/>';
 h+='<g stroke="var(--tx)" stroke-width="3"><line x1="'+(tx-7)+'" y1="'+(ty-7)+'" x2="'+(tx+7)+'" y2="'+(ty+7)+'"/><line x1="'+(tx-7)+'" y1="'+(ty+7)+'" x2="'+(tx+7)+'" y2="'+(ty-7)+'"/></g><text x="'+(tx+10)+'" y="'+(ty-10)+'" font-size="13" fill="var(--tx)" '+F+'>target</text>';
 g('laC').innerHTML=h;const f=v=>{const t=Math.abs(v).toFixed(2).replace(/\.?0+$/,'')||'0';return(v<0&&t!=='0'?'−':'')+t},pt=p=>'('+f(p[0])+', '+f(p[1])+')',sg=v=>v<0?'− '+f(-v):'+ '+f(v);
 g('laO').innerHTML='Target '+pt(tg)+' = '+f(c1)+'·b₁ '+sg(c2)+'·b₂. Rounding gives '+r1+'·b₁ '+(r2<0?'− '+(-r2):'+ '+r2)+'·b₂ = <b>'+pt(rp)+'</b>, distance '+Math.hypot(rp[0]-tg[0],rp[1]-tg[1]).toFixed(2)+'. True closest (orange): <b>'+pt(best)+'</b>, distance '+bd.toFixed(2)+'. '+(ok?'Rounding found it ✓':'Rounding missed it ✗')}
g('laC').addEventListener('click',e=>{const r=g('laC').getBoundingClientRect(),X=(e.clientX-r.left)/r.width*400,Y=(e.clientY-r.top)/r.height*300;tg=[(X-O[0])/U,(O[1]-Y)/U];laShow()});
lbB.forEach(b=>b.onclick=()=>{lb=b.dataset.lb;pick(lbB,b);laShow()});laShow();
})();
(()=>{const g=id=>document.getElementById(id),pick=(btns,b)=>btns.forEach(x=>x.classList.toggle('go',x===b));
const md=(a,q)=>((a%q)+q)%q,ri=(lo,hi)=>lo+Math.floor(Math.random()*(hi-lo+1)),F='font-family="system-ui"';

// ---- 9.4 LWE clock ticks + toy encryption
(()=>{let h='';for(let v=0;v<17;v++){const t=(-90+360*v/17)*Math.PI/180,x=100*Math.cos(t),y=100*Math.sin(t),lx=116*Math.cos(t),ly=116*Math.sin(t),hi=v===2||v===10;
 h+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(hi?7:3)+'" fill="'+(hi?(v===2?'var(--a2)':'var(--ac)'):'var(--mu)')+'"/><text x="'+lx.toFixed(1)+'" y="'+(ly+4).toFixed(1)+'" text-anchor="middle" font-size="11" font-weight="'+(hi?700:400)+'" fill="var(--tx)">'+v+'</text>'}g('lwTicks').innerHTML=h})();
const lwB=[...document.querySelectorAll('[data-lw]')];let lwBit=0;
function lwRun(){const q=97,n=3,m=8,N=+g('lwN').value;g('lwNv').textContent='±'+N;
 const s=[...Array(n)].map(()=>ri(0,q-1)),A=[...Array(m)].map(()=>[...Array(n)].map(()=>ri(0,q-1))),e=[...Array(m)].map(()=>ri(-N,N)),b=A.map((a,i)=>md(a.reduce((t,v,k)=>t+v*s[k],0)+e[i],q));
 let r=[...Array(m)].map(()=>Math.random()<.5?1:0);if(!r.some(x=>x))r[0]=1;
 const u=[...Array(n)].map((_,k)=>md(A.reduce((t,a,i)=>t+r[i]*a[k],0),q)),v=md(b.reduce((t,x,i)=>t+r[i]*x,0)+lwBit*48,q),us=md(u.reduce((t,x,k)=>t+x*s[k],0),q),d=md(v-us,q);
 const dist0=Math.min(d,q-d),dec=dist0<=24?0:1,noise=e.reduce((t,x,i)=>t+r[i]*x,0),rows=r.map((x,i)=>x?i+1:0).filter(Boolean);
 g('lwT').textContent='secret s = ('+s.join(', ')+')   rows used: '+rows.join(', ')+'   u = ('+u.join(', ')+')   v = '+v;
 g('lwO').innerHTML='Bob computes v − u·s = '+v+' − '+us+' = <b>'+d+'</b> (mod 97). '+(dec?'Closer to 48 than to 0':'Closer to 0 than to 48')+', so he reads <b>'+dec+'</b>. '+(dec===lwBit?'Correct ✓':'<b>Wrong ✗</b>')+'. The hidden noise from the chosen rows added up to '+noise+'. '+(dec===lwBit?(N>6?'Large noise is risky: keep pressing and some bits will flip.':'Small noise never crosses the border.'):'The noise grew past a quarter of the clock and pushed the result into the wrong half. Real schemes pick noise small enough that this almost never happens.')}
lwB.forEach(b=>b.onclick=()=>{lwBit=+b.dataset.lw;pick(lwB,b);lwRun()});g('lwR').onclick=lwRun;g('lwN').addEventListener('input',lwRun);lwRun();
})();
