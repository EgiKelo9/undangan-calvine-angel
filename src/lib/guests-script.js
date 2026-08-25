/**
 * Google Apps Script — Wedding Guest List Backend
 * =================================================
 *
 * CARA DEPLOY:
 * 1. Buka spreadsheet yang sama dengan RSVP Anda.
 * 2. Klik menu Extensions > Apps Script.
 * 3. Paste seluruh kode ini ke file default (Code.gs) atau buat file baru — nama bebas.
 * 4. Copy-paste seluruh kode ini ke editor.
 * 5. Di Spreadsheet Anda, buat sheet baru bernama "guests" dengan header row:
 *       | id | name | phone | createdAt | invitationLink |
 * 6. Klik Deploy > New Deployment > pilih tipe "Web App".
 * 7. Isi deskripsi "Guest List API", set "Execute as" = Me, "Who has access" = Anyone.
 * 8. Klik Deploy, copy URL yang dihasilkan.
 * 9. Paste URL ke file .env:
 *       NEXT_PUBLIC_GUESTS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 *
 * NOTE: Setiap kali ada perubahan kode, Anda HARUS membuat deployment BARU
 * (Deploy > Manage deployments > New version) agar perubahan aktif.
 */

const GUESTS_SHEET_NAME = "guests";
const GUESTS_TIMEZONE = "GMT+8";

/**
 * Menghasilkan ID unik sederhana (timestamp + random).
 */
function generateId_() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/**
 * Menghasilkan URL Invitation berdasarkan nama
 */
function generateUrl_(name) {
  return "https://undangan-calvine-angel.vercel.app/to?" + encodeURIComponent(name);
}

/**
 * Memastikan sheet "guests" ada.
 */
function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(GUESTS_SHEET_NAME);
  if (!sheet) throw new Error("Sheet 'guests' tidak ditemukan. Buat sheet baru bernama 'guests' dengan header: id | name | phone | createdAt | invitationLink");
  return sheet;
}

/**
 * Membaca semua data tamu dari sheet ke array of objects.
 */
function getAllGuests_(sheet) {
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];
  const headers = rows[0]; // ["id", "name", "phone", "createdAt"]
  return rows.slice(1).map((row) => {
    const entry = {};
    headers.forEach((h, i) => { entry[h] = row[i]; });
    return entry;
  });
}

/**
 * GET handler — mengembalikan semua tamu, diurutkan terbaru di atas.
 */
function doGet() {
  try {
    const sheet = getSheet_();
    const data = getAllGuests_(sheet);
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message, data: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * POST handler — router berdasarkan action.
 * Body: { action: "create" | "update" | "delete", ...payload }
 */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const { action } = body;

    if (!action) throw new Error("Field 'action' wajib diisi.");

    const sheet = getSheet_();

    if (action === "create") return handleCreate_(sheet, body);
    if (action === "update") return handleUpdate_(sheet, body);
    if (action === "delete") return handleDelete_(sheet, body);

    throw new Error("Action tidak dikenal: " + action);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Tambah tamu baru.
 * Body: { action: "create", name: string, phone: string }
 */
function handleCreate_(sheet, body) {
  const { name, phone } = body;
  if (!name || !name.trim()) throw new Error("Nama tamu tidak boleh kosong.");

  const id = generateId_();
  const createdAt = Utilities.formatDate(new Date(), GUESTS_TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss+08:00");
  const invitationLink = generateUrl_(name.trim());

  sheet.appendRow([id, name.trim(), (phone || "").trim(), createdAt, invitationLink]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true, data: { id, name: name.trim(), phone: (phone || "").trim(), createdAt, invitationLink } }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Update nama/telepon tamu berdasarkan ID.
 * Body: { action: "update", id: string, name: string, phone: string }
 */
function handleUpdate_(sheet, body) {
  const { id, name, phone } = body;
  if (!id) throw new Error("Field 'id' wajib diisi untuk update.");
  if (!name || !name.trim()) throw new Error("Nama tamu tidak boleh kosong.");

  const rows = sheet.getDataRange().getValues();
  const rowIndex = rows.findIndex((row, i) => i > 0 && row[0] === id);
  if (rowIndex === -1) throw new Error("Tamu dengan id '" + id + "' tidak ditemukan.");

  const sheetRow = rowIndex + 1; // 1-indexed untuk sheet
  const invitationLink = generateUrl_(name.trim());
  
  sheet.getRange(sheetRow, 2).setValue(name.trim());        // kolom B = name
  sheet.getRange(sheetRow, 3).setValue((phone || "").trim()); // kolom C = phone
  sheet.getRange(sheetRow, 5).setValue(invitationLink); // kolom E = invitationLink

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Hapus tamu berdasarkan ID.
 * Body: { action: "delete", id: string }
 */
function handleDelete_(sheet, body) {
  const { id } = body;
  if (!id) throw new Error("Field 'id' wajib diisi untuk delete.");

  const rows = sheet.getDataRange().getValues();
  const rowIndex = rows.findIndex((row, i) => i > 0 && row[0] === id);
  if (rowIndex === -1) throw new Error("Tamu dengan id '" + id + "' tidak ditemukan.");

  sheet.deleteRow(rowIndex + 1); // 1-indexed

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
