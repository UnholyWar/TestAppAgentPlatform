// Görselleri ve proje açıklamalarını yalnızca bu dosyadan değiştirebilirsiniz.
const heroImages = ['assets/images/hero-1.jpg','assets/images/hero-2.jpg','assets/images/hero-3.jpg'];
const projects = [
 {title:'Merkezi Isıtma Sistemi Uygulaması',image:'assets/images/proje-1.jpg',description:'Merkezi ısıtma ve mekanik dağıtım sistemleri uygulaması.'},
 {title:'Kazan Dairesi ve Dağıtım Sistemi',image:'assets/images/proje-2.jpg',description:'Kazan dairesi mekanik tesisat ve boru dağıtım çalışmaları.'},
 {title:'Mekanik Tesisat Altyapı Uygulaması',image:'assets/images/proje-3.jpg',description:'Mekanik altyapı, pompa ve kolektör bağlantıları.'},
 {title:'Endüstriyel Borulama',image:'assets/images/proje-4.jpg',description:'Endüstriyel boru hattı ve bağlantı uygulamaları.'},
 {title:'Yangın Söndürme Tesisatı',image:'assets/images/proje-5.jpg',description:'Yangın söndürme altyapısı ve dağıtım sistemleri.'},
 {title:'Doğalgaz Hatları',image:'assets/images/proje-6.jpg',description:'Doğalgaz borulama ve tesisat uygulamaları.'}
];
let heroIndex=0,projectPage=0,showAll=false;
const heroPhoto=document.getElementById('hero-photo');
const heroDots=document.getElementById('hero-dots');
function renderHero(){heroPhoto.style.backgroundImage=`url('${heroImages[heroIndex]}')`;heroDots.innerHTML=heroImages.map((_,i)=>`<button aria-label="${i+1}. slayt" class="${i===heroIndex?'active':''}" data-slide="${i}"></button>`).join('');}
function changeHero(delta){heroIndex=(heroIndex+delta+heroImages.length)%heroImages.length;renderHero();}
document.getElementById('hero-prev').addEventListener('click',()=>changeHero(-1));document.getElementById('hero-next').addEventListener('click',()=>changeHero(1));heroDots.addEventListener('click',e=>{const b=e.target.closest('[data-slide]');if(b){heroIndex=Number(b.dataset.slide);renderHero();}});renderHero();
const projectGrid=document.getElementById('project-grid');const projectDots=document.getElementById('project-dots');
function renderProjects(){const shown=showAll?projects:projects.slice(projectPage*3,projectPage*3+3);projectGrid.innerHTML=shown.map(p=>`<button class="project-card" data-project="${projects.indexOf(p)}" aria-label="${p.title} detayları"><img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.style.opacity='.12'"><strong>${p.title}</strong></button>`).join('');projectDots.innerHTML=showAll?'':Array.from({length:Math.ceil(projects.length/3)},(_,i)=>`<button class="${i===projectPage?'active':''}" data-page="${i}" aria-label="${i+1}. proje sayfası"></button>`).join('');document.querySelector('.project-controls').style.display=showAll?'none':'flex';}
function moveProjects(delta){projectPage=(projectPage+delta+Math.ceil(projects.length/3))%Math.ceil(projects.length/3);renderProjects();}
document.getElementById('project-prev').addEventListener('click',()=>moveProjects(-1));document.getElementById('project-next').addEventListener('click',()=>moveProjects(1));projectDots.addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(b){projectPage=Number(b.dataset.page);renderProjects();}});
document.getElementById('show-all').addEventListener('click',e=>{showAll=!showAll;e.currentTarget.textContent=showAll?'Daha Az Göster ↑':'Tüm Projeleri Gör →';renderProjects();});renderProjects();
const modal=document.getElementById('project-modal');projectGrid.addEventListener('click',e=>{const b=e.target.closest('[data-project]');if(!b)return;const p=projects[Number(b.dataset.project)];document.getElementById('modal-image').src=p.image;document.getElementById('modal-image').alt=p.title;document.getElementById('modal-title').textContent=p.title;document.getElementById('modal-description').textContent=p.description;modal.hidden=false;document.body.style.overflow='hidden';});
function closeModal(){modal.hidden=true;document.body.style.overflow='';}modal.addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeModal();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
const menuToggle=document.querySelector('.menu-toggle'),navLinks=document.querySelector('.nav-links');menuToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');});navLinks.addEventListener('click',e=>{if(e.target.closest('a')){navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}});document.getElementById('year').textContent=new Date().getFullYear();
