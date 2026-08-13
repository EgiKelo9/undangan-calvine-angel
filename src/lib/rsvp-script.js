/**
 * Google Apps Script — Wedding RSVP Backend
 * ==========================================
 *
 * CARA DEPLOY:
 * 1. Buka https://script.google.com dan buat proyek baru.
 * 2. Copy-paste seluruh kode ini ke editor.
 * 3. Klik menu Extensions > Apps Script jika diakses dari Spreadsheet,
 *    atau buat script dari https://script.google.com/home langsung.
 * 4. Di Spreadsheet Anda, buat sheet bernama "rsvp" dengan header row:
 *       | timestamp | name | message | attendance |
 * 5. Klik Deploy > New Deployment > pilih tipe "Web App".
 * 6. Isi deskripsi, set "Execute as" = Me, "Who has access" = Anyone.
 * 7. Klik Deploy, copy URL yang dihasilkan.
 * 8. Paste URL ke file .env.local:
 *       NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/...
 */

const SHEET_NAME = "rsvp";
const TIMEZONE = "GMT+8";

/**
 * Memastikan timezone spreadsheet diset ke GMT+8.
 * Dipanggil otomatis di setiap request agar konsisten
 * tanpa perlu diatur manual lewat File > Settings.
 */
function ensureTimezone_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSpreadsheetTimeZone() !== TIMEZONE) {
    ss.setSpreadsheetTimeZone(TIMEZONE);
  }
}

/**
 * POST handler — menerima data RSVP dan menyimpan ke sheet.
 * Body: { name: string, message: string, attendance: string }
 */
function doPost(e) {
  try {
    ensureTimezone_();

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("Sheet 'rsvp' tidak ditemukan.");

    const data = JSON.parse(e.postData.contents);
    const { name, message, attendance } = data;

    if (!name || !attendance) {
      throw new Error("Data tidak lengkap.");
    }

    const trimmedMessage = message ? String(message).trim() : "";
    // Simpan timestamp dalam format GMT+8, bukan toISOString() (yang selalu UTC).
    const timestamp = Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss+08:00");

    sheet.appendRow([
      timestamp,
      name.trim(),
      trimmedMessage,
      attendance.trim(),
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET handler — mengambil semua data ucapan dari sheet.
 * Mengembalikan array JSON diurutkan terbaru di atas.
 * Timestamp selalu diformat ulang ke GMT+8 saat dikirim ke client,
 * apapun bentuk penyimpanan aslinya di sel (Date object atau string).
 */
function doGet() {
  try {
    ensureTimezone_();

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("Sheet 'rsvp' tidak ditemukan.");

    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      // Hanya ada header, belum ada data
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const headers = rows[0]; // ["timestamp", "name", "message", "attendance"]
    const data = rows.slice(1).reverse().map((row) => {
      const entry = {};
      headers.forEach((header, i) => {
        if (header === "timestamp") {
          const cell = row[i];
          const dateObj = cell instanceof Date ? cell : new Date(cell);
          entry[header] = Utilities.formatDate(dateObj, TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss+08:00");
        } else {
          entry[header] = row[i];
        }
      });
      return entry;
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message, data: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
