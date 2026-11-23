/**
 * Company facts. Single source of truth for anything that appears in the
 * header, footer, schema.org markup, call buttons and WhatsApp links.
 */
export const SITE = {
  legalName: "Aerotel Net Private Limited",
  shortName: "Aerotel Net Pvt Ltd",
  brand: "Aerotel Fiber Net",
  tagline: "Blazing-fast fiber for every home in Tirupur",
  url: "https://www.aerotelfibernet.com",
  domain: "www.aerotelfibernet.com",
  email: "support@aerotelfibernet.com",
  phones: [
    { display: "99949 10101", tel: "+919994910101", digits: "9994910101" },
    { display: "90801 10101", tel: "+919080110101", digits: "9080110101" },
  ],
  whatsapp: {
    number: "919994910101",
    message:
      "Hi Aerotel, I would like to book a new fiber broadband connection. Please share the plan details.",
  },
  address: {
    street: "1/600-23C, Srikrishna Nagar, Poyampalayam",
    locality: "Tirupur",
    region: "Tamil Nadu",
    postalCode: "641602",
    country: "IN",
  },
  geo: { latitude: 11.1085, longitude: 77.3411 },
  mapsQuery:
    "Aerotel Net Pvt Ltd, 1/600-23C, Srikrishna Nagar, Poyampalayam, Tirupur 641602",
  serviceArea: ["Tirupur", "Poyampalayam", "Srikrishna Nagar", "Avinashi Road"],
  supportHours: "24 hours a day, 7 days a week",
  officeHours: "Monday to Sunday, 9:00 AM to 9:00 PM",
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(
  SITE.whatsapp.message,
)}`;

export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  SITE.mapsQuery,
)}&output=embed`;

export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SITE.mapsQuery,
)}`;

export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.locality} - ${SITE.address.postalCode}`;
