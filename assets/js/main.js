/* ==========================================================================
   KSHITIJ RAJ — NEXT-GEN 3D INTERACTIVE CONTROLLER & WEBGL ENGINE
   ========================================================================== */

/* ==========================================================================
   1. GLOBAL WEB AUDIO SYNTHESIZER & PROCEDURAL SOUND ENGINE
   ========================================================================== */
class CyberAudio {
  constructor() {
    this.ctx = null;
    // Enabled by default unless explicitly turned off by the user
    this.enabled = localStorage.getItem('sound-enabled') !== 'false';
  }

  initCtx() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initButton() {
    const toggle = document.getElementById('audio-toggle');
    const icon = document.getElementById('audio-icon');
    if (toggle && icon) {
      this.updateIcon(icon);
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.initCtx();
        this.enabled = !this.enabled;
        localStorage.setItem('sound-enabled', this.enabled);
        this.updateIcon(icon);
        if (this.enabled) {
          this.playChime();
          showToast('Cyber Audio Feedback Enabled', 'ri-volume-up-line');
        } else {
          showToast('Cyber Audio Muted', 'ri-volume-mute-line');
        }
      });
    }
  }

  updateIcon(icon) {
    const toggle = document.getElementById('audio-toggle');
    if (this.enabled) {
      icon.className = 'ri-volume-up-line';
      toggle?.classList.add('active');
    } else {
      icon.className = 'ri-volume-mute-line';
      toggle?.classList.remove('active');
    }
  }

  // Crisp high-tech cyber blip for primary clicks
  playClick() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(920, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  // Subtle ethereal electronic micro-tick for hovers
  playHover() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(740, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {}
  }

  // Sci-fi 4-note harmonic chord for major activations (modal open, form submit)
  playChime() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.055);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.055);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.055 + 0.24);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.055);
        osc.stop(this.ctx.currentTime + idx * 0.055 + 0.24);
      });
    } catch (e) {}
  }

  // Futuristic reverse descending whoosh for modal close
  playClose() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [783.99, 587.33, 392.00]; // G5 -> D5 -> G4
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.04);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.8, this.ctx.currentTime + idx * 0.04 + 0.12);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.04 + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.04);
        osc.stop(this.ctx.currentTime + idx * 0.04 + 0.12);
      });
    } catch (e) {}
  }

  // Resonant dual-tone bell for copy clipboard or triumphs
  playSuccess() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      [880, 1318.51].forEach((freq, idx) => { // A5, E6
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.07, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.3);
      });
    } catch (e) {}
  }

  // Snappy switch click for themes and tab switches
  playSwitch() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  // Sci-fi pulse trigger for reflex game target spawn
  playLaser() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  // Error low frequency buzz
  playError() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }
}
window.cyberAudio = new CyberAudio();

// Unlock browser AudioContext automatically upon very first user gesture anywhere
const unlockAudioOnFirstGesture = () => {
  if (window.cyberAudio) {
    window.cyberAudio.initCtx();
  }
  document.removeEventListener('pointerdown', unlockAudioOnFirstGesture);
  document.removeEventListener('click', unlockAudioOnFirstGesture);
  document.removeEventListener('keydown', unlockAudioOnFirstGesture);
  document.removeEventListener('touchstart', unlockAudioOnFirstGesture);
};
document.addEventListener('pointerdown', unlockAudioOnFirstGesture, { passive: true });
document.addEventListener('click', unlockAudioOnFirstGesture, { passive: true });
document.addEventListener('keydown', unlockAudioOnFirstGesture, { passive: true });
document.addEventListener('touchstart', unlockAudioOnFirstGesture, { passive: true });


/* ==========================================================================
   2. TOP-LEVEL ROBUST MODAL ENGINE & GLOBAL FUNCTIONS
   ========================================================================== */
function getModalElements() {
  return {
    overlay: document.getElementById('modal-overlay'),
    body: document.getElementById('modal-body'),
    close: document.getElementById('modal-close'),
    printBtn: document.getElementById('modal-print-btn'),
    title: document.getElementById('modal-header-title'),
    badge: document.getElementById('modal-badge-indicator')
  };
}

function openModal(html, title = 'Curriculum Vitae', badge = 'PORTFOLIO MODAL', showPrint = true) {
  const m = getModalElements();
  if (!m.overlay || !m.body) {
    console.warn('Modal container elements not ready, retrying...');
    setTimeout(() => openModal(html, title, badge, showPrint), 50);
    return;
  }

  m.body.innerHTML = html;
  if (m.title) m.title.textContent = title;
  if (m.badge) m.badge.textContent = badge;
  if (m.printBtn) m.printBtn.style.display = showPrint ? 'inline-flex' : 'none';

  m.overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.cyberAudio) window.cyberAudio.playChime();
}

function closeModal() {
  const m = getModalElements();
  if (m.overlay) {
    m.overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (window.cyberAudio) window.cyberAudio.playClose();
  }
}

// Global modal triggers
window.closePortfolioModal = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  closeModal();
};

window.triggerPrintCV = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (window.cyberAudio) window.cyberAudio.playClick();
  setTimeout(() => {
    try {
      window.print();
    } catch (err) {
      console.warn('Print command triggered:', err);
    }
  }, 80);
};

