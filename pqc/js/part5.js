(()=>{const g=id=>document.getElementById(id),s2=Math.SQRT1_2,R=()=>Math.random()<.5?1:0,D=Math.PI/180;
const fmt=v=>Math.abs(v)<.005?'0':(v<0?'−':'')+Math.abs(v).toFixed(2).replace(/\.?0+$/,'');
const pick=(btns,b)=>btns.forEach(x=>x.classList.toggle('go',x===b));
const h2=p=>p<=0||p>=1?0:-p*Math.log2(p)-(1-p)*Math.log2(1-p);
const pct=(v,d=1)=>(v*100).toFixed(d).replace(/\.0$/,'')+'%';
function chart(svg,vals,labels){const n=vals.length,zero=88,Rr=72,slot=380/n,bw=Math.min(slot*.7,60);let h='<line x1="8" x2="392" y1="88" y2="88" stroke="var(--mu)"/>';
 vals.forEach((v,i)=>{const x=10+slot*i+(slot-bw)/2,len=Math.abs(v)*Rr,y=v>=0?zero-len:zero;
  h+='<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+Math.max(len,.6).toFixed(1)+'" rx="3" class="'+(v<0?'ng':'ps')+'"/>';
  if(Math.abs(v)>.005)h+='<text x="'+(x+bw/2).toFixed(1)+'" y="'+(v>=0?y-5:y+len+14).toFixed(1)+'" text-anchor="middle" font-size="12" fill="var(--tx)">'+fmt(v)+'</text>';
  h+='<text x="'+(x+bw/2).toFixed(1)+'" y="194" text-anchor="middle" font-size="13" fill="var(--mu)">'+labels[i]+'</text>'});svg.innerHTML=h}
const dirac=(a,lab)=>{let t='';a.forEach((v,i)=>{if(Math.abs(v)<.005)return;const m=Math.abs(v),c=Math.abs(m-1)<.005?'':fmt(m);t+=(v<0?(t?' − ':'−'):(t?' + ':''))+c+'|'+lab[i]+'⟩'});return t};

const bitsHTML=(a,click,cls)=>a.map((b,i)=>click?'<button data-i="'+i+'"'+(cls&&cls[i]?' class="'+cls[i]+'"':'')+'>'+b+'</button>':'<span'+(cls&&cls[i]?' class="'+cls[i]+'"':'')+'>'+b+'</span>').join('');
// ---- 8.2 one-time pad
let oM=[1,0,1,1,0,0,1,0],oK=oM.map(R),oG=[0,0,0,0,0,0,0,0];
function otShow(){const C=oM.map((b,i)=>b^oK[i]),K2=C.map((c,i)=>c^oG[i]);
 g('otM').innerHTML=bitsHTML(oM,1);g('otKey').innerHTML=bitsHTML(oK);g('otC').innerHTML=bitsHTML(C);g('otG').innerHTML=bitsHTML(oG,1);
 g('otM').querySelectorAll('button').forEach(b=>b.onclick=()=>{oM[b.dataset.i]^=1;otShow()});g('otG').querySelectorAll('button').forEach(b=>b.onclick=()=>{oG[b.dataset.i]^=1;otShow()});
 g('otO').innerHTML='If the key were <span class="m">'+K2.join('')+'</span>, the ciphertext <span class="m">'+C.join('')+'</span> would unlock to your guess <span class="m">'+oG.join('')+'</span>. That key is exactly as likely as the real one, so Eve can\'t rule out your guess, or any of the 256 possible messages.'+(oG.join('')===oM.join('')?' <b>(Your guess happens to be the real message, but Eve has no way to know that.)</b>':'')}
g('otK').onclick=()=>{oK=oM.map(R);otShow()};otShow();
})();
(()=>{const g=id=>document.getElementById(id),s2=Math.SQRT1_2,R=()=>Math.random()<.5?1:0,D=Math.PI/180;
const fmt=v=>Math.abs(v)<.005?'0':(v<0?'−':'')+Math.abs(v).toFixed(2).replace(/\.?0+$/,'');
const pick=(btns,b)=>btns.forEach(x=>x.classList.toggle('go',x===b));
const h2=p=>p<=0||p>=1?0:-p*Math.log2(p)-(1-p)*Math.log2(1-p);
const pct=(v,d=1)=>(v*100).toFixed(d).replace(/\.0$/,'')+'%';
function chart(svg,vals,labels){const n=vals.length,zero=88,Rr=72,slot=380/n,bw=Math.min(slot*.7,60);let h='<line x1="8" x2="392" y1="88" y2="88" stroke="var(--mu)"/>';
 vals.forEach((v,i)=>{const x=10+slot*i+(slot-bw)/2,len=Math.abs(v)*Rr,y=v>=0?zero-len:zero;
  h+='<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+Math.max(len,.6).toFixed(1)+'" rx="3" class="'+(v<0?'ng':'ps')+'"/>';
  if(Math.abs(v)>.005)h+='<text x="'+(x+bw/2).toFixed(1)+'" y="'+(v>=0?y-5:y+len+14).toFixed(1)+'" text-anchor="middle" font-size="12" fill="var(--tx)">'+fmt(v)+'</text>';
  h+='<text x="'+(x+bw/2).toFixed(1)+'" y="194" text-anchor="middle" font-size="13" fill="var(--mu)">'+labels[i]+'</text>'});svg.innerHTML=h}
const dirac=(a,lab)=>{let t='';a.forEach((v,i)=>{if(Math.abs(v)<.005)return;const m=Math.abs(v),c=Math.abs(m-1)<.005?'':fmt(m);t+=(v<0?(t?' − ':'−'):(t?' + ':''))+c+'|'+lab[i]+'⟩'});return t};

const bitsHTML=(a,click,cls)=>a.map((b,i)=>click?'<button data-i="'+i+'"'+(cls&&cls[i]?' class="'+cls[i]+'"':'')+'>'+b+'</button>':'<span'+(cls&&cls[i]?' class="'+cls[i]+'"':'')+'>'+b+'</span>').join('');
// ---- 8.2 entropy curve
function enShow(){const p=g('enP').value/100,X=x=>40+x*340,Y=y=>180-y*150;g('enV').textContent=p.toFixed(2);
 let pts=[];for(let i=0;i<=100;i++)pts.push(X(i/100).toFixed(1)+','+Y(h2(i/100)).toFixed(1));
 g('enC').innerHTML='<line x1="40" y1="180" x2="385" y2="180" stroke="var(--mu)"/><line x1="40" y1="20" x2="40" y2="180" stroke="var(--mu)"/>'+
 '<g font-size="12" fill="var(--mu)" font-family="system-ui"><text x="34" y="34" text-anchor="end">1 bit</text><text x="34" y="184" text-anchor="end">0</text><text x="40" y="198" text-anchor="middle">0</text><text x="210" y="198" text-anchor="middle">0.5</text><text x="380" y="198" text-anchor="middle">1</text><text x="210" y="214" text-anchor="middle">chance p</text></g>'+
 '<polyline points="'+pts.join(' ')+'" fill="none" stroke="var(--ac)" stroke-width="3"/><line x1="'+X(p)+'" y1="180" x2="'+X(p)+'" y2="'+Y(h2(p))+'" stroke="var(--hv)" stroke-dasharray="4 3" stroke-width="2"/><circle cx="'+X(p)+'" cy="'+Y(h2(p))+'" r="7" fill="var(--hv)"/>';
 g('enO').innerHTML='h('+p.toFixed(2)+') = <b>'+h2(p).toFixed(2)+' bits</b>. '+(p===0||p===1?'Completely predictable: nothing to learn.':Math.abs(p-.5)<.005?'A fair coin: the most uncertain a yes/no can be.':'The closer p is to 0 or 1, the more predictable, and the fewer bits it carries.')}
g('enP').addEventListener('input',enShow);enShow();
})();
(()=>{const g=id=>document.getElementById(id),s2=Math.SQRT1_2,R=()=>Math.random()<.5?1:0,D=Math.PI/180;
const fmt=v=>Math.abs(v)<.005?'0':(v<0?'−':'')+Math.abs(v).toFixed(2).replace(/\.?0+$/,'');
const pick=(btns,b)=>btns.forEach(x=>x.classList.toggle('go',x===b));
const h2=p=>p<=0||p>=1?0:-p*Math.log2(p)-(1-p)*Math.log2(1-p);
const pct=(v,d=1)=>(v*100).toFixed(d).replace(/\.0$/,'')+'%';
function chart(svg,vals,labels){const n=vals.length,zero=88,Rr=72,slot=380/n,bw=Math.min(slot*.7,60);let h='<line x1="8" x2="392" y1="88" y2="88" stroke="var(--mu)"/>';
 vals.forEach((v,i)=>{const x=10+slot*i+(slot-bw)/2,len=Math.abs(v)*Rr,y=v>=0?zero-len:zero;
  h+='<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+Math.max(len,.6).toFixed(1)+'" rx="3" class="'+(v<0?'ng':'ps')+'"/>';
  if(Math.abs(v)>.005)h+='<text x="'+(x+bw/2).toFixed(1)+'" y="'+(v>=0?y-5:y+len+14).toFixed(1)+'" text-anchor="middle" font-size="12" fill="var(--tx)">'+fmt(v)+'</text>';
  h+='<text x="'+(x+bw/2).toFixed(1)+'" y="194" text-anchor="middle" font-size="13" fill="var(--mu)">'+labels[i]+'</text>'});svg.innerHTML=h}
const dirac=(a,lab)=>{let t='';a.forEach((v,i)=>{if(Math.abs(v)<.005)return;const m=Math.abs(v),c=Math.abs(m-1)<.005?'':fmt(m);t+=(v<0?(t?' − ':'−'):(t?' + ':''))+c+'|'+lab[i]+'⟩'});return t};

const bitsHTML=(a,click,cls)=>a.map((b,i)=>click?'<button data-i="'+i+'"'+(cls&&cls[i]?' class="'+cls[i]+'"':'')+'>'+b+'</button>':'<span'+(cls&&cls[i]?' class="'+cls[i]+'"':'')+'>'+b+'</span>').join('');
// ---- 8.3 no-cloning
const CL={0:[1,0],1:[0,1],p:[s2,s2],m:[s2,-s2]},CN={0:'|0⟩',1:'|1⟩',p:'|+⟩',m:'|−⟩'},L4=['00','01','10','11'],clB=[...document.querySelectorAll('[data-cl]')];
function clShow(k){const[a,b]=CL[k],out=[a,0,0,b],want=[a*a,a*b,b*a,b*b],ok=out.every((v,i)=>Math.abs(v-want[i])<1e-9);
 chart(g('clA'),out,L4);chart(g('clB'),want,L4);
 g('clO').innerHTML='Copier gives <span class="m" style="white-space:normal">'+dirac(out,L4)+'</span>; two copies of '+CN[k]+' would be <span class="m" style="white-space:normal">'+dirac(want,L4)+'</span>. '+(ok?'<b>Match ✓</b>: plain 0s and 1s copy fine.':'<b>No match ✗</b>: the copier made an entangled pair instead of two copies.')}
clB.forEach(b=>b.onclick=()=>{pick(clB,b);clShow(b.dataset.cl)});clShow('0');
})();
