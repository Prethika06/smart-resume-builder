// cloning for container like education, experience, and project

let cloneCounters = { education: 1, experience: 1, project: 1 };

// Function to clone and append a new card
function handleClone(sectionName, container, firstCard) {
  const clonedCard = firstCard.cloneNode(true);

  // Assign unique ID to the cloned card first to avoid double increment
  const currentClone = cloneCounters[sectionName]++;
  clonedCard.id = `${sectionName}-card-${currentClone}`;

  // Reset input and textarea values and assign unique IDs
  clonedCard.querySelectorAll("input, textarea").forEach((element) => {
    element.value = "";
    if (element.id) {
      const baseId = element.id.split("-")[0];
      element.id = `${baseId}-${currentClone}`;
    }
  });

  // Set up buttons
  const cloneAddBtn = clonedCard.querySelector(".add-btn");
  const removeBtn = clonedCard.querySelector(".remove-btn");

  if (cloneAddBtn) cloneAddBtn.style.display = "inline-block";
  if (removeBtn) removeBtn.style.display = "inline-block";

  // Add event listener to the new Add button
  if (cloneAddBtn) {
    const newAddBtn = cloneAddBtn.cloneNode(true); // remove old listeners
    cloneAddBtn.replaceWith(newAddBtn);
    newAddBtn.addEventListener("click", () => {
      newAddBtn.style.display = "none";
      handleClone(sectionName, container, firstCard);
    });
  }

  // Add event listener to the Remove button
  if (removeBtn) {
    const newRemoveBtn = removeBtn.cloneNode(true);
    removeBtn.replaceWith(newRemoveBtn);
    newRemoveBtn.addEventListener("click", () => {
      clonedCard.remove();
      const lastCard = container.querySelector(".resume-card:last-child");
      if (lastCard) {
        const lastAddBtn = lastCard.querySelector(".add-btn");
        if (lastAddBtn) lastAddBtn.style.display = "inline-block";
      }
    });
  }

  container.appendChild(clonedCard);

  // Ensure only the last card shows the Add button
  const allCards = container.querySelectorAll(".resume-card");
  allCards.forEach((card, index) => {
    const addBtn = card.querySelector(".add-btn");
    if (addBtn)
      addBtn.style.display =
        index === allCards.length - 1 ? "inline-block" : "none";
  });
}

// Main setup function
function cloneCard(sectionName) {
  const container = document.querySelector(`.${sectionName}-container`);
  const firstCard = container.querySelector(".resume-card");
  const addBtn = firstCard.querySelector(".add-btn");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addBtn.style.display = "none"; // Hide original add button
      handleClone(sectionName, container, firstCard);
    });
  }
}

// Call this function for each section you want to make cloneable
cloneCard("education");
cloneCard("experience");
cloneCard("project");

// preview part
const previewBtn = document.getElementById("preview-btn");
const resumePreview = document.getElementById("resumePreview");
const resumeModal = document.getElementById("resumeModal");

//format date
const formatDate = (dateStr) =>
  dateStr && !isNaN(new Date(dateStr))
    ? new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : "Present";

