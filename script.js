// Hero görselleri ve isteğe bağlı proje açıklamaları.
const heroImages = ['assets/images/hero-1.jpeg','assets/images/hero-2.jpeg','assets/images/hero-3.jpeg'];
const projectDetails = {
  '1': { title: 'Merkezi Isıtma Sistemi Uygulaması', description: 'Merkezi ısıtma ve mekanik dağıtım sistemleri uygulaması.' },
  '2': { title: 'Kazan Dairesi ve Dağıtım Sistemi', description: 'Kazan dairesi mekanik tesisat ve boru dağıtım çalışmaları.' },
  '3': { title: 'Mekanik Tesisat Altyapı Uygulaması', description: 'Mekanik altyapı, pompa ve kolektör bağlantıları.' },
  '4': { title: 'Endüstriyel Borulama', description: 'Endüstriyel boru hattı ve bağlantı uygulamaları.' },
  '5': { title: 'Yangın Söndürme Tesisatı', description: 'Yangın söndürme altyapısı ve dağıtım sistemleri.' },
  '6': { title: 'Doğalgaz Hatları', description: 'Doğalgaz borulama ve tesisat uygulamaları.' },
};
let projects = [];
let heroIndex=0,projectPage=0,showAll=false;
const heroPhoto=document.getElementById('hero-photo');
const heroDots=document.getElementById('hero-dots');
const heroButtons = heroImages.map((_, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', (index + 1) + '. giriş görseli');
  button.addEventListener('click', () => showHero(index));
  heroDots.append(button);
  return button;
});

function showHero(index) {
  heroIndex = (index + heroImages.length) % heroImages.length;
  heroPhoto.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
  heroButtons.forEach((button, position) => {
    const selected = position === heroIndex;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

document.getElementById('hero-prev').addEventListener('click', () => showHero(heroIndex - 1));
document.getElementById('hero-next').addEventListener('click', () => showHero(heroIndex + 1));
showHero(0);

const projectGrid = document.getElementById('project-grid');
const projectDots = document.getElementById('project-dots');
const projectControls = document.querySelector('.project-controls');
const showAllButton = document.getElementById('show-all');
const mobileProjects = window.matchMedia('(max-width: 760px)');
let projectPageSize = mobileProjects.matches ? 1 : 3;

mobileProjects.addEventListener('change', event => {
  const firstProject = projectPage * projectPageSize;
  projectPageSize = event.matches ? 1 : 3;
  projectPage = Math.floor(firstProject / projectPageSize);
  renderProjects();
});

function renderProjects() {
  const pageCount = Math.ceil(projects.length / projectPageSize);
  const offset = showAll ? 0 : projectPage * projectPageSize;
  const shown = showAll ? projects : projects.slice(offset, offset + projectPageSize);
  const cards = shown.map((project, index) => {
    const card = document.createElement('button');
    card.className = 'project-card';
    card.dataset.project = offset + index;
    card.setAttribute('aria-label', project.title + ' detayları');

    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.title;
    image.loading = 'lazy';

    const title = document.createElement('strong');
    title.textContent = project.title;
    card.append(image, title);
    return card;
  });
  projectGrid.replaceChildren(...cards);
  if (!cards.length) projectGrid.textContent = 'Henüz proje görseli eklenmedi.';

  const paginate = !showAll && pageCount > 1;
  projectDots.replaceChildren();
  if (paginate) {
    for (let page = 0; page < pageCount; page++) {
      const dot = document.createElement('button');
      dot.classList.toggle('active', page === projectPage);
      dot.dataset.page = page;
      if (page === projectPage) dot.setAttribute('aria-current', 'true');
      dot.setAttribute('aria-label', (page + 1) + '. proje sayfası');
      projectDots.append(dot);
    }
  }
  projectControls.style.display = paginate ? 'flex' : 'none';
  showAllButton.hidden = pageCount < 2 && !showAll;
}

async function loadProjects() {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('Project request failed');
    const names = await response.json();
    projects = names.map(name => {
      const slug = name.slice('proje-'.length, name.lastIndexOf('.'));
      const details = Object.hasOwn(projectDetails, slug) ? projectDetails[slug] : null;
      return {
        title: details?.title ?? 'Proje ' + slug.replace(/[-_]+/g, ' '),
        description: details?.description ?? '',
        image: 'assets/images/' + encodeURIComponent(name)
      };
    });
    renderProjects();
  } catch {
    projectGrid.textContent = 'Proje görselleri yüklenemedi.';
  }
}

function moveProjects(delta) {
  const pageCount = Math.ceil(projects.length / projectPageSize);
  if (pageCount < 2) return;
  projectPage = (projectPage + delta + pageCount) % pageCount;
  renderProjects();
}
document.getElementById('project-prev').addEventListener('click', () => moveProjects(-1));
document.getElementById('project-next').addEventListener('click', () => moveProjects(1));
projectDots.addEventListener('click', event => {
  const dot = event.target.closest('[data-page]');
  if (!dot) return;
  projectPage = Number(dot.dataset.page);
  renderProjects();
  projectDots.children[projectPage]?.focus();
});
showAllButton.addEventListener('click', () => {
  showAll = !showAll;
  showAllButton.setAttribute('aria-expanded', String(showAll));
  showAllButton.textContent = showAll ? 'Daha Az Göster ↑' : 'Tüm Projeleri Gör →';
  renderProjects();
});
loadProjects();
const modal=document.getElementById('project-modal');projectGrid.addEventListener('click',e=>{const b=e.target.closest('[data-project]');if(!b)return;const p=projects[Number(b.dataset.project)];document.getElementById('modal-image').src=p.image;document.getElementById('modal-image').alt=p.title;document.getElementById('modal-title').textContent=p.title;document.getElementById('modal-description').textContent=p.description;modal.hidden=false;document.body.style.overflow='hidden';});
function closeModal(){modal.hidden=true;document.body.style.overflow='';}modal.addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeModal();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
const menuToggle=document.querySelector('.menu-toggle'),navLinks=document.querySelector('.nav-links');menuToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');});navLinks.addEventListener('click',e=>{if(e.target.closest('a')){navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Menüyü aç');}});document.getElementById('year').textContent=new Date().getFullYear();

const founderPhoto = document.getElementById('founder-photo');
function showFounderPhoto() {
  if (founderPhoto.naturalWidth > 0) founderPhoto.hidden = false;
}
founderPhoto.addEventListener('load', showFounderPhoto);
showFounderPhoto();

async function loadReferences() {
  const grid = document.getElementById('reference-grid');
  const status = document.getElementById('reference-status');
  const controls = document.getElementById('reference-controls');
  const toggle = document.getElementById('reference-toggle');
  const pageLabel = document.getElementById('reference-page');

  try {
    const response = await fetch('/assets/referanslar.json');
    if (!response.ok) throw new Error('Reference request failed');
    const references = await response.json();
    const cards = references.map(({ companyName, url }) => {
      const card = document.createElement('li');
      const logo = document.createElement('img');
      logo.alt = companyName;
      logo.loading = 'lazy';
      logo.referrerPolicy = 'no-referrer';
      logo.addEventListener('error', event => {
        console.error('Referans logosu yüklenemedi:', { companyName, url: logo.currentSrc || logo.src, error: event });

        const fallback = document.createElement('span');
        fallback.className = 'reference-placeholder';
        fallback.textContent = companyName;
        card.replaceChildren(fallback);
      }, { once: true });
      card.append(logo);
      logo.src = url;
      return card;
    });

    grid.replaceChildren(...cards);
    status.textContent = cards.length ? '' : 'Henüz referans eklenmedi.';

    const getPageSize = () => Number(getComputedStyle(grid).getPropertyValue('--reference-columns'));
    let pageSize = getPageSize();
    let pageIndex = 0;
    let showAllReferences = false;
    function updateGrid() {
      const pageCount = Math.ceil(cards.length / pageSize);
      const first = pageIndex * pageSize;
      const end = Math.min(first + pageSize, cards.length);
      cards.forEach((card, index) => {
        card.hidden = !showAllReferences && (index < first || index >= end);
      });
      controls.hidden = pageCount <= 1 || showAllReferences;
      toggle.hidden = pageCount <= 1 && !showAllReferences;
      pageLabel.textContent = controls.hidden ? '' : `${first + 1}–${end} / ${cards.length} referans`;
      grid.classList.toggle('show-all', showAllReferences);
    }
    function move(delta) {
      const pageCount = Math.ceil(cards.length / pageSize);
      if (showAllReferences || pageCount <= 1) return;
      pageIndex = (pageIndex + delta + pageCount) % pageCount;
      updateGrid();
    }
    toggle.addEventListener('click', () => {
      showAllReferences = !showAllReferences;
      toggle.setAttribute('aria-expanded', String(showAllReferences));
      toggle.textContent = showAllReferences ? 'Daha az göster' : 'Tüm referansları göster';
      updateGrid();
    });
    document.getElementById('reference-prev').addEventListener('click', () => move(-1));
    document.getElementById('reference-next').addEventListener('click', () => move(1));
    controls.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    });

    let touchStart;
    grid.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch' || !event.isPrimary) return;
      touchStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
    });
    grid.addEventListener('pointercancel', event => {
      if (touchStart?.id === event.pointerId) touchStart = undefined;
    });
    grid.addEventListener('pointerup', event => {
      if (touchStart?.id !== event.pointerId) return;
      const dx = event.clientX - touchStart.x;
      const dy = event.clientY - touchStart.y;
      touchStart = undefined;
      if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
    });

    window.addEventListener('resize', () => {
      const nextSize = getPageSize();
      if (nextSize === pageSize) return;
      pageIndex = Math.floor(pageIndex * pageSize / nextSize);
      pageSize = nextSize;
      updateGrid();
    });
    updateGrid();
  } catch {
    status.textContent = 'Referanslar yüklenemedi. PDF kataloğunu indirebilirsiniz.';
  }
}
loadReferences();
