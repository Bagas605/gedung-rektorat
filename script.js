const WHATSAPP_NUMBER = "628818553622";
const dateInput = document.getElementById("tgl");
const checkerForm = document.getElementById("checker");
const contactForm = document.getElementById("contactForm");

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

dateInput.min = getLocalDateString(new Date());

checkerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const [year, month, day] = dateInput.value.split("-").map(Number);
  const eventDate = new Date(year, month - 1, day);
  const formattedDate = eventDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const guestCount = document.getElementById("tamu").value;

  openWhatsApp(
    `Halo Pak Bagas, saya ingin cek ketersediaan Aula Rektorat untuk pernikahan pada ${formattedDate} (${guestCount}).`,
  );
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("pesan").value.trim();

  openWhatsApp(
    `Halo Pak Bagas, saya ${name}. Email: ${email}. ${message}`,
  );
});