window.openCVModal = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const cvHtml = `
    <div class="cv-container">
      <!-- CV Header & Identity Banner -->
      <div class="cv-header-banner">
        <div>
          <h2 class="cv-hero-name">KSHITIJ RAJ</h2>
          <p class="cv-hero-role">
            <span>Esports & Event Operations Specialist</span>
            <span>•</span>
            <span>Independent Gameplay QA</span>
            <span>•</span>
            <span>Project Coordinator</span>
          </p>
        </div>

        <!-- Live Contact Chips -->
        <div class="cv-contacts-grid">
          <a href="mailto:kshitij.raj.96@gmail.com" class="cv-contact-chip" title="Send Email">
            <i class="ri-mail-fill"></i>
            <span>kshitij.raj.96@gmail.com</span>
          </a>
          <a href="tel:+919304355202" class="cv-contact-chip" title="Call or WhatsApp">
            <i class="ri-phone-fill"></i>
            <span>+91-9304355202</span>
          </a>
          <span class="cv-contact-chip">
            <i class="ri-map-pin-2-fill"></i>
            <span>Kolkata, West Bengal, India</span>
          </span>
          <a href="https://linkedin.com/in/imkshitijraj" target="_blank" rel="noopener noreferrer" class="cv-contact-chip">
            <i class="ri-linkedin-fill"></i>
            <span>linkedin.com/in/imkshitijraj</span>
          </a>
          <a href="https://github.com/imkshitijraj" target="_blank" rel="noopener noreferrer" class="cv-contact-chip">
            <i class="ri-github-fill"></i>
            <span>github.com/imkshitijraj</span>
          </a>
        </div>
      </div>

      <!-- Executive Summary -->
      <div class="cv-section-block">
        <div class="cv-section-head">
          <i class="ri-user-star-line"></i>
          <span>Executive Summary</span>
        </div>
        <div class="cv-summary-card">
          Dynamic, results-driven BCA undergraduate with proven multi-discipline expertise bridging on-ground esports tournament activations, systematic independent gameplay QA testing (15+ months), and software development foundations. Adept at coordinating cross-functional stages under strict live timelines, structuring actionable and reproducible bug reports, authoring PRDs, and leveraging Python for analytics workflows.
        </div>
      </div>

      <!-- Professional Experience -->
      <div class="cv-section-block">
        <div class="cv-section-head">
          <i class="ri-briefcase-line"></i>
          <span>Professional Experience</span>
        </div>

        <!-- Role 1: TEC Spartans -->
        <div class="cv-timeline-entry">
          <div class="cv-entry-header">
            <div>
              <h4 class="cv-entry-role">Student Brand Ambassador — TEC Spartans</h4>
              <span class="cv-entry-company"><i class="ri-shield-star-line"></i> The Esports Club (TEC)</span>
            </div>
            <span class="cv-entry-date">May 2026 – Present</span>
          </div>
          <ul class="cv-entry-bullets">
            <li>Plan and execute regional esports activations end-to-end, steering tournament schedule timelines, player registrations, and on-ground stage operations.</li>
            <li>Track concurrent deliverables and milestone checklists during high-pressure live tournaments to guarantee zero operational downtime or scheduling delays.</li>
            <li>Function as the primary liaison between national operations management and regional player communities.</li>
            <li>Formulate rapid contingency protocols for live match interruptions and maintain detailed post-event analytical reports.</li>
          </ul>
        </div>

        <!-- Role 2: Free Fire MAX QA -->
        <div class="cv-timeline-entry">
          <div class="cv-entry-header">
            <div>
              <h4 class="cv-entry-role">Independent Gameplay QA & Community Feedback Contributor</h4>
              <span class="cv-entry-company"><i class="ri-bug-2-line"></i> Free Fire MAX India</span>
            </div>
            <span class="cv-entry-date">May 2025 – Present (15+ Mos)</span>
          </div>
          <ul class="cv-entry-bullets">
            <li>Executed an autonomous 15+ month defect testing workflow — formulating reproducible testing matrices, defect reporting, and tracking patch verifications.</li>
            <li>Prioritized anomalies by severity index, user impact, and exploit potential, implementing a structured triage system for maximum developer clarity.</li>
            <li>Conducted boundary stress testing, regression verifications across new game patches, weapon balancing checks, and network latency logging.</li>
            <li>Synthesized competitive player feedback into prioritized product recommendations for game balance enhancements.</li>
          </ul>
        </div>

        <!-- Role 3: Euphoria GenX -->
        <div class="cv-timeline-entry">
          <div class="cv-entry-header">
            <div>
              <h4 class="cv-entry-role">Intern — Machine Learning using Python</h4>
              <span class="cv-entry-company"><i class="ri-code-s-slash-line"></i> Euphoria GenX</span>
            </div>
            <span class="cv-entry-date">Jul 2025 – Sep 2025</span>
          </div>
          <ul class="cv-entry-bullets">
            <li>Completed intensive ISO 9001:2015 certified internship focusing on predictive analytics and AI financial market dataset processing with Python.</li>
            <li>Built end-to-end preprocessing, cleaning, normalization, and timeseries visualization pipelines using NumPy, Pandas, and Matplotlib.</li>
            <li>Evaluated supervised learning models, hyperparameter tuning techniques, and validation metrics within an engineering team environment.</li>
          </ul>
        </div>
      </div>

      <!-- Key Projects & Deliverables -->
      <div class="cv-section-block">
        <div class="cv-section-head">
          <i class="ri-folder-6-line"></i>
          <span>Key Projects & Deliverables</span>
        </div>
        <div class="cv-grid-dual">
          <div class="cv-sub-card">
            <div class="cv-sub-card-title">NEXUS — Enterprise Workflow & Project Platform</div>
            <div class="cv-sub-card-meta">Product Architecture & PRD Blueprint · 2025–2026</div>
            <p class="cv-sub-card-desc">
              Authored full Product Requirements Document (PRD) detailing role-based permissions, automated milestone escalation paths, SLA tracking, and REST/webhook integrations for Slack, GitHub, and Google Workspace.
            </p>
          </div>

          <div class="cv-sub-card">
            <div class="cv-sub-card-title">INCUBES – Inter-College Fest Website</div>
            <div class="cv-sub-card-meta">Live Production Web Ops · 300–500 Attendees · 2024</div>
            <p class="cv-sub-card-desc">
              Engineered responsive frontend (HTML5/CSS3/JS) at <a href="https://tint.edu.in/incubes" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline;">tint.edu.in/incubes</a> featuring zero-downtime registration forms and real-time event schedule coordination.
            </p>
          </div>
        </div>
      </div>

      <!-- Core Competencies & Skills -->
      <div class="cv-section-block">
        <div class="cv-section-head">
          <i class="ri-cpu-line"></i>
          <span>Core Competencies & Technical Skills</span>
        </div>
        <div class="cv-competencies-grid">
          <div class="cv-comp-column">
            <div class="cv-comp-title"><i class="ri-kanban-check-line" style="color: var(--accent-primary);"></i> Operations & PM</div>
            <div class="cv-tags-group">
              <span class="cv-tag-pill">Esports Tournament Ops</span>
              <span class="cv-tag-pill">Live Stage Coordination</span>
              <span class="cv-tag-pill">Milestone Tracking</span>
              <span class="cv-tag-pill">Risk Mitigation</span>
              <span class="cv-tag-pill">PRD Authoring</span>
            </div>
          </div>

          <div class="cv-comp-column">
            <div class="cv-comp-title"><i class="ri-bug-2-line" style="color: var(--accent-cyan);"></i> QA & Testing</div>
            <div class="cv-tags-group">
              <span class="cv-tag-pill accent-cyan">Gameplay Defect Discovery</span>
              <span class="cv-tag-pill accent-cyan">Bug Severity Triage</span>
              <span class="cv-tag-pill accent-cyan">Regression Testing</span>
              <span class="cv-tag-pill accent-cyan">Log Capture & Escalation</span>
              <span class="cv-tag-pill accent-cyan">Player UX Analytics</span>
            </div>
          </div>

          <div class="cv-comp-column">
            <div class="cv-comp-title"><i class="ri-code-box-line" style="color: var(--accent-emerald);"></i> Tech & Development</div>
            <div class="cv-tags-group">
              <span class="cv-tag-pill accent-emerald">Python (Pandas, NumPy)</span>
              <span class="cv-tag-pill accent-emerald">HTML5, CSS3, JavaScript</span>
              <span class="cv-tag-pill accent-emerald">Git & GitHub</span>
              <span class="cv-tag-pill accent-emerald">Responsive UI Architecture</span>
              <span class="cv-tag-pill accent-emerald">Machine Learning Basics</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Education & Certifications -->
      <div class="cv-section-block">
        <div class="cv-section-head">
          <i class="ri-graduation-cap-line"></i>
          <span>Education, Certifications & Honors</span>
        </div>
        <div class="cv-grid-dual">
          <!-- Education Column -->
          <div class="cv-sub-card">
            <div class="cv-sub-card-title"><i class="ri-school-line" style="color: var(--accent-primary);"></i> Academic Background</div>
            <div style="margin-top: 0.35rem; display: flex; flex-direction: column; gap: 0.55rem;">
              <div>
                <strong style="color: var(--text-primary);">Bachelor of Computer Applications (BCA)</strong>
                <div style="font-size: 0.84rem; color: var(--accent-cyan);">Techno International New Town (2023–2027)</div>
              </div>
              <div>
                <strong style="color: var(--text-primary);">Senior Secondary (Class XII) — 78%</strong>
                <div style="font-size: 0.84rem; color: var(--text-secondary);">Swarajaya Sr. Sec. School, NWAC Board (2023)</div>
              </div>
              <div>
                <strong style="color: var(--text-primary);">Secondary (Class X) — 78%</strong>
                <div style="font-size: 0.84rem; color: var(--text-secondary);">De Nobili School, ICSE Board (2021)</div>
              </div>
            </div>
          </div>

          <!-- Certifications & Honors Column -->
          <div class="cv-sub-card">
            <div class="cv-sub-card-title"><i class="ri-medal-line" style="color: var(--accent-amber);"></i> Certifications & Honors</div>
            <div style="margin-top: 0.35rem; display: flex; flex-direction: column; gap: 0.55rem;">
              <div>
                <strong style="color: var(--text-primary);">Accenture Project Management Simulation</strong>
                <div style="font-size: 0.84rem; color: var(--accent-secondary);">Forage Certified (Nov 2024)</div>
              </div>
              <div>
                <strong style="color: var(--text-primary);">GMAT Quantitative Masterclass</strong>
                <div style="font-size: 0.84rem; color: var(--accent-secondary);">Udemy Professional Credential (May 2026)</div>
              </div>
              <div>
                <strong style="color: var(--text-primary);">Remarkable Performance — AI Debate</strong>
                <div style="font-size: 0.84rem; color: var(--accent-amber);">Inter-College Debate Contest (Dec 2025)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Languages -->
      <div class="cv-section-block">
        <div class="cv-section-head">
          <i class="ri-translate-2"></i>
          <span>Languages</span>
        </div>
        <div class="cv-languages-row">
          <div class="cv-lang-badge">
            <i class="ri-chat-check-fill" style="color: var(--accent-cyan);"></i>
            <span><strong>English:</strong> Proficient / Professional</span>
          </div>
          <div class="cv-lang-badge">
            <i class="ri-chat-check-fill" style="color: var(--accent-emerald);"></i>
            <span><strong>Hindi:</strong> Native / Fluent</span>
          </div>
          <div class="cv-lang-badge">
            <i class="ri-chat-check-fill" style="color: var(--accent-amber);"></i>
            <span><strong>Bengali:</strong> Conversational</span>
          </div>
        </div>
      </div>
    </div>
  `;
  openModal(cvHtml, 'Kshitij Raj — Curriculum Vitae', 'OFFICIAL CV', true);
};

