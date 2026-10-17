(()=>{
const $=id=>document.getElementById(id),cv=$('cv'),ctx=cv.getContext('2d'),view=$('view');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const css=n=>getComputedStyle($('qapp')).getPropertyValue(n).trim();
let W=0,H=0,C={},idx=0,T=0,paused=reduce,S={},last=performance.now();
const ease=u=>u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),D=Math.PI/180;
function resize(){const r=view.getBoundingClientRect(),d=devicePixelRatio||1;W=r.width;H=r.height;cv.width=Math.max(1,W*d);cv.height=Math.max(1,H*d);ctx.setTransform(d,0,0,d,0,0)}
if(window.ResizeObserver)new ResizeObserver(resize).observe(view);addEventListener('resize',resize);resize();
const fs=()=>clamp(Math.min(W/38,H/20),12,19),nar=()=>W<H*1.15;
function txt(t,x,y,col,size,al,wt){ctx.fillStyle=col;ctx.font=(wt||600)+' '+(size||fs())+'px system-ui,sans-serif';ctx.textAlign=al||'center';ctx.textBaseline='middle';ctx.fillText(t,x,y)}
function wrap(t,x,y,mw,lh,col,size,al){ctx.font='500 '+(size||fs())+'px system-ui,sans-serif';ctx.fillStyle=col;ctx.textAlign=al||'left';ctx.textBaseline='middle';let line='',yy=y;
 t.split(' ').forEach(w=>{const test=line?line+' '+w:w;if(ctx.measureText(test).width>mw&&line){ctx.fillText(line,x,yy);line=w;yy+=lh}else line=test});ctx.fillText(line,x,yy);return yy}
function layout(){return nar()?{sx:W/2,sy:H*.3,sr:Math.min(H*.24,W*.3),px:W*.08,py:H*.66,pw:W*.84}:{sx:W*.3,sy:H*.5,sr:Math.min(H*.37,W*.22),px:W*.58,py:H*.28,pw:W*.37}}
// ---------- drawing helpers
const yaw=-0.6,pitch=0.35;
function P(p,cx,cy,r){const[x,y,z]=p,cY=Math.cos(yaw),sY=Math.sin(yaw),cP=Math.cos(pitch),sP=Math.sin(pitch);
 const x1=x*cY-y*sY,y1=x*sY+y*cY,y2=y1*cP-z*sP,z2=y1*sP+z*cP;return[cx+x1*r,cy-z2*r,y2]}
function ring(f,cx,cy,r,w){ctx.lineWidth=w;let pr=null;for(let i=0;i<=80;i++){const t=i/80*6.2832,q=P(f(t),cx,cy,r);if(pr){ctx.globalAlpha=q[2]<0?.85:.25;ctx.beginPath();ctx.moveTo(pr[0],pr[1]);ctx.lineTo(q[0],q[1]);ctx.stroke()}pr=q}ctx.globalAlpha=1}
function arc3(f,a,b,col,cx,cy,r){ctx.strokeStyle=col;ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();for(let i=0;i<=40;i++){const q=P(f(a+(b-a)*i/40),cx,cy,r);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])}ctx.stroke()}
function sphere(cx,cy,r,v,flash,o){o=o||{};
 ctx.strokeStyle=C.line;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();
 ring(t=>[Math.cos(t),Math.sin(t),0],cx,cy,r,1.5);ring(t=>[Math.cos(t),0,Math.sin(t)],cx,cy,r,1);ring(t=>[0,Math.cos(t),Math.sin(t)],cx,cy,r,1);
 if(o.axes){[[1,0,0],[0,1,0],[0,0,1]].forEach((a,i)=>{const p=P(a.map(x=>-x*1.05),cx,cy,r),q=P(a.map(x=>x*1.05),cx,cy,r),hi=o.hi===i;
  ctx.strokeStyle=hi?C.vec:C.mute;ctx.lineWidth=hi?3.5:1;ctx.globalAlpha=hi?1:.5;ctx.setLineDash(hi?[]:[4,4]);ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke()});ctx.setLineDash([]);ctx.globalAlpha=1}
 const a=P([0,0,1.18],cx,cy,r),b=P([0,0,-1.18],cx,cy,r);
 txt('0',a[0],a[1],C.c0,fs()*1.3,'center',700);txt('1',b[0],b[1],C.c1,fs()*1.3,'center',700);
 if(o.xy)[['+',[1.22,0,0]],['−',[-1.22,0,0]],['+i',[0,1.25,0]],['−i',[0,-1.25,0]]].forEach(l=>{const q=P(l[1],cx,cy,r);txt(l[0],q[0],q[1],C.mute,fs()*.95)});
 if(o.arcs){const th=o.arcs.th,ph=o.arcs.ph;
  if(!o.arcs.onlyPh){arc3(t=>[Math.sin(t)*Math.cos(ph),Math.sin(t)*Math.sin(ph),Math.cos(t)],0,th,C.c0,cx,cy,r);const m=P([1.16*Math.sin(th/2)*Math.cos(ph),1.16*Math.sin(th/2)*Math.sin(ph),1.16*Math.cos(th/2)],cx,cy,r);txt('↓',m[0],m[1],C.c0,fs()*1.3,'center',700)}
  arc3(t=>[Math.cos(t),Math.sin(t),0],0,ph,C.c1,cx,cy,r);const m2=P([1.2*Math.cos(ph/2),1.2*Math.sin(ph/2),0],cx,cy,r);txt('↻',m2[0],m2[1],C.c1,fs()*1.3,'center',700)}
 const o0=P([0,0,0],cx,cy,r),tp=P(v,cx,cy,r),mix=1-Math.abs(v[2]);
 if(mix>.03){const g=ctx.createRadialGradient(tp[0],tp[1],0,tp[0],tp[1],r*.4);g.addColorStop(0,C.vec);g.addColorStop(1,'transparent');ctx.globalAlpha=.55*mix;ctx.fillStyle=g;ctx.beginPath();ctx.arc(tp[0],tp[1],r*.4,0,7);ctx.fill();ctx.globalAlpha=1}
 ctx.strokeStyle=C.vec;ctx.fillStyle=C.vec;ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(o0[0],o0[1]);ctx.lineTo(tp[0],tp[1]);ctx.stroke();
 ctx.beginPath();ctx.arc(tp[0],tp[1],r*.07*(1+(flash||0)),0,7);ctx.fill();ctx.beginPath();ctx.arc(o0[0],o0[1],3,0,7);ctx.fill();
 if(o.labelA)txt(o.labelA,o0[0]+(tp[0]-o0[0])*1.22,o0[1]+(tp[1]-o0[1])*1.22,C.vec,fs()*1.2,'center',800);
 if(o.extra)o.extra.forEach(e=>{const q=P(e.v,cx,cy,r);ctx.strokeStyle=C.ink;ctx.fillStyle=C.ink;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(o0[0],o0[1]);ctx.lineTo(q[0],q[1]);ctx.stroke();ctx.beginPath();ctx.arc(q[0],q[1],r*.07,0,7);ctx.fill();
  txt(e.l,o0[0]+(q[0]-o0[0])*1.22,o0[1]+(q[1]-o0[1])*1.22,C.ink,fs()*1.2,'center',800)})}
function bars(x,y,w,p,title,l0,l1){
 if(title)txt(title,x,y-fs()*1.3,C.mute,fs()*.9,'left',500);
 [[l0||'Gets 0',p,C.c0],[l1||'Gets 1',1-p,C.c1]].forEach((row,i)=>{const yy=y+i*fs()*2.1,lw=fs()*4.6;
  txt(row[0],x,yy,C.ink,fs(),'left');const bx=x+lw,bw=Math.max(20,w-lw-fs()*3);
  ctx.fillStyle=C.btn;ctx.beginPath();ctx.roundRect(bx,yy-fs()*.55,bw,fs()*1.1,fs()*.55);ctx.fill();
  ctx.fillStyle=row[2];ctx.beginPath();ctx.roundRect(bx,yy-fs()*.55,Math.max(fs()*1.1,bw*row[1]),fs()*1.1,fs()*.55);ctx.fill();
  txt(Math.round(row[1]*100)+'%',x+w,yy,C.ink,fs(),'right')})}
function coin(cx,cy,R,a,label,tint){
 const c=Math.cos(a),face=c>=0?0:1,rx=Math.max(R*.06,Math.abs(c)*R);
 ctx.fillStyle=tint||(face?C.c1:C.c0);ctx.beginPath();ctx.ellipse(cx,cy,rx,R,0,0,7);ctx.fill();
 ctx.strokeStyle=C.ink;ctx.globalAlpha=.25;ctx.lineWidth=2;ctx.stroke();ctx.globalAlpha=1;
 if(rx>R*.35){ctx.save();ctx.translate(cx,cy);ctx.scale(Math.abs(c),1);txt(label!==undefined?label:face,0,0,'#fff',R*.9,'center',700);ctx.restore()}}
