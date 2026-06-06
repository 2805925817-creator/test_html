function openModal() {
  document.getElementById('contactModal').classList.add('active');
}

function closeModal() {
  document.getElementById('contactModal').classList.remove('active');
}

document.getElementById('contactModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

const sections = Array.from(document.querySelectorAll('.page section, .page .footer-note'));
let current = 0;
let locked = false;

function goTo(index) {
  if (index < 0 || index >= sections.length) return;
  current = index;
  sections[current].scrollIntoView({ behavior: 'smooth' });
  locked = true;
  setTimeout(() => { locked = false; }, 800);
}

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (locked) return;
  if (e.deltaY > 0) goTo(current + 1);
  else goTo(current - 1);
}, { passive: false });

window.addEventListener('keydown', (e) => {
  if (locked) return;
  if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(current + 1); }
  if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goTo(current - 1); }
});
