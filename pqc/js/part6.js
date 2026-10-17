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
// ---- 8.4 BB84 simulator
const evB=[...document.querySelectorAll('[data-ev]')];let eve=0;const SYM=[['→','↑'],['↗','↖']],BS=['+','×'];
function photon(){const ab=R(),aB=R();let st=[ab,aB],eB=null,eR=null;if(eve){eB=R();eR=eB===aB?ab:R();st=[eR,eB]}
 const bB=R(),bR=bB===st[1]?st[0]:R(),keep=bB===aB;return{ab,aB,eB,eR,bB,bR,keep,err:keep&&bR!==ab}}
function bbRun(){const P=[...Array(16)].map(photon),row=(t,f)=>'<tr><td>'+t+'</td>'+P.map(f).join('')+'</tr>';
 let h=row('Photon',(p,i)=>'<th>'+(i+1)+'</th>').replace(/<td>Photon<\/td>/,'<th></th>');
 h+=row('Alice bit',p=>'<td>'+p.ab+'</td>')+row('Alice basis',p=>'<td>'+BS[p.aB]+'</td>')+row('Sent',p=>'<td>'+SYM[p.aB][p.ab]+'</td>');
 if(eve)h+=row('Eve basis',p=>'<td class="ev">'+BS[p.eB]+'</td>')+row('Eve resends',p=>'<td class="ev">'+SYM[p.eB][p.eR]+'</td>');
 h+=row('Bob basis',p=>'<td>'+BS[p.bB]+'</td>')+row('Bob result',p=>'<td>'+p.bR+'</td>')+row('Keep?',p=>'<td>'+(p.keep?'✓':'')+'</td>')+row('Error?',p=>'<td class="'+(p.err?'er':'')+'">'+(p.keep?(p.err?'✗':'ok'):'')+'</td>');
 g('bbT').innerHTML=h;const K=P.filter(p=>p.keep),e=K.filter(p=>p.err).length;
 g('bbO').innerHTML='Kept <b>'+K.length+'</b> of 16 (bases matched). Sifted key: Alice <span class="m">'+(K.map(p=>p.ab).join('')||'–')+'</span>, Bob <span class="m">'+(K.map(p=>p.bR).join('')||'–')+'</span>. Errors: <b>'+e+'</b>'+(K.length?' ('+pct(e/K.length,0)+')':'')+'. '+(eve?'With only 16 photons the error rate jumps around; press <b>Send 10,000</b> to see it settle near 25%.':'Without Eve the keys always match.')}
g('bbS').onclick=bbRun;
g('bbK').onclick=()=>{let k=0,e=0;for(let i=0;i<1e4;i++){const p=photon();if(p.keep){k++;if(p.err)e++}}
 g('bbT').innerHTML='';g('bbO').innerHTML='10,000 photons sent. Sifted key: <b>'+k.toLocaleString('en')+'</b> bits (about half). Errors: <b>'+e.toLocaleString('en')+'</b>, so QBER = <b>'+pct(e/k)+'</b>. '+(eve?'Eve\'s intercept-resend causes about 25% errors: she is caught.':'No eavesdropper, no errors.')};
evB.forEach(b=>b.onclick=()=>{eve=+b.dataset.ev;pick(evB,b);bbRun()});bbRun();
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
// ---- 8.6 partial intercept
function ivShow(){const f=g('ivF').value/100,q=f/4,ei=f/2;g('ivV').textContent=pct(f,0)+' of photons';
 g('ivL1').textContent='Error rate (QBER) seen by Alice and Bob: '+pct(q);g('ivB1').style.width=Math.max(q*100,1)+'%';
 g('ivL2').textContent='Share of sifted bits Eve learns: '+pct(ei);g('ivB2').style.width=Math.max(ei*100,1)+'%';
 g('ivO').innerHTML='QBER = '+pct(f,0)+' ÷ 4 = <b>'+pct(q)+'</b>. '+(q>.11?'That is above the 11% limit (6.4): Alice and Bob abort.':q>0?'Below the 11% limit, so they continue, but privacy amplification (6.6) will remove everything Eve learned.':'No interception, no errors.')}
