// Simple client-side calculator logic
function compute(op, a, b) {
  switch (op) {
    case 'add':
      return a + b;
    case 'sub':
      return a - b;
    case 'mul':
      return a * b;
    case 'div':
      if (b === 0) throw new Error('division by zero');
      return a / b;
    default:
      throw new Error('unsupported operation: ' + op);
  }
}

function formatResult(r) {
  if (Number.isFinite(r) && Math.abs(r - Math.round(r)) < 1e-9) return String(Math.round(r));
  return String(r);
}

window.addEventListener('DOMContentLoaded', () => {
  // Theme handling: restore or default to system preference
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('calc-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current = saved || (prefersDark ? 'dark' : 'light');
  if (current === 'dark') root.setAttribute('data-theme', 'dark');
  themeToggle.addEventListener('click', () => {
    const now = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (now === 'dark') root.setAttribute('data-theme', 'dark'); else root.removeAttribute('data-theme');
    localStorage.setItem('calc-theme', now);
  });

  const form = document.getElementById('calc-form');
  const op = document.getElementById('op');
  const aEl = document.getElementById('a');
  const bEl = document.getElementById('b');
  const calcBtn = document.getElementById('calc');
  const clearBtn = document.getElementById('clear');
  const resultEl = document.getElementById('result');

  calcBtn.addEventListener('click', () => {
    let a = parseFloat(aEl.value);
    let b = parseFloat(bEl.value);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      resultEl.textContent = 'Error: enter two numbers';
      return;
    }
    try {
      const r = compute(op.value, a, b);
      resultEl.textContent = formatResult(r);
    } catch (e) {
      resultEl.textContent = 'Error: ' + e.message;
    }
  });

  clearBtn.addEventListener('click', () => {
    aEl.value = '';
    bEl.value = '';
    resultEl.textContent = '—';
  });
});
