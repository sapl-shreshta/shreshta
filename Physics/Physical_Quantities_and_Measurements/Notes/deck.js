/* ============================================================
   Measurement Explorers — mascot + interactions
============================================================ */

/* ---------- Mezzo the measuring robot ---------- */
function mezzoSVG(pose){
  // pose: 'wave' | 'point' | 'happy' | 'think'
  const eyes = pose==='think'
    ? '<circle cx="78" cy="92" r="9" fill="#2b2d4a"/><circle cx="122" cy="92" r="9" fill="#2b2d4a"/>'
    : '<circle cx="78" cy="90" r="15" fill="#fff" stroke="#2b2d4a" stroke-width="4"/><circle cx="122" cy="90" r="15" fill="#fff" stroke="#2b2d4a" stroke-width="4"/>'+
      '<circle cx="81" cy="93" r="7" fill="#2b2d4a"/><circle cx="125" cy="93" r="7" fill="#2b2d4a"/>'+
      '<circle cx="84" cy="90" r="2.5" fill="#fff"/><circle cx="128" cy="90" r="2.5" fill="#fff"/>';
  const mouth = pose==='happy'
    ? '<path d="M82 116 Q100 138 118 116 Q100 128 82 116 Z" fill="#2b2d4a"/>'
    : '<path d="M84 118 Q100 132 116 118" fill="none" stroke="#2b2d4a" stroke-width="5" stroke-linecap="round"/>';
  const leftArm = pose==='wave'
    ? '<path d="M44 156 Q14 140 20 110" fill="none" stroke="#2b2d4a" stroke-width="11" stroke-linecap="round"/><circle cx="20" cy="106" r="13" fill="#ff6f61" stroke="#2b2d4a" stroke-width="4"/>'
    : '<path d="M44 158 Q22 168 22 192" fill="none" stroke="#2b2d4a" stroke-width="11" stroke-linecap="round"/><circle cx="22" cy="196" r="13" fill="#ff6f61" stroke="#2b2d4a" stroke-width="4"/>';
  const rightArm = pose==='point'
    ? '<path d="M156 150 Q188 140 196 116" fill="none" stroke="#2b2d4a" stroke-width="11" stroke-linecap="round"/><circle cx="198" cy="112" r="13" fill="#ff6f61" stroke="#2b2d4a" stroke-width="4"/>'
    : '<path d="M156 158 Q178 168 178 192" fill="none" stroke="#2b2d4a" stroke-width="11" stroke-linecap="round"/><circle cx="178" cy="196" r="13" fill="#ff6f61" stroke="#2b2d4a" stroke-width="4"/>';
  return `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" aria-label="Mezzo the measuring robot">
    <!-- antenna -->
    <line x1="100" y1="40" x2="100" y2="14" stroke="#2b2d4a" stroke-width="5"/>
    <rect x="90" y="2" width="20" height="20" rx="4" fill="#ffc83d" stroke="#2b2d4a" stroke-width="4" transform="rotate(45 100 12)"/>
    <!-- arms (behind body) -->
    ${leftArm}${rightArm}
    <!-- head -->
    <rect x="48" y="46" width="104" height="92" rx="26" fill="#36b6f0" stroke="#2b2d4a" stroke-width="6"/>
    <rect x="60" y="60" width="80" height="50" rx="16" fill="#dff3ff" stroke="#2b2d4a" stroke-width="4"/>
    ${eyes}${mouth}
    <!-- cheeks -->
    <circle cx="64" cy="108" r="7" fill="#ff85b3" opacity=".8"/>
    <circle cx="136" cy="108" r="7" fill="#ff85b3" opacity=".8"/>
    <!-- body = a little ruler -->
    <rect x="52" y="150" width="96" height="118" rx="20" fill="#ffc83d" stroke="#2b2d4a" stroke-width="6"/>
    <g stroke="#2b2d4a" stroke-width="4" stroke-linecap="round">
      <line x1="52" y1="172" x2="74" y2="172"/>
      <line x1="52" y1="190" x2="66" y2="190"/>
      <line x1="52" y1="208" x2="74" y2="208"/>
      <line x1="52" y1="226" x2="66" y2="226"/>
      <line x1="52" y1="244" x2="74" y2="244"/>
    </g>
    <text x="112" y="215" font-family="Fredoka, sans-serif" font-weight="700" font-size="40" fill="#2b2d4a" text-anchor="middle">cm</text>
    <!-- legs -->
    <rect x="68" y="266" width="20" height="22" rx="8" fill="#2b2d4a"/>
    <rect x="112" y="266" width="20" height="22" rx="8" fill="#2b2d4a"/>
  </svg>`;
}

function stampMascots(){
  document.querySelectorAll('.mascot').forEach(el=>{
    if(el.dataset.done) return;
    el.dataset.done="1";
    el.innerHTML = mezzoSVG(el.dataset.pose || 'happy');
  });
}

/* ---------- Flip cards ---------- */
function initFlips(){
  document.querySelectorAll('.flip').forEach(card=>{
    card.addEventListener('click', ()=> card.classList.toggle('flipped'));
  });
}

/* ---------- Interactive thermometer + converter ---------- */
function initThermo(){
  const slider = document.getElementById('thermo-slider');
  if(!slider) return;
  const merc = document.getElementById('merc');
  const cVal = document.getElementById('c-val');
  const kVal = document.getElementById('k-val');
  const fVal = document.getElementById('f-val');
  const note = document.getElementById('thermo-note');
  function update(){
    const c = +slider.value;
    // mercury fill: map -20..110 to 6..96 (% of tube height, from bottom)
    const pct = 6 + (c - (-20)) / (110 - (-20)) * 90;
    merc.style.height = pct + '%';
    cVal.textContent = c + '°C';
    kVal.textContent = (c + 273) + ' K';
    fVal.textContent = Math.round(c * 9/5 + 32) + '°F';
    // colour shifts warm/cold
    const hot = Math.max(0, Math.min(1, (c + 20)/130));
    merc.style.background = `linear-gradient(180deg, hsl(${(1-hot)*200 + 0} 90% 60%), hsl(${(1-hot)*200} 85% 50%))`;
    let msg = '🌡️ Comfy room temperature!';
    if(c <= 0) msg = '🧊 Freezing — water turns to ice!';
    else if(c < 15) msg = '🧥 Brrr, chilly — grab a jacket!';
    else if(c <= 30) msg = '😊 Nice and comfy!';
    else if(c < 38) msg = '🥵 Hot day — drink water!';
    else if(c < 60) msg = '🔥 Very hot — be careful!';
    else msg = '♨️ Scorching — water is boiling soon!';
    if(c >= 100) msg = '💨 100°C — water boils into steam!';
    note.textContent = msg;
  }
  slider.addEventListener('input', update);
  update();
}

/* ---------- Quiz ---------- */
function initQuiz(){
  const quiz = document.getElementById('quiz');
  if(!quiz) return;
  quiz.querySelectorAll('.q').forEach(q=>{
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

/* ---------- boot ---------- */
function boot(){ stampMascots(); initFlips(); initThermo(); initQuiz(); }
if(document.readyState !== 'loading') boot();
else document.addEventListener('DOMContentLoaded', boot);