g('ivF').addEventListener('input',ivShow);ivShow();
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
// ---- 8.7 sampling
let sam=[];const saB=[...document.querySelectorAll('[data-sa2]')];
function saShow(){const q=g('saQ').value/100,X=v=>30+Math.min(v,.4)/.4*350;g('saV').textContent=pct(q,0);
 let h='<line x1="30" y1="170" x2="380" y2="170" stroke="var(--mu)"/>';for(let t=0;t<=40;t+=10)h+='<text x="'+X(t/100)+'" y="188" text-anchor="middle" font-size="12" fill="var(--mu)" font-family="system-ui">'+t+'%</text>';
 h+='<line x1="'+X(.11)+'" y1="14" x2="'+X(.11)+'" y2="170" stroke="#e0576b" stroke-width="2" stroke-dasharray="6 4"/><text x="'+(X(.11)+4)+'" y="24" font-size="11" fill="#e0576b" font-family="system-ui">11% limit</text>';
 h+='<line x1="'+X(q)+'" y1="14" x2="'+X(q)+'" y2="170" stroke="var(--a2)" stroke-width="3"/><text x="'+(X(q)-4)+'" y="24" text-anchor="end" font-size="11" fill="var(--a2)" font-family="system-ui">true</text>';
 const COL={20:'#d9830b',100:'var(--ac)',1000:'var(--a2)'};sam.slice(-12).forEach((s,i)=>{h+='<circle cx="'+X(s.e).toFixed(1)+'" cy="'+(160-i*11)+'" r="5" fill="'+COL[s.n]+'"/>'});
 g('saC').innerHTML=h;const l=sam[sam.length-1];
 g('saO').innerHTML=l?'Last sample: <b>'+l.k+'</b> errors in '+l.n+' bits, so the estimate is <b>'+pct(l.e)+'</b> (true: '+pct(q,0)+'). Dots: orange = 20 bits, purple = 100, teal = 1,000. Bigger samples land closer to the true line.':'Press a sample button. Each dot is one estimate.'}
saB.forEach(b=>b.onclick=()=>{const n=+b.dataset.sa2,q=g('saQ').value/100;let k=0;for(let i=0;i<n;i++)if(Math.random()<q)k++;sam.push({n,k,e:k/n});pick(saB,b);saShow()});
g('saR').onclick=()=>{sam=[];saShow()};g('saQ').addEventListener('input',()=>{sam=[];saShow()});saShow();
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
// ---- 8.8 binary search reconciliation
let rA,rB,lo,hi,np,bad,done8,cmp;
function rcNew(){rA=[...Array(16)].map(R);bad=Math.floor(Math.random()*16);rB=rA.slice();rB[bad]^=1;lo=0;hi=16;np=0;done8=false;cmp=null;rcShow('Alice and Bob each hold 16 bits. One of Bob\'s bits is wrong, but nobody knows which.')}
const par=(a,l,h)=>a.slice(l,h).reduce((x,y)=>x^y,0);const rg=(l,h)=>h-l===1?'Bit '+(l+1):'Bits '+(l+1)+'–'+h;
function rcShow(msg){const cls=i=>(i>=lo&&i<hi?'in':'out')+(cmp&&i>=cmp[0]&&i<cmp[1]?' cmp':'')+(done8&&i===bad?' fix':'');
 g('rcA').innerHTML='<b>Alice</b>'+bitsHTML(rA,0,rA.map((_,i)=>cls(i)));g('rcB').innerHTML='<b>Bob</b>'+bitsHTML(rB,0,rB.map((_,i)=>cls(i)));
 g('rcO').innerHTML=msg+' <span class="mu">Parities announced so far: '+np+'.</span>';g('rcS').disabled=done8}
g('rcS').onclick=()=>{if(np===0){np++;cmp=[0,16];const a=par(rA,0,16),b=par(rB,0,16);rcShow('Whole key: Alice\'s parity is '+a+', Bob\'s is '+b+'. Different, so there is an error somewhere in the highlighted area.');return}
 const mid=(lo+hi)>>1;np++;cmp=[lo,mid];const a=par(rA,lo,mid),b=par(rB,lo,mid);
 if(a!==b)hi=mid;else lo=mid;
 if(hi-lo===1){done8=true;rB[bad]^=1;rcShow(rg(cmp[0],cmp[1])+': parities '+a+' and '+b+' are '+(a!==b?'different':'the same')+'. The error is <b>bit '+(bad+1)+'</b>. Bob flips it, and the keys now match ✓. Eve heard '+np+' parity bits, which privacy amplification must remove.');return}
 rcShow(rg(cmp[0],cmp[1])+': Alice\'s parity '+a+', Bob\'s '+b+'. '+(a!==b?'Different, so the error is in this part.':'The same, so the error is in the other part.')+' Search area now: '+rg(lo,hi).toLowerCase()+'.')};
