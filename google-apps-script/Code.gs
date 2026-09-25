/**
 * Incolla questo file in Estensioni → Apps Script del foglio Google.
 * Poi: Distribuisci → Nuova distribuzione → App web
 *   - Esegui come: Io
 *   - Chi ha accesso: Chiunque
 * Copia l'URL e mettilo in GOOGLE_SHEETS_WEBHOOK_URL su Vercel.
 *
 * Opzionale ma consigliato: Impostazioni progetto → Proprietà script
 *   WEBHOOK_SECRET = lo stesso valore di GOOGLE_SHEETS_WEBHOOK_SECRET
 */

var SHEET_NAME = "Iscrizioni";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var expected = PropertiesService.getScriptProperties().getProperty(
      "WEBHOOK_SECRET",
    );
    if (expected && data.secret !== expected) {
      return json_({ ok: false, error: "unauthorized" });
    }

    var sheet = getOrCreateSheet_();
    var headers = data.headers;
    var values = data.values;
    if (!headers || !values) {
      return json_({ ok: false, error: "payload incompleto" });
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow(values);
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