window.openProjectModal = function(id, e) {
  if (e && e.preventDefault) e.preventDefault();
  let content = '';
  let title = 'Project Specifications';
  let badge = 'PROJECT ARCHITECTURE';

  if (id === 'nexus') {
    title = 'NEXUS — Enterprise Workflow Platform';
    badge = 'PRODUCT ARCHITECTURE';
    content = `
      <div class="project-modal-detail">
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.2rem; flex-wrap: wrap;">
          <span class="tech-pill" style="color: var(--accent-cyan); border-color: rgba(6, 182, 212, 0.4);"><i class="ri-cpu-line"></i> Enterprise Architecture</span>
          <span class="tech-pill"><i class="ri-calendar-line"></i> 2025–2026</span>
          <span class="tech-pill" style="color: var(--accent-emerald); border-color: rgba(16, 185, 129, 0.4);"><i class="ri-checkbox-circle-line"></i> Blueprint Finalized</span>
        </div>

        <h2 class="section-title" style="font-size: 1.85rem; margin-bottom: 0.8rem; line-height: 1.25;">
          NEXUS — Enterprise Workflow & Project Platform
        </h2>
        
        <p style="color: var(--text-secondary); margin-bottom: 1.6rem; line-height: 1.75; font-size: 1rem;">
          Comprehensive architectural blueprint for a scalable project orchestration system engineered to centralize sprint deliverables, cross-team escalation triggers, PRD documentation hubs, and external webhook integrations for high-velocity teams.
        </p>

        <div class="cv-grid-dual" style="margin-bottom: 1.6rem;">
          <div class="cv-sub-card">
            <div class="cv-sub-card-title"><i class="ri-file-code-line" style="color: var(--accent-primary);"></i> PRD & Permissions Architecture</div>
            <p class="cv-sub-card-desc">
              Authored complete Product Requirements Document (PRD) detailing role-based permissions (RBAC), sprint retrospectives, blocker SLAs, and automated status communication channels.
            </p>
          </div>

          <div class="cv-sub-card">
            <div class="cv-sub-card-title"><i class="ri-git-merge-line" style="color: var(--accent-cyan);"></i> Webhook & Event Dispatcher</div>
            <p class="cv-sub-card-desc">
              Designed modular asynchronous event pipelines compatible with Slack alerts, GitHub commit/PR webhooks, Google Workspace calendars, and custom REST endpoints with retry backoff.
            </p>
          </div>

          <div class="cv-sub-card">
            <div class="cv-sub-card-title"><i class="ri-alarm-warning-line" style="color: var(--accent-amber);"></i> Automated Escalation Triggers</div>
            <p class="cv-sub-card-desc">
              Configured dynamic rule engines for blocker escalation: auto-notifying team leads upon milestone slippage, failed QA criteria, or high-priority ticket aging thresholds.
            </p>
          </div>

          <div class="cv-sub-card">
            <div class="cv-sub-card-title"><i class="ri-dashboard-3-line" style="color: var(--accent-emerald);"></i> Team Visibility & Wireframes</div>
            <p class="cv-sub-card-desc">
              Structured high-fidelity interactive wireframes focusing on single-screen sprint boards, burn-down metric cards, and zero-clutter team status dashboards.
            </p>
          </div>
        </div>

        <div class="cv-section-block">
          <div class="cv-section-head">
            <i class="ri-stack-line"></i>
            <span>Core Architecture Tags</span>
          </div>
          <div class="project-tags" style="margin-bottom: 0;">
            <span class="tag-3d">Workflow Automation</span>
            <span class="tag-3d">PRD Architecture</span>
            <span class="tag-3d">Webhook Triggers</span>
            <span class="tag-3d">RBAC Schema</span>
            <span class="tag-3d">REST API Design</span>
            <span class="tag-3d">SLA Monitoring</span>
          </div>
        </div>
      </div>
    `;
  } else if (id === 'incubes') {
    title = 'INCUBES — Inter-College Fest Hub';
    badge = 'LIVE EVENT OPS';
    content = `
      <div class="project-modal-detail">
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.2rem; flex-wrap: wrap;">
          <span class="tech-pill pill-live"><span class="pulse-dot-green"></span> Production Live Deployment</span>
          <span class="tech-pill"><i class="ri-calendar-line"></i> 2024</span>
          <span class="tech-pill" style="color: var(--accent-cyan); border-color: rgba(6, 182, 212, 0.4);"><i class="ri-group-line"></i> 300–500 Participants</span>
        </div>

        <h2 class="section-title" style="font-size: 1.85rem; margin-bottom: 0.8rem; line-height: 1.25;">
          INCUBES – Inter-College Fest Production Platform
        </h2>
        
        <p style="color: var(--text-secondary); margin-bottom: 1.6rem; line-height: 1.75; font-size: 1rem;">
          Directed full frontend engineering and live website operations for Techno International New Town's flagship inter-college technical fest hosting 300–500 attendees at <a href="https://tint.edu.in/incubes" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline;">tint.edu.in/incubes</a>.
        </p>

        <div class="cv-grid-dual" style="margin-bottom: 1.6rem;">
          <div class="cv-sub-card">
            <div class="cv-sub-card-title"><i class="ri-flashlight-line" style="color: var(--accent-emerald);"></i> Zero-Downtime Registration</div>
            <p class="cv-sub-card-desc">
              Engineered responsive registration forms and validation pipelines with 100% uptime during high-traffic launch announcements across college networks.
            </p>
          </div>

          <div class="cv-sub-card">
            <div class="cv-sub-card-title"><i class="ri-time-line" style="color: var(--accent-cyan);"></i> Real-Time Schedule Hub</div>
            <p class="cv-sub-card-desc">
              Built dynamic multi-track event schedule views allowing attendees to filter speaker sessions, hackathons, and gaming arenas in real time.
            </p>
          </div>

          <div class="cv-sub-card">
            <div class="cv-sub-card-title"><i class="ri-smartphone-line" style="color: var(--accent-primary);"></i> Mobile-First Performance</div>
            <p class="cv-sub-card-desc">
              Crafted lightweight HTML5/CSS3/JavaScript interface optimized for rapid loading on spotty mobile campus network connections.
            </p>
          </div>

          <div class="cv-sub-card">
            <div class="cv-sub-card-title"><i class="ri-team-line" style="color: var(--accent-amber);"></i> On-Ground Event Coordination</div>
            <p class="cv-sub-card-desc">
              Maintained live synchronization with stage volunteer coordinators and administration leads to publish real-time schedule adjustments and winner announcements.
            </p>
          </div>
        </div>

        <div class="cv-section-block" style="margin-bottom: 1.6rem;">
          <div class="cv-section-head">
            <i class="ri-tools-line"></i>
            <span>Technologies & Delivery</span>
          </div>
          <div class="project-tags" style="margin-bottom: 1.5rem;">
            <span class="tag-3d">HTML5 / Semantic UI</span>
            <span class="tag-3d">CSS3 Responsive Grids</span>
            <span class="tag-3d">JavaScript ES6+</span>
            <span class="tag-3d">Live Event Operations</span>
          </div>
        </div>

        <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <a href="https://tint.edu.in/incubes" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm btn-3d" data-sound="click">
            <i class="ri-external-link-line"></i> Visit Live Event Site
          </a>
        </div>
      </div>
    `;
  }

  openModal(content, title, badge, false);
};

