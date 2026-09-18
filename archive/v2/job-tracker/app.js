const CONFIG = {
  spreadsheetId: "1heSzC5OvVF6FNKJB4WnxE9aBH4mJDB1SPzfTb5IzQOI",
  sheetName: "Applications",
  // Opensheet turns a publicly readable Google Sheet tab into CORS-friendly JSON.
  sourceUrl() {
    return `https://opensheet.elk.sh/${this.spreadsheetId}/${encodeURIComponent(this.sheetName)}`;
  }
};

const state = { rows: [], filtered: [] };

const el = id => document.getElementById(id);
const ui = {
  search: el("searchInput"),
  status: el("statusFilter"),
  location: el("locationFilter"),
  channel: el("channelFilter"),
  sort: el("sortSelect"),
  reset: el("resetButton"),
  retry: el("retryButton"),
  grid: el("cardsGrid"),
  loading: el("loadingState"),
  error: el("errorState"),
  empty: el("emptyState"),
  errorMessage: el("errorMessage"),
  resultCount: el("resultCount"),
  syncText: el("syncText"),
  footerTimestamp: el("footerTimestamp"),
  total: el("statTotal"),
  active: el("statActive"),
  interviews: el("statInterviews"),
  markets: el("statMarkets"),
  template: el("cardTemplate")
};

function clean(value) {
  return String(value ?? "").trim();
}

function normalizeRow(row) {
  return {
    date: clean(row["Application Date"]),
    company: clean(row["Company"]),
    role: clean(row["Role"]),
    location: clean(row["Location"]),
    channel: clean(row["Channel"]),
    status: clean(row["Status"]),
    lastStatusDate: clean(row["Last Status Date"]),
    ref: clean(row["Job / Ref ID"]),
    source: clean(row["Source / Link"]),
    notes: clean(row["Notes"]),
    evidence: clean(row["Evidence"])
  };
}

