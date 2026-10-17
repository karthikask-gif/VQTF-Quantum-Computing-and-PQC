(()=>{const g=id=>document.getElementById(id),pick=(btns,b)=>btns.forEach(x=>x.classList.toggle('go',x===b));
const md=(a,q)=>((a%q)+q)%q,ri=(lo,hi)=>lo+Math.floor(Math.random()*(hi-lo+1)),F='font-family="system-ui"';

// ---- 9.10 size chart
const SZ=[['RSA-2048',256,256,'c'],['X25519 / P-256',32,64,'c'],['ML-KEM-768',1184,1088,'k'],['HQC-128',2249,4433,'k'],['Classic McEliece',261120,96,'k'],['ML-DSA-65',1952,3309,'s'],['FN-DSA-512',897,666,'s'],['SLH-DSA-128s',32,7856,'s']];
const szB=[...document.querySelectorAll('[data-sz]')];let sz='pk';
function szShow(){const X=v=>140+Math.log10(v)/6*240,col={c:'var(--mu)',k:'var(--ac)',s:'var(--a2)'};let h='';
 for(let k=1;k<=6;k++){h+='<line x1="'+X(10**k)+'" y1="10" x2="'+X(10**k)+'" y2="296" stroke="var(--bd)"/><text x="'+X(10**k)+'" y="312" text-anchor="middle" font-size="10" fill="var(--mu)" '+F+'>'+['','10','100','1K','10K','100K','1M'][k]+'</text>'}
 SZ.forEach(([n,pk,ct,t],i)=>{const v=sz==='pk'?pk:ct,y=16+i*35;h+='<text x="134" y="'+(y+17)+'" text-anchor="end" font-size="12" fill="var(--tx)" '+F+'>'+n+'</text><rect class="szb" x="140" y="'+(y+3)+'" width="'+(X(v)-140).toFixed(1)+'" height="20" rx="4" fill="'+col[t]+'"/>';
  const w=X(v),inside=w>330;h+='<text x="'+(inside?w-4:w+4).toFixed(1)+'" y="'+(y+17)+'" text-anchor="'+(inside?'end':'start')+'" font-size="11" font-weight="700" fill="'+(inside?'#fff':'var(--tx)')+'" '+F+'>'+v.toLocaleString('en')+'</text>'});
 h+='<g font-size="11" '+F+'><rect x="140" y="330" width="10" height="10" fill="var(--mu)"/><text x="154" y="339" fill="var(--mu)">classical</text><rect x="214" y="330" width="10" height="10" fill="var(--ac)"/><text x="228" y="339" fill="var(--mu)">PQC key exchange</text><rect x="330" y="330" width="10" height="10" fill="var(--a2)"/><text x="344" y="339" fill="var(--mu)">PQC signature</text></g>';
 g('szC').innerHTML=h}
szB.forEach(b=>b.onclick=()=>{sz=b.dataset.sz;pick(szB,b);szShow()});szShow();
})();
