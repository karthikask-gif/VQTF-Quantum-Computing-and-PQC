const th=document.getElementById('th');
function upd(){const t=th.value*Math.PI/180,a=Math.cos(t/2),b=Math.sin(t/2),p0=a*a*100,p1=b*b*100;
document.getElementById('vals').textContent='α = '+a.toFixed(3)+'  β = '+b.toFixed(3);
const b0=document.getElementById('b0'),b1=document.getElementById('b1');
b0.style.width=Math.max(p0,12)+'%';b0.textContent='P(0) = '+p0.toFixed(1)+'%';
b1.style.width=Math.max(p1,12)+'%';b1.textContent='P(1) = '+p1.toFixed(1)+'%'}
th.addEventListener('input',upd);upd();
(()=>{const g=id=>document.getElementById(id),D=Math.PI/180,f2=x=>(Math.abs(x)<.005?0:x).toFixed(2);
// inner product: shadow of b on a
function ip(){const t=g('ipA').value*D,c=Math.cos(t),sn=Math.sin(t),L=200,bx=L*c,by=-L*sn;
 g('ipAv').textContent=g('ipA').value+'°';const B=g('ipB');B.setAttribute('x2',bx);B.setAttribute('y2',by);
 const T=g('ipBt');T.setAttribute('x',bx*1.07-4);T.setAttribute('y',by*1.07-4);
 const P=g('ipP');P.setAttribute('x1',bx);P.setAttribute('y1',by);P.setAttribute('x2',bx);P.setAttribute('y2',0);
 const S=g('ipSh');S.setAttribute('x1',0);S.setAttribute('y1',0);S.setAttribute('x2',bx);S.setAttribute('y2',0);S.style.display=Math.abs(c)<.01?'none':'';
 const v=Math.abs(c)<.005?0:c,p=Math.round(v*v*100);
 const m=Math.abs(v)>.995?(v>0?'Same state.':'Same state with a minus sign in front (same chances).'):Math.abs(v)<.01?'Orthogonal: no overlap at all.':'Partly alike.';
 g('ipO').innerHTML='a = [1, 0], b = ['+f2(c)+', '+f2(sn)+']<br>⟨a|b⟩ = 1 × '+f2(c)+' + 0 × '+f2(sn)+' = <b>'+f2(v)+'</b> (the shadow length). '+m+'<br>Chance = '+f2(v)+'² = <b>'+p+'%</b>';
 const bar=g('ipBar');bar.style.width=Math.max(p,1)+'%';bar.textContent=p>=15?p+'%':''}
g('ipA').addEventListener('input',ip);ip();
// tensor product grid
const bars=g('tpBars');const L=['00','01','10','11'];
bars.innerHTML=L.map(l=>'<div class="lbl">|'+l+'⟩ <span id="tpL'+l+'"></span></div><div class="bar"><i id="tpI'+l+'"></i></div>').join('');
function tp(){const ta=g('tpA').value*D,tb=g('tpB').value*D,a=[Math.cos(ta/2),Math.sin(ta/2)],b=[Math.cos(tb/2),Math.sin(tb/2)];
 g('tpAv').textContent='['+f2(a[0])+', '+f2(a[1])+']';g('tpBv').textContent='['+f2(b[0])+', '+f2(b[1])+']';
 let h='<tr><th></th><th>B is 0 ('+f2(b[0])+')</th><th>B is 1 ('+f2(b[1])+')</th></tr>';
 for(let i=0;i<2;i++){h+='<tr><th>A is '+i+' ('+f2(a[i])+')</th>';for(let j=0;j<2;j++)h+='<td>'+f2(a[i])+' × '+f2(b[j])+' = <b>'+f2(a[i]*b[j])+'</b> → |'+i+j+'⟩</td>';h+='</tr>'}
 g('tpG').innerHTML=h;
 L.forEach(l=>{const v=a[+l[0]]*b[+l[1]],p=Math.round(v*v*100);g('tpL'+l).textContent='amplitude '+f2(v)+', chance '+p+'%';g('tpI'+l).style.width=Math.max(p,1)+'%'})}
g('tpA').addEventListener('input',tp);g('tpB').addEventListener('input',tp);tp()})();
