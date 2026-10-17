1. Open the sheet: https://docs.google.com/spreadsheets/d/1pAXX5tm_ewCTtlHY8gLLMyK9XWIvG9eXPeItC7DNI2o/edit
2. Open Extensions > Apps Script.
3. Replace the contents of Code.gs with the code from code.ts (project root) — same as google-apps-script/code.gs.
4. (Optional) Select `setupSheets` and click Run to create the RSVP and Wishes tabs now. Otherwise they are created with headers on the first submission.
5. Click Deploy > New deployment > type: Web app.
6. Execute as: Me. Who has access: Anyone.
7. Deploy, authorize, and copy the Web App URL.
8. Paste the URL into SCRIPT_URL in src/lib/sheets.ts, or create .env with:

VITE_GOOGLE_APPS_SCRIPT_URL=YOUR_WEB_APP_URL

9. Restart the Vite dev server / redeploy the site.

Sheets created automatically:
- RSVP: Timestamp | Full Name | Guests | Dietary Notes | Attendance
- Wishes: Timestamp | Guest Name | Message

If you change the Apps Script code later, use Deploy > Manage deployments > Edit > New version so the URL stays the same.
