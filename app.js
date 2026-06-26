/* ===========================
   app.js – MediCare Plus
   Hospital Management System
   =========================== */

'use strict';

// ─── Utility ──────────────────────────────────────
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

// ─── Doctor Data ──────────────────────────────────
const DOCTORS = [
  { id: 1, name: 'Dr. Emily Carter', speciality: 'Interventional Cardiologist', dept: 'Cardiology', rating: 4.9, reviews: 312, experience: '18 yrs', patients: '4,800+', surgeries: '620', bio: 'Dr. Carter is a leading cardiologist specializing in minimally invasive cardiac procedures. She has pioneered several catheter-based interventions and is a frequent speaker at international cardiology conferences.', seed: 'emily' },
  { id: 2, name: 'Dr. James Okafor', speciality: 'Neurologist & Epileptologist', dept: 'Neurology', rating: 4.8, reviews: 278, experience: '15 yrs', patients: '3,600+', surgeries: '410', bio: 'Dr. Okafor is an expert in complex neurological disorders. His groundbreaking research on epilepsy treatment protocols has been published in leading medical journals worldwide.', seed: 'james' },
  { id: 3, name: 'Dr. Sophia Patel', speciality: 'Pediatric Specialist', dept: 'Pediatrics', rating: 5.0, reviews: 421, experience: '12 yrs', patients: '6,200+', surgeries: '180', bio: 'Dr. Patel brings warmth and expertise to pediatric care. She is dedicated to creating a child-friendly environment and has won multiple "Best Pediatrician" awards from the hospital network.', seed: 'sophia' },
  { id: 4, name: 'Dr. Marcus Hwang', speciality: 'Orthopedic Surgeon', dept: 'Orthopedics', rating: 4.9, reviews: 356, experience: '20 yrs', patients: '5,100+', surgeries: '2,400', bio: 'Dr. Hwang is renowned for his joint replacement surgeries and sports medicine expertise. He has treated professional athletes and was team physician for the national football team.', seed: 'marcus' },
  { id: 5, name: 'Dr. Aisha Benali', speciality: 'Oncologist & Hematologist', dept: 'Oncology', rating: 4.8, reviews: 198, experience: '16 yrs', patients: '2,900+', surgeries: '340', bio: 'Dr. Benali specializes in blood cancers and solid tumors, combining chemotherapy with emerging immunotherapy approaches. She leads clinical trials for next-generation cancer treatments.', seed: 'aisha' },
  { id: 6, name: 'Dr. Liam O\'Brien', speciality: 'Gynecologist & Obstetrician', dept: 'Gynecology', rating: 4.7, reviews: 289, experience: '14 yrs', patients: '4,300+', surgeries: '1,100', bio: 'Dr. O\'Brien is a compassionate OB/GYN offering comprehensive women\'s health services from prenatal care through menopause management with a focus on patient-centered care.', seed: 'liam' },
  { id: 7, name: 'Dr. Priya Sharma', speciality: 'Dermatologist & Cosmetologist', dept: 'Dermatology', rating: 4.9, reviews: 335, experience: '11 yrs', patients: '5,600+', surgeries: '90', bio: 'Dr. Sharma combines medical dermatology with cosmetic procedures. She is particularly noted for her expertise in managing complex skin conditions and non-surgical aesthetic treatments.', seed: 'priya' },
  { id: 8, name: 'Dr. Ethan Brooks', speciality: 'Diagnostic Radiologist', dept: 'Radiology', rating: 4.7, reviews: 164, experience: '13 yrs', patients: '3,200+', surgeries: '200', bio: 'Dr. Brooks is a highly skilled radiologist with specialization in MRI, CT, and interventional radiology. He leads the hospital\'s AI-assisted diagnostic imaging program.', seed: 'ethan' },
  { id: 9, name: 'Dr. Mei-Lin Zhou', speciality: 'Cardiologist', dept: 'Cardiology', rating: 4.8, reviews: 241, experience: '10 yrs', patients: '3,400+', surgeries: '380', bio: 'Dr. Zhou specializes in echocardiography and cardiac imaging. She heads the non-invasive cardiology unit and has published extensively on early detection of heart disease.', seed: 'meilin' },
  { id: 10, name: 'Dr. Samuel Green', speciality: 'Pediatric Neurologist', dept: 'Neurology', rating: 4.6, reviews: 187, experience: '9 yrs', patients: '2,800+', surgeries: '120', bio: 'Dr. Green focuses on neurological conditions affecting children, including autism spectrum disorders, ADHD, and childhood epilepsy, providing holistic and family-centered care.', seed: 'samuel' },
  { id: 11, name: 'Dr. Fatima Al-Rashid', speciality: 'Orthopedic Sports Surgeon', dept: 'Orthopedics', rating: 4.9, reviews: 302, experience: '17 yrs', patients: '4,700+', surgeries: '1,800', bio: 'Dr. Al-Rashid is a pioneer in arthroscopic sports surgery. Her ACL reconstruction technique has become a standard protocol adopted across 12 countries.', seed: 'fatima' },
  { id: 12, name: 'Dr. Noah Williams', speciality: 'Oncology Radiation Therapist', dept: 'Oncology', rating: 4.8, reviews: 156, experience: '12 yrs', patients: '2,200+', surgeries: '290', bio: 'Dr. Williams leads the radiation oncology department, using stereotactic body radiotherapy (SBRT) and proton therapy to treat tumors with pinpoint accuracy.', seed: 'noah' }
];

