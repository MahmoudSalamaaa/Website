$ErrorActionPreference = "Stop"
$pages = Get-ChildItem -Path "waca" -Filter "*.html" -File
foreach ($page in $pages) {
  $html = Get-Content -Raw -Encoding UTF8 $page.FullName
  if ($html -notmatch '<meta[^>]+name=["'']robots["'']') {
    $html = [regex]::Replace(
      $html,
      '(<meta[^>]+name=["'']viewport["''][^>]*>)',
      '$1<meta name="robots" content="noindex,nofollow,noarchive">',
      1,
      [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )
  }
  Set-Content -Encoding UTF8 -NoNewline -Path $page.FullName -Value $html
}
Write-Host "WACA source-level noindex normalization complete."