function parseDate(value) {
  if (!value) return 0;
  const t = Date.parse(value);
  return Number.isNaN(t) ? 0 : t;
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function populateSelect(select, values, firstLabel) {
  const current = select.value;
  select.innerHTML = `<option value="">${firstLabel}</option>`;
  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
  if ([...select.options].some(o => o.value === current)) select.value = current;
}

function statusTone(status) {
  const s = status.toLowerCase();
  if (s.includes("interview")) return "interview";
  if (s.includes("recruiter") || s.includes("next stage") || s.includes("progress")) return "progress";
  if (s.includes("assessment")) return "warning";
  if (s.includes("closed") || s.includes("reject")) return "closed";
  return "default";
}

function initials(company) {
  return company
    .split(/[\s&/-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(x => x[0]?.toUpperCase())
    .join("") || "•";
}

function friendlyDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

function updateStats() {
  const rows = state.rows;
  ui.total.textContent = rows.length;

  const active = rows.filter(r => {
    const s = r.status.toLowerCase();
    return s.includes("interview") || s.includes("recruiter") || s.includes("assessment") || s.includes("next stage");
  }).length;
  ui.active.textContent = active;

  ui.interviews.textContent = rows.filter(r => r.status.toLowerCase().includes("interview")).length;

  const markets = uniqueSorted(rows.map(r => r.location));
  ui.markets.textContent = markets.length;
}

function filterAndSort() {
  const q = ui.search.value.trim().toLowerCase();
  const status = ui.status.value;
  const location = ui.location.value;
  const channel = ui.channel.value;

  let rows = state.rows.filter(r => {
    const haystack = [r.company, r.role, r.location, r.channel, r.status, r.notes, r.evidence, r.ref]
      .join(" ")
      .toLowerCase();
    return (!q || haystack.includes(q)) &&
           (!status || r.status === status) &&
           (!location || r.location === location) &&
           (!channel || r.channel === channel);
  });

  switch (ui.sort.value) {
    case "date-asc":
      rows.sort((a,b) => parseDate(a.date) - parseDate(b.date));
      break;
    case "company-asc":
      rows.sort((a,b) => a.company.localeCompare(b.company));
      break;
    case "status-asc":
      rows.sort((a,b) => a.status.localeCompare(b.status));
      break;
    default:
      rows.sort((a,b) => parseDate(b.date) - parseDate(a.date));
  }

  state.filtered = rows;
  render();
}

function render() {
  ui.grid.innerHTML = "";
  ui.resultCount.textContent = state.filtered.length;

  ui.empty.hidden = state.filtered.length !== 0;
  ui.grid.hidden = state.filtered.length === 0;

  const fragment = document.createDocumentFragment();

  state.filtered.forEach(row => {
    const node = ui.template.content.cloneNode(true);
    const card = node.querySelector(".app-card");
    const badge = node.querySelector(".status-badge");
    const source = node.querySelector(".source-link");

    badge.textContent = row.status || "Unknown";
    badge.dataset.tone = statusTone(row.status);

    node.querySelector(".date").textContent = friendlyDate(row.date);
    node.querySelector(".date").dateTime = row.date || "";

    const mark = node.querySelector(".company-mark");
    mark.textContent = initials(row.company);

    node.querySelector(".company").textContent = row.company || "Unknown company";
    node.querySelector(".role").textContent = row.role || "Role not specified";
    node.querySelector(".location").textContent = row.location || "—";
    node.querySelector(".channel").textContent = row.channel || "—";
    node.querySelector(".last-update").textContent = friendlyDate(row.lastStatusDate);
    node.querySelector(".evidence").textContent = row.evidence || "—";

    const notes = node.querySelector(".notes");
    notes.textContent = row.notes;

    const ref = node.querySelector(".ref-id");
    ref.textContent = row.ref ? `Ref ${row.ref}` : "";

    if (row.source && /^https?:\/\//i.test(row.source)) {
      source.href = row.source;
      // Gmail source links are useful to the owner but private to other visitors.
      source.textContent = row.source.includes("mail.google.com") ? "Private source ↗" : "View source ↗";
    } else {
      source.hidden = true;
    }

    card.dataset.search = [row.company, row.role, row.location, row.status].join(" ");
    fragment.appendChild(node);
  });

  ui.grid.appendChild(fragment);
}

function resetFilters() {
  ui.search.value = "";
  ui.status.value = "";
  ui.location.value = "";
  ui.channel.value = "";
  ui.sort.value = "date-desc";
  filterAndSort();
}

async function loadData() {
  ui.loading.hidden = false;
  ui.error.hidden = true;
  ui.empty.hidden = true;
  ui.grid.hidden = true;

  try {
    const response = await fetch(CONFIG.sourceUrl(), { cache: "no-store" });
    if (!response.ok) throw new Error(`Data source returned HTTP ${response.status}`);

    const raw = await response.json();
    if (!Array.isArray(raw)) throw new Error("Unexpected Google Sheet response");

    const rows = raw
      .map(normalizeRow)
      .filter(r => r.company || r.role);

    state.rows = rows;

    populateSelect(ui.status, uniqueSorted(rows.map(r => r.status)), "All statuses");
    populateSelect(ui.location, uniqueSorted(rows.map(r => r.location)), "All locations");
    populateSelect(ui.channel, uniqueSorted(rows.map(r => r.channel)), "All channels");

    updateStats();
    filterAndSort();

    const now = new Date();
    ui.syncText.textContent = `Synced ${now.toLocaleString()}`;
    ui.footerTimestamp.textContent = `Last refresh: ${now.toLocaleString()}`;
  } catch (error) {
    console.error(error);
    ui.error.hidden = false;
    ui.errorMessage.textContent =
      "The page is ready, but the Google Sheet must be publicly readable for live data. " +
      "In Google Sheets, use Share → General access → Anyone with the link (Viewer), or Publish to web.";
    ui.syncText.textContent = "Live source unavailable";
  } finally {
    ui.loading.hidden = true;
  }
}

[ui.search, ui.status, ui.location, ui.channel, ui.sort].forEach(control => {
  control.addEventListener(control === ui.search ? "input" : "change", filterAndSort);
});
ui.reset.addEventListener("click", resetFilters);
ui.retry.addEventListener("click", loadData);

document.addEventListener("keydown", e => {
  if (e.key === "/" && document.activeElement !== ui.search) {
    e.preventDefault();
    ui.search.focus();
  }
  if (e.key === "Escape" && document.activeElement === ui.search) {
    ui.search.value = "";
    ui.search.blur();
    filterAndSort();
  }
});

loadData();
