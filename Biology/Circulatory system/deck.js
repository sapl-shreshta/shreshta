/* ============================================================
   Human Circulatory System — mascot + interactions
============================================================ */

/* ---------- Pumpy the friendly heart ---------- */
function pumpySVG(pose){
  // pose: 'wave' | 'point' | 'happy' | 'think'
  const eyes = pose==='think'
    ? '<circle cx="88" cy="104" r="9" fill="#2b2d4a"/><circle cx="132" cy="104" r="9" fill="#2b2d4a"/>'
    : '<circle cx="88" cy="102" r="15" fill="#fff" stroke="#2b2d4a" stroke-width="4"/><circle cx="132" cy="102" r="15" fill="#fff" stroke="#2b2d4a" stroke-width="4"/>'+
      '<circle cx="91" cy="105" r="7" fill="#2b2d4a"/><circle cx="135" cy="105" r="7" fill="#2b2d4a"/>'+
      '<circle cx="94" cy="102" r="2.5" fill="#fff"/><circle cx="138" cy="102" r="2.5" fill="#fff"/>';
  const mouth = pose==='happy' || pose==='wave'
    ? '<path d="M90 130 Q110 154 130 130 Q110 144 90 130 Z" fill="#2b2d4a"/>'
    : '<path d="M92 134 Q110 146 128 134" fill="none" stroke="#2b2d4a" stroke-width="5" stroke-linecap="round"/>';
  const leftArm = pose==='wave'
    ? '<path d="M34 130 Q8 112 14 80" fill="none" stroke="#2b2d4a" stroke-width="11" stroke-linecap="round"/><circle cx="14" cy="76" r="13" fill="#ffd3d0" stroke="#2b2d4a" stroke-width="4"/>'
    : '<path d="M34 140 Q14 156 16 182" fill="none" stroke="#2b2d4a" stroke-width="11" stroke-linecap="round"/><circle cx="16" cy="186" r="13" fill="#ffd3d0" stroke="#2b2d4a" stroke-width="4"/>';
  const rightArm = pose==='point'
    ? '<path d="M186 130 Q212 116 214 86" fill="none" stroke="#2b2d4a" stroke-width="11" stroke-linecap="round"/><circle cx="214" cy="82" r="13" fill="#ffd3d0" stroke="#2b2d4a" stroke-width="4"/>'
    : '<path d="M186 140 Q206 156 204 182" fill="none" stroke="#2b2d4a" stroke-width="11" stroke-linecap="round"/><circle cx="204" cy="186" r="13" fill="#ffd3d0" stroke="#2b2d4a" stroke-width="4"/>';
  return `<svg viewBox="0 0 228 290" xmlns="http://www.w3.org/2000/svg" aria-label="Pumpy the friendly heart">
    ${leftArm}${rightArm}
    <!-- little legs -->
    <path d="M98 238 L92 266" stroke="#2b2d4a" stroke-width="9" stroke-linecap="round"/>
    <path d="M122 238 L128 266" stroke="#2b2d4a" stroke-width="9" stroke-linecap="round"/>
    <ellipse cx="86" cy="270" rx="16" ry="9" fill="#2b2d4a"/>
    <ellipse cx="134" cy="270" rx="16" ry="9" fill="#2b2d4a"/>
    <!-- heart body -->
    <path d="M110 244 C40 190 22 140 22 98 C22 56 50 30 82 30 C98 30 104 38 110 50 C116 38 122 30 138 30 C170 30 198 56 198 98 C198 140 180 190 110 244 Z"
      fill="#ff6f61" stroke="#2b2d4a" stroke-width="6" stroke-linejoin="round"/>
    <!-- shine -->
    <path d="M52 76 C46 92 46 110 52 126" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".55"/>
    <!-- face patch -->
    <ellipse cx="110" cy="114" rx="52" ry="42" fill="#ffe5e0" stroke="#2b2d4a" stroke-width="4"/>
    ${eyes}${mouth}
    <circle cx="70" cy="126" r="7" fill="#ff85b3" opacity=".9"/>
    <circle cx="150" cy="126" r="7" fill="#ff85b3" opacity=".9"/>
    <!-- sparkle -->
    <path d="M196 10 L201 22 L213 27 L201 32 L196 44 L191 32 L179 27 L191 22 Z" fill="#ffc83d" stroke="#2b2d4a" stroke-width="3"/>
  </svg>`;
}

