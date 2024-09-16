"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html2pdf_js_1 = require("html2pdf.js");
var form = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resume-output');
var shareLinkElement = document.getElementById('share-link');
var downloadButton = document.getElementById('download-pdf');
var resumeData;
var resumeId = '';
form.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    resumeData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        gender: ((_a = document.querySelector('input[name="gender"]:checked')) === null || _a === void 0 ? void 0 : _a.value) || '',
        email: document.getElementById('email').value,
        religion: document.getElementById('religion').value,
        address: document.getElementById('address').value,
        mobile: document.getElementById('mobile').value,
        dob: document.getElementById('dob').value,
        nationality: document.getElementById('country').value,
        objectives: document.getElementById('objectives').value,
        skills: Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(function (el) { return el.value; }),
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
    };
    resumeId = generateUniqueId();
    displayResume(resumeData);
});
function generateUniqueId() {
    return 'resume-' + Math.random().toString(36).substr(2, 9);
}
function displayResume(data) {
    resumeOutput.innerHTML = "\n        <h2>Your Resume</h2>\n        <p><strong>First Name:</strong> <span id=\"edit-firstName\" class=\"editable\" contenteditable=\"true\">".concat(data.firstName, "</span></p>\n        <p><strong>Last Name:</strong> <span id=\"edit-lastName\" class=\"editable\" contenteditable=\"true\">").concat(data.lastName, "</span></p>\n        <p><strong>Gender:</strong> <span id=\"edit-gender\" class=\"editable\" contenteditable=\"true\">").concat(data.gender, "</span></p>\n        <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\" contenteditable=\"true\">").concat(data.email, "</span></p>\n        <p><strong>Religion:</strong> <span id=\"edit-religion\" class=\"editable\" contenteditable=\"true\">").concat(data.religion, "</span></p>\n        <p><strong>Address:</strong> <span id=\"edit-address\" class=\"editable\" contenteditable=\"true\">").concat(data.address, "</span></p>\n        <p><strong>Mobile Number:</strong> <span id=\"edit-mobile\" class=\"editable\" contenteditable=\"true\">").concat(data.mobile, "</span></p>\n        <p><strong>Date of Birth:</strong> <span id=\"edit-dob\" class=\"editable\" contenteditable=\"true\">").concat(data.dob, "</span></p>\n        <p><strong>Nationality:</strong> <span id=\"edit-nationality\" class=\"editable\" contenteditable=\"true\">").concat(data.nationality, "</span></p>\n        <p><strong>Objectives:</strong> <span id=\"edit-objectives\" class=\"editable\" contenteditable=\"true\">").concat(data.objectives, "</span></p>\n        <p><strong>Skills:</strong> <span id=\"edit-skills\" class=\"editable\" contenteditable=\"true\">").concat(data.skills.join(', '), "</span></p>\n        <p><strong>Experience:</strong> <span id=\"edit-experience\" class=\"editable\" contenteditable=\"true\">").concat(data.experience, "</span></p>\n        <p><strong>Education:</strong> <span id=\"edit-education\" class=\"editable\" contenteditable=\"true\">").concat(data.education, "</span></p>\n        <button id=\"save-changes\">Save Changes</button>\n        <a id=\"resume-link\" href=\"#\" target=\"_blank\">Shareable Link</a>\n        <button id=\"download-pdf\">Download PDF</button>\n    ");
    // Update the shareable link
    if (shareLinkElement) {
        shareLinkElement.href = "http://example.com/".concat(resumeId);
        shareLinkElement.textContent = "Shareable Link: http://example.com/".concat(resumeId);
    }
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (el) {
        el.addEventListener('blur', function (event) {
            var target = event.target;
            saveFieldEdit(target.id, target.innerText);
        });
    });
    var saveButton = document.getElementById('save-changes');
    saveButton.addEventListener('click', function () {
        alert('Resume changes saved successfully!');
        console.log('Updated Resume Data:', resumeData);
    });
}
downloadButton.addEventListener('click', function () {
    var resumeElement = document.getElementById('resume-output');
    if (!resumeElement) {
        console.error('Resume element not found');
        return;
    }
    var options = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    (0, html2pdf_js_1.default)().from(resumeElement).set(options).save().then(function () {
        console.log('PDF generated and saved successfully');
    }).catch(function (error) {
        console.error('Error generating PDF:', error);
    });
});
function saveFieldEdit(fieldId, newValue) {
    switch (fieldId) {
        case 'edit-firstName':
            resumeData.firstName = newValue;
            break;
        case 'edit-lastName':
            resumeData.lastName = newValue;
            break;
        case 'edit-gender':
            resumeData.gender = newValue;
            break;
        case 'edit-email':
            resumeData.email = newValue;
            break;
        case 'edit-religion':
            resumeData.religion = newValue;
            break;
        case 'edit-address':
            resumeData.address = newValue;
            break;
        case 'edit-mobile':
            resumeData.mobile = newValue;
            break;
        case 'edit-dob':
            resumeData.dob = newValue;
            break;
        case 'edit-nationality':
            resumeData.nationality = newValue;
            break;
        case 'edit-objectives':
            resumeData.objectives = newValue;
            break;
        case 'edit-skills':
            resumeData.skills = newValue.split(',').map(function (skill) { return skill.trim(); });
            break;
        case 'edit-experience':
            resumeData.experience = newValue;
            break;
        case 'edit-education':
            resumeData.education = newValue;
            break;
    }
}
