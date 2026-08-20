$ErrorActionPreference = "Stop"

$files = @(
  "articles/en/from-digital-projects-to-institutional-capability/index.html",
  "articles/ar/from-digital-projects-to-institutional-capability/index.html",
  "articles/from-digital-projects-to-institutional-capability/index.html"
)

$oldTitle = "Chief Technology & Digital Transformation Officer"
$newTitle = "Head of the Central Administration for Information Systems & Digital Transformation"

foreach ($file in $files) {
  if (-not (Test-Path $file)) {
    throw "Missing required article file: $file"
  }

  $html = Get-Content -Raw -Encoding UTF8 $file

  # Reduce any repeated leading HTML DOCTYPE declarations to one.
  $html = [regex]::Replace(
    $html,
    '^(?:\s*<!DOCTYPE html>\s*)+',
    "<!DOCTYPE html>`r`n",
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
  )

  # Source-level identity consistency, including JSON-LD and visible bylines.
  $html = $html.Replace($oldTitle, $newTitle)

  # Article source was materially corrected on 2026-08-19.
  $html = $html.Replace("2026-08-01", "2026-08-19")

  Set-Content -Encoding UTF8 -NoNewline -Path $file -Value $html
  Write-Host "Normalized: $file"
}

Write-Host ""
Write-Host "Article source normalization completed successfully." -ForegroundColor Green