g('rcN').onclick=rcNew;rcNew();
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
// ---- 8.9 key pipeline
function kpShow(){const q=+g('kpQ').value/100,h=h2(q),sift=5000,keep=4500,leak=keep*h,eve=keep*h,fin=Math.max(0,keep*(1-2*h));g('kpV').textContent=pct(q);
 const rows=[['Photons sent',10000,''],['Sifted key (bases matched, about half)',sift,''],['After using 500 bits to estimate the QBER',keep,'b'],['Leaked while fixing errors ≈ 4,500 × h(Q)',leak,'r'],['Eve\'s possible knowledge ≈ 4,500 × h(Q)',eve,'r'],['Final secret key = 4,500 × (1 − 2h(Q))',fin,'b']];
 g('kpBars').innerHTML=rows.map(([l,v,c])=>'<span class="lbl">'+l+': <b>'+Math.round(v).toLocaleString('en')+'</b></span><div class="bar"><i class="'+c+'" style="width:'+Math.max(v/100,.5)+'%"></i></div>').join('');
 g('kpO').innerHTML='h('+pct(q)+') = '+h.toFixed(3)+', so r = 1 − 2 × '+h.toFixed(3)+' = <b>'+Math.max(0,1-2*h).toFixed(2)+'</b>. '+(fin>0?'Alice and Bob end with <b>'+Math.round(fin).toLocaleString('en')+'</b> perfectly secret bits.':'Nothing secret is left: <b>abort</b>.')}
g('kpQ').addEventListener('input',kpShow);kpShow();
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
// ---- 8.10 Bell test
const blB=[...document.querySelectorAll('[data-bs]')];let bm='q',bS=null,bE=null;const AA=[0,90],BB=[45,-45];
function Emodel(i,j){const a=AA[i]*D,b=BB[j]*D;return bm==='q'?Math.cos(a-b):bm==='e'?Math.cos(a)*Math.cos(b):1}
function blDraw(){const X=v=>30+v/3*350;let h='<line x1="30" y1="120" x2="380" y2="120" stroke="var(--mu)"/>';
 for(let t=0;t<=3;t++)h+='<text x="'+X(t)+'" y="140" text-anchor="middle" font-size="12" fill="var(--mu)" font-family="system-ui">'+t+'</text>';
 h+='<line x1="'+X(2)+'" y1="30" x2="'+X(2)+'" y2="120" stroke="#e0576b" stroke-width="2" stroke-dasharray="6 4"/><text x="'+(X(2)-4)+'" y="26" text-anchor="end" font-size="11" fill="#e0576b" font-family="system-ui">classical limit 2</text>';
 h+='<line x1="'+X(2*Math.SQRT2)+'" y1="30" x2="'+X(2*Math.SQRT2)+'" y2="120" stroke="var(--a2)" stroke-width="2" stroke-dasharray="6 4"/><text x="'+(X(2*Math.SQRT2)+2)+'" y="26" font-size="11" fill="var(--a2)" font-family="system-ui">2.83</text>';
 if(bS!=null)h+='<rect x="30" y="60" width="'+Math.max(0,X(Math.min(bS,3))-30).toFixed(1)+'" height="40" rx="6" fill="'+(bS>2?'var(--a2)':'#e0576b')+'"/><text x="'+(X(Math.min(bS,3))-6).toFixed(1)+'" y="86" text-anchor="end" font-size="14" font-weight="700" fill="#fff" font-family="system-ui">S = '+bS.toFixed(2)+'</text>';
 h+='<text x="205" y="192" text-anchor="middle" font-size="12" fill="var(--mu)" font-family="system-ui">measured S</text>';g('blC').innerHTML=h}
g('blR').onclick=()=>{const sum=[[0,0],[0,0]],cnt=[[0,0],[0,0]];for(let r=0;r<1000;r++){const i=R(),j=R(),E=Emodel(i,j),same=Math.random()<(1+E)/2;sum[i][j]+=same?1:-1;cnt[i][j]++}
 bE=[[0,0],[0,0]].map((r,i)=>r.map((_,j)=>cnt[i][j]?sum[i][j]/cnt[i][j]:0));bS=bE[0][0]+bE[0][1]+bE[1][0]-bE[1][1];blDraw();
 g('blE').textContent='E(a,b) = '+fmt(bE[0][0])+'   E(a,b′) = '+fmt(bE[0][1])+'   E(a′,b) = '+fmt(bE[1][0])+'   E(a′,b′) = '+fmt(bE[1][1]);
 g('blO').innerHTML='S = '+fmt(bE[0][0])+' + '+fmt(bE[0][1])+' + '+fmt(bE[1][0])+' − ('+fmt(bE[1][1])+') = <b>'+bS.toFixed(2)+'</b>. '+(bS>2?'Above 2: genuine entanglement. No pre-planned answers, so nobody else can know the key. ✓':bm==='e'?'Below 2: Eve\'s measurements broke the entanglement, and the test exposes her.':'At most 2: pre-planned answers can never beat the classical limit.')+' <span class="mu">(1,000 random rounds, so values wobble a little.)</span>'};
blB.forEach(b=>b.onclick=()=>{bm=b.dataset.bs;pick(blB,b);bS=null;g('blE').textContent='';g('blO').textContent='';blDraw()});blDraw();
})();
