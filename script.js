document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.8);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const zones = {
  plaza: {
    title: ['THE', 'PLAZA'],
    name: 'The Plaza',
    kicker: 'Public heart of CITARA',
    description: 'Ruang publik utama yang mempertemukan aktivitas retail, kuliner, pertunjukan, dan komunitas dalam satu plaza tropis yang terbuka.',
    facilities: ['Amphitheater', 'Community events', 'Retail promenade'],
    image: 'assets/the-plaza.png',
    alt: 'The Plaza at CITARA'
  },
  garden: {
    title: ['GARDEN', 'ROOF'],
    name: 'Garden Roof',
    kicker: 'Landscape above the city',
    description: 'Taman bertingkat yang menghubungkan lanskap, jalur pedestrian, area duduk, dan ruang reflektif di atas bangunan.',
    facilities: ['Urban garden', 'Walking trail', 'View deck'],
    image: 'assets/garden-roof.png',
    alt: 'CITARA Garden Roof'
  },
  lifestyle: {
    title: ['LIFESTYLE', 'HUB'],
    name: 'Nusantara Social Club',
    kicker: 'The lifestyle hub',
    description: 'Social club untuk wellness, komunitas, kreativitas, dan hospitality—dirancang sebagai ruang temu sepanjang hari.',
    facilities: ['Wellness', 'Social lounge', 'Pool courtyard'],
    image: 'assets/video-lifestyle.png',
    alt: 'CITARA lifestyle courtyard'
  },
  residential: {
    title: ['RESIDENTIAL'],
    name: 'Residential',
    kicker: 'A calmer way to live',
    description: 'Hunian dan serviced residence yang hangat, hijau, dan terhubung langsung dengan seluruh pengalaman CITARA.',
    facilities: ['Apartment', 'Serviced residence', 'Private lounge'],
    image: 'assets/living-room.png',
    alt: 'Warm CITARA residential interior'
  },
  mice: {
    title: ['MICE', '&', 'HOSPITALITY'],
    name: 'MICE & Hospitality',
    kicker: 'Meet, stay, and connect',
    description: 'Fasilitas meeting, convention, hotel, dan event yang membawa pengalaman bisnis ke dalam atmosfer sanctuary.',
    facilities: ['Ballroom', 'Meeting rooms', 'Hotel'],
    image: 'assets/facade.png',
    alt: 'CITARA hospitality and event pavilion'
  },
  retail: {
    title: ['OPEN', 'RETAIL', 'MALL'],
    name: 'Open Retail Mall',
    kicker: 'A market in the landscape',
    description: 'Retail terbuka dengan pilihan kuliner, craft, kebutuhan harian, dan pengalaman belanja yang menyatu dengan taman.',
    facilities: ['F&B district', 'Local craft', 'Curated retail'],
    image: 'assets/gallery-fnb.png',
    alt: 'Dining experience at CITARA'
  }
};

const zoneStage = document.querySelector('[data-zone-stage]');
const zoneImage = document.querySelector('[data-zone-image]');
const zoneTitle = document.querySelector('[data-zone-title]');
const zoneName = document.querySelector('[data-zone-name]');
const zoneKicker = document.querySelector('[data-zone-kicker]');
const zoneDescription = document.querySelector('[data-zone-description]');
const zoneFacilities = document.querySelector('[data-zone-facilities]');

const fitZoneTitle = () => {
  const titleWord = zoneTitle?.querySelector('span');
  if (!zoneTitle || !titleWord) return;

  zoneTitle.style.setProperty('--zone-title-scale', '1');
  const titleStyle = window.getComputedStyle(zoneTitle);
  const availableWidth = zoneTitle.clientWidth - parseFloat(titleStyle.paddingLeft) - parseFloat(titleStyle.paddingRight);
  const naturalWidth = titleWord.offsetWidth;
  if (!naturalWidth) return;

  const scale = Math.max(.45, Math.min(2.4, availableWidth / naturalWidth));
  zoneTitle.style.setProperty('--zone-title-scale', scale.toFixed(4));
};

window.requestAnimationFrame(fitZoneTitle);
document.fonts?.ready.then(fitZoneTitle);
if (zoneStage && 'ResizeObserver' in window) new ResizeObserver(fitZoneTitle).observe(zoneStage);
window.addEventListener('resize', fitZoneTitle, { passive: true });

document.querySelectorAll('.zone-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const zone = zones[tab.dataset.zone];
    if (!zone) return;

    document.querySelectorAll('.zone-tab').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });

    zoneStage?.classList.add('is-changing');
    window.setTimeout(() => {
      zoneImage.src = zone.image;
      zoneImage.alt = zone.alt;
      const titleText = zone.title.join(' ');
      zoneTitle.innerHTML = `<span>${titleText}</span>`;
      window.requestAnimationFrame(fitZoneTitle);
      zoneName.textContent = zone.name;
      zoneKicker.textContent = zone.kicker;
      zoneDescription.textContent = zone.description;
      zoneFacilities.innerHTML = zone.facilities.map((item) => `<li>${item}</li>`).join('');
      zoneStage?.classList.remove('is-changing');
    }, 160);
  });
});

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button));
    document.querySelectorAll('.gallery-item').forEach((item) => {
      item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter);
    });
  });
});

const videoNotice = document.querySelector('[data-video-notice]');
document.querySelectorAll('[data-video-placeholder]').forEach((button) => {
  button.addEventListener('click', () => {
    videoNotice.textContent = `${button.dataset.videoPlaceholder} is currently in production. The final YouTube or Vimeo embed can replace this poster without changing the layout.`;
  });
});

const contactForm = document.querySelector('[data-contact-form]');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = document.querySelector('[data-form-status]');
  status.textContent = 'Thank you. Your enquiry is ready to connect to the CITARA WhatsApp and CRM workflow.';
  contactForm.reset();
});