const form = document.getElementById("resume-form");
previewBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevents form submission
  // Check validity
  if (!form.checkValidity()) {
    form.reportValidity(); // shows browser validation messages
    return; // stop preview
  }
  const formData = new FormData(form);
  const title = formData.get("title");
  const name = formData.get("fullname");
  const email = formData.get("email");
  const phoneNumber = formData.get("phone-number");
  const userLocation = formData.get("user-location");
  const linkedIn = formData.get("linkedin");
  const github = formData.get("github");
  const summary = formData.get("summary");

  // Education - loop through all cards
  let educationHtml = "";
  document
    .querySelectorAll(".education-container .resume-card")
    .forEach((card) => {
      const degree = card.querySelector('[name="degree"]').value;
      const major = card.querySelector('[name="major"]').value;
      const college = card.querySelector('[name="college"]').value;
      const startDate = card.querySelector(
        '[name="start-date-education"]'
      ).value;
      const endDate = card.querySelector('[name="end-date-education"]').value;
      const percentage = card.querySelector('[name="percentage"]').value;
      const grade = card.querySelector('[name="grade"]').value;

      if (degree || major || college) {
        educationHtml += `<p><strong>${degree || ""} in ${
          major || ""
        }</strong></p>`;
        if (college) educationHtml += `<p>${college}</p>`;
        if (startDate || endDate)
          educationHtml += `<p>${formatDate(startDate)} – ${formatDate(
            endDate
          )}</p>`;

        if (percentage) educationHtml += `<p>Percentage: ${percentage}</p>`;
        if (grade) educationHtml += `<p>GPA: ${grade}</p>`;
      }
    });

  // Experience - loop through all cards
  let experienceHtml = "";
  document
    .querySelectorAll(".experience-container .resume-card")
    .forEach((card) => {
      const jobTitle = card.querySelector('[name="job-title"]').value;
      const companyName = card.querySelector('[name="company-name"]').value;
      const companyLocation = card.querySelector(
        '[name="company-location"]'
      ).value;
      const jobStartDate = card.querySelector('[name="start-date-job"]').value;
      const jobEndDate = card.querySelector('[name="end-date-job"]').value;
      const achievements = card.querySelector('[name="achievements"]').value;

      if (jobTitle || companyName || achievements) {
        experienceHtml += `<p><strong>${jobTitle || ""}</strong> at ${
          companyName || ""
        }</p>`;
        if (companyLocation) experienceHtml += `<p>${companyLocation}</p>`;
        if (jobStartDate || jobEndDate)
          experienceHtml += `<p>${formatDate(jobStartDate)} – ${formatDate(
            jobEndDate
          )}</p>`;
        if (achievements) {
          const formattedAchievements = achievements.replace(/\n/g, "<br>");
          experienceHtml += `<p>${formattedAchievements}</p>`;
        }
      }
    });

  // Projects - loop through all cards
  let projectHtml = "";
  document
    .querySelectorAll(".project-container .resume-card")
    .forEach((card) => {
      const projectTitle = card.querySelector('[name="project-title"]').value;
      const projectOrganization = card.querySelector(
        '[name="project-organization"]'
      ).value;
      const projectStartDate = card.querySelector(
        '[name="start-date-project"]'
      ).value;
      const projectEndDate = card.querySelector(
        '[name="end-date-project"]'
      ).value;
      let description = card.querySelector('[name="description"]').value;
      description = description.replace(/\n/g, "<br>");
      const technologies = card.querySelector(
        '[name="project-technologies"]'
      ).value;
      const projectLink = card.querySelector('[name="project-link"]').value;

      if (projectTitle || projectOrganization || description) {
        projectHtml += `<p><strong>${projectTitle || ""}</strong>  ${
          projectOrganization || ""
        }</p>`;
        if (projectStartDate || projectEndDate)
          projectHtml += `<p>${formatDate(projectStartDate)} – ${formatDate(
            projectEndDate
          )}</p>`;

        if (description) {
          projectHtml += `<p>${description}</p>`;
        }
        if (technologies)
          projectHtml += `<p><strong>Technologies:</strong> ${technologies}</p>`;
        if (projectLink)
          projectHtml += `<p><strong>Link:</strong> <a href="${projectLink}" target="_blank">${projectLink}</a></p>`;
      }
    });

  //skills
  let skillsHtml = "";
  const skills = formData.get("skills");
  if (skills) {
    const skillArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (skillArray.length) {
      // Join all skills with comma in ONE line
      skillsHtml = `
      <h2 class="section-title">Skills</h2>
      <div class="section-content">
      <p class="skills-inline">• ${skillArray.join(" • ")}</p>
      </div>
    `;
    }
  }

  // Links as text but clickable
  let linksHtml = "";
  if (linkedIn)
    linksHtml += `<p class="h1">LinkedIn: <a href="${linkedIn}" target="_blank">${linkedIn}</a></p>`;
  if (github)
    linksHtml += `<p class="h1">GitHub: <a href="${github}" target="_blank">${github}</a></p>`;

  // Final resume HTML
  let html = `
  <h1>${name}</h1>
  <p class="h1">${title}</p>
  <p class="h1">${email} | ${phoneNumber} | ${userLocation}</p>
  ${linksHtml}
  ${
    summary
      ? `<h2 class="section-title">Summary</h2><div class="section-content"><p>${summary.replace(
          /\n/g,
          "<br>"
        )}</p></div>`
      : ""
  }


  ${skillsHtml}

  ${
    educationHtml
      ? `<h2 class="section-title">Education</h2><div class="section-content">${educationHtml}</div>`
      : ""
  }
  
  ${
    experienceHtml
      ? `<h2 class="section-title">Experience</h2><div class="section-content">${experienceHtml}</div>`
      : ""
  }
  ${
    projectHtml
      ? `<h2 class="section-title">Projects / Internships</h2><div class="section-content">${projectHtml}</div>`
      : ""
  }
`;

  resumePreview.innerHTML = html;
  if (resumeModal) resumeModal.style.display = "block";
});

// Close handlers
const closeBtn = document.getElementById("close-btn");
if (closeBtn) {
  closeBtn.addEventListener(
    "click",
    () => (resumeModal.style.display = "none")
  );
}
resumeModal.addEventListener("click", (e) => {
  if (e.target === resumeModal) resumeModal.style.display = "none";
});

//Word Conversion
const wordBtn = document.getElementById("word-btn");
if (wordBtn) {
  wordBtn.addEventListener("click", exportToWord);
}
function exportToWord() {
  if (resumePreview.innerHTML.trim() === "") {
    alert("There is no preview to export.");
    return;
  }

  // CSS for Word
  const styles = `
    <style>
      body { font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #000; margin: 20px; }
      h1 { font-weight:bold; font-size: 28px; text-align: center; margin-bottom: 5px; text-transform: uppercase;}
      .h1{font-weight:bold; text-align:center; display:block;}
      h2 {font-weight:bold; font-size: 18px; margin-top: 25px; margin-bottom: 10px; border-bottom: 1px solid #000; padding-bottom: 3px; text-transform: uppercase; page-break-after: avoid;}
      p { font-size: 14px; margin: 2px 0; color: #000000; line-height:1.6;}
      .skills-inline { font-size: 14px; line-height: 1.6; color: #000000; display: inline; margin: 0; padding: 0;}
      a { color: #000; text-decoration: underline; font-weight: bold; }
      hr { border:1px solid #000000; margin: 10px 0; }
    </style>
  `;

  // Word HTML structure
  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Resume</title>
        ${styles}
      </head>
      <body>
  `;
  const footer = "</body></html>";

  // Prepare content
  let content = resumePreview.innerHTML;

  // Replace multiline text <br> with paragraph breaks, except skills inline
  content = content.replace(
    /<p class="skills-inline">(.*?)<\/p>/gi,
    function (match) {
      return match; // Keep skills inline as-is
    }
  );
  content = content.replace(/<br\s*\/?>/gi, "</p><p>"); // Replace other <br> with paragraph breaks
  content = content.replace(/<p>\s*<\/p>/g, ""); // Remove empty paragraphs

  // Build final Word document
  const blob = new Blob(["\ufeff", header + content + footer], {
    type: "application/msword",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "My_Resume.doc";
  link.click();
  URL.revokeObjectURL(url);
}
