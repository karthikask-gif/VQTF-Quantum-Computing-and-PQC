(()=>{const g=id=>document.getElementById(id),s2=Math.SQRT1_2,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt=v=>Math.abs(v)<.005?'0':(v<0?'−':'')+Math.abs(v).toFixed(2).replace(/\.?0+$/,'');
const bits=(x,n)=>x.toString(2).padStart(n,'0'),pc=x=>{let c=0;for(;x;x>>=1)c+=x&1;return c},dot=(a,b)=>pc(a&b)&1;
const SUP={0:'⁰',1:'¹',2:'²',3:'³',4:'⁴',5:'⁵',6:'⁶',7:'⁷',8:'⁸',9:'⁹'},sup=n=>String(n).split('').map(c=>SUP[c]).join('');
const gcd=(a,b)=>b?gcd(b,a%b):a;
// signed / unsigned bar chart drawn into an SVG (viewBox 0 0 400 200)
function chart(svg,vals,o={}){const n=vals.length,signed=o.signed!==false,zero=signed?88:170,R=signed?72:150,sc=o.scale||1,slot=380/n,bw=Math.min(slot*.7,60),lab=o.labels||vals.map((_,i)=>i);
 let h='<line x1="8" x2="392" y1="'+zero+'" y2="'+zero+'" stroke="var(--mu)"/>';
 vals.forEach((v,i)=>{const x=10+slot*i+(slot-bw)/2,len=Math.min(Math.abs(v)*R*sc,R),y=v>=0?zero-len:zero;
  h+='<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+Math.max(len,.6).toFixed(1)+'" rx="3" class="'+(v<0?'ng':'ps')+(o.hi===i?' hl':'')+'"/>';
  if(o.nums!==false&&n<=8&&Math.abs(v)>.005)h+='<text x="'+(x+bw/2).toFixed(1)+'" y="'+(v>=0?y-5:y+len+14).toFixed(1)+'" text-anchor="middle" font-size="12" fill="var(--tx)">'+(o.pct?Math.round(v*100)+'%':fmt(v))+'</text>';
  h+='<text x="'+(x+bw/2).toFixed(1)+'" y="194" text-anchor="middle" font-size="'+(n>8?11:13)+'" fill="'+(o.hi===i?'var(--hv)':'var(--mu)')+'" font-weight="'+(o.hi===i?700:400)+'">'+lab[i]+'</text>';
  if(o.click)h+='<rect class="bk" data-i="'+i+'" x="'+(10+slot*i).toFixed(1)+'" y="0" width="'+slot.toFixed(1)+'" height="200" fill="transparent"/>'});
 if(o.mean!=null){const y=zero-o.mean*R*sc;h+='<line x1="8" x2="392" y1="'+y.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="var(--hv)" stroke-width="2" stroke-dasharray="6 4"/>'}
 svg.innerHTML=h}
const dirac=(amps,lab)=>{let t='';amps.forEach((a,i)=>{if(Math.abs(a)<.005)return;const m=Math.abs(a),c=Math.abs(m-1)<.005?'':fmt(m);t+=(a<0?(t?' − ':'−'):(t?' + ':''))+c+'|'+lab[i]+'⟩'});return t||'0'};
const pick=(btns,b)=>btns.forEach(x=>x.classList.toggle('go',x===b));

// ---- 7.2 Deutsch stepper
const DF={0:[0,0],1:[1,1],x:[0,1],n:[1,0]},DH=[[40,60],[100,60],[190,120],[330,60],[405,75]],dB=[...document.querySelectorAll('[data-df]')];let df='0',ds=0;
function dState(k){const[f0,f1]=DF[df];if(k===0)return[1,0];if(k===1)return[s2,s2];const a=s2*(f0?-1:1),b=s2*(f1?-1:1);if(k===2)return[a,b];return[(a+b)*s2,(a-b)*s2]}
function dShow(){const[f0,f1]=DF[df],v=dState(ds),hi=g('dHi'),par=x=>x<0?'('+fmt(x)+')':fmt(x);hi.setAttribute('x',DH[ds][0]);hi.setAttribute('width',DH[ds][1]);
 chart(g('dChart'),v,{labels:['|0⟩','|1⟩']});
 g('dE').textContent='Step '+(ds+1)+' of 5 · top qubit = '+dirac(v,['0','1'])+(ds?'   helper = |−⟩':'   helper = |1⟩');
 const pr=dState(2),r=Math.abs(dState(3)[1])>.5?1:0;
 g('dTxt').innerHTML=[ 'Start: the top qubit is |0⟩ and the helper is |1⟩. Press <b>Next step</b>.',
  'H on both qubits. The top qubit now holds both inputs, 0 and 1, equally. The helper becomes |−⟩, ready for kickback.',
  'One query. f(0) = '+f0+', so the |0⟩ part '+(f0?'gets a <b>−</b> sign':'keeps its + sign')+'. f(1) = '+f1+', so the |1⟩ part '+(f1?'gets a <b>−</b> sign':'keeps its + sign')+'. The helper is unchanged.',
  'H makes the two parts interfere. New |0⟩ amount = ('+fmt(pr[0])+' + '+par(pr[1])+') × 0.71 = <b>'+fmt(dState(3)[0])+'</b>. New |1⟩ amount = ('+fmt(pr[0])+' − '+par(pr[1])+') × 0.71 = <b>'+fmt(dState(3)[1])+'</b>.',
  'Measure: the result is <b>'+r+'</b> every time, so f is <b>'+(r?'balanced':'constant')+'</b>. One query was enough. We never learned f(0) or f(1) themselves, only that they are '+(r?'different':'the same')+'.'][ds];
 g('dBack').disabled=!ds;g('dNext').disabled=ds===4}
dB.forEach(b=>b.onclick=()=>{df=b.dataset.df;pick(dB,b);dShow()});
g('dNext').onclick=()=>{if(ds<4)ds++;dShow()};g('dBack').onclick=()=>{if(ds)ds--;dShow()};g('dReset').onclick=()=>{ds=0;dShow()};dShow();

// ---- 7.3 Deutsch-Jozsa, n = 2
const DJ=[['f = 0',[0,0,0,0]],['f = 1',[1,1,1,1]],['f = first bit',[0,0,1,1]],['f = second bit',[0,1,0,1]],['f = x₁ XOR x₂',[0,1,1,0]],['f = NOT (x₁ XOR x₂)',[1,0,0,1]]],L2=['00','01','10','11'];
g('djB').innerHTML=DJ.map((d,i)=>'<button data-dj="'+i+'"'+(i===2?' class="go"':'')+'>'+d[0]+'</button>').join('');
const djB=[...document.querySelectorAll('[data-dj]')];
function djShow(k){const f=DJ[k][1],sg=f.map(v=>v?-1:1),a1=sg.map(v=>v/2),a2=L2.map((_,y)=>sg.reduce((s,v,x)=>s+v*(dot(x,y)?-1:1),0)/4);
 const bal=f.reduce((a,b)=>a+b)===2;g('djT').textContent=L2.map((x,i)=>'f('+x+') = '+f[i]).join(',  ')+'  →  '+(bal?'balanced':'constant');
 chart(g('djC1'),a1,{labels:L2});const y=a2.findIndex(v=>Math.abs(v)>.5);chart(g('djC2'),a2,{labels:L2,hi:y});
 g('djO').innerHTML='Average of the signs = ('+sg.map(v=>v>0?'+1':'−1').join(' ')+') ÷ 4 = <b>'+fmt(a2[0])+'</b>, so 00 has a '+Math.round(a2[0]*a2[0]*100)+'% chance. The measurement always gives <b>'+L2[y]+'</b>: '+(y?'not 00, so f is <b>balanced</b>.':'all zeros, so f is <b>constant</b>.')+' One query.'}
djB.forEach(b=>b.onclick=()=>{pick(djB,b);djShow(+b.dataset.dj)});djShow(2);

// ---- 7.4 Simon
const ssB=[...document.querySelectorAll('[data-ss]')];let ss=6,clues=[];
function ssTable(){const lab=[],cells=[];let c=0;for(let x=0;x<8;x++)if(lab[x]==null){const L='ABCD'[c++];lab[x]=lab[x^ss]=L;cells.push([x,L],[x^ss,L])}
 g('ssT').innerHTML=cells.map(([x,L])=>'<span class="k'+L+'">'+bits(x,3)+' → '+L+'</span>').join('')}
function eq(y){if(!y)return 'y = 000: no information, run again';const t=[1,2,3].filter(i=>y&(8>>i)).map(i=>'s'+['₁','₂','₃'][i-1]);return 'y = '+bits(y,3)+': '+t.join(' ⊕ ')+' = 0'}
function ssShow(){const cand=[1,2,3,4,5,6,7].filter(c=>clues.every(y=>!dot(y,c)));
 g('ssList').innerHTML=clues.length?clues.map((y,i)=>'Run '+(i+1)+'. '+eq(y)).join('<br>'):'No runs yet.';
 g('ssCand').innerHTML=cand.length===1?'Only one secret fits every clue: <b>s = '+bits(cand[0],3)+'</b>, found in '+clues.length+' run'+(clues.length>1?'s':'')+'. ✓':'Secrets still possible ('+cand.length+'): '+cand.map(c=>bits(c,3)).join(', ');
 g('ssRun').disabled=cand.length===1}
g('ssRun').onclick=()=>{const ok=[0,1,2,3,4,5,6,7].filter(y=>!dot(y,ss));clues.push(ok[Math.floor(Math.random()*ok.length)]);ssShow()};
g('ssReset').onclick=()=>{clues=[];ssShow()};
ssB.forEach(b=>b.onclick=()=>{ss=+b.dataset.ss;pick(ssB,b);clues=[];ssTable();ssShow()});ssTable();ssShow();

// ---- 7.5 Shor: power clock
let sN=15,sA=7,seq=[1],timer=null;const sNB=[...document.querySelectorAll('[data-sn]')],clk=g('shClock');
const pos=(v,r)=>{const t=-Math.PI/2+2*Math.PI*v/sN;return[r*Math.cos(t),r*Math.sin(t)]};
function aBtns(){g('shAB').innerHTML='<span class="mu">a =</span>'+[...Array(sN).keys()].filter(a=>a>1&&gcd(a,sN)===1).map(a=>'<button data-sa="'+a+'"'+(a===sA?' class="go"':'')+'>'+a+'</button>').join('');
 const B=[...document.querySelectorAll('[data-sa]')];B.forEach(b=>b.onclick=()=>{sA=+b.dataset.sa;pick(B,b);sReset()})}
function done(){return seq.length>1&&seq[seq.length-1]===1}
function sDraw(){let h='<circle r="112" fill="none" stroke="var(--bd)" stroke-width="2"/>';
 const vis=new Set(seq);for(let v=0;v<sN;v++){const[x,y]=pos(v,112),[lx,ly]=pos(v,134);h+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(vis.has(v)?6:3)+'" fill="'+(vis.has(v)?'var(--a2)':'var(--mu)')+'"/><text x="'+lx.toFixed(1)+'" y="'+(ly+4).toFixed(1)+'" text-anchor="middle" font-size="12" font-family="system-ui" fill="'+(vis.has(v)?'var(--tx)':'var(--mu)')+'" font-weight="'+(vis.has(v)?700:400)+'">'+v+'</text>'}
 if(seq.length>1)h+='<polyline points="'+seq.map(v=>pos(v,112).map(n=>n.toFixed(1)).join(',')).join(' ')+'" fill="'+(done()?'var(--a2)':'none')+'" fill-opacity=".12" stroke="var(--ac)" stroke-width="2.5" stroke-linejoin="round"/>';
 const c=seq[seq.length-1],[x,y]=pos(c,112);h+='<g id="shDot" style="transform:translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px)"><circle r="13" fill="var(--ac)"/><text y="5" text-anchor="middle" font-size="13" font-weight="700" font-family="system-ui" fill="#fff">'+c+'</text></g>';
 h+='<text y="-4" text-anchor="middle" font-size="13" font-family="system-ui" fill="var(--mu)">mod '+sN+'</text><text y="16" text-anchor="middle" font-size="13" font-family="system-ui" fill="var(--mu)">× '+sA+' each hop</text>';
 clk.innerHTML=h}
function sShow(){sDraw();const k=seq.length-1;let t=sA+'ˣ mod '+sN+':  '+seq.join(' → ');
 if(k)t+=' ('+seq[k-1]+' × '+sA+' = '+seq[k-1]*sA+(seq[k-1]*sA>=sN?', and '+seq[k-1]*sA+' mod '+sN+' = '+seq[k]:'')+')';g('shSeq').textContent=t;
 if(!done()){g('shOut').innerHTML=k?'Keep hopping until the dot returns to 1.':'The dot starts at '+sA+'⁰ = 1. Press <b>Hop</b>.';g('shNext').disabled=false;return}
 const r=k;g('shNext').disabled=true;stop();let o='Back to 1 after <b>r = '+r+'</b> hops, so the period is '+r+'. ';
 if(r%2)o+='But r is odd, so we can\'t halve it. Pick another a.';
 else{const x=seq[r/2];o+='x = '+sA+sup(r/2)+' mod '+sN+' = <b>'+x+'</b>. ';
  if(x===sN-1)o+='But x = N − 1, so x + 1 = '+sN+' is N itself and the gcds give only 1 and '+sN+'. This a fails; pick another.';
  else{const p=gcd(x-1,sN),q=gcd(x+1,sN);o+='gcd('+(x-1)+', '+sN+') = <b>'+p+'</b> and gcd('+(x+1)+', '+sN+') = <b>'+q+'</b>. So '+sN+' = '+Math.min(p,q)+' × '+Math.max(p,q)+'. ✓'}}
 g('shOut').innerHTML=o}
function hop(){if(done())return;seq.push(seq[seq.length-1]*sA%sN);sShow()}
function stop(){if(timer){clearInterval(timer);timer=null}g('shPlay').textContent='Play'}
function sReset(){stop();seq=[1];sShow()}
g('shNext').onclick=hop;g('shReset').onclick=sReset;
g('shPlay').onclick=()=>{if(timer)return stop();if(done())seq=[1];g('shPlay').textContent='Pause';timer=setInterval(()=>{if(!clk.getClientRects().length)return stop();hop()},RM?400:900);hop()};
sNB.forEach(b=>b.onclick=()=>{sN=+b.dataset.sn;sA=sN===15?7:2;pick(sNB,b);aBtns();sReset()});aBtns();sShow();

// ---- 7.5 Shor: comb to peaks (N = 15, a = 7, Q = 16)
const Q=16,fx=[...Array(Q).keys()].map(x=>{let v=1;for(let i=0;i<x;i++)v=v*7%15;return v}),LQ=[...Array(Q).keys()];let sp,sStage,sHi;
const bDraw=()=>chart(g('shBC'),sp,{signed:false,scale:3.2,labels:LQ,hi:sHi});
function bReset(){sp=Array(Q).fill(1/Q);sStage=0;sHi=null;bDraw();g('shBO').innerHTML='All 16 values of x are equally likely (6.25% each). Under each x the box has written 7ˣ mod 15: '+fx.join(', ')+'.';bBtn()}
function bBtn(){g('shB1').disabled=sStage!==0;g('shB2').disabled=sStage!==1;g('shB3').disabled=sStage!==2;[1,2,3].forEach(i=>g('shB'+i).classList.toggle('go',sStage===i-1))}
g('shB1').onclick=()=>{const v=[1,7,4,13][Math.floor(Math.random()*4)],xs=LQ.filter(x=>fx[x]===v);sp=LQ.map(x=>fx[x]===v?1/xs.length:0);sStage=1;bDraw();
 g('shBO').innerHTML='The second register shows <b>'+v+'</b>. Only x = '+xs.join(', ')+' give '+v+', so only they remain (25% each). They form a comb with teeth 4 apart, but reading x now would give just one random tooth.';bBtn()};
g('shB2').onclick=()=>{const xs=LQ.filter(x=>sp[x]>0);sp=LQ.map(y=>{let re=0,im=0;xs.forEach(x=>{const t=2*Math.PI*x*y/Q;re+=Math.cos(t);im+=Math.sin(t)});return(re*re+im*im)/(xs.length*Q)});sStage=2;bDraw();
 g('shBO').innerHTML='The QFT turns the comb into sharp peaks at <b>'+LQ.filter(y=>sp[y]>.01).join(', ')+'</b> (25% each). Every other value cancelled out by interference.';bBtn()};
g('shB3').onclick=()=>{let r=Math.random(),y=0;for(;y<Q-1;y++){r-=sp[y];if(r<0)break}sHi=y;sStage=3;bDraw();const d=gcd(y,Q);let o='Read <b>y = '+y+'</b>. ';
 if(!y)o+='y ÷ 16 = 0 tells us nothing. Press Reset and run again.';
 else{const num=y/d,den=Q/d;let p=1;for(let i=0;i<den;i++)p=p*7%15;o+='y ÷ 16 = '+y+'/16 = '+num+'/'+den+', which suggests r = '+den+'. Check: 7'+sup(den)+' mod 15 = '+p+(p===1?'. ✓ The period is <b>4</b>, and 7² mod 15 = 4 gives the factors gcd(3, 15) = 3 and gcd(5, 15) = 5.':', not 1, so this guess fails. Press Reset and run again.')}
 g('shBO').innerHTML=o;bBtn()};
g('shBR').onclick=bReset;bReset();

// ---- 7.6 Grover
const gNB=[...document.querySelectorAll('[data-gn]')];let gN=8,gm=5,amp,q,anim=null,meas=null;
const nb=()=>Math.log2(gN),gl=()=>[...Array(gN).keys()].map(i=>gN>8?String(i):bits(i,nb())),mean=()=>amp.reduce((a,b)=>a+b)/gN;
function gDraw(v){chart(g('grC'),v||amp,{labels:gl(),hi:meas!=null?meas:gm,mean:(v||amp).reduce((a,b)=>a+b)/gN,click:true});
 g('grC').querySelectorAll('.bk').forEach(r=>r.onclick=()=>{gm=+r.dataset.i;gReset()})}
function gStats(msg){const best=Math.floor(Math.PI/4*Math.sqrt(gN)),p=amp[gm]*amp[gm];
 g('grS').innerHTML=(msg?msg+'<br>':'')+'Prize in box <b>'+bits(gm,nb())+'</b>'+(gN>8?' (= '+gm+')':'')+' · queries used: <b>'+q+'</b> · chance of finding the prize: <b>'+(p*100).toFixed(1)+'%</b> · best number of rounds for N = '+gN+': '+best}
function tween(to,msg){const from=amp.slice();amp=to;meas=null;if(anim)cancelAnimationFrame(anim);
 if(RM){gDraw();gStats(msg);return}const t0=performance.now(),st=now=>{const u=Math.min(1,(now-t0)/450),e=u*(2-u);gDraw(from.map((a,i)=>a+(to[i]-a)*e));if(u<1)anim=requestAnimationFrame(st);else{anim=null;gDraw()}};anim=requestAnimationFrame(st);gStats(msg)}
const mark=()=>{q++;return amp.map((a,i)=>i===gm?-a:a)},refl=v=>{const m=v.reduce((a,b)=>a+b)/gN;return v.map(a=>2*m-a)};
g('grO').onclick=()=>tween(mark(),'Marked: the prize\'s amplitude flipped sign. The chances have not changed yet.');
g('grD').onclick=()=>{const m=mean();tween(refl(amp),'Reflected every bar about the average ('+fmt(m)+'): new = 2 × '+fmt(m)+' − old.')};
g('grR').onclick=()=>{const v=refl(mark());tween(v,'One full round: mark, then reflect.')};
g('grM').onclick=()=>{let r=Math.random(),i=0;for(;i<gN-1;i++){r-=amp[i]*amp[i];if(r<0)break}meas=i;gDraw();
 gStats('Measured box <b>'+bits(i,nb())+'</b>'+(gN>8?' (= '+i+')':'')+': '+(i===gm?'found the prize! 🎉':'not the prize. Reset and try again.'));meas=i;gDraw()};
function gReset(){if(anim)cancelAnimationFrame(anim);anim=null;amp=Array(gN).fill(1/Math.sqrt(gN));q=0;meas=null;gDraw();gStats('Equal mix: every box has amplitude '+fmt(amp[0])+'. Tap a bar to move the prize.')}
g('grX').onclick=gReset;
gNB.forEach(b=>b.onclick=()=>{gN=+b.dataset.gn;gm=Math.min(gm,gN-1);if(gN===4)gm=2;pick(gNB,b);gReset()});gReset();
})();