// ─── Loading Screen ────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = $('#loading-screen');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});

// ─── Theme ────────────────────────────────────────
const savedTheme = localStorage.getItem('hms-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

$('#theme-toggle').addEventListener('click', () => {
  const curr = document.documentElement.getAttribute('data-theme');
  const next = curr === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('hms-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  const icon = $('#theme-toggle i');
  if (!icon) return;
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ─── Navbar ───────────────────────────────────────
const navbar = $('#navbar');
const hamburger = $('#hamburger');
const navLinks = $('#nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  const btt = $('#back-to-top');
  if (window.scrollY > 400) btt.classList.add('show');
  else btt.classList.remove('show');

  updateActiveNavLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
$$('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNavLink() {
  const sections = $$('section[id], div[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  $$('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

// ─── Back to Top ──────────────────────────────────
$('#back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Smooth Scroll Links ──────────────────────────
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = $(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── Toast Notification ───────────────────────────
function showToast(message, type = 'info', duration = 4000) {
  const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', warning: 'fas fa-exclamation-triangle', info: 'fas fa-info-circle' };
  const container = $('#toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="toast-icon ${icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'none';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(120%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ─── Scroll Reveal ────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

$$('[data-animate]').forEach(el => revealObserver.observe(el));

// ─── Animated Counters ────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

$$('.stat-number').forEach(el => counterObserver.observe(el));

// ─── Render Doctors ───────────────────────────────
function renderDoctors(list) {
  const grid = $('#doctors-grid');
  if (!list.length) {
    grid.innerHTML = `<div class="no-results"><i class="fas fa-user-md"></i><p>No doctors found. Try a different search term or filter.</p></div>`;
    return;
  }
  grid.innerHTML = list.map(d => `
    <div class="doctor-card" data-id="${d.id}" onclick="openDoctorModal(${d.id})">
      <div class="doctor-img-wrap">
        <img class="doctor-img" 
             src="https://api.dicebear.com/8.x/avataaars/svg?seed=${d.seed}&backgroundColor=b6e3f4,d1d4f9,ffd5dc,c0aede" 
             alt="${d.name}" />
        <span class="doctor-dept-badge">${d.dept}</span>
      </div>
      <div class="doctor-info">
        <h3>${d.name}</h3>
        <p class="speciality">${d.speciality}</p>
        <div class="doctor-rating">
          ${renderStars(d.rating)} <span>${d.rating} (${d.reviews} reviews)</span>
        </div>
        <div class="doctor-card-actions">
          <button class="btn btn-primary btn-sm" style="flex:1" onclick="event.stopPropagation();bookWithDoctor('${d.name}','${d.dept}')">
            <i class="fas fa-calendar-plus"></i> Book
          </button>
          <button class="btn btn-outline btn-sm" onclick="event.stopPropagation();openDoctorModal(${d.id})">
            <i class="fas fa-user"></i> Profile
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '<i class="fas fa-star"></i>';
  if (half) html += '<i class="fas fa-star-half-alt"></i>';
  return html;
}

function bookWithDoctor(name, dept) {
  document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const deptSelect = $('#app-dept');
    const options = [...deptSelect.options];
    const opt = options.find(o => o.value === dept);
    if (opt) deptSelect.value = dept;
    showToast(`Booking appointment with ${name}`, 'info');
  }, 700);
}

renderDoctors(DOCTORS);

// ─── Doctor Search & Filter ───────────────────────
let activeFilter = 'all';
let searchQuery = '';

$('#doctor-search').addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  applyDoctorFilters();
});

$$('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeFilter = tab.dataset.filter;
    applyDoctorFilters();
  });
});

function applyDoctorFilters() {
  const filtered = DOCTORS.filter(d => {
    const matchDept = activeFilter === 'all' || d.dept === activeFilter;
    const matchSearch = !searchQuery || d.name.toLowerCase().includes(searchQuery) || d.speciality.toLowerCase().includes(searchQuery) || d.dept.toLowerCase().includes(searchQuery);
    return matchDept && matchSearch;
  });
  renderDoctors(filtered);
}

// ─── Doctor Modal ─────────────────────────────────
const modal = $('#doctor-modal');
const modalClose = $('#modal-close');

function openDoctorModal(id) {
  const d = DOCTORS.find(doc => doc.id === id);
  if (!d) return;
  $('#modal-body').innerHTML = `
    <div class="modal-doctor-header">
      <img class="modal-avatar" src="https://api.dicebear.com/8.x/avataaars/svg?seed=${d.seed}&backgroundColor=b6e3f4" alt="${d.name}" />
      <div class="modal-doctor-info">
        <h2>${d.name}</h2>
        <p class="spec">${d.speciality}</p>
        <p class="spec" style="color:var(--text-muted);font-weight:400;font-size:0.85rem">${d.dept} Department</p>
        <div class="rating" style="color:var(--warning);font-size:0.85rem;margin-top:4px">
          ${renderStars(d.rating)} <span style="color:var(--text-muted)">${d.rating} · ${d.reviews} reviews</span>
        </div>
      </div>
    </div>
    <div class="modal-stats">
      <div class="modal-stat"><strong>${d.experience}</strong><small>Experience</small></div>
      <div class="modal-stat"><strong>${d.patients}</strong><small>Patients</small></div>
      <div class="modal-stat"><strong>${d.surgeries}</strong><small>Procedures</small></div>
    </div>
    <p class="modal-bio">${d.bio}</p>
    <div class="modal-actions">
      <button class="btn btn-primary btn-lg" style="flex:1" onclick="bookWithDoctor('${d.name}','${d.dept}');closeModal()">
        <i class="fas fa-calendar-plus"></i> Book Appointment
      </button>
      <button class="btn btn-outline" onclick="closeModal()">Close</button>
    </div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ─── Appointment Form ─────────────────────────────
// Set min date to today
const dateInput = $('#app-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

$('#appointment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateAppointmentForm()) return;

  const appointment = {
    id: Date.now(),
    name: $('#app-name').value.trim(),
    email: $('#app-email').value.trim(),
    phone: $('#app-phone').value.trim(),
    dept: $('#app-dept').value,
    date: $('#app-date').value,
    time: $('#app-time').value,
    type: $('#app-type').value,
    notes: $('#app-notes').value.trim(),
    status: 'Confirmed',
    bookedAt: new Date().toLocaleString()
  };

  saveAppointment(appointment);
  showToast(`✓ Appointment confirmed for ${appointment.name} on ${formatDate(appointment.date)} at ${appointment.time}`, 'success', 5000);
  e.target.reset();
  clearFieldErrors();
  refreshDashboard();
});

function validateAppointmentForm() {
  let valid = true;
  clearFieldErrors();

  const fields = [
    { id: 'app-name', errId: 'err-name', msg: 'Full name is required', check: v => v.length >= 2 },
    { id: 'app-email', errId: 'err-email', msg: 'Enter a valid email address', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'app-phone', errId: 'err-phone', msg: 'Enter a valid phone number', check: v => v.length >= 7 },
    { id: 'app-dept', errId: 'err-dept', msg: 'Please select a department', check: v => v !== '' },
    { id: 'app-date', errId: 'err-date', msg: 'Please select a future date', check: v => { const d = new Date(v); return !isNaN(d) && d >= new Date(new Date().toDateString()); } },
    { id: 'app-time', errId: 'err-time', msg: 'Please select a time slot', check: v => v !== '' }
  ];

  fields.forEach(f => {
    const input = $(`#${f.id}`);
    const errEl = $(`#${f.errId}`);
    const value = input.value.trim();
    if (!f.check(value)) {
      input.classList.add('invalid');
      if (errEl) errEl.textContent = f.msg;
      valid = false;
    }
  });

  if (!valid) showToast('Please correct the highlighted fields', 'error');
  return valid;
}

function clearFieldErrors() {
  $$('.field-error').forEach(el => el.textContent = '');
  $$('.form-group input, .form-group select').forEach(el => el.classList.remove('invalid'));
}

// ─── Local Storage Appointments ──────────────────
function getAppointments() {
  return JSON.parse(localStorage.getItem('hms-appointments') || '[]');
}

function saveAppointment(appt) {
  const list = getAppointments();
  list.unshift(appt);
  localStorage.setItem('hms-appointments', JSON.stringify(list));
}

function deleteAppointment(id) {
  const list = getAppointments().filter(a => a.id !== id);
  localStorage.setItem('hms-appointments', JSON.stringify(list));
  refreshDashboard();
  showToast('Appointment removed', 'warning');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

// ─── Dashboard ────────────────────────────────────
function refreshDashboard() {
  const appointments = getAppointments();
  const today = new Date().toDateString();
  const upcoming = appointments.filter(a => new Date(a.date + 'T00:00:00') >= new Date(today));
  const completed = appointments.filter(a => new Date(a.date + 'T00:00:00') < new Date(today));

  $('#total-appointments').textContent = appointments.length;
  $('#upcoming-count').textContent = upcoming.length;
  $('#completed-count').textContent = completed.length;

  const listEl = $('#appointments-list');
  if (!appointments.length) {
    listEl.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-calendar-plus"></i>
        <h4>No Appointments Yet</h4>
        <p>Book your first appointment to see it here</p>
        <button class="btn btn-primary btn-sm" onclick="document.getElementById('appointment').scrollIntoView({behavior:'smooth'})">Book Now</button>
      </div>`;
    return;
  }

  listEl.innerHTML = appointments.map(a => `
    <div class="appointment-item">
      <div>
        <div class="apt-name">${a.name}</div>
        <div class="apt-dept">${a.dept}</div>
      </div>
      <div class="apt-date"><i class="fas fa-calendar" style="color:var(--primary);margin-right:6px"></i>${formatDate(a.date)}</div>
      <div class="apt-time"><i class="fas fa-clock" style="color:var(--primary);margin-right:6px"></i>${a.time}</div>
      <div style="display:flex;align-items:center;gap:8px">
        <span class="apt-status" style="${new Date(a.date+'T00:00:00') < new Date(today) ? 'background:rgba(100,116,139,0.12);color:var(--text-muted)' : ''}">${new Date(a.date+'T00:00:00') < new Date(today) ? 'Completed' : a.status}</span>
        <button class="apt-delete" onclick="deleteAppointment(${a.id})" title="Delete"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

$('#clear-appointments').addEventListener('click', () => {
  if (!getAppointments().length) { showToast('No appointments to clear', 'info'); return; }
  if (confirm('Are you sure you want to clear all appointment history?')) {
    localStorage.removeItem('hms-appointments');
    refreshDashboard();
    showToast('All appointments cleared', 'warning');
  }
});

refreshDashboard();

// ─── Testimonials Slider ─────────────────────────
const track = $('#testimonials-track');
const dotsContainer = $('#slider-dots');
const cards = $$('.testimonial-card');
let currentSlide = 0;
const visibleCount = () => window.innerWidth < 768 ? 1 : 3;
const totalSlides = () => Math.ceil(cards.length / visibleCount());

function buildDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalSlides(); i++) {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === currentSlide ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function goToSlide(index) {
  currentSlide = Math.max(0, Math.min(index, totalSlides() - 1));
  const cardWidth = cards[0]?.offsetWidth || 0;
  const gap = 24;
  const itemsPerView = visibleCount();
  track.style.transform = `translateX(-${currentSlide * itemsPerView * (cardWidth + gap)}px)`;
  $$('.slider-dot').forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

$('#next-testimonial').addEventListener('click', () => goToSlide(currentSlide + 1 >= totalSlides() ? 0 : currentSlide + 1));
$('#prev-testimonial').addEventListener('click', () => goToSlide(currentSlide - 1 < 0 ? totalSlides() - 1 : currentSlide - 1));

// Auto-play
let autoSlide = setInterval(() => goToSlide(currentSlide + 1 >= totalSlides() ? 0 : currentSlide + 1), 5000);
track.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.addEventListener('mouseleave', () => { autoSlide = setInterval(() => goToSlide(currentSlide + 1 >= totalSlides() ? 0 : currentSlide + 1), 5000); });

buildDots();
window.addEventListener('resize', () => { buildDots(); goToSlide(0); });

// ─── FAQ Accordion ────────────────────────────────
$$('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    $$('.faq-item').forEach(fi => {
      fi.classList.remove('open');
      fi.querySelector('.faq-answer').style.maxHeight = '0';
    });
    if (!isOpen) {
      item.classList.add('open');
      const answer = item.querySelector('.faq-answer');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ─── Contact Form ─────────────────────────────────
$('#contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#c-name').value.trim();
  const email = $('#c-email').value.trim();
  const subject = $('#c-subject').value.trim();
  const message = $('#c-message').value.trim();

  if (!name || !email || !subject || !message) {
    showToast('Please fill in all required fields', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address', 'error');
    return;
  }

  showToast(`Thank you, ${name}! Your message has been sent. We'll respond within 24 hours.`, 'success', 5000);
  e.target.reset();
});

// ─── Department Card Click ─────────────────────────
$$('.dept-card').forEach(card => {
  card.addEventListener('click', () => {
    const dept = card.dataset.dept;
    document.getElementById('doctors').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const tab = $(`.filter-tab[data-filter="${dept}"]`);
      if (tab) tab.click();
    }, 600);
  });
});

// ─── Hero Layout Fix ─────────────────────────────
// Ensure hero content and image are properly positioned
document.querySelectorAll('.hero .hero-content, .hero .hero-image').forEach(el => {
  el.style.position = 'relative';
  el.style.zIndex = '1';
});

// ─── Keyboard Navigation ──────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') return; // allow normal tab
});

console.log('%c🏥 MediCare Plus HMS Loaded', 'color:#0ea5e9;font-size:1.2rem;font-weight:700');
console.log('%cBuilt with ❤️ for better healthcare', 'color:#64748b');
