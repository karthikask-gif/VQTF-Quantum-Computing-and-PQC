(()=>{const g=id=>document.getElementById(id),pick=(btns,b)=>btns.forEach(x=>x.classList.toggle('go',x===b));
const md=(a,q)=>((a%q)+q)%q,ri=(lo,hi)=>lo+Math.floor(Math.random()*(hi-lo+1)),F='font-family="system-ui"';

// ---- 9.8 Hamming lab
let hd=[1,0,1,1],flip=new Set([5]);
function hmEnc(d){const[d1,d2,d3,d4]=d;return[d1^d2^d4,d1^d3^d4,d1,d2^d3^d4,d2,d3,d4]}
function hmShow(){const c=hmEnc(hd),r=c.map((b,i)=>flip.has(i)?b^1:b),s1=r[0]^r[2]^r[4]^r[6],s2=r[1]^r[2]^r[5]^r[6],s3=r[3]^r[4]^r[5]^r[6],syn=s3*4+s2*2+s1;
 g('hmD').innerHTML=hd.map((b,i)=>'<button data-i="'+i+'">'+b+'</button>').join('');
 g('hmC').innerHTML=r.map((b,i)=>'<button data-i="'+i+'" class="'+(flip.has(i)?'fl':'')+([0,1,3].includes(i)?' pb9':'')+'"><small>'+(i+1)+'</small>'+b+'</button>').join('');
 g('hmD').querySelectorAll('button').forEach(b=>b.onclick=()=>{hd[b.dataset.i]^=1;hmShow()});
 g('hmC').querySelectorAll('button').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;flip.has(i)?flip.delete(i):flip.add(i);hmShow()});
 let o='Sent codeword: <span class="m">'+c.join('')+'</span>. Checks: {1,3,5,7} = '+s1+', {2,3,6,7} = '+s2+', {4,5,6,7} = '+s3+', read as binary '+s3+s2+s1+' = <b>'+syn+'</b>. ';
 if(!flip.size)o+='No error: the checks are all 0. ✓';else if(flip.size===1)o+='The checks point to position <b>'+syn+'</b>, exactly the bit that was flipped. Fixed ✓';
 else o+='<b>'+flip.size+' bits flipped:</b> this small code can only fix one error, so it points to position '+(syn||'none')+' and gets it wrong. McEliece uses big codes that fix many errors.';
 g('hmO').innerHTML=o}
hmShow();
})();
