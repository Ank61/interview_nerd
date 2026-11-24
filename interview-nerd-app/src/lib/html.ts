import type { Palette } from '@/theme/tokens';

/**
 * Wraps pre-processed content HTML in a themed document for the WebView.
 * Syntax colours use the compact classes emitted by scripts/build-content.mjs.
 */
export function buildHtmlDocument(body: string, p: Palette, opts: { fontScale?: number; autoHeight?: boolean; padding?: number } = {}) {
  const fontSize = Math.round(16 * (opts.fontScale ?? 1) * 10) / 10;
  const pad = opts.padding ?? 20;
  return `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<style>
:root{color-scheme:${p.scheme};--text:${p.text};--dim:${p.textDim};--mute:${p.textMute};--bg:${opts.autoHeight ? 'transparent' : p.bg};--surface:${p.surface};--surface2:${p.surface2};--border:${p.border};--accent:${p.accentFg};--accentSoft:${p.accentSoft};--code:${p.codeBg}}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;padding:0;background:var(--bg);color:var(--text)}
body{font:400 ${fontSize}px/1.68 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;padding:${opts.autoHeight ? 0 : `${pad - 4}px ${pad}px ${pad + 96}px`};word-wrap:break-word;overflow-wrap:anywhere;-webkit-text-size-adjust:100%}
#c>*:first-child{margin-top:0!important}
p{margin:0 0 .9em!important;line-height:1.7!important}
h1,h2,h3,h4,h5,h6{color:var(--text);line-height:1.3;letter-spacing:-.01em;margin:1.5em 0 .55em!important;font-weight:700}
h1{font-size:1.45em}h2{font-size:1.3em}h3{font-size:1.16em!important}h4{font-size:1.06em!important}h5,h6{font-size:1em!important}
strong,b{color:var(--text);font-weight:650}
a{color:var(--accent);text-decoration:none;border-bottom:1px solid var(--accentSoft)}
ul,ol{padding-left:1.25em!important;margin:.3em 0 1em!important}
li{margin:.3em 0!important;line-height:1.62}
li::marker{color:var(--accent)}
hr{border:0;border-top:1px solid var(--border);margin:1.6em 0}
blockquote{margin:1em 0;padding:.7em 1em;border-left:3px solid var(--accent);background:var(--surface);border-radius:0 12px 12px 0;color:var(--dim)}
[data-box]{background:var(--surface);border:1px solid var(--border)!important;border-radius:14px!important;padding:14px 16px!important;margin:1em 0!important}
[data-box] [data-box]{background:var(--surface2)}
div[style*="border-left"]{border-left:3px solid var(--accent)!important}
:not(pre)>code{font-family:ui-monospace,Menlo,"JetBrains Mono",monospace;font-size:.86em;background:var(--surface2);border:1px solid var(--border);padding:.1em .38em;border-radius:6px;color:var(--text)}
img{max-width:100%;height:auto;border-radius:10px}
table{display:block;overflow-x:auto;border-collapse:collapse;margin:1em 0;font-size:.9em;max-width:100%;-webkit-overflow-scrolling:touch}
th,td{border:1px solid var(--border);padding:8px 10px;text-align:left;vertical-align:top;min-width:90px}
th{background:var(--surface2);font-weight:650}
.code{margin:1em 0;border-radius:14px;overflow:hidden;background:var(--code);border:1px solid rgba(255,255,255,.06)}
.code-head{display:flex;align-items:center;justify-content:space-between;padding:7px 10px 7px 14px;background:rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.06)}
.code-head span{font:600 10.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase;color:#8B949E}
.copy{font:600 11px/1 -apple-system,Roboto,sans-serif;color:#C9D1D9;background:rgba(255,255,255,.07);border:0;border-radius:999px;padding:6px 11px}
.copy.done{color:#0B0B0D;background:#D4FF4F}
pre{margin:0;padding:14px;overflow-x:auto;-webkit-overflow-scrolling:touch}
pre code{font:400 ${Math.round(fontSize * 0.8 * 10) / 10}px/1.6 ui-monospace,Menlo,"JetBrains Mono",monospace;color:#E6EDF3;white-space:pre;display:block}
.hljs i{font-style:normal}
.k,.o{color:#FF7B72}.b,.t,.v{color:#FFA657}.l,.n,.m,.a,.y{color:#79C0FF}.s,.r{color:#A5D6FF}.c{color:#8B949E;font-style:italic!important}
.f{color:#D2A8FF}.p,.u,.x{color:#E6EDF3}.e,.g{color:#7EE787}.h{color:#79C0FF;font-weight:700}
.ad{color:#AFF5B4;background:rgba(46,160,67,.15)}.de{color:#FFDCD7;background:rgba(248,81,73,.15)}.em{font-style:italic!important}.st{font-weight:700}
.ex-title{font-weight:700;font-size:1.02em;margin:1.4em 0 .4em}
</style></head><body><div id="c">${body}</div>
<script>
(function(){
  var post=function(m){window.ReactNativeWebView&&window.ReactNativeWebView.postMessage(JSON.stringify(m))};
  document.addEventListener('click',function(e){
    var t=e.target;
    while(t&&t!==document.body){
      if(t.classList&&t.classList.contains('copy')){
        e.preventDefault();
        var pre=t.closest('.code').querySelector('pre');
        post({type:'copy',text:pre?pre.innerText:''});
        t.textContent='Copied';t.classList.add('done');
        setTimeout(function(){t.textContent='Copy';t.classList.remove('done')},1400);
        return;
      }
      if(t.tagName==='A'&&t.getAttribute('href')){
        e.preventDefault();post({type:'link',href:t.href});return;
      }
      t=t.parentNode;
    }
  },true);
  ${opts.autoHeight ? `var last=0;var report=function(){var h=Math.ceil(document.getElementById('c').getBoundingClientRect().height);if(Math.abs(h-last)>1){last=h;post({type:'height',h:h})}};
  window.addEventListener('load',report);setTimeout(report,50);setTimeout(report,400);
  if(window.ResizeObserver){new ResizeObserver(report).observe(document.getElementById('c'))}` : ''}
})();
</script></body></html>`;
}

/** Escape plain text for embedding in HTML. */
export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
