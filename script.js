// Melo M Consulting — content + interactions
// Shared across all five pages: index, about, services, contact, book-consult.
// Each render block checks the target element exists before writing to it,
// since not every page has every section.

const SERVICES = [
  { n: "01", title: "Funding Advisory", body: "Get investor and lender ready with the documentation, structure and story funders expect." },
  { n: "02", title: "Compliance", body: "Stay compliant and well-governed with structured support across statutory and regulatory obligations." },
  { n: "03", title: "Bookkeeping", body: "Accurate records, clean books and financial administration that keeps your business decision-ready." },
  { n: "04", title: "SME Development", body: "Hands-on capacity building for founders and small enterprises growing into their next stage." },
  { n: "05", title: "Strategy Planning", body: "Practical strategy that translates into operating rhythms, priorities and measurable outcomes." },
];

const VALUES = [
  { title: "Professionalism", body: "High standards of integrity, accountability and excellence in every service." },
  { title: "Collaboration", body: "Strong relationships and close partnership to achieve meaningful results." },
  { title: "Innovation", body: "Practical, forward-thinking solutions that improve efficiency and performance." },
  { title: "Sustainability", body: "Businesses structured for long-term success and stability." },
  { title: "Empowerment", body: "Equipping entrepreneurs and organisations to grow confidently." },
];

const REASONS = [
  "Tailored and practical business solutions",
  "Professional and reliable support",
  "Strong understanding of SME and organisational needs",
  "Commitment to sustainable business growth",
  "Strategic and results-driven approach",
  "Client-focused service delivery",
];

const CONTACT = [
  { label: "Email", value: "Boitumelo@melom.co.za​", href: "mailto:Boitumelo@melom.co.za" },
  { label: "Phone", value: "+27 84 999 2696​", href: "tel:+27 84 999 2696" },
  { label: "Instagram", value: "@melom_consulting", href: "https://instagram.com/melom_consulting" },
];

const servicesGrid = document.getElementById("servicesGrid");
if (servicesGrid) {
  servicesGrid.innerHTML = SERVICES.map(
    (s) => `<article class="card reveal"><span class="num">${s.n}</span><h3>${s.title}</h3><p>${s.body}</p></article>`
  ).join("");
}

const valuesList = document.getElementById("valuesList");
if (valuesList) {
  valuesList.innerHTML = VALUES.map(
    (v) => `<div class="value reveal"><h3>${v.title}</h3><p>${v.body}</p></div>`
  ).join("");
}

const reasonsList = document.getElementById("reasonsList");
if (reasonsList) {
  reasonsList.innerHTML = REASONS.map((r) => `<li>${r}</li>`).join("");
}

const contactRows = document.getElementById("contactRows");
if (contactRows) {
  contactRows.innerHTML = CONTACT.map(
    (c) => `<a class="contact-row" href="${c.href}"><div class="label">${c.label}</div><div class="value">${c.value}</div></a>`
  ).join("");
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.getElementById("menuToggle");
const links = document.getElementById("navLinks");
if (toggle && links) {
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") links.classList.remove("open");
  });
}

// Scroll reveal
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));



//Book  a consult- Form submission

 const consultForm = document.getElementById("consultform");
if (consultForm) {
     emailjs.init({
    publicKey:"ZnR16cH5JDv-Lj8ZM"
});
}
  consultForm.addEventListener("submit", function(event) {
    event.preventDefault();

  const submitButton = consultForm.querySelector('button[type="submit"]');
   const formStatus = document.getElementById("formStatus");
 
   // Change button while sending
        submitButton.textContent = "Submitting...";
        submitButton.disabled = true;



    // Get customer information
         const fullName = document.getElementById("fullName").value;
          const email = document.getElementById("email").value;
          const phone = document.getElementById("phone").value;
          const company= document.getElementById("company").value;
          const service = document.getElementById("service").value;
          const reason = document.getElementById("reason").value;


   // Information that will be sent to the email template
          const templateParams = {
          full_name: fullName,
           phone: phone,
           email: email,
           company: company,
           service: service,
           reason: reason,
          };

       
      //sending emails to both the company and the customer using emailjs
        Promise.all([
          
      // Send email to the company
         emailjs.send(
           "service_970b8c9",
          "template_3er83eo",
          templateParams
          ),
        
      // Send thank-you email to the customer
           emailjs.send(
            "service_970b8c9",
           "template_1gsp5i9",
           templateParams
           )
         ])

         .then(function(response) {

         console.log("emails sent successfully!", responses);

      // Clear the form ONLY after successful emails
            consultForm.reset();


      // Change button
            submitButton.textContent = "Submitted!";
            submitButton.disabled = false;


      // Show success message
            if (formStatus) {
                formStatus.textContent =
                    "Thank you for booking a consult! We will get back to you shortly.";

                formStatus.style.display = "block";
            }


          })
         .catch(function(error) {

          console.error("Email error:", error);

        // Change button back
            submitButton.textContent = "Book my consult →";
            submitButton.disabled = false;

         // Show error
            if (formStatus) {
                formStatus.textContent =
                    "Oops! Something went wrong. Please try again.";

                formStatus.style.display = "block";
            }

 });
})


    