// ---------- the five steps
const scenes=[
{t:'1. A bit vs. a qubit',x:'A normal bit is a light switch: it is either 0 or 1. A qubit is more like a spinning coin: while it spins, it is partly 0 and partly 1. When you look at it (measure it), it stops and shows just 0 or 1. Press “Look at the coin” to try.',act:'Look at the coin',
 init(){S={mode:'spin',a:0,out:0,t0:0,a0:0,tgt:0}},
 draw(T,dt){const n=nar(),c1=n?{x:W/2,y:H*.27}:{x:W*.26,y:H*.46},c2=n?{x:W/2,y:H*.73}:{x:W*.74,y:H*.46};
  if(!n){ctx.strokeStyle=C.line;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(W/2,H*.12);ctx.lineTo(W/2,H*.88);ctx.stroke()}else{ctx.strokeStyle=C.line;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(W*.1,H/2);ctx.lineTo(W*.9,H/2);ctx.stroke()}
  // bit
  const w=Math.min(W*(n?.5:.3),190),h=w*.3,k=T%3.2,pos=k<1.6?(k<.3?ease(k/.3):1):(k<1.9?1-ease((k-1.6)/.3):0),on=pos>.5;
  txt('A normal bit',c1.x,c1.y-h*1.7,C.mute,fs()*1.1,'center',600);
  ctx.fillStyle=C.btn;ctx.strokeStyle=C.line;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(c1.x-w/2,c1.y-h/2,w,h,h/2);ctx.fill();ctx.stroke();
  ctx.fillStyle=on?C.c1:C.c0;ctx.beginPath();ctx.arc(c1.x-w/2+h/2+(w-h)*pos,c1.y,h*.42,0,7);ctx.fill();
  txt('0',c1.x-w/2-fs()*1.1,c1.y,C.c0,fs()*1.6,'center',700);txt('1',c1.x+w/2+fs()*1.1,c1.y,C.c1,fs()*1.6,'center',700);
  txt('Always one or the other',c1.x,c1.y+h*1.6,C.ink,fs());
  // coin
  const R=Math.min(W,H)*(n?.12:.19);txt('A qubit',c2.x,c2.y-R*1.55,C.mute,fs()*1.1,'center',600);
  if(S.mode==='spin'){S.a+=dt*11;coin(c2.x,c2.y,R,S.a,'?',C.vec);txt('Both 0 and 1 until you look',c2.x,c2.y+R*1.5,C.ink,fs())}
  else{const u=clamp((T-S.t0)/.9,0,1),a=S.a0+(S.tgt-S.a0)*ease(u);coin(c2.x,c2.y,R,a,undefined);
   if(u>=1){txt('You looked: it is '+S.out,c2.x,c2.y+R*1.5,S.out?C.c1:C.c0,fs()*1.1);if(T-S.t0>2.6){S.mode='spin';S.a=S.tgt}}}},
 go(T){if(S.mode!=='spin')return;S.out=Math.random()<.5?0:1;S.a0=S.a;S.tgt=Math.ceil(S.a/6.2832)*6.2832+12.566+(S.out?Math.PI:0);S.mode='land';S.t0=T}},
{t:'2. Drawing a qubit as an arrow',x:'We picture a qubit as an arrow inside a ball, called the Bloch sphere. Arrow straight up: you will surely read 0. Straight down: surely 1. In between: a mix, and the closer to the top, the likelier a 0. Watch the bars change as the arrow moves.',
 draw(T){const L=layout(),th=Math.PI/2+Math.PI/2*Math.sin(T*.8),v=[Math.sin(th),0,Math.cos(th)];
  sphere(L.sx,L.sy,L.sr,v);bars(L.px,L.py,L.pw,(1+v[2])/2,'Chance of each answer if you look now')}},
{t:'3. Two angles describe any qubit',x:'Like a place on a globe, the arrow is fixed by two angles. The tilt (how far down from the top) sets the odds of 0 or 1. The turn (how far around) is called the phase: it does not change the odds, but it matters later (step 6). Changing a qubit just means moving the arrow.',
 draw(T){const L=layout(),k=T%9.5;let th,ph;
  if(k<3){th=1.1*ease(k/3);ph=.8}else if(k<6.5){th=1.1;ph=.8+3.4*ease((k-3)/3.5)}else if(k<8.5){th=1.1;ph=4.2}else{const u=ease(k-8.5);th=1.1*(1-u);ph=4.2}
  const v=[Math.sin(th)*Math.cos(ph),Math.sin(th)*Math.sin(ph),Math.cos(th)];
  sphere(L.sx,L.sy,L.sr,v,0,{arcs:{th,ph}});
  const y=L.py,g=fs()*(nar()?4.3:5);
  txt('↓ Tilt: '+Math.round(th/D)+'°',L.px,y,C.c0,fs()*1.1,'left',700);wrap('Sets the odds of reading 0 or 1.',L.px,y+fs()*1.5,L.pw,fs()*1.3,C.ink,fs()*.95);
  txt('↻ Turn: '+Math.round(((ph/D)%360+360)%360)+'°',L.px,y+g,C.c1,fs()*1.1,'left',700);wrap('The phase. It does not change the odds (see step 6).',L.px,y+g+fs()*1.5,L.pw,fs()*1.3,C.ink,fs()*.95)}},
{t:'4. The three axes',x:'Three lines run through the ball. Up–down (z) is the one you read: top gives 0, bottom gives 1. The ends of left–right (x) and front–back (y) all sit on the middle line, so reading them gives 50/50. They look the same when read, but differ in phase.',
 draw(T){const L=layout(),pts=[[0,0,1,'0',2],[1,0,0,'+',0],[0,1,0,'+i',1],[0,0,-1,'1',2],[-1,0,0,'−',0],[0,-1,0,'−i',1]],dur=2.6,n=Math.floor(T/dur),i=n%6,pv=pts[(i+5)%6],c=pts[i],k=T%dur,u=n===0&&k<.1?1:ease(clamp(k/.8,0,1));
  let v=[0,1,2].map(j=>pv[j]+(c[j]-pv[j])*u);const m=Math.hypot(...v)||1;v=v.map(x=>x/m);
  sphere(L.sx,L.sy,L.sr,v,0,{axes:true,hi:c[4],xy:true});
  const nm=['Left–right axis (x)','Front–back axis (y)','Up–down axis (z)'],d=['On the middle line, so 50/50. The 0 and 1 parts are in step (+) or opposite (−).','Also on the middle line, so 50/50. The 0 and 1 parts are a quarter-turn apart (+i or −i).','The axis you read: the top is a sure 0, the bottom a sure 1.'];
  txt(nm[c[4]],L.px,L.py-fs()*(nar()?2.6:2.8),C.vec,fs()*1.15,'left',700);
  bars(L.px,L.py,L.pw,(1+v[2])/2,'Chance of each answer if you look');
  wrap(d[c[4]],L.px,L.py+fs()*(nar()?4.4:4.8),L.pw,fs()*1.35,C.ink,fs()*.95)}},
{t:'5. Why we need all three axes',x:'Each axis is a question you can ask a qubit. Here arrows A and B point opposite ways, yet asking “0 or 1?” gives both 50/50, so that question can’t tell them apart. Asking along their own axis can. To know an arrow fully, you need answers on all three axes.',
 draw(T){const X=[[1,0,0],[-1,0,0]],Y=[[0,1,0],[0,-1,0]],PH=[{pair:X,q:2},{pair:X,q:0},{pair:Y,q:0},{pair:Y,q:1}],per=4.5,k=T%(per*4),i=Math.floor(k/per),kk=k%per,ph=PH[i],prev=PH[(i+3)%4];
  const u=(prev.pair!==ph.pair&&T>=per)?ease(clamp(kk/.8,0,1)):1,mix=(f,g)=>{let v=[0,1,2].map(j=>f[j]+(g[j]-f[j])*u);const m=Math.hypot(...v)||1;return v.map(x=>x/m)};
  const a=mix(prev.pair[0],ph.pair[0]),b=mix(prev.pair[1],ph.pair[1]),q=ph.q,pa=(1+a[q])/2,pb=(1+b[q])/2,LB=[['Gets +','Gets −'],['Gets +i','Gets −i'],['Gets 0','Gets 1']][q],qn=['left–right (x)','front–back (y)','up–down (z)'][q];
  const same=Math.abs(pa-pb)<.02,verdict=same?'Both give 50 / 50. This question can’t tell A and B apart.':'Different answers: A is sure of one, B is sure of the other. This question tells them apart.',n=nar(),f=fs();
  if(n){sphere(W/2,H*.2,Math.min(H*.15,W*.2),a,0,{axes:true,hi:q,xy:true,labelA:'A',extra:[{v:b,l:'B'}]});
   txt('Asking along '+qn,W*.06,H*.43,C.vec,f*1.1,'left',700);bars(W*.06,H*.58,W*.42,pa,'Qubit A',LB[0],LB[1]);bars(W*.52,H*.58,W*.42,pb,'Qubit B',LB[0],LB[1]);
   wrap(verdict,W*.06,H*.58+f*4.6,W*.88,f*1.3,same?C.mute:C.ink,f*.95)}
  else{const L=layout();sphere(L.sx,L.sy,L.sr,a,0,{axes:true,hi:q,xy:true,labelA:'A',extra:[{v:b,l:'B'}]});
   txt('Asking along '+qn,L.px,L.py-f*2.8,C.vec,f*1.1,'left',700);bars(L.px,L.py,L.pw,pa,'Qubit A',LB[0],LB[1]);bars(L.px,L.py+f*6,L.pw,pb,'Qubit B',LB[0],LB[1]);
   wrap(verdict,L.px,L.py+f*11,L.pw,f*1.35,same?C.mute:C.ink,f*.95)}}},
{t:'6. What is phase?',x:'Think of the 0 part and the 1 part as two waves. Phase is how far out of step they are, shown by how far around the arrow points. Phase alone never changes the 50/50 odds. But when parts combine, in-step waves add up and opposite waves cancel. Quantum computers use this to make right answers stronger.',
 draw(T){const ph=(T*.7)%6.2832,v=[Math.cos(ph),Math.sin(ph),0],n=nar(),cs=Math.cos(ph);
  let sx,sy,sr,wx,wy,ww,wh,tx,ty,tw;
  if(n){sx=W/2;sy=H*.2;sr=Math.min(H*.15,W*.22);wx=W*.08;ww=W*.84;wy=H*.56;wh=H*.26;tx=W*.08;ty=H*.78;tw=W*.84}
  else{const L=layout();sx=L.sx;sy=L.sy;sr=L.sr;wx=L.px;ww=L.pw;wy=H*.3;wh=H*.3;tx=L.px;ty=H*.72;tw=L.pw}
  sphere(sx,sy,sr,v,0,{arcs:{th:Math.PI/2,ph,onlyPh:true}});
  const A=wh*.2,K=6.2832*2/ww,t=T*3;
  let lx=wx;[['0 part',C.c0],['1 part',C.c1],['Both together (thick)',C.vec]].forEach(l=>{txt(l[0],lx,wy-wh*.62,l[1],fs()*.9,'left',600);lx+=ctx.measureText(l[0]).width+fs()});
  const line=(f,col,w,al)=>{ctx.strokeStyle=col;ctx.lineWidth=w;ctx.globalAlpha=al;ctx.beginPath();for(let i=0;i<=80;i++){const x=wx+ww*i/80,y=wy-f(i/80*ww);i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke();ctx.globalAlpha=1};
  line(x=>A*Math.sin(K*x-t),C.c0,2,.9);line(x=>A*Math.sin(K*x-t+ph),C.c1,2,.9);line(x=>A*(Math.sin(K*x-t)+Math.sin(K*x-t+ph)),C.vec,4,1);
  const state=cs>.6?'In step: they add up':cs<-.6?'Opposite: they cancel out':'Partly out of step: they partly cancel';
  txt(Math.round(ph/D)+'° out of step',tx,ty,C.vec,fs()*1.05,'left',700);
  const ly=wrap(state,tx,ty+fs()*1.5,tw,fs()*1.3,C.ink,fs()*.95);
  wrap('Chance of 0 or 1 when you look: always 50 / 50',tx,ly+fs()*1.6,tw,fs()*1.3,C.mute,fs()*.9)}}
];
function show(i){idx=(i+scenes.length)%scenes.length;T=0;S={};const s=scenes[idx];if(s.init)s.init();
 $('ttl').textContent=s.t;$('txt').textContent=s.x;$('cnt').textContent=(idx+1)+' of '+scenes.length;const a=$('act');a.hidden=!s.act;if(s.act)a.textContent=s.act;
 [...$('dots').children].forEach((b,j)=>b.setAttribute('aria-current',j===idx))}
scenes.forEach((s,i)=>{const b=document.createElement('button');b.textContent=i+1;b.setAttribute('aria-label','Step '+(i+1)+': '+s.t);b.onclick=()=>show(i);$('dots').appendChild(b)});
$('back').onclick=()=>show(idx-1);$('next').onclick=()=>show(idx+1);
$('act').onclick=()=>{const s=scenes[idx];if(s.go)s.go(T)};
$('play').onclick=()=>{paused=!paused;$('play').textContent=paused?'Play':'Pause'};
$('play').textContent=paused?'Play':'Pause';
addEventListener('keydown',e=>{if(!document.getElementById('p-part2').classList.contains('on'))return;if(e.key==='ArrowRight')show(idx+1);if(e.key==='ArrowLeft')show(idx-1)});
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;
 C={ink:css('--ink'),mute:css('--mute'),line:css('--line'),c0:css('--c0'),c1:css('--c1'),vec:css('--vec'),btn:css('--btn')};
 const d=paused?0:dt;T+=d;ctx.clearRect(0,0,W,H);if(W>80&&H>80)scenes[idx].draw(T,d);requestAnimationFrame(frame)}
