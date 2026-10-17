(()=>{const g=id=>document.getElementById(id),PI=Math.PI,s2=Math.SQRT1_2,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// ---------- complex helpers
const cm=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]],ca=(a,b)=>[a[0]+b[0],a[1]+b[1]],cj=a=>[a[0],-a[1]],E=t=>[Math.cos(t),Math.sin(t)];
const apply=(U,v)=>[ca(cm(U[0][0],v[0]),cm(U[0][1],v[1])),ca(cm(U[1][0],v[0]),cm(U[1][1],v[1]))];
const R=x=>[x,0],I=x=>[0,x];
function mat(k,th){const c=Math.cos(th/2),s=Math.sin(th/2);return{X:[[R(0),R(1)],[R(1),R(0)]],Y:[[R(0),I(-1)],[I(1),R(0)]],Z:[[R(1),R(0)],[R(0),R(-1)]],H:[[R(s2),R(s2)],[R(s2),R(-s2)]],
 S:[[R(1),R(0)],[R(0),I(1)]],Sd:[[R(1),R(0)],[R(0),I(-1)]],T:[[R(1),R(0)],[R(0),E(PI/4)]],Td:[[R(1),R(0)],[R(0),E(-PI/4)]],
 Rx:[[R(c),I(-s)],[I(-s),R(c)]],Ry:[[R(c),R(-s)],[R(s),R(c)]],Rz:[[E(-th/2),R(0)],[R(0),E(th/2)]]}[k]}
function rot(k,th){return{X:[[1,0,0],PI],Y:[[0,1,0],PI],Z:[[0,0,1],PI],H:[[s2,0,s2],PI],S:[[0,0,1],PI/2],Sd:[[0,0,1],-PI/2],T:[[0,0,1],PI/4],Td:[[0,0,1],-PI/4],Rx:[[1,0,0],th],Ry:[[0,1,0],th],Rz:[[0,0,1],th]}[k]}
const bloch=v=>{const p=cm(cj(v[0]),v[1]);return[2*p[0],2*p[1],(v[0][0]**2+v[0][1]**2)-(v[1][0]**2+v[1][1]**2)]};
function rodr(v,n,a){const c=Math.cos(a),s=Math.sin(a),d=n[0]*v[0]+n[1]*v[1]+n[2]*v[2],cr=[n[1]*v[2]-n[2]*v[1],n[2]*v[0]-n[0]*v[2],n[0]*v[1]-n[1]*v[0]];return[0,1,2].map(i=>v[i]*c+cr[i]*s+n[i]*d*(1-c))}
const ease=u=>u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
// ---------- drawing
const yaw=-0.6,pitch=0.35;
function P(p,cx,cy,r){const[x,y,z]=p,cY=Math.cos(yaw),sY=Math.sin(yaw),cP=Math.cos(pitch),sP=Math.sin(pitch),x1=x*cY-y*sY,y1=x*sY+y*cY,y2=y1*cP-z*sP,z2=y1*sP+z*cP;return[cx+x1*r,cy-z2*r,y2]}
function col(){const cs=getComputedStyle(document.documentElement),v=n=>cs.getPropertyValue(n).trim();return{tx:v('--tx'),mu:v('--mu'),bd:v('--bd'),ac:v('--ac'),a2:v('--a2'),gold:'#d9830b'}}
function prep(cv){const r=cv.getBoundingClientRect(),d=devicePixelRatio||1;if(cv.width!==Math.round(r.width*d)||cv.height!==Math.round(r.height*d)){cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d)}const c=cv.getContext('2d');c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,r.width,r.height);return{c,W:r.width,H:r.height}}
function txt(c,t,x,y,cl,sz,wt){c.fillStyle=cl;c.font=(wt||600)+' '+sz+'px system-ui,sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(t,x,y)}
function ring(c,f,cx,cy,r){let pr=null;for(let i=0;i<=72;i++){const q=P(f(i/72*2*PI),cx,cy,r);if(pr){c.globalAlpha=q[2]<0?.9:.35;c.beginPath();c.moveTo(pr[0],pr[1]);c.lineTo(q[0],q[1]);c.stroke()}pr=q}c.globalAlpha=1}
function sphere(c,cx,cy,r,v,C,o){const fs=Math.max(11,Math.min(15,r/7));
 c.strokeStyle=C.bd;c.lineWidth=1.5;c.beginPath();c.arc(cx,cy,r,0,2*PI);c.stroke();
 ring(c,t=>[Math.cos(t),Math.sin(t),0],cx,cy,r);ring(c,t=>[Math.cos(t),0,Math.sin(t)],cx,cy,r);ring(c,t=>[0,Math.cos(t),Math.sin(t)],cx,cy,r);
 c.setLineDash([3,4]);c.strokeStyle=C.mu;c.lineWidth=1;[[1,0,0],[0,1,0],[0,0,1]].forEach(a=>{const p=P(a.map(x=>-x),cx,cy,r),q=P(a,cx,cy,r);c.beginPath();c.moveTo(p[0],p[1]);c.lineTo(q[0],q[1]);c.stroke()});c.setLineDash([]);
 if(o.axis){const n=o.axis,p=P(n.map(x=>-x*1.15),cx,cy,r),q=P(n.map(x=>x*1.15),cx,cy,r);c.strokeStyle=C.gold;c.lineWidth=3;c.beginPath();c.moveTo(p[0],p[1]);c.lineTo(q[0],q[1]);c.stroke()}
 [['|0⟩',[0,0,1.2]],['|1⟩',[0,0,-1.2]],['+',[1.25,0,0]],['−',[-1.25,0,0]],['+i',[0,1.25,0]],['−i',[0,-1.25,0]]].forEach(l=>{const q=P(l[1],cx,cy,r);txt(c,l[0],q[0],q[1],C.mu,fs,600)});
 if(o.trail&&o.trail.length>1){c.strokeStyle=C.gold;c.lineWidth=2;c.setLineDash([5,4]);c.beginPath();o.trail.forEach((t,i)=>{const q=P(t,cx,cy,r);i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1])});c.stroke();c.setLineDash([])}
 const o0=P([0,0,0],cx,cy,r),tp=P(v,cx,cy,r);c.strokeStyle=C.ac;c.fillStyle=C.ac;c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(o0[0],o0[1]);c.lineTo(tp[0],tp[1]);c.stroke();c.beginPath();c.arc(tp[0],tp[1],Math.max(5,r*.06),0,2*PI);c.fill()}
// ---------- gate lab
const ST={'0':[R(1),R(0)],'1':[R(0),R(1)],'+':[R(s2),R(s2)],'+i':[R(s2),I(s2)]},NM={X:'X',Y:'Y',Z:'Z',H:'H',S:'S',Sd:'S†',T:'T',Td:'T†',Rx:'Rx',Ry:'Ry',Rz:'Rz'};
let st=ST['0'],hist=[],anim=null;
const r2=x=>Math.abs(x)<.005?0:Math.round(x*100)/100;
function fc(z){const a=r2(z[0]),b=r2(z[1]);if(!b)return{s:''+Math.abs(a),neg:a<0,zero:!a,simple:true};if(!a)return{s:(Math.abs(b)===1?'':Math.abs(b))+'i',neg:b<0,simple:true};return{s:'('+a+(b<0?' − ':' + ')+Math.abs(b)+'i)',neg:false}}
function term(z,k,first){const f=fc(z);if(f.zero)return'';const one=f.simple&&f.s==='1';return(f.neg?(first?'−':' − '):(first?'':' + '))+(one?'':f.s)+'|'+k+'⟩'}
function showLab(){const t0=term(st[0],0,true),t1=term(st[1],1,!t0);g('labE').textContent='|ψ⟩ = '+(t0+t1);
 const b=bloch(st),pts=[[[0,0,1],'|0⟩'],[[0,0,-1],'|1⟩'],[[1,0,0],'|+⟩'],[[-1,0,0],'|−⟩'],[[0,1,0],'|+i⟩'],[[0,-1,0],'|−i⟩']],m=pts.find(([q])=>Math.hypot(q[0]-b[0],q[1]-b[1],q[2]-b[2])<.02);
 g('labN').textContent=(m?'On the Bloch sphere this is the point '+m[1]+'. ':'')+'(A number such as i or −1 in front of the whole state is a global phase, which can never be measured.)';
 const p0=Math.round((st[0][0]**2+st[0][1]**2)*100),p1=100-p0;g('lab0').style.width=Math.max(p0,12)+'%';g('lab0').textContent='P(0) = '+p0+'%';g('lab1').style.width=Math.max(p1,12)+'%';g('lab1').textContent='P(1) = '+p1+'%';
 g('labH').textContent='Gates applied: '+(hist.length?hist.join(' → '):'none')}
const th=()=>g('labT').value*PI/180;g('labT').addEventListener('input',()=>g('labTv').textContent=g('labT').value+'°');g('labTv').textContent=g('labT').value+'°';
document.querySelectorAll('#lab [data-g]').forEach(b=>b.onclick=()=>{const k=b.dataset.g,t=th(),[n,a]=rot(k,t);anim={v0:bloch(st),n,a,t0:performance.now()};st=apply(mat(k,t),st);hist.push(NM[k]+(k[0]==='R'?'('+g('labT').value+'°)':''));showLab()});
document.querySelectorAll('#lab [data-s]').forEach(b=>b.onclick=()=>{st=ST[b.dataset.s];hist=[];anim=null;showLab()});
showLab();
function drawLab(now,C){const {c,W,H}=prep(g('labC')),r=Math.min(H*.38,W*.4),cx=W/2,cy=H/2+4;let v=bloch(st),o={};
 if(anim){const u=reduce?1:Math.min(1,(now-anim.t0)/1100),e=ease(u);v=rodr(anim.v0,anim.n,anim.a*e);o.axis=anim.n;o.trail=[];for(let i=0;i<=24;i++)o.trail.push(rodr(anim.v0,anim.n,anim.a*e*i/24));if(u>=1&&now-anim.t0>2600)anim=null}
 sphere(c,cx,cy,r,v,C,o)}
// ---------- mini animations
const MINI={'X|0':['X',[0,0,1]],'Z|+':['Z',[1,0,0]],'Y|0':['Y',[0,0,1]],'H|0':['H',[0,0,1]],'S|+':['S',[1,0,0]],'Rx|0':['Rx',[0,0,1]]};
const minis=[...document.querySelectorAll('canvas[data-mini]')];
function drawMini(cv,T,C){const [k,v0]=MINI[cv.dataset.mini],[n,a]=rot(k,PI/2),{c,W,H}=prep(cv),r=Math.min(H*.36,W*.36),k2=reduce?3.5:T%4.2,u=k2<.8?0:k2<2.6?ease((k2-.8)/1.8):1,v=rodr(v0,n,a*u),tr=[];
 for(let i=0;i<=24;i++)tr.push(rodr(v0,n,a*u*i/24));sphere(c,W/2,H/2+6,r,v,C,{axis:n,trail:tr});c.textAlign='left';c.font='700 15px system-ui,sans-serif';c.fillStyle=C.gold;c.fillText(k==='Rx'?'Rx(90°)':k,10,16)}
// ---------- CNOT truth table
let ci=0,ti=0;function cx(){g('cxC').textContent=ci;g('cxT').textContent=ti;g('cxCo').textContent=ci;g('cxTo').textContent=ti^ci;g('cxM').textContent=ci?'The control is 1, so the target is flipped.':'The control is 0, so the target is left alone.'}
g('cxC').onclick=()=>{ci^=1;cx()};g('cxT').onclick=()=>{ti^=1;cx()};cx();
// ---------- Bell builder
const BS=[{x:60,t:'<b>Start.</b> Both qubits are 0, so the pair is |00⟩ for certain.',e:'|ψ⟩ = |00⟩',a:[1,0,0,0]},
 {x:150,t:'<b>After H on A.</b> A becomes a 50/50 mix and B is still 0, so the pair is half |00⟩ and half |10⟩. Each qubit can still be described on its own.',e:'|ψ⟩ = 0.71|00⟩ + 0.71|10⟩',a:[s2,0,s2,0]},
 {x:240,t:'<b>After CNOT.</b> In the |10⟩ half the control A is 1, so B flips and that half becomes |11⟩. The |00⟩ half is unchanged. Now the qubits are always both 0 or both 1: they are entangled.',e:'|ψ⟩ = 0.71|00⟩ + 0.71|11⟩',a:[s2,0,0,s2]}];
const LB=['00','01','10','11'];g('bBars').innerHTML=LB.map(l=>'<div class="lbl">|'+l+'⟩ <span id="bL'+l+'"></span></div><div class="bar"><i id="bI'+l+'"></i></div>').join('');
let bs=0;function bell(){const s=BS[bs];g('bLine').setAttribute('transform','translate('+(s.x-60)+',0)');g('bTxt').innerHTML=s.t;g('bE').textContent=s.e;
 LB.forEach((l,i)=>{const p=Math.round(s.a[i]**2*100);g('bL'+l).textContent='chance '+p+'%';g('bI'+l).style.width=Math.max(p,1)+'%'});g('bNext').textContent=bs<2?'Next step':'Start again';g('bBack').disabled=!bs}
g('bNext').onclick=()=>{bs=bs<2?bs+1:0;bell()};g('bBack').onclick=()=>{if(bs)bs--;bell()};bell();
// ---------- loop
let T=0,last=performance.now();
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(g('p-part5').classList.contains('on')){T+=dt;const C=col();drawLab(now,C);minis.forEach(cv=>drawMini(cv,T,C))}requestAnimationFrame(frame)}
requestAnimationFrame(frame)})();
