// ── Project data ──────────────────────────────────────────────
const PROJECTS = {
  educare: {
    title: 'EduCare',
    image: 'img/eduCare.png',
    imageAlt: 'EduCare hi-fi prototype',
    description: 'Group project of a hi-fi app for educators to share lesson plans and receive donations through their communities.',
    tags: ['Figma'],
    links: [
      { label: 'Prototype', href: 'https://www.figma.com/proto/0SnawPEmQXtgSA7RrEtov2/EduCare-Hifi?node-id=1-2&t=6gcTfwaJyAMXSxEW-1&starting-point-node-id=1%3A2', cls: 'btn-secondary' }
    ],
    whyBuilt: 'This was a group project for my UX Design course. We identified a gap in how educators access resources and community funding, and wanted to explore how a mobile-first platform could address that. It was my first time leading the prototyping phase in Figma, and I found the challenge of designing for two very different user types — teachers and donors — really rewarding.',
    whatIdDoDifferently: "Looking back, I'd spend more time on user testing with actual educators before finalizing the hi-fi prototype. We made some assumptions about navigation patterns that probably would have been challenged in real usability sessions. I'd also revisit the information architecture — the donation flow felt a bit buried and could benefit from a clearer call to action."
  },
  safebites: {
    title: 'SafeBites',
    image: 'img/safeBites.png',
    imageAlt: 'SafeBites project presentation',
    description: 'WIP Group Project. Allows users to find restaurants near them based on their dietary needs and preference.',
    tags: ['React Native', 'MongoDB', 'Node.js'],
    links: [
      { label: 'Presentation', href: 'https://canva.link/pkojfel409neejz', cls: 'btn-secondary' },
      { label: 'GitHub', href: 'https://github.com/M-Carberry/SafeBites', cls: 'btn-ghost' }
    ],
    whyBuilt: "SafeBites was built for my Digital Media Web Design Capstone class where my group built this app that allowed users to find restaurants around them based on dietary needs and preferences.",
    whatIdDoDifferently: "I'd push for more structured API design earlier in the project, since I wasn't too familiar with much back-end work. I think if my group had more time it would be nice to upscale the data with a working API that fetches restaurant data."
  },
  'locked-in': {
    title: 'Locked In Factory',
    image: 'img/locked-in.png',
    imageAlt: 'Locked In Factory study planner',
    description: 'A study planner with built-in features to help you stay focused.',
    tags: ['Python', 'API'],
    links: [
      { label: 'Website', href: 'https://locked-in-factory.netlify.app/', cls: 'btn-secondary' },
      { label: 'GitHub', href: 'https://github.com/abigail-y/lockedin', cls: 'btn-ghost' }
    ],
    whyBuilt: "I built this as a personal tool because I genuinely struggled staying focused while studying. I wanted something that combined task management with a Pomodoro-style timer and a motivational element. Using weather and quote APIs gave the app some personality and made it feel less like a chore to open.",
    whatIdDoDifferently: "The biggest thing I'd change is data persistence — tasks reset on refresh since there's no backend. I'd integrate localStorage at minimum, or ideally a lightweight backend so sessions are saved. I'd also clean up the CSS and make it fully responsive, since the layout is a bit rough on smaller screens."
  },
  'elkjer-music': {
    title: 'Elkjer Music',
    image: 'img/accessible.png',
    imageAlt: 'Elkjer Music accessible website',
    description: 'Project where I took an existing website and made it accessibility-friendly.',
    tags: ['HTML', 'CSS'],
    links: [
      { label: 'Original Site', href: 'https://robertelkjer.net/ElkjerMusicHomePage11g.html', cls: 'btn-secondary' },
      { label: 'Accessible Site', href: 'https://ej-music.netlify.app/', cls: 'btn-ghost' }
    ],
    whyBuilt: "This was a class assignment focused on web accessibility. I chose Elkjer Music because it was a real site with genuine barriers — poor contrast, no alt text, and broken keyboard navigation. Fixing those felt meaningful because it directly improved usability for real users, not just for a grade.",
    whatIdDoDifferently: "I'd do a more thorough audit using tools like Lighthouse and axe before starting, rather than relying on visual inspection alone. There were some ARIA landmark and focus management improvements I missed that I only caught later. I'd also document each change with a before/after comparison for a stronger case study presentation."
  },
  'thrifted-living': {
    title: 'Thrifted Living',
    image: 'img/thrifted-living.png',
    imageAlt: 'Thrifted Living website',
    description: 'Project built with Claude Code to demonstrate proper AI usage in web development.',
    tags: ['Claude', 'HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Website', href: 'https://thrifted-living-5.netlify.app/', cls: 'btn-secondary' },
      { label: 'GitHub', href: 'https://github.com/abigail-y/thrifted_living', cls: 'btn-ghost' }
    ],
    whyBuilt: "This project was built to demonstrate thoughtful AI-assisted development using Claude Code as a collaborator rather than just a code generator. The theme of thrift and sustainability felt fitting given the context of working efficiently and intentionally. It was a good exercise in directing AI tooling while maintaining ownership of design decisions.",
    whatIdDoDifferently: "I'd define the component structure more explicitly before starting so the AI-generated code stays more consistent throughout. I'd also add more interactive elements, right now it's mostly static content, and a funtional filter and checkout feature would make it more technically interesting to showcase."
  }
};

// ── Contact form (index only) ─────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  const formStatus = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Swap this fetch() for your actual backend / form service endpoint later
    formStatus.textContent = "Thanks! I'll get back to you soon.";
    formStatus.classList.remove('error');
    form.reset();
  });
}

// ── Active nav link on scroll (index only) ────────────────────
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

// ── Project detail page ───────────────────────────────────────
const detailRoot = document.getElementById('project-detail');
if (detailRoot) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const project = PROJECTS[id];

  if (!project) {
    detailRoot.innerHTML = '<p style="text-align:center;padding:4rem 2rem;color:var(--text-muted)">Project not found. <a href="index.html" style="color:var(--lime)">Go back</a></p>';
  } else {
    document.title = `${project.title} — Portfolio`;

    const tagsHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join('');
    const linksHTML = project.links.map(l => `<a href="${l.href}" class="${l.cls}">${l.label}</a>`).join('');
    const imgHTML = project.image
      ? `<img src="${project.image}" alt="${project.imageAlt}">`
      : `<div class="detail-hero-placeholder">No image yet</div>`;

    detailRoot.innerHTML = `
      <div class="detail-hero">${imgHTML}</div>
      <div class="detail-content">
        <a href="index.html#projects" class="back-link">← Back to Projects</a>
        <div class="detail-header">
          <h1>${project.title}</h1>
          <div class="project-tags">${tagsHTML}</div>
        </div>
        <div class="detail-body">
          <div class="detail-left">
            <p>${project.description}</p>
            <div class="detail-links">${linksHTML}</div>
          </div>
          <div class="detail-right">
            <div class="detail-right-section">
              <h2>Why I Built This</h2>
              <p>${project.whyBuilt}</p>
            </div>
            <div class="detail-right-section">
              <h2>What I'd Do Differently</h2>
              <p>${project.whatIdDoDifferently}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
