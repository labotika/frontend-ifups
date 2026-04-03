export const appSettings = {
  maintenanceMode: import.meta.env.MODE === "development" ? false : false,
  maintenanceMessage: import.meta.env.VITE_MAINTENANCE_MESSAGE || "Sedang dalam pemeliharaan",
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || "info@ifups.tegal.ac.id",
  contactPhone: import.meta.env.VITE_CONTACT_PHONE || "(0283) 1234567",
};