show(0);if(reduce)T=0.4;requestAnimationFrame(frame);
})();
(()=>{const g=id=>document.getElementById(id),t=g('bt'),p=g('bp');
function u(){const th=t.value*Math.PI/180,ph=p.value*Math.PI/180,a=Math.cos(th/2),b=Math.sin(th/2),x=Math.sin(th)*Math.cos(ph),y=Math.sin(th)*Math.sin(ph),z=Math.cos(th),p0=a*a*100,p1=b*b*100;
g('tv').textContent=t.value+'°';g('pv').textContent=p.value+'°';
g('bo').innerHTML='<b>Position</b><span>x = '+x.toFixed(2)+', y = '+y.toFixed(2)+', z = '+z.toFixed(2)+'</span><b>Amplitudes</b><span>0 part = '+a.toFixed(3)+', 1 part = '+b.toFixed(3)+' turned '+p.value+'°</span><b>Reading</b><span>'+(t.value==0?'North pole: sure 0':t.value==180?'South pole: sure 1':t.value==90?'On the equator: a 50/50 blend':'Between the poles: a blend')+'</span>';
const q0=g('q0'),q1=g('q1');q0.style.width=Math.max(p0,12)+'%';q0.textContent='P(0) = '+p0.toFixed(1)+'%';q1.style.width=Math.max(p1,12)+'%';q1.textContent='P(1) = '+p1.toFixed(1)+'%'}
t.addEventListener('input',u);p.addEventListener('input',u);u()})();
(()=>{
const g=id=>document.getElementById(id),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,TAU=Math.PI*2;
const box=document.querySelector('.wv');
function col(){const cs=getComputedStyle(box),v=n=>cs.getPropertyValue(n).trim();return{p0:v('--p0'),p1:v('--p1'),sum:v('--sum'),tx:v('--tx'),mu:v('--mu'),bd:v('--bd')}}
function prep(cv){const r=cv.getBoundingClientRect(),d=devicePixelRatio||1;if(cv.width!==Math.round(r.width*d)||cv.height!==Math.round(r.height*d)){cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d)}
 const c=cv.getContext('2d');c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,r.width,r.height);return{c,W:r.width,H:r.height}}
function label(c,t,x,y,color,wt,size,al){c.fillStyle=color;c.font=(wt||600)+' '+(size||13)+'px system-ui,sans-serif';c.textAlign=al||'left';c.textBaseline='middle';c.fillText(t,x,y)}
function wave(c,x0,x1,y0,amp,k,ph,color,w){c.strokeStyle=color;c.lineWidth=w||2.5;c.beginPath();for(let i=0;i<=120;i++){const x=x0+(x1-x0)*i/120,y=y0-amp*Math.sin(ph-k*(x-x0));i?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}
function arrow(c,x0,y0,x1,y1,color,w){c.strokeStyle=color;c.fillStyle=color;c.lineWidth=w||3;c.lineCap='round';c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();c.beginPath();c.arc(x1,y1,4.5,0,TAU);c.fill()}
const deg=a=>Math.round(((a/TAU*360)%360+360)%360);

// Step 2: amplitudes of the 0 and 1 parts
function drawA(t,C){const {c,W,H}=prep(g('cA')),th=g('wA').value*Math.PI/180,a=Math.cos(th/2),b=Math.sin(th/2),lw=Math.min(130,W*.3),x0=lw,x1=W-10,k=TAU*2/(x1-x0),A=H*.2;
 [[a,C.p0,'0 part',H*.27],[b,C.p1,'1 part',H*.73]].forEach(([amp,cl,nm,y])=>{c.strokeStyle=C.bd;c.lineWidth=1;c.beginPath();c.moveTo(x0,y);c.lineTo(x1,y);c.stroke();
  wave(c,x0,x1,y,A*amp,k,t*2,cl,3);label(c,nm,8,y-9,cl,700,14);label(c,'amplitude '+amp.toFixed(2),8,y+10,C.mu,500,12)});
 const p0=a*a*100,p1=b*b*100,q0=g('wA0'),q1=g('wA1');q0.style.width=Math.max(p0,1)+'%';g('wA0t').textContent='Chance of 0 = '+a.toFixed(2)+' × '+a.toFixed(2)+' = '+p0.toFixed(0)+'%';
 q1.style.width=Math.max(p1,1)+'%';g('wA1t').textContent='Chance of 1 = '+b.toFixed(2)+' × '+b.toFixed(2)+' = '+p1.toFixed(0)+'%'}

// Step 3: spinning hand draws a wave
function drawB(t,C){const {c,W,H}=prep(g('cB')),amp=g('wB').value/100,R=Math.min(H*.36,W*.17),cx=R+14,cy=H*.55,x0=cx+R+24,x1=W-10,k=TAU/Math.max(120,(x1-x0)/1.6),ph=t*1.6,r=R*amp;
 c.strokeStyle=C.bd;c.lineWidth=1.5;c.beginPath();c.arc(cx,cy,R,0,TAU);c.stroke();c.beginPath();c.moveTo(cx-R,cy);c.lineTo(x1,cy);c.stroke();
 const tx=cx+r*Math.cos(ph),ty=cy-r*Math.sin(ph);
 c.strokeStyle=C.sum;c.lineWidth=2;c.beginPath();c.arc(cx,cy,Math.min(18,r*.5),0,-((ph%TAU)),true);c.stroke();
 wave(c,x0,x1,cy,r,k,ph,C.p0,3);
 c.setLineDash([4,4]);c.strokeStyle=C.mu;c.lineWidth=1;c.beginPath();c.moveTo(tx,ty);c.lineTo(x0,ty);c.stroke();c.setLineDash([]);
 arrow(c,cx,cy,tx,ty,C.p0,3.5);c.fillStyle=C.p0;c.beginPath();c.arc(x0,ty,4.5,0,TAU);c.fill();
 label(c,'Phase: '+deg(ph)+'°',8,12,C.sum,700,13);label(c,'Amplitude: '+amp.toFixed(2),8,30,C.p0,700,13);
 label(c,'the wave it draws →',x0+6,H-12,C.mu,500,12)}

// Step 4: two hands with a fixed gap
function drawC(t,C){const {c,W,H}=prep(g('cC')),gap=g('wC').value*Math.PI/180,R=Math.min(H*.36,W*.17),cx=R+14,cy=H*.55,x0=cx+R+24,x1=W-10,k=TAU/Math.max(120,(x1-x0)/1.6),ph=t*1.2,r=R*.85,A=Math.min(r,H*.3);
 c.strokeStyle=C.bd;c.lineWidth=1.5;c.beginPath();c.arc(cx,cy,R,0,TAU);c.stroke();c.beginPath();c.moveTo(x0,cy);c.lineTo(x1,cy);c.stroke();
 c.strokeStyle=C.sum;c.lineWidth=3;c.beginPath();c.arc(cx,cy,r*.45,-ph,-(ph+gap),true);c.stroke();
 arrow(c,cx,cy,cx+r*Math.cos(ph),cy-r*Math.sin(ph),C.p0,3.5);arrow(c,cx,cy,cx+r*Math.cos(ph+gap),cy-r*Math.sin(ph+gap),C.p1,3.5);
 wave(c,x0,x1,cy,A,k,ph,C.p0,2.5);wave(c,x0,x1,cy,A,k,ph+gap,C.p1,2.5);
 label(c,'0 part',8,12,C.p0,700,13);label(c,'1 part',58,12,C.p1,700,13);
 label(c,'Gap: '+g('wC').value+'° (never changes)',x0,12,C.sum,700,13)}

// Step 5: interference
function drawD(t,C){const {c,W,H}=prep(g('cD')),gap=g('wD').value*Math.PI/180,x0=10,x1=W-10,k=TAU*2/(x1-x0),A=H*.2,y=H*.55,ph=t*2,s=Math.abs(Math.cos(gap/2));
 c.strokeStyle=C.bd;c.lineWidth=1;c.beginPath();c.moveTo(x0,y);c.lineTo(x1,y);c.stroke();
 wave(c,x0,x1,y,A*.5,k,ph,C.p0,2);wave(c,x0,x1,y,A*.5,k,ph+gap,C.p1,2);
 c.strokeStyle=C.sum;c.lineWidth=4.5;c.beginPath();for(let i=0;i<=120;i++){const x=x0+(x1-x0)*i/120,v=.5*Math.sin(ph-k*(x-x0))+.5*Math.sin(ph+gap-k*(x-x0)),yy=y-A*v;i?c.lineTo(x,yy):c.moveTo(x,yy)}c.stroke();
 const cs=Math.cos(gap),st=cs>.9?'In step: they add up':cs<-.9?'Opposite: they cancel out':'Partly cancel';
 label(c,'0 part',8,12,C.p0,700,13);label(c,'1 part',58,12,C.p1,700,13);label(c,'Combined',108,12,C.sum,700,13);
 label(c,'Gap '+g('wD').value+'°: '+st,8,H-12,C.tx,700,13);
 const p=s*s*100,q=g('wD0');q.style.width=Math.max(p,1)+'%';g('wD0t').textContent='Combined height '+s.toFixed(2)+', chance of this answer = '+p.toFixed(0)+'%'}

let T=0,last=performance.now();
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;
 if(g('p-part2').classList.contains('on')){if(!reduce)T+=dt;const C=col();drawA(T,C);drawB(T,C);drawC(T,C);drawD(T,C)}
 requestAnimationFrame(frame)}
if(reduce)T=0.6;requestAnimationFrame(frame);
})();
