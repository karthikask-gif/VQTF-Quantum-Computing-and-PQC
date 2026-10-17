(()=>{const g=id=>document.getElementById(id),s=Math.SQRT1_2;
// ---- bracket calculator (each state: [[re,im],[re,im]])
const ST={'0':[[1,0],[0,0]],'1':[[0,0],[1,0]],'+':[[s,0],[s,0]],'−':[[s,0],[-s,0]],'+i':[[s,0],[0,s]],'−i':[[s,0],[0,-s]]};
const r2=x=>Math.abs(x)<.005?0:Math.round(x*100)/100;
const fc=(re,im)=>{re=r2(re);im=r2(im);if(!im)return ''+re;const ip=(Math.abs(im)===1?'':Math.abs(im))+'i';if(!re)return (im<0?'−':'')+ip;return re+(im<0?' − ':' + ')+ip};
const mt=(a,row)=>'<span class="mat" style="grid-template-columns:'+(row?'repeat(2,auto)':'auto')+'"><i>'+a[0]+'</i><i>'+a[1]+'</i></span>';
const A=g('bkA'),B=g('bkB');Object.keys(ST).forEach(k=>{A.add(new Option('⟨'+k+'|',k));B.add(new Option('|'+k+'⟩',k))});A.value='0';B.value='+';
function calc(){const a=ST[A.value],b=ST[B.value];let re=0,im=0;
 for(let k=0;k<2;k++){const[x,y]=a[k],[u,v]=b[k];re+=x*u+y*v;im+=x*v-y*u}
 const p=re*re+im*im,pc=Math.round(p*100),bra=a.map(([x,y])=>fc(x,-y)),ket=b.map(([x,y])=>fc(x,y));
 const mean=pc===100?'The same state (up to a sign or phase).':pc===0?'Completely different (orthogonal): a measurement always tells them apart.':'Partly alike.';
 g('bkOut').innerHTML='⟨'+A.value+'|'+B.value+'⟩ = '+mt(bra,1)+' × '+mt(ket)+' = ('+bra[0]+')×('+ket[0]+') + ('+bra[1]+')×('+ket[1]+') = <b>'+fc(re,im)+'</b><br>Chance = |'+fc(re,im)+'|² = <b>'+pc+'%</b>. '+mean;
 const bar=g('bkBar');bar.style.width=Math.max(pc,1)+'%';bar.textContent=pc>=20?pc+'%':''}
A.onchange=B.onchange=calc;calc();
})();
