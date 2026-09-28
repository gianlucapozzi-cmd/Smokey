/**
 * Incolla in Apps Script, salva, poi:
 * Distribuisci → Gestisci le distribuzioni → matita → Versione: Nuova → Distribuisci
 *
 * Proprietà script: WEBHOOK_SECRET = lo stesso valore di
 * GOOGLE_SHEETS_WEBHOOK_SECRET su Vercel
 */

var SPREADSHEET_ID = "1VpEjdqVmP532vUDmqhW3ySsfPBPtFyxvuX3O692K78Y";
var SHEET_NAME = "Invii community";

function doGet() {
  return json_({ ok: true });
}

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

    ensureHeaders_(sheet, headers);
    sheet.appendRow(values);
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