function stampMascots(){
  document.querySelectorAll('.mascot').forEach(el=>{
    if(el.dataset.done) return;
    el.dataset.done = "1";
    el.innerHTML = pumpySVG(el.dataset.pose || 'happy');
  });
}

/* ---------- Flip cards ---------- */
function initFlips(){
  document.querySelectorAll('.flip').forEach(card=>{
    card.addEventListener('click', ()=> card.classList.toggle('flipped'));
  });
}

/* ---------- Quiz ---------- */
function initQuiz(){
  document.querySelectorAll('.q').forEach(q=>{
    const fb = q.querySelector('.q-fb');
    q.querySelectorAll('.opt').forEach(opt=>{
      opt.addEventListener('click', ()=>{
        if(q.dataset.answered) return;
        q.dataset.answered = "1";
        const correct = opt.dataset.correct === "1";
        opt.classList.add(correct ? 'right' : 'wrong');
        if(!correct){
          const c = q.querySelector('.opt[data-correct="1"]');
          if(c) c.classList.add('right');
        }
        fb.textContent = correct ? '🎉 ' + (q.dataset.yes || 'Correct! Nice work!') : '💡 ' + (q.dataset.no || 'Good try! The glowing one is right.');
        fb.classList.add('show', correct ? 'ok' : 'no');
      });
    });
  });
}

/* ---------- Clickable hotspot diagrams ---------- */
function initHotspots(){
  document.querySelectorAll('.hot-diagram').forEach(wrap=>{
    const scope = wrap.closest('.slide') || document;
    const panel = scope.querySelector('.hot-info');
    wrap.querySelectorAll('.hot').forEach(dot=>{
      dot.addEventListener('click', ()=>{
        wrap.querySelectorAll('.hot').forEach(d=>d.classList.remove('active'));
        dot.classList.add('active');
        if(panel){
          panel.querySelector('.hi-label').textContent = dot.dataset.label;
          panel.querySelector('.hi-info').textContent = dot.dataset.info;
        }
      });
    });
  });
}

/* ---------- Cardiac cycle stepper ---------- */
const CC_PHASES = [
  { name:'1. Atrial systole', time:'0.1 s', squeeze:['ra','la'], open:['tri','bi'], arrows:['a-tri','a-bi'], sound:'',
    text:'Both atria contract and push the last of the blood (about 30%) down into the ventricles. AV valves are open; semilunar valves stay shut.' },
  { name:'2. Ventricular systole', time:'0.3 s', squeeze:['rv','lv'], open:['pul','aor'], arrows:['a-pul','a-aor'], sound:'“LUBB” 🔊',
    text:'Ventricles contract. The rising pressure slams the AV valves shut (first sound, LUBB), pushes the semilunar valves open, and blood rushes into the pulmonary artery and aorta.' },
  { name:'3. Joint diastole', time:'0.4 s', squeeze:[], open:['tri','bi'], arrows:['a-svc','a-pv','a-tri','a-bi'], sound:'“DUP” 🔊',
    text:'All four chambers relax. The semilunar valves snap shut (second sound, DUP) so blood can’t flow back. Blood from the veins fills the atria and flows straight on into the ventricles (about 70% of filling).' }
];
function initCardiacCycle(){
  const root = document.querySelector('.cc-widget');
  if(!root) return;
  let i = 0, timer = null;
  const svg = root.querySelector('.cc-svg');
  const segs = root.querySelectorAll('.cc-seg');
  const name = root.querySelector('.cc-name'), text = root.querySelector('.cc-text'), sound = root.querySelector('.cc-sound');
  const playBtn = root.querySelector('[data-cc="play"]');
  function show(n){
    i = (n + CC_PHASES.length) % CC_PHASES.length;
    const p = CC_PHASES[i];
    svg.querySelectorAll('.chamber').forEach(c=>c.classList.toggle('squeeze', p.squeeze.includes(c.dataset.ch)));
    svg.querySelectorAll('.valve').forEach(v=>v.classList.toggle('open', p.open.includes(v.dataset.v)));
    svg.querySelectorAll('.flowarr').forEach(a=>a.classList.toggle('on', p.arrows.includes(a.dataset.a)));
    segs.forEach((s,k)=>s.classList.toggle('on', k===i));
    name.textContent = p.name + ' · ' + p.time;
    text.textContent = p.text;
    sound.textContent = p.sound || ' ';
  }
  function stop(){ clearTimeout(timer); timer = null; playBtn.textContent = '▶ Play'; }
  function loop(){
    show(i + 1);
    const ms = [600, 1500, 1900][i];   // 0.1 : 0.3 : 0.4 s, slowed down so eyes can follow
    timer = setTimeout(loop, ms);
  }
  root.querySelector('[data-cc="prev"]').addEventListener('click', ()=>{ stop(); show(i - 1); });
  root.querySelector('[data-cc="next"]').addEventListener('click', ()=>{ stop(); show(i + 1); });
  playBtn.addEventListener('click', ()=>{
    if(timer){ stop(); return; }
    playBtn.textContent = '⏸ Pause';
    timer = setTimeout(loop, 400);
  });
  segs.forEach((s,k)=>s.addEventListener('click', ()=>{ stop(); show(k); }));
  show(0);
}

