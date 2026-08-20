const KING_WASM_URL='https://cdn.jsdelivr.net/gh/KingofGames02/astc_decoder_app@main/astc_decode_bg.wasm';
const T2D_MODULE='https://cdn.jsdelivr.net/npm/texture2ddecoder-wasm@1.2.2/dist/index.mjs';
const T2D_WASM='https://cdn.jsdelivr.net/npm/texture2ddecoder-wasm@1.2.2/wasm';
let kingReady=null,t2dReady=null;
function b64(s){const bin=atob(s);const a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return a;}
function header(d){return {bx:d[4],by:d[5],width:d[7]|(d[8]<<8)|(d[9]<<16),height:d[10]|(d[11]<<8)|(d[12]<<16)};}
function paint(c,px,w,h){c.width=w;c.height=h;const a=px instanceof Uint8ClampedArray?px:new Uint8ClampedArray(px.buffer||px,px.byteOffset||0,px.byteLength||px.length);c.getContext('2d').putImageData(new ImageData(a,w,h),0,0);}
async function decodeKing(data,c){if(!kingReady)kingReady=initASTCDecoder(KING_WASM_URL);await kingReady;const h=parseASTCHeader(data);const px=decodeASTCTexture(data);c.width=h.width;c.height=h.height;drawToCanvas(c.getContext('2d'),px,h.width,h.height);}
async function decodeT2D(data,c){if(!t2dReady)t2dReady=(async()=>{const m=await import(T2D_MODULE);await m.initialize({wasmPath:T2D_WASM});return m;})();const m=await t2dReady;const h=header(data);const px=await m.decode_astc(data.slice(16),h.width,h.height,h.bx,h.by);paint(c,px,h.width,h.height);}
async function renderOne(btn){const card=btn.closest('.asset-figure'),c=card.querySelector('canvas'),st=card.querySelector('.asset-status'),data=b64(c.dataset.astcB64);btn.disabled=true;st.textContent='실제 XAPK Texture2D 디코딩 중…';try{await decodeKing(data,c);}catch(e){console.warn(e);try{await decodeT2D(data,c);}catch(e2){console.error(e2);st.textContent='디코딩 실패 · ASTC 원본 파일은 패키지에 포함';btn.disabled=false;return;}}st.style.display='none';btn.style.display='none';}
function filterResources(){const q=document.getElementById('q').value.toLowerCase(),fmt=document.getElementById('fmt').value;document.querySelectorAll('[data-resource-card]').forEach(el=>{el.style.display=((!q||el.dataset.search.includes(q))&&(!fmt||el.dataset.format===fmt))?'block':'none';});}
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('q').addEventListener('input',filterResources);document.getElementById('fmt').addEventListener('change',filterResources);});
