# Job Tracker

Folder target: `v2/job-tracker/`

## Data source
The page reads the `Applications` tab from this Google Sheet:

`1heSzC5OvVF6FNKJB4WnxE9aBH4mJDB1SPzfTb5IzQOI`

The browser loads the sheet through:
`https://opensheet.elk.sh/<SPREADSHEET_ID>/Applications`

This requires the Google Sheet to be publicly readable.

## One-time Google Sheet step
In Google Sheets:
1. Share
2. General access
3. Anyone with the link
4. Viewer

Alternatively, use File → Share → Publish to web.

## URL after deployment
Assuming the existing Vercel setup serves the repository root as-is:

`https://mahmoud-salama.vercel.app/v2/job-tracker/`

## Features
- Live Google Sheet data
- Instant search
- Status filter
- Location filter
- Channel filter
- Sort by date/company/status
- Pipeline statistics
- Responsive card layout
- Status color badges
- Source links
- Mobile friendly
- Keyboard shortcut `/` to focus search