// ==========================================================================
// GLOBAL DELEGATED CYBER SOUND DISPATCHER (WORKS ACROSS ALL ELEMENTS & MODALS)
// ==========================================================================
let lastHoverSoundTimestamp = 0;
document.addEventListener('mouseover', (e) => {
  const interactive = e.target.closest(
    'button, a, .btn, .skill-pill-3d, .skill-tab-btn-3d, .tag-3d, .tech-pill, .social-link, .contact-card-3d, .cv-contact-chip, .project-card-3d, .timeline-card-3d, .ed-cert-card-3d, .nav-link, .nav-logo, input, textarea, select, .modal-action-btn, .modal-close-3d, [data-sound], [onclick]'
  );
  if (interactive) {
    const now = performance.now();
    // Throttle hover sounds (55ms gap) to prevent audio clutter
    if (now - lastHoverSoundTimestamp > 55) {
      lastHoverSoundTimestamp = now;
      if (window.cyberAudio) window.cyberAudio.playHover();
    }
  }
}, { passive: true });

document.addEventListener('pointerdown', (e) => {
  const interactive = e.target.closest(
    'button, a, .btn, .skill-tab-btn-3d, .social-link, .cv-contact-chip, [onclick], [data-sound="click"], .reflex-arena, .modal-action-btn, .modal-close-3d'
  );
  if (interactive) {
    if (window.cyberAudio) window.cyberAudio.playClick();
  }
}, { passive: true });

// Document-level action dispatcher for modals
document.addEventListener('click', (e) => {
  const projectBtn = e.target.closest('.project-detail-btn');
  if (projectBtn) {
    e.preventDefault();
    const id = projectBtn.getAttribute('data-project');
    if (id) window.openProjectModal(id, e);
    return;
  }

  const cvBtn = e.target.closest('.view-resume-btn');
  if (cvBtn) {
    e.preventDefault();
    window.openCVModal(e);
    return;
  }

  const printBtn = e.target.closest('.btn-print-cv');
  if (printBtn) {
    e.preventDefault();
    window.triggerPrintCV(e);
    return;
  }

  const closeBtn = e.target.closest('#modal-close');
  if (closeBtn) {
    e.preventDefault();
    window.closePortfolioModal(e);
    return;
  }

  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay && e.target === modalOverlay) {
    window.closePortfolioModal(e);
    return;
  }
});

// Keyboard shortcut: Escape to close modal
document.addEventListener('keydown', (e) => {
  const modalOverlay = document.getElementById('modal-overlay');
  if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
    window.closePortfolioModal(e);
  }
});


/* ==========================================================================
   3. DOM-READY CONTROLLER & SYSTEM INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  // Audio system button sync
  if (window.cyberAudio) {
    window.cyberAudio.initButton();
  }

  /* --------------------------------------------------------------------------
     Top Scroll Progress Bar
     -------------------------------------------------------------------------- */
  const scrollProgressBar = document.getElementById('scroll-progress');
  const updateScrollProgress = () => {
    if (!scrollProgressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    scrollProgressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* --------------------------------------------------------------------------
     Three.js WebGL Scene Manager
     -------------------------------------------------------------------------- */
  try {
    class WebGLSceneManager {
      constructor() {
        this.canvas = document.getElementById('webgl-canvas');
        if (!this.canvas || typeof THREE === 'undefined') return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 4, 28);

        this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.scrollProgress = 0;
        this.clock = new THREE.Clock();

        this.objectsGroup = new THREE.Group();
        this.scene.add(this.objectsGroup);

        this.gridX = 48;
        this.gridY = 48;

        this.initObjects();
        this.initEvents();
        this.animate();
      }

      initObjects() {
        while (this.objectsGroup.children.length > 0) {
          const obj = this.objectsGroup.children[0];
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
            else obj.material.dispose();
          }
          this.objectsGroup.remove(obj);
        }

        const isLight = document.body.classList.contains('light-theme');
        const primaryColor = isLight ? 0x4f46e5 : 0x6366f1;
        const cyanColor = isLight ? 0x0284c7 : 0x06b6d4;
        const violetColor = isLight ? 0x9333ea : 0xa855f7;

        const count = this.gridX * this.gridY;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colCyan = new THREE.Color(cyanColor);
        const colPrimary = new THREE.Color(primaryColor);
        const colViolet = new THREE.Color(violetColor);

        let idx = 0;
        for (let x = 0; x < this.gridX; x++) {
          for (let y = 0; y < this.gridY; y++) {
            positions[idx * 3] = (x - this.gridX / 2) * 1.9;
            positions[idx * 3 + 1] = -10;
            positions[idx * 3 + 2] = (y - this.gridY / 2) * 1.9;

            const ratio = (x + y) / (this.gridX + this.gridY);
            const c = ratio < 0.5 
              ? colCyan.clone().lerp(colPrimary, ratio * 2) 
              : colPrimary.clone().lerp(colViolet, (ratio - 0.5) * 2);

            colors[idx * 3] = c.r;
            colors[idx * 3 + 1] = c.g;
            colors[idx * 3 + 2] = c.b;

            idx++;
          }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
          size: 1.15,
          vertexColors: true,
          transparent: true,
          opacity: isLight ? 0.65 : 0.85,
          blending: THREE.AdditiveBlending
        });

        this.matrixGrid = new THREE.Points(geometry, material);
        this.matrixGrid.rotation.x = 0.28;
        this.objectsGroup.add(this.matrixGrid);
      }

      initEvents() {
        window.addEventListener('mousemove', (e) => {
          this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });

        window.addEventListener('scroll', () => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          this.scrollProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
        }, { passive: true });

        window.addEventListener('resize', () => {
          this.camera.aspect = window.innerWidth / window.innerHeight;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
      }

      animate() {
        requestAnimationFrame(() => this.animate());

        const elapsedTime = this.clock.getElapsedTime();
        this.targetX += (this.mouseX - this.targetX) * 0.05;
        this.targetY += (this.mouseY - this.targetY) * 0.05;

        if (this.matrixGrid) {
          const positions = this.matrixGrid.geometry.attributes.position.array;
          let idx = 0;
          for (let x = 0; x < this.gridX; x++) {
            for (let y = 0; y < this.gridY; y++) {
              positions[idx * 3 + 1] = Math.sin(x * 0.28 + elapsedTime * 2.0) * 1.8 + 
                                       Math.cos(y * 0.28 + elapsedTime * 2.0) * 1.8 - 10;
              idx++;
            }
          }
          this.matrixGrid.geometry.attributes.position.needsUpdate = true;
          this.matrixGrid.rotation.y = this.targetX * 0.22;
          this.matrixGrid.rotation.x = 0.28 + this.targetY * 0.12;
        }

        this.camera.position.y = 4 - this.scrollProgress * 6.0;
        this.renderer.render(this.scene, this.camera);
      }
    }

    window.webGLManager = new WebGLSceneManager();
  } catch (err) {
    console.warn('WebGL Initialization skipped:', err);
  }

  /* --------------------------------------------------------------------------
     Perspective Tilt Engine
     -------------------------------------------------------------------------- */
  try {
    class SmoothTiltEngine {
      constructor() {
        this.tiltItems = [];
        const cards = document.querySelectorAll('[data-tilt]');
        
        cards.forEach(card => {
          let glare = card.querySelector('.tilt-glare');
          if (!glare) {
            glare = document.createElement('div');
            glare.className = 'tilt-glare';
            card.appendChild(glare);
          }

          const item = {
            el: card,
            glare: glare,
            layers: card.querySelectorAll('[data-tilt-layer]'),
            currentX: 0,
            currentY: 0,
            targetX: 0,
            targetY: 0,
            currentScale: 1,
            targetScale: 1,
            glareCurrentOpacity: 0,
            glareTargetOpacity: 0,
            glareX: 50,
            glareY: 50,
            isHovered: false
          };

          card.addEventListener('mouseenter', () => {
            item.isHovered = true;
            item.targetScale = 1.025;
            item.glareTargetOpacity = 1;
          });

          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            item.targetX = ((y - centerY) / centerY) * -8;
            item.targetY = ((x - centerX) / centerX) * 8;
            item.glareX = (x / rect.width) * 100;
            item.glareY = (y / rect.height) * 100;
          });

          card.addEventListener('mouseleave', () => {
            item.isHovered = false;
            item.targetX = 0;
            item.targetY = 0;
            item.targetScale = 1;
            item.glareTargetOpacity = 0;
          });

          this.tiltItems.push(item);
        });

        this.render();
      }

      render() {
        this.tiltItems.forEach(item => {
          item.currentX += (item.targetX - item.currentX) * 0.12;
          item.currentY += (item.targetY - item.currentY) * 0.12;
          item.currentScale += (item.targetScale - item.currentScale) * 0.12;
          item.glareCurrentOpacity += (item.glareTargetOpacity - item.glareCurrentOpacity) * 0.15;

          if (Math.abs(item.currentX) > 0.01 || Math.abs(item.currentY) > 0.01 || item.isHovered) {
            item.el.style.transform = `perspective(1100px) rotateX(${item.currentX.toFixed(2)}deg) rotateY(${item.currentY.toFixed(2)}deg) scale3d(${item.currentScale.toFixed(3)}, ${item.currentScale.toFixed(3)}, ${item.currentScale.toFixed(3)})`;
            
            item.el.style.setProperty('--glare-x', `${item.glareX.toFixed(1)}%`);
            item.el.style.setProperty('--glare-y', `${item.glareY.toFixed(1)}%`);
            item.el.style.setProperty('--glare-opacity', item.glareCurrentOpacity.toFixed(2));

            item.layers.forEach(layer => {
              const depth = parseFloat(layer.getAttribute('data-tilt-layer')) || 15;
              const factor = item.isHovered ? 1 : Math.max(0, (item.currentScale - 1) * 30);
              layer.style.transform = `translateZ(${(depth * factor).toFixed(1)}px)`;
            });
          } else {
            item.el.style.transform = `perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            item.el.style.setProperty('--glare-opacity', '0');
            item.layers.forEach(layer => {
              layer.style.transform = `translateZ(0px)`;
            });
          }
        });

        requestAnimationFrame(() => this.render());
      }
    }

    new SmoothTiltEngine();
  } catch (err) {
    console.warn('Tilt Engine skipped:', err);
  }

  /* --------------------------------------------------------------------------
     Dynamic Typing Effect
     -------------------------------------------------------------------------- */
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Student Brand Ambassador @ The Esports Club',
      'Independent Gameplay QA Specialist (15+ Mos)',
      'Event Operations & Fest Tech Coordinator',
      'Python Data & Machine Learning Enthusiast',
      'BCA Undergrad @ Techno International'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typingElement.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
      }

      let speed = isDeleting ? 30 : 60;

      if (!isDeleting && charIdx === currentRole.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  /* --------------------------------------------------------------------------
     Scroll Reveals & Skill Energy Meters
     -------------------------------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (reveals.length > 0 && typeof IntersectionObserver !== 'undefined') {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));
  }

  const skillCards = document.querySelectorAll('.skill-card-3d');
  if (skillCards.length > 0 && typeof IntersectionObserver !== 'undefined') {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-meter-fill');
          fills.forEach(fill => {
            const level = fill.getAttribute('data-level') || '85%';
            fill.style.width = level;
          });
        }
      });
    }, { threshold: 0.25 });

    skillCards.forEach(card => skillObserver.observe(card));
  }

  /* --------------------------------------------------------------------------
     Animated Metric Numbers
     -------------------------------------------------------------------------- */
  const metricNumbers = document.querySelectorAll('.metric-number');
  let metricsStarted = false;

  const runCounterAnimation = () => {
    metricNumbers.forEach(item => {
      const originalText = item.getAttribute('data-count') || item.textContent.trim();
      item.setAttribute('data-count', originalText);

      const match = originalText.match(/(\d+)/);
      if (match) {
        const target = parseInt(match[0], 10);
        const prefix = originalText.substring(0, match.index);
        const suffix = originalText.substring(match.index + match[0].length);

        let current = 0;
        const duration = 1400;
        const interval = 25;
        const steps = duration / interval;
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            item.textContent = `${prefix}${target}${suffix}`;
            clearInterval(timer);
          } else {
            item.textContent = `${prefix}${Math.floor(current)}${suffix}`;
          }
        }, interval);
      }
    });
  };

  const metricsBar = document.querySelector('.hero-metrics-bar-3d');
  if (metricsBar && typeof IntersectionObserver !== 'undefined') {
    const metricsObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !metricsStarted) {
          runCounterAnimation();
          metricsStarted = true;
        }
      });
    }, { threshold: 0.4 });
    metricsObs.observe(metricsBar);
  }

  /* --------------------------------------------------------------------------
     Dark / Light Theme Toggle
     -------------------------------------------------------------------------- */
  const themeButton = document.getElementById('theme-button');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('selected-theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) themeIcon.className = 'ri-sun-line';
  } else {
    document.body.classList.remove('light-theme');
    if (themeIcon) themeIcon.className = 'ri-moon-clear-line';
  }

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('selected-theme', isLight ? 'light' : 'dark');

      if (themeIcon) {
        themeIcon.className = isLight ? 'ri-sun-line' : 'ri-moon-clear-line';
      }

      if (window.cyberAudio) window.cyberAudio.playSwitch();
      if (window.webGLManager) window.webGLManager.initObjects();
      showToast(isLight ? 'Luminous Light Mode Activated' : 'Cyber Obsidian Dark Mode Activated', 'ri-palette-line');
    });
  }

  /* --------------------------------------------------------------------------
     Navigation & ScrollSpy
     -------------------------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show-menu');
      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('show-menu');
      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  });

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (scrollY >= 40) {
      header?.classList.add('scroll-header');
    } else {
      header?.classList.remove('scroll-header');
    }

    if (scrollY >= 450) {
      backToTop?.classList.add('show');
    } else {
      backToTop?.classList.remove('show');
    }

    sections.forEach(sec => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop - 140;
      const secId = sec.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*="${secId}"]`);

      if (navLink) {
        if (scrollY > secTop && scrollY <= secTop + secHeight) {
          navLink.classList.add('active-link');
        } else {
          navLink.classList.remove('active-link');
        }
      }
    });
  }, { passive: true });

  /* --------------------------------------------------------------------------
     Skills Category Filter
     -------------------------------------------------------------------------- */
  const skillTabs = document.querySelectorAll('.skill-tab-btn-3d');
  const allSkillCards = document.querySelectorAll('.skill-card-3d');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (window.cyberAudio) window.cyberAudio.playSwitch();

      const filter = tab.getAttribute('data-filter');
      allSkillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'hudSlideIn 0.4s var(--ease-smooth) forwards';
          const fills = card.querySelectorAll('.skill-meter-fill');
          fills.forEach(fill => {
            const level = fill.getAttribute('data-level') || '85%';
            fill.style.width = level;
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     Esports Reflex Tester Mini-Game
     -------------------------------------------------------------------------- */
  const reflexBtn = document.getElementById('start-reflex-test');
  const reflexArena = document.getElementById('reflex-arena');
  const reflexText = document.getElementById('reflex-status-text');
  const reflexTarget = document.getElementById('reflex-target');
  const reflexScoreLabel = document.getElementById('reflex-score-label');
  const reflexRankBadge = document.getElementById('reflex-rank-badge');

  let reflexState = 'idle';
  let reflexStartTime = 0;
  let reflexTimeout = null;

  if (reflexBtn && reflexArena) {
    const startTest = () => {
      if (reflexState !== 'idle') return;
      reflexState = 'waiting';
      reflexArena.className = 'reflex-arena waiting';
      reflexText.style.display = 'block';
      reflexTarget.style.display = 'none';
      reflexText.textContent = 'WAIT FOR GREEN PULSE... DO NOT CLICK YET!';
      reflexScoreLabel.textContent = 'Reflex Score: Calculating...';
      reflexRankBadge.className = 'rank-badge rank-untested';
      reflexRankBadge.textContent = 'TESTING...';
      if (window.cyberAudio) window.cyberAudio.playClick();

      const randomDelay = 1500 + Math.random() * 3000;
      reflexTimeout = setTimeout(() => {
        reflexState = 'ready';
        reflexStartTime = performance.now();
        reflexArena.className = 'reflex-arena ready';
        reflexText.style.display = 'none';
        reflexTarget.style.display = 'block';
        if (window.cyberAudio) window.cyberAudio.playLaser();
      }, randomDelay);
    };

    reflexBtn.addEventListener('click', startTest);

    reflexArena.addEventListener('click', () => {
      if (reflexState === 'waiting') {
        clearTimeout(reflexTimeout);
        reflexState = 'idle';
        reflexArena.className = 'reflex-arena';
        reflexText.style.display = 'block';
        reflexTarget.style.display = 'none';
        reflexText.textContent = 'TOO EARLY! Click "Start Test" to try again.';
        reflexRankBadge.className = 'rank-badge rank-untested';
        reflexRankBadge.textContent = 'TOO EARLY';
        if (window.cyberAudio) window.cyberAudio.playError();
      } else if (reflexState === 'ready') {
        const reactionTime = Math.round(performance.now() - reflexStartTime);
        reflexState = 'idle';
        reflexArena.className = 'reflex-arena';
        reflexText.style.display = 'block';
        reflexTarget.style.display = 'none';
        reflexText.textContent = `Reaction Time: ${reactionTime} ms! Click "Start Test" to retry.`;
        reflexScoreLabel.textContent = `Reflex Score: ${reactionTime} ms`;

        if (reactionTime < 220) {
          reflexRankBadge.className = 'rank-badge rank-s-tier';
          reflexRankBadge.textContent = 'S-TIER ESPORTS PRO';
          showToast(`Incredible Reflex: ${reactionTime}ms (S-Tier Pro)!`, 'ri-trophy-line');
        } else if (reactionTime < 290) {
          reflexRankBadge.className = 'rank-badge rank-pro';
          reflexRankBadge.textContent = 'PRO QA TESTER';
          showToast(`Sharp Reflex: ${reactionTime}ms (Pro QA Rank)!`, 'ri-medal-line');
        } else {
          reflexRankBadge.className = 'rank-badge rank-good';
          reflexRankBadge.textContent = 'GOOD REFLEXES';
        }

        if (window.cyberAudio) window.cyberAudio.playSuccess();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Contact Form
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> <span>Transmitting...</span>`;
      if (window.cyberAudio) window.cyberAudio.playClick();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="ri-checkbox-circle-line"></i> <span>Message Transmitted!</span>`;
        if (window.cyberAudio) window.cyberAudio.playChime();
        showToast('Message transmitted successfully! Thank you for reaching out.', 'ri-mail-send-line');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
        }, 3500);
      }, 1200);
    });
  }

});


/* ==========================================================================
   4. TOAST NOTIFICATIONS & CLIPBOARD HELPER
   ========================================================================== */
window.copyToClipboard = function(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard!`, 'ri-file-copy-line');
      if (window.cyberAudio) window.cyberAudio.playSuccess();
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
};

function fallbackCopy(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`${label} copied to clipboard!`, 'ri-file-copy-line');
    if (window.cyberAudio) window.cyberAudio.playSuccess();
  } catch (err) {
    showToast(`Failed to copy: ${err}`, 'ri-error-warning-line');
  }
  document.body.removeChild(textArea);
}

function showToast(msg, iconClass = 'ri-checkbox-circle-line') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="${iconClass}" style="color: var(--accent-cyan); font-size: 1.25rem;"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px) scale(0.9)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
