
const projects = [
  {
    title: "AI Podcast: Masa Depan Teknologi",
    course: "AI Content Creation",
    type: "mp3",
    file: "assets/podcast.mp3",
    description: "Podcast singkat tentang peran AI dalam pendidikan.",
    tags: ["AI Audio", "Podcast", "Kreativitas"]
  },
  {
    title: "Panduan Belajar dengan AI",
    course: "AI Research & Writing",
    type: "pdf",
    file: "assets/panduan.pdf",
    description: "Dokumen pembelajaran yang dibuat dengan bantuan AI.",
    tags: ["AI Writing", "Research", "PDF"]
  },
  {
    title: "Website Edukasi Interaktif",
    course: "AI Web Development",
    type: "html",
    file: "assets/website.html",
    description: "Website interaktif untuk membantu proses belajar.",
    tags: ["HTML", "Web Design", "AI Coding"]
  },
  {
    title: "AI Animation: Petualangan Digital",
    course: "AI Video Production",
    type: "mp4",
    file: "assets/animasi.mp4",
    description: "Video pendek dengan visual dan cerita berbantuan AI.",
    tags: ["AI Video", "Animation", "Storytelling"]
  },
  {
    title: "AI Artwork: Kota Masa Depan",
    course: "Generative AI Art",
    type: "png",
    file: "assets/leehan.png",
    description: "seseorang yang suka gummy.",
    tags: ["AI Art", "Image Generation", "PNG"]
  }
];

const projectList = document.getElementById("project-list");

function createPreview(project) {
  const file = escapeHTML(project.file);
  const title = escapeHTML(project.title);

  switch (project.type.toLowerCase()) {
    case "mp3":
      return `
        <div class="audio-placeholder">♫</div>
        <audio controls preload="metadata">
          <source src="${file}" type="audio/mpeg">
          Browser tidak mendukung audio.
        </audio>`;

    case "pdf":
      return `
        <iframe
          src="${file}"
          title="Preview ${title}"
          loading="lazy">
        </iframe>`;

    case "html":
      return `
        <iframe
          src="${file}"
          title="Preview ${title}"
          loading="lazy">
        </iframe>`;

    case "mp4":
      return `
        <video controls preload="metadata">
          <source src="${file}" type="video/mp4">
          Browser tidak mendukung video.
        </video>`;

    case "png":
      return `
        <a href="${file}" target="_blank" rel="noopener">
          <img src="${file}" alt="${title}" loading="lazy">
        </a>`;

    default:
      return `<p>Preview format ini belum tersedia.</p>`;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function createCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card";

  const tags = project.tags
    .map(tag => `<span class="tag">${escapeHTML(tag)}</span>`)
    .join("");

  const file = escapeHTML(project.file);
  const type = project.type.toLowerCase();
  const isImage = type === "png";

  const preview = createPreview(project);

  const primaryLabel = {
    mp3: "Buka Audio ↗",
    pdf: "Buka PDF ↗",
    html: "Buka Website ↗",
    mp4: "Buka Video ↗",
    png: "Lihat Gambar ↗"
  }[type] || "Buka Proyek ↗";

  card.innerHTML = `
    <div class="card-top">
      <span class="project-number">
        PROJECT ${String(index + 1).padStart(2, "0")}
      </span>
      <span class="file-type">${escapeHTML(type.toUpperCase())}</span>
    </div>

    <h3>${escapeHTML(project.title)}</h3>
    <div class="course">Course: ${escapeHTML(project.course)}</div>

    <div class="preview">
      <div class="preview-label">PROJECT PREVIEW</div>
      ${preview}
    </div>

    <p class="description">${escapeHTML(project.description)}</p>

    <div class="tags">${tags}</div>

    <div class="actions">
      <a class="btn"
         href="${file}"
         target="_blank"
         rel="noopener">
        ${primaryLabel}
      </a>
      ${isImage || type === "pdf" ? `
        <a class="btn secondary"
           href="${file}"
           download>
          Unduh
        </a>` : ""}
    </div>
  `;

  return card;
}

projects.forEach((project, index) => {
  projectList.appendChild(createCard(project, index));
});
