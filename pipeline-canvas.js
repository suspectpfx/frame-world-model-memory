(function () {
  const canvas = document.querySelector('#frame-pipeline');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const images = {};
  const sources = {
    observed: 'media/world-model/libero_spatial_observation.jpg',
    predicted: 'media/world-model/libero_spatial_prediction.jpg',
    realized: 'media/world-model/libero_spatial_realized.jpg'
  };
  let animationFrame = 0;
  function schedule() {
    if (animationFrame) return;
    animationFrame = requestAnimationFrame((time) => {
      animationFrame = 0;
      draw(time);
    });
  }
  Object.entries(sources).forEach(([key, source]) => {
    const image = new Image();
    image.src = source;
    image.onload = () => { images[key] = image; schedule(); };
  });

  const C = {
    bg: '#080d15', panel: '#0e1723', panel2: '#111d2b', line: '#2c3a4c',
    text: '#edf4fc', muted: '#8fa2b8', cyan: '#67d5f2', blue: '#659af6',
    violet: '#ad91f5', mint: '#70d8ae', amber: '#f0bd70', red: '#ef8492'
  };
  let width = 1600;
  let height = 920;
  let scale = 1;

  function resize() {
    const box = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(box.width * dpr);
    canvas.height = Math.round(box.width * .575 * dpr);
    canvas.style.height = `${box.width * .575}px`;
    scale = canvas.width / width;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
  }
  function rr(x, y, w, h, r, fill, stroke=C.line, dash=[]) {
    ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill();
    ctx.setLineDash(dash); ctx.strokeStyle = stroke; ctx.lineWidth = 1.4; ctx.stroke(); ctx.setLineDash([]);
  }
  function text(value, x, y, size=16, color=C.text, weight=500, align='left') {
    ctx.font = `${weight} ${size}px Arial, Helvetica, sans-serif`;
    ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.fillText(value, x, y);
  }
  function multiline(lines, x, y, size=14, color=C.muted, gap=20, weight=500) {
    lines.forEach((line, index) => text(line, x, y + index * gap, size, color, weight));
  }
  function arrow(x1, y1, x2, y2, color=C.cyan, dashed=false, phase=0) {
    ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
    ctx.setLineDash(dashed ? [8, 8] : []); ctx.lineDashOffset = -phase;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]);
    const a = Math.atan2(y2-y1, x2-x1); ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2-10*Math.cos(a-.45), y2-10*Math.sin(a-.45));
    ctx.lineTo(x2-10*Math.cos(a+.45), y2-10*Math.sin(a+.45)); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  function route(points, color=C.cyan, dashed=false, phase=0) {
    ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=2; ctx.setLineDash(dashed?[8,8]:[]);ctx.lineDashOffset=-phase;
    ctx.beginPath(); points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();ctx.restore();
    const [a,b]=points.slice(-2);arrow(a[0],a[1],b[0],b[1],color,false);
  }
  function chip(label, x, y, color, active=true) {
    rr(x,y,label.length*8.2+28,27,13,active ? color+'22' : '#111722',color);
    text(label,x+14,y+19,11,active?color:C.muted,700);
  }
  function panelLabel(code, title, y, color) {
    chip(code, 28, y, color); text(title, 90, y+20, 18, C.text, 750);
  }
  function thumbnail(image, x, y, w, h, label, color) {
    rr(x,y,w,h,16,'#070b11',color);
    if (image) {
      ctx.save();ctx.beginPath();ctx.roundRect(x+5,y+5,w-10,h-34,12);ctx.clip();
      const s=Math.max((w-10)/image.width,(h-34)/image.height);const iw=image.width*s,ih=image.height*s;
      ctx.drawImage(image,x+5+(w-10-iw)/2,y+5+(h-34-ih)/2,iw,ih);ctx.restore();
    }
    text(label,x+w/2,y+h-10,11,color,700,'center');
  }
  function tensor(x,y,color,permuted=false) {
    for(let k=2;k>=0;k--){
      for(let row=0;row<4;row++)for(let col=0;col<4;col++){
        const v=permuted?((row*7+col*3+k)%8)/8:(row+col+k)/10;
        ctx.fillStyle=color;ctx.globalAlpha=.25+.65*v;ctx.fillRect(x+col*11+k*4,y+row*11-k*4,9,9);
      }
    } ctx.globalAlpha=1;
  }
  function card(x,y,w,h,title,lines,color=C.cyan, dashed=false) {
    rr(x,y,w,h,17,C.panel2,color+'66',dashed?[7,6]:[]);
    ctx.fillStyle=color;ctx.fillRect(x,y+18,3,h-36);
    text(title,x+18,y+30,15,C.text,750);multiline(lines,x+18,y+54,12,C.muted,18,500);
  }
  function outcomeMeter(x,y,w,label,value,color) {
    text(label,x,y,11,C.muted,600);rr(x,y+9,w,9,5,'#172333','#26364a');
    rr(x,y+9,w*value,9,5,color,color);text(value===1?'exact':'measured',x+w+10,y+18,10,color,700);
  }
  function draw(now) {
    const phase=(now/55)%16;
    ctx.clearRect(0,0,width,height);
    const bg=ctx.createLinearGradient(0,0,width,height);bg.addColorStop(0,'#0c1421');bg.addColorStop(.56,'#080d15');bg.addColorStop(1,'#101326');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);
    const glow=ctx.createRadialGradient(900,230,10,900,230,620);glow.addColorStop(0,'#21395588');glow.addColorStop(1,'#080d1500');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
    text('FRAME',28,44,25,C.text,850);text('CONSUMER-CONDITIONED MEMORY IN THE ACTION LOOP',148,43,12,C.cyan,750);
    chip('MEASURED PATH',1260,22,C.mint);chip('PROPOSED / GATED',1400,22,C.violet,false);
    ctx.strokeStyle=C.line;ctx.beginPath();ctx.moveTo(28,62);ctx.lineTo(1572,62);ctx.stroke();

    panelLabel('01','WRITE  ·  preserve information provenance',82,C.cyan);
    thumbnail(images.observed,28,121,142,126,'OBSERVATION',C.cyan);
    arrow(174,184,214,184,C.cyan);
    card(220,121,184,126,'Model input',['RGB + wrist','proprioception','capture time'],C.blue);
    arrow(408,184,448,184,C.cyan);
    card(454,109,220,150,'Representation',['fidelity  e','granularity  g','independent choices'],C.mint);
    tensor(603,187,C.mint,false);
    arrow(678,184,718,184,C.cyan);
    card(724,109,220,150,'Physical layout',['addressing  ℓ','inverse metadata  m','bytes are charged'],C.violet);
    tensor(873,187,C.violet,true);
    arrow(948,184,988,184,C.cyan);
    card(994,102,350,164,'Memory record',['payload  z  ·  tier  e  ·  grid  g','layout  ℓ  ·  metadata  m','capture / write timestamps','decoder + source provenance'],C.cyan);
    card(1370,110,202,142,'Information rule',['layout is reversible','pooling can be lossy','task utility decides'],C.amber);

    panelLabel('02','SERVE  ·  choose a compatible access and temporal channel',288,C.violet);
    card(28,330,215,142,'Consumer contract',['task loss  Lc','tolerance  εc','schema + deadline'],C.cyan);
    route([[247,400],[284,400],[284,361],[320,361]],C.cyan);
    route([[247,400],[284,400],[284,425],[320,425]],C.cyan);
    route([[247,400],[284,400],[284,489],[320,489]],C.cyan);
    card(326,326,188,58,'Direct return',[],C.mint);
    card(326,396,188,58,'Inverse / fused',[],C.violet);
    card(326,466,188,58,'Reobserve',[],C.amber,true);
    card(555,326,230,92,'Compatibility gate',['same payload meaning','fixed consumer output','correctness before cost'],C.blue);
    card(555,438,230,92,'Temporal gate',['age at action time','executed history','forecast target match'],C.violet,true);
    route([[518,355],[548,355]],C.mint);route([[518,425],[548,389]],C.violet);route([[518,495],[548,485]],C.amber,true,phase);
    card(835,334,255,188,'Feasibility selector',['policy-visible evidence only','calibrated upper bound  Uc','capacity / deadline checks','explicit fallback if infeasible'],C.cyan,true);
    outcomeMeter(1118,350,140,'inverse recovery',1,C.mint);
    outcomeMeter(1118,402,140,'task feasibility',.67,C.violet);
    outcomeMeter(1118,454,140,'deadline headroom',.54,C.amber);
    card(1305,334,267,188,'Constrained decision',['minimize bytes / latency / energy','subject to task distortion ≤ εc','and deadline / capacity limits'],C.mint);
    arrow(1095,426,1298,426,C.cyan);

    panelLabel('03','ACT  ·  world-action model changes the visited state',555,C.mint);
    thumbnail(images.observed,28,604,142,126,'POLICY INPUT',C.cyan);
    arrow(174,667,215,667,C.cyan);
    card(220,591,236,151,'Pretrained world-action model',['joint action proposal','future-image prediction','same weights / decoder'],C.blue);
    arrow(460,633,504,633,C.cyan);arrow(460,703,504,703,C.violet);
    card(510,592,180,74,'Action chunk',['16 × 7 controls'],C.mint);
    thumbnail(images.predicted,510,684,180,138,'PREDICTED t + 16',C.violet);
    arrow(694,629,741,629,C.mint);
    card(747,582,208,94,'Simulator / robot',['execute actual actions','advance physical state'],C.mint);
    arrow(959,629,1005,629,C.mint);
    thumbnail(images.realized,1012,590,180,138,'REALIZED t + 16',C.mint);
    arrow(1196,657,1237,657,C.cyan);
    card(1243,582,329,159,'Trace + evaluator',['proposed and executed actions','success / completion / steps','p50 / p95 / p99 latency','measured energy domain + bytes'],C.cyan);
    route([[851,681],[851,790],[337,790],[337,748]],C.violet,true,phase);
    text('executed action history conditions the next valid memory / prediction',508,813,12,C.violet,650,'center');

    rr(28,845,1544,48,15,'#0d1622','#28394d');
    text('Evidence boundary',48,875,12,C.amber,750);
    text('solid: executed / measured in current studies',174,875,12,C.muted,600);
    text('dashed: calibrated selector, imagination serving and latency-aware physics remain gated experiments',540,875,12,C.muted,600);
    schedule();
  }
  new ResizeObserver(() => { resize(); schedule(); }).observe(canvas);
  resize();
  schedule();
})();
