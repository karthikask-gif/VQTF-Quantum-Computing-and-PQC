(()=>{const g=id=>document.getElementById(id),D=Math.PI/180,s2=Math.SQRT1_2,f2=x=>(Math.abs(x)<.005?0:x).toFixed(2);
const setBar=(id,p,label)=>{const e=g(id);e.style.width=Math.max(p,1)+'%';e.textContent=p>=18?label:''};
// ---- 6.2 basis explorer (real plane: |0> right, |1> up)
function bs(){const t=g('bsR').value*D,c=Math.cos(t),s=Math.sin(t),x=100*c,y=-100*s;g('bsRv').textContent=g('bsR').value+'°';
 g('bsA').setAttribute('x2',x);g('bsA').setAttribute('y2',y);g('bsD').setAttribute('cx',x);g('bsD').setAttribute('cy',y);
 const p=(c+s)*s2,m=(c-s)*s2;g('bsZ').textContent='|ψ⟩ = '+f2(c)+'|0⟩ + '+f2(s)+'|1⟩';g('bsX').textContent='|ψ⟩ = '+f2(p)+'|+⟩ + '+f2(m)+'|−⟩';
 const z0=Math.round(c*c*100),x0=Math.round(p*p*100);setBar('bsZ0',z0,'0: '+z0+'%');setBar('bsZ1',100-z0,'1: '+(100-z0)+'%');setBar('bsX0',x0,'+: '+x0+'%');setBar('bsX1',100-x0,'−: '+(100-x0)+'%')}
g('bsR').addEventListener('input',bs);bs();
// ---- 6.4 register
let rg=[1,0,0,0,0,0,0,0];const bits=i=>i.toString(2).padStart(3,'0');
g('rgBars').innerHTML=rg.map((_,i)=>'<div class="lbl">|'+bits(i)+'⟩ = '+i+' <span id="rgL'+i+'"></span></div><div class="bar"><i id="rgI'+i+'"></i></div>').join('');
function q1(k,U){const m=1<<k,o=rg.slice();for(let i=0;i<8;i++)if(!(i&m)){const a=rg[i],b=rg[i|m];o[i]=U[0]*a+U[1]*b;o[i|m]=U[2]*a+U[3]*b}rg=o}
function rgShow(msg){const nz=rg.map((a,i)=>[a,i]).filter(([a])=>Math.abs(a)>1e-9);
 g('rgE').textContent='|ψ⟩ = '+nz.map(([a,i],j)=>{const r=Math.round(a*1000)/1000,abs=Math.abs(r),coef=abs===1?'':(abs===.354?'0.35':String(Math.round(abs*100)/100));return(r<0?(j?' − ':'−'):(j?' + ':''))+coef+'|'+bits(i)+'⟩'}).join('');
 g('rgN').textContent=msg||(nz.length===1?'The register holds exactly one number: '+nz[0][1]+'.':'The register holds a mix of '+nz.length+' numbers at once.');
 rg.forEach((a,i)=>{const p=Math.round(a*a*1000)/10;g('rgL'+i).textContent='chance '+p+'%';g('rgI'+i).style.width=Math.max(p,1)+'%'})}
document.querySelectorAll('[data-rg]').forEach(b=>b.onclick=()=>{const k=b.dataset.rg;let msg='';
 if(k[0]==='X')q1(+k[1],[0,1,1,0]);else if(k==='H'){for(let j=0;j<3;j++)q1(j,[s2,s2,s2,-s2])}else if(k==='R')rg=[1,0,0,0,0,0,0,0];
 else{let r=Math.random(),i=0;for(;i<7;i++){r-=rg[i]*rg[i];if(r<0)break}rg=rg.map((_,j)=>j===i?1:0);msg='Measured: '+bits(i)+' = '+i+'. The mix is gone; the register now holds only this number.'}
 rgShow(msg)});rgShow();
// ---- 6.6 measurement simulator (Bloch side view: up=|0>, right=|+>)
let mb='z',tally=[0,0],collapse=null;
const ML={z:['0','1'],x:['+','−']};
function msArrow(t){const x=100*Math.sin(t),y=-100*Math.cos(t);g('msA').setAttribute('x2',x);g('msA').setAttribute('y2',y);g('msD').setAttribute('cx',x);g('msD').setAttribute('cy',y)}
const prob=()=>{const t=g('msT').value*D;return mb==='z'?(1+Math.cos(t))/2:(1+Math.sin(t))/2};
g('msBars').innerHTML='<div class="lbl" id="msL0"></div><div class="bar"><i id="msI0"></i></div><div class="lbl" id="msL1"></div><div class="bar"><i class="b" id="msI1"></i></div>';
function msShow(){const p=prob(),n=tally[0]+tally[1];g('msTv').textContent=g('msT').value+'°';
 [0,1].forEach(k=>{const exp=Math.round((k?1-p:p)*100),got=n?Math.round(tally[k]/n*100):0;g('msL'+k).textContent='Result '+ML[mb][k]+': expected '+exp+'%, got '+tally[k]+' of '+n+(n?' ('+got+'%)':'');g('msI'+k).style.width=Math.max(n?got:0,1)+'%'});
 if(!collapse)msArrow(g('msT').value*D)}
function sample(){return Math.random()<prob()?0:1}
function target(r){return mb==='z'?(r?Math.PI:0):(r?-Math.PI/2:Math.PI/2)}
g('msT').addEventListener('input',()=>{tally=[0,0];collapse=null;g('msO').textContent='';msShow()});
document.querySelectorAll('[data-mb]').forEach(b=>b.onclick=()=>{mb=b.dataset.mb;document.querySelectorAll('[data-mb]').forEach(x=>x.classList.toggle('go',x===b));tally=[0,0];g('msO').textContent='';msShow()});
g('ms1').onclick=()=>{const r=sample();tally[r]++;const t0=g('msT').value*D,t1=target(r),start=performance.now();collapse=true;
 g('msO').innerHTML='Result: <b>'+ML[mb][r]+'</b>. The qubit collapsed to |'+ML[mb][r]+'⟩. Any further "'+(mb==='z'?'0 or 1':'+ or −')+'" question would give '+ML[mb][r]+' again.';
 const step=now=>{const u=Math.min(1,(now-start)/500);msArrow(t0+(t1-t0)*u);if(u<1)requestAnimationFrame(step);else setTimeout(()=>{collapse=null;msShow();g('msO').innerHTML+=' <span class="mu">(A fresh copy has been prepared.)</span>'},1600)};requestAnimationFrame(step);msShow()};
g('ms100').onclick=()=>{for(let i=0;i<100;i++)tally[sample()]++;g('msO').textContent='Measured 100 freshly prepared copies.';msShow()};
g('msR').onclick=()=>{tally=[0,0];g('msO').textContent='';msShow()};msShow();
// ---- 6.7 Bell pair lab
const BN=['Φ⁺','Φ⁻','Ψ⁺','Ψ⁻'],SAME={z:[1,1,0,0],x:[1,0,1,0]};let bp=0,bq='z',bt={same:0,opp:0,a0:0,n:0};
g('bpBars').innerHTML='<div class="lbl" id="bpLs"></div><div class="bar"><i id="bpIs"></i></div><div class="lbl" id="bpLa"></div><div class="bar"><i class="b" id="bpIa"></i></div>';
function bpShow(){const n=bt.n;g('bpLs').textContent='Same results: '+bt.same+' of '+n;g('bpIs').style.width=Math.max(n?bt.same/n*100:0,1)+'%';
 g('bpLa').textContent='Qubit A on its own gave "'+(bq==='z'?'0':'+')+'": '+bt.a0+' of '+n+' (a coin toss)';g('bpIa').style.width=Math.max(n?bt.a0/n*100:0,1)+'%'}
function pair(){const a=Math.random()<.5?0:1,same=SAME[bq][bp],b=same?a:1-a;bt.n++;if(same)bt.same++;else bt.opp++;if(!a)bt.a0++;return[a,b,same]}
function lab(v){return bq==='z'?String(v):(v?'−':'+')}
function reset(){bt={same:0,opp:0,a0:0,n:0};g('bpA').textContent='?';g('bpB').textContent='?';g('bpO').textContent='';bpShow()}
document.querySelectorAll('[data-bp]').forEach(b=>b.onclick=()=>{bp=+b.dataset.bp;document.querySelectorAll('[data-bp]').forEach(x=>x.classList.toggle('go',x===b));reset()});
document.querySelectorAll('[data-bq]').forEach(b=>b.onclick=()=>{bq=b.dataset.bq;document.querySelectorAll('[data-bq]').forEach(x=>x.classList.toggle('go',x===b));reset()});
g('bp1').onclick=()=>{const[a,b,s]=pair(),A=g('bpA'),B=g('bpB');A.textContent=lab(a);B.textContent=lab(b);[A,B].forEach(e=>{e.classList.remove('pop');void e.offsetWidth;e.classList.add('pop')});
 g('bpO').textContent=BN[bp]+': A gave '+lab(a)+', B gave '+lab(b)+', so they are '+(s?'the same.':'opposite.');bpShow()};
g('bp20').onclick=()=>{for(let i=0;i<20;i++)pair();g('bpO').textContent='Measured 20 more '+BN[bp]+' pairs.';bpShow()};
g('bpR').onclick=reset;reset()})();
