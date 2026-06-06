const progress = document.querySelector('.progress');
const tocLinks = [...document.querySelectorAll('.article-toc a')];
const targets = tocLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

function updateProgress() {
  if (progress) {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
  }

  if (!targets.length) return;
  let activeId = targets[0]?.id;
  for (const target of targets) {
    if (target.getBoundingClientRect().top < 140) activeId = target.id;
  }
  tocLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}

updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);