/* ---------- Blood transfusion checker (ABO) ---------- */
const BG = {
  A:  { antigens:['A'],     antibodies:['B'] },
  B:  { antigens:['B'],     antibodies:['A'] },
  AB: { antigens:['A','B'], antibodies:[] },
  O:  { antigens:[],        antibodies:['A','B'] }
};
function initTransfusion(){
  const root = document.querySelector('.tx-widget');
  if(!root) return;
  const pick = { donor:null, recipient:null };
  const out = root.querySelector('.tx-result');
  root.querySelectorAll('.bg-pick').forEach(group=>{
    const role = group.dataset.role;
    group.querySelectorAll('.btn').forEach(b=>{
      b.addEventListener('click', ()=>{
        group.querySelectorAll('.btn').forEach(x=>x.classList.remove('sel'));
        b.classList.add('sel');
        pick[role] = b.dataset.bg;
        update();
      });
    });
  });
  function update(){
    const {donor, recipient} = pick;
    out.classList.remove('ok','no');
    if(!donor || !recipient){ out.textContent = '👆 Pick a donor and a recipient'; return; }
    const clash = BG[donor].antigens.filter(a => BG[recipient].antibodies.includes(a));
    if(clash.length === 0){
      out.classList.add('ok');
      out.textContent = `✅ Safe! ${donor} → ${recipient}. The recipient has no antibodies against the donor’s red cells.`;
    } else {
      out.classList.add('no');
      out.textContent = `❌ Clumping! ${recipient} blood has anti-${clash.join(' and anti-')} antibodies that attack ${donor} red cells.`;
    }
  }
  update();
}

/* ---------- Pulse tapper + 15-second timer ---------- */
function initPulse(){
  const root = document.querySelector('.pulse-widget');
  if(!root) return;
  const tapBtn = root.querySelector('.tap-btn'), out = root.querySelector('.bpm-out');
  const timerBtn = root.querySelector('[data-pulse="timer"]'), timerOut = root.querySelector('.timer-out');
  let taps = [];
  tapBtn.addEventListener('click', ()=>{
    const now = performance.now();
    if(taps.length && now - taps[taps.length-1] > 2500) taps = [];   // long pause → start over
    taps.push(now);
    if(taps.length > 9) taps.shift();
    tapBtn.classList.add('beat'); setTimeout(()=>tapBtn.classList.remove('beat'), 90);
    if(taps.length >= 3){
      const avg = (taps[taps.length-1] - taps[0]) / (taps.length - 1);
      out.textContent = Math.round(60000 / avg);
    } else out.textContent = '…';
  });
  root.querySelector('[data-pulse="reset"]').addEventListener('click', ()=>{ taps = []; out.textContent = '—'; });
  let t = null;
  timerBtn.addEventListener('click', ()=>{
    if(t) return;
    let left = 15;
    timerOut.textContent = `⏱️ ${left} s — count the beats!`;
    t = setInterval(()=>{
      left--;
      if(left > 0) timerOut.textContent = `⏱️ ${left} s — count the beats!`;
      else { clearInterval(t); t = null; timerOut.textContent = '🛑 Stop! Multiply your count by 4.'; }
    }, 1000);
  });
}

/* ---------- boot ---------- */
function boot(){ stampMascots(); initFlips(); initQuiz(); initHotspots(); initCardiacCycle(); initTransfusion(); initPulse(); }
if(document.readyState !== 'loading') boot();
else document.addEventListener('DOMContentLoaded', boot);
