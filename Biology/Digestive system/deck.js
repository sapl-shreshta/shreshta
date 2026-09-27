/* ============================================================
   Human Digestive System — mascot + interactions
============================================================ */

/* ---------- Gutsy the friendly tummy ---------- */
function gutsySVG(pose){
  // pose: 'wave' | 'point' | 'happy' | 'think'
  const eyes = pose==='think'
    ? '<circle cx="78" cy="112" r="9" fill="#2b2d4a"/><circle cx="122" cy="112" r="9" fill="#2b2d4a"/>'
    : '<circle cx="78" cy="110" r="15" fill="#fff" stroke="#2b2d4a" stroke-width="4"/><circle cx="122" cy="110" r="15" fill="#fff" stroke="#2b2d4a" stroke-width="4"/>'+
      '<circle cx="81" cy="113" r="7" fill="#2b2d4a"/><circle cx="125" cy="113" r="7" fill="#2b2d4a"/>'+
      '<circle cx="84" cy="110" r="2.5" fill="#fff"/><circle cx="128" cy="110" r="2.5" fill="#fff"/>';
  const mouth = pose==='happy'
    ? '<path d="M78 138 Q100 162 122 138 Q100 152 78 138 Z" fill="#2b2d4a"/>'
    : '<path d="M80 140 Q100 154 120 140" fill="none" stroke="#2b2d4a" stroke-width="5" stroke-linecap="round"/>';
  const leftArm = pose==='wave'
    ? '<path d="M48 176 Q16 158 22 126" fill="none" stroke="#2b2d4a" stroke-width="11" stroke-linecap="round"/><circle cx="22" cy="122" r="13" fill="#ff9e45" stroke="#2b2d4a" stroke-width="4"/>'
    : '<path d="M48 178 Q26 190 26 214" fill="none" stroke="#2b2d4a" stroke-width="11" stroke-linecap="round"/><circle cx="26" cy="218" r="13" fill="#ff9e45" stroke="#2b2d4a" stroke-width="4"/>';
  const rightArm = pose==='point'
    ? '<path d="M152 172 Q186 158 196 130" fill="none" stroke="#2b2d4a" stroke-width="11" stroke-linecap="round"/><circle cx="198" cy="126" r="13" fill="#ff9e45" stroke="#2b2d4a" stroke-width="4"/>'
    : '<path d="M152 178 Q174 190 174 214" fill="none" stroke="#2b2d4a" stroke-width="11" stroke-linecap="round"/><circle cx="174" cy="218" r="13" fill="#ff9e45" stroke="#2b2d4a" stroke-width="4"/>';
  return `<svg viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg" aria-label="Gutsy the friendly tummy">
    <!-- arms (behind body) -->
    ${leftArm}${rightArm}
    <!-- body: a big friendly stomach pouch -->
    <path d="M110 34 C60 34 34 78 34 128 C34 190 66 246 110 246 C154 246 186 190 186 128 C186 78 160 34 110 34 Z"
      fill="#ff85b3" stroke="#2b2d4a" stroke-width="6"/>
    <!-- tummy highlight -->
    <path d="M70 70 C58 96 54 122 58 150" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity=".5"/>
    <!-- face patch -->
    <ellipse cx="100" cy="112" rx="62" ry="46" fill="#fff0f5" stroke="#2b2d4a" stroke-width="4"/>
    ${eyes}${mouth}
    <!-- cheeks -->
    <circle cx="64" cy="128" r="7" fill="#ff6ec7" opacity=".8"/>
    <circle cx="156" cy="128" r="7" fill="#ff6ec7" opacity=".8"/>
    <!-- little feet -->
    <ellipse cx="82" cy="256" rx="16" ry="10" fill="#2b2d4a"/>
    <ellipse cx="138" cy="256" rx="16" ry="10" fill="#2b2d4a"/>
    <!-- sparkle -->
    <path d="M182 46 L188 60 L202 66 L188 72 L182 86 L176 72 L162 66 L176 60 Z" fill="#ffc83d" stroke="#2b2d4a" stroke-width="3"/>
  </svg>`;
}

function stampMascots(){
  document.querySelectorAll('.mascot').forEach(el=>{
    if(el.dataset.done) return;
    el.dataset.done="1";
    el.innerHTML = gutsySVG(el.dataset.pose || 'happy');
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

/* ---------- Interactive tooth-label diagram ---------- */
function initToothLabels(){
  const wrap = document.querySelector('.tooth-diagram');
  if(!wrap) return;
  const scope = wrap.closest('.slide') || document;
  wrap.querySelectorAll('.tooth-hot').forEach(dot=>{
    dot.addEventListener('click', ()=>{
      wrap.querySelectorAll('.tooth-hot').forEach(d=>d.classList.remove('active'));
      dot.classList.add('active');
      const label = dot.dataset.label, info = dot.dataset.info;
      const panel = scope.querySelector('.tooth-info');
      if(panel){
        panel.querySelector('.ti-label').textContent = label;
        panel.querySelector('.ti-info').textContent = info;
        panel.classList.add('show');
      }
    });
  });
}

/* ---------- boot ---------- */
function boot(){ stampMascots(); initFlips(); initQuiz(); initToothLabels(); }
if(document.readyState !== 'loading') boot();
else document.addEventListener('DOMContentLoaded', boot);
