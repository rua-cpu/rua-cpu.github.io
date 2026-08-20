const KING_WASM_URL='https://cdn.jsdelivr.net/gh/KingofGames02/astc_decoder_app@main/astc_decode_bg.wasm';
const T2D_MODULE='https://cdn.jsdelivr.net/npm/texture2ddecoder-wasm@1.2.2/dist/index.mjs';
const T2D_WASM='https://cdn.jsdelivr.net/npm/texture2ddecoder-wasm@1.2.2/wasm';
function b64ToBytes(s){const b=atob(s);const a=new Uint8Array(b.length);for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return a;}
function astcHeader(d){return {bx:d[4],by:d[5],width:d[7]|(d[8]<<8)|(d[9]<<16),height:d[10]|(d[11]<<8)|(d[12]<<16)};}
function paint(canvas,px,w,h){canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');const arr=px instanceof Uint8ClampedArray?px:new Uint8ClampedArray(px.buffer||px,px.byteOffset||0,px.byteLength||px.length);ctx.putImageData(new ImageData(arr,w,h),0,0);}
let kingReady=null,t2dReady=null;
async function useKing(data,canvas){if(!kingReady)kingReady=initASTCDecoder(KING_WASM_URL);await kingReady;const h=parseASTCHeader(data);const px=decodeASTCTexture(data);canvas.width=h.width;canvas.height=h.height;drawToCanvas(canvas.getContext('2d'),px,h.width,h.height);}
async function useT2D(data,canvas){if(!t2dReady)t2dReady=(async()=>{const m=await import(T2D_MODULE);await m.initialize({wasmPath:T2D_WASM});return m;})();const m=await t2dReady;const h=astcHeader(data);const px=await m.decode_astc(data.slice(16),h.width,h.height,h.bx,h.by);paint(canvas,px,h.width,h.height);}
async function decodeCard(c){const st=c.parentElement.querySelector('.asset-status');const data=b64ToBytes(c.dataset.astcB64);try{await useKing(data,c);if(st)st.style.display='none';return;}catch(e){console.warn('primary decoder failed',e);}try{await useT2D(data,c);if(st)st.style.display='none';return;}catch(e){console.error('fallback decoder failed',e);if(st)st.textContent='미리보기 로딩 실패 · ASTC 원본 파일은 패키지에 포함되어 있습니다.';}}
async function renderAstcCanvases(){const cvs=[...document.querySelectorAll('canvas[data-astc-b64]')];for(const c of cvs) await decodeCard(c);}
window.addEventListener('DOMContentLoaded',renderAstcCanvases);
