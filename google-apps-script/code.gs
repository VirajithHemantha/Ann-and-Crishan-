/**
 * Ann & Crishan — Google Apps Script backend for RSVP and Wishes.
 *
 * Paste this whole file into Extensions > Apps Script > Code.gs of the sheet:
 * https://docs.google.com/spreadsheets/d/1ZX9DmtG4u_-7OGqJhbhGa0ZteCkDEfPr4NBmXsmEl6w/edit
 *
 * Run `setupSheets` once from the editor to create the "RSVP" and "Wishes"
 * tabs with headers. They are also created automatically on first submission.
 */

var SPREADSHEET_ID = '1ZX9DmtG4u_-7OGqJhbhGa0ZteCkDEfPr4NBmXsmEl6w';

var SHEETS = {
  RSVP: {
    name: 'RSVP',
    headers: ['Timestamp', 'Full Name', 'Number of Guests', 'Dietary Notes', 'Attendance', 'Invited As'],
    fields: ['name', 'guests', 'dietary', 'attendance', 'invitedAs'],
    widths: [170, 200, 140, 320, 120, 200],
  },
  WISHES: {
    name: 'Wishes',
    headers: ['Timestamp', 'Guest Name', 'Message', 'Invited As'],
    fields: ['name', 'message', 'invitedAs'],
    widths: [170, 200, 420, 200],
  },
};

var HEADER_BG = '#1A2216';
var HEADER_FG = '#FAF8F5';

/** Receives form submissions from the website. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var payload = parsePayload_(e);
    var config = resolveSheet_(payload.sheet);
    if (!config) {
      return jsonResponse_({ ok: false, error: 'Invalid sheet. Use RSVP or Wishes.' });
    }

    var sheet = getOrCreateSheet_(config);
    var row = [new Date()];
    for (var i = 0; i < config.fields.length; i++) {
      row.push(sanitize_(payload[config.fields[i]]));
    }
    sheet.appendRow(row);

    return jsonResponse_({ ok: true, row: sheet.getLastRow() });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error && error.message ? error.message : error) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * GET ?sheet=Wishes returns the latest wishes (newest first) so the website
 * can display them. Any other GET is a health check.
 */
function doGet(e) {
  var params = (e && e.parameter) || {};
  var config = resolveSheet_(params.sheet);

  if (config && config.name === SHEETS.WISHES.name) {
    var sheet = getOrCreateSheet_(config);
    var lastRow = sheet.getLastRow();
    var wishes = [];

    if (lastRow > 1) {
      var values = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
      for (var i = values.length - 1; i >= 0; i--) {
        if (!values[i][1] && !values[i][2]) continue;
        wishes.push({
          createdAt: values[i][0] instanceof Date ? values[i][0].toISOString() : String(values[i][0]),
          name: String(values[i][1]),
          message: String(values[i][2]),
        });
        if (wishes.length >= 100) break;
      }
    }

    return jsonResponse_({ ok: true, wishes: wishes });
  }

  return jsonResponse_({ ok: true, message: 'Ann & Crishan wedding endpoint is running.' });
}

/** Run once from the Apps Script editor to create both tabs with headers. */
function setupSheets() {
  getOrCreateSheet_(SHEETS.RSVP);
  getOrCreateSheet_(SHEETS.WISHES);
}

function resolveSheet_(value) {
  var key = String(value || '').trim().toUpperCase();
  if (key === 'RSVP') return SHEETS.RSVP;
  if (key === 'WISHES' || key === 'WISH') return SHEETS.WISHES;
  return null;
}

function getOrCreateSheet_(config) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
  }

  if (sheet.getLastRow() === 0) {
    var cols = config.headers.length;
    sheet.getRange(1, 1, 1, cols)
      .setValues([config.headers])
      .setFontWeight('bold')
      .setBackground(HEADER_BG)
      .setFontColor(HEADER_FG)
      .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
    for (var c = 1; c <= cols; c++) {
      sheet.setColumnWidth(c, config.widths[c - 1]);
    }
    sheet.getRange(1, 1, sheet.getMaxRows(), cols).setWrap(true).setVerticalAlignment('top');
  }

  return sheet;
}

function parsePayload_(e) {
  var params = (e && e.parameter) || {};
  if (Object.keys(params).length > 0) return params;

  var contents = e && e.postData && e.postData.contents ? e.postData.contents : '';
  if (!contents) return {};

  try {
    return JSON.parse(contents);
  } catch (_error) {
    return parseQueryString_(contents);
  }
}

function parseQueryString_(query) {
  var out = {};
  var pairs = String(query).split('&');
  for (var i = 0; i < pairs.length; i++) {
    if (!pairs[i]) continue;
    var idx = pairs[i].indexOf('=');
    var key = idx >= 0 ? pairs[i].slice(0, idx) : pairs[i];
    var value = idx >= 0 ? pairs[i].slice(idx + 1) : '';
    out[decodeURIComponent(key.replace(/\+/g, ' '))] = decodeURIComponent(value.replace(/\+/g, ' '));
  }
  return out;
}

/** Prevents values like "=HYPERLINK(...)" from being run as sheet formulas. */
function sanitize_(value) {
  var str = String(value == null ? '' : value).trim().slice(0, 2000);
  return /^[=+\-@]/.test(str) ? "'" + str : str;
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
