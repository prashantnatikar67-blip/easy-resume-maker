const form = document.getElementById('resumeForm');
const preview = document.getElementById('resumePreview');
const templateSelect = document.getElementById('templateSelect');

const fields = [
  ['fullName', 'pName', 'Your Name'],
  ['jobTitle', 'pTitle', 'Your professional title'],
  ['summary', 'pSummary', 'Your professional summary will appear here. Highlight your strengths, interests, and career goals.'],
  ['degree', 'pDegree', 'Your degree or course'],
  ['school', 'pSchool', 'Your institution'],
  ['eduYear', 'pEduYear', ''],
  ['grade', 'pGrade', ''],
  ['role', 'pRole', 'Your role'],
  ['company', 'pCompany', ''],
  ['experience', 'pExperience', 'Add experience details, internships, or relevant activities.'],
  ['projects', 'pProjects', 'Your projects will appear here.'],
  ['extras', 'pExtras', 'Certifications, languages, or achievements.']
];

function value(name) {
  const element = form.elements.namedItem(name);
  return element ? element.value.trim() : '';
}
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
function setSectionVisibility(id, visible) {
  document.getElementById(id).hidden = !visible;
}
function updatePreview() {
  fields.forEach(([name, id, fallback]) => setText(id, value(name) || fallback));

  const contact = [value('email'), value('phone'), value('location')].filter(Boolean);
  setText('pContact', contact.length ? contact.join('  •  ') : 'Email · Phone · City');

  const skills = value('skills').split(/[,;\n]/).map(s => s.trim()).filter(Boolean);
  const skillsList = document.getElementById('pSkills');
  skillsList.replaceChildren();
  (skills.length ? skills : ['Your skills will appear here']).forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  setSectionVisibility('summarySection', !!value('summary'));
  setSectionVisibility('educationSection', !!(value('degree') || value('school') || value('eduYear') || value('grade')));
  setSectionVisibility('experienceSection', !!(value('role') || value('company') || value('experience')));
  setSectionVisibility('skillsSection', !!value('skills'));
  setSectionVisibility('projectsSection', !!value('projects'));
  setSectionVisibility('extrasSection', !!value('extras'));
}
form.addEventListener('input', updatePreview);

templateSelect.addEventListener('change', () => {
  preview.classList.remove('template-classic', 'template-modern', 'template-minimal');
  preview.classList.add(`template-${templateSelect.value}`);
});

document.getElementById('clearBtn').addEventListener('click', () => {
  if (confirm('Clear all resume details? This cannot be undone.')) {
    form.reset();
    updatePreview();
  }
});

document.getElementById('exampleBtn').addEventListener('click', () => {
  const sample = {
    fullName: 'Aarav Sharma',
    jobTitle: 'Electronics Engineering Student',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Bagalkot, Karnataka',
    summary: 'Motivated electronics engineering student with a foundation in digital electronics, embedded systems, and programming. Interested in practical problem-solving and learning new technologies.',
    degree: 'Diploma in Electronics and Communication Engineering',
    school: 'Government Polytechnic',
    eduYear: '2023–2026',
    grade: 'Add your grade',
    role: 'Student Project Team Member',
    company: 'Academic Project',
    experience: '• Collaborated with a team to plan and document a technical project.\\n• Prepared project reports and presentations.',
    skills: 'Communication, C programming, Digital electronics, Teamwork, Problem-solving',
    projects: 'Speech Recognition System — studied speech features such as MFCC and LPCC for a comparative project.',
    extras: 'Languages: English, Kannada'
  };
  Object.entries(sample).forEach(([name, val]) => {
    const el = form.elements.namedItem(name);
    if (el) el.value = val.replace(/\\n/g, '\n');
  });
  updatePreview();
  document.getElementById('preview').scrollIntoView({behavior:'smooth', block:'start'});
});

document.getElementById('downloadBtn').addEventListener('click', async () => {
  const name = value('fullName') || 'Resume';
  const button = document.getElementById('downloadBtn');
  if (typeof html2pdf === 'undefined') {
    alert('The PDF library could not load. Check your internet connection and reload this page, then try again.');
    return;
  }
  const oldText = button.innerHTML;
  button.disabled = true;
  button.textContent = 'Preparing PDF…';
  const options = {
    margin: [8, 8, 8, 8],
    filename: `${name.replace(/[^a-z0-9 _-]/gi, '').trim().replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };
  try {
    await html2pdf().set(options).from(preview).save();
  } catch (error) {
    console.error(error);
    alert('PDF download failed. Please try again or use your browser’s Print → Save as PDF option.');
  } finally {
    button.disabled = false;
    button.innerHTML = oldText;
  }
});

updatePreview();
