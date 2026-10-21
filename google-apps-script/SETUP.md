1. Open the sheet: https://docs.google.com/spreadsheets/d/1ZX9DmtG4u_-7OGqJhbhGa0ZteCkDEfPr4NBmXsmEl6w/edit
2. Open Extensions > Apps Script.
3. Replace the contents of Code.gs with google-apps-script/code.gs (code.ts in the project root is the same file).
4. Select `setupSheets` in the toolbar and click Run (authorize when asked). This creates the RSVP and Wishes tabs with headers.
5. Click Deploy > New deployment > type: Web app.
6. Execute as: Me. Who has access: Anyone.
7. Deploy and copy the Web App URL (ends in /exec).
8. Paste the URL into SCRIPT_URL in src/lib/sheets.ts.

9. Restart the Vite dev server / redeploy the site.

Sheets created:
- RSVP: Timestamp | Full Name | Number of Guests | Dietary Notes | Attendance | Invited As
- Wishes: Timestamp | Guest Name | Message | Invited As

"Invited As" is the personalised name from the invitation link (e.g. "Mr. & Mrs. Perera"); it is empty when the plain site link is used.

If you change the Apps Script code later, use Deploy > Manage deployments > Edit > Version: New version so the URL stays the same.
