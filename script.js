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
function renderHero(){heroPhoto.style.backgroundImage=`url('${heroImages[heroIndex]}')`;heroDots.innerHTML=heroImages.map((_,i)=>`<button aria-label="${i+1}. slayt" class="${i===heroIndex?'active':''}" data-slide="${i}"></button>`).join('');}
function changeHero(delta){heroIndex=(heroIndex+delta+heroImages.length)%heroImages.length;renderHero();}
document.getElementById('hero-prev').addEventListener('click',()=>changeHero(-1));document.getElementById('hero-next').addEventListener('click',()=>changeHero(1));heroDots.addEventListener('click',e=>{const b=e.target.closest('[data-slide]');if(b){heroIndex=Number(b.dataset.slide);renderHero();}});renderHero();
const projectGrid = document.getElementById('project-grid');
const projectDots = document.getElementById('project-dots');
const projectControls = document.querySelector('.project-controls');
const showAllButton = document.getElementById('show-all');
const pageSize = 3;

function renderProjects() {
  const pageCount = Math.ceil(projects.length / pageSize);
  const offset = showAll ? 0 : projectPage * pageSize;
  const shown = showAll ? projects : projects.slice(offset, offset + pageSize);
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
      dot.setAttribute('aria-label', (page + 1) + '. proje sayfası');
      projectDots.append(dot);
    }
  }
  projectControls.style.display = paginate ? 'flex' : 'none';
  showAllButton.hidden = pageCount < 2;
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
  const pageCount = Math.ceil(projects.length / pageSize);
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
});
showAllButton.addEventListener('click', () => {
  showAll = !showAll;
  showAllButton.textContent = showAll ? 'Daha Az Göster ↑' : 'Tüm Projeleri Gör →';
  renderProjects();
});
loadProjects();
const modal=document.getElementById('project-modal');projectGrid.addEventListener('click',e=>{const b=e.target.closest('[data-project]');if(!b)return;const p=projects[Number(b.dataset.project)];document.getElementById('modal-image').src=p.image;document.getElementById('modal-image').alt=p.title;document.getElementById('modal-title').textContent=p.title;document.getElementById('modal-description').textContent=p.description;modal.hidden=false;document.body.style.overflow='hidden';});
function closeModal(){modal.hidden=true;document.body.style.overflow='';}modal.addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeModal();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
const menuToggle=document.querySelector('.menu-toggle'),navLinks=document.querySelector('.nav-links');menuToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');});navLinks.addEventListener('click',e=>{if(e.target.closest('a')){navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}});document.getElementById('year').textContent=new Date().getFullYear();
