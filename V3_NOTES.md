# Internal Cleanup V3

Changed-file patch only. No redesign.

Fixes:
- shared executive profile JSON files that still contained legacy unsupported metrics;
- Executive Conversion public profile and proof graph;
- Executive Lab V2 stories that regenerated old quantified claims;
- Executive Lab home metrics and indexing directive;
- Board Bio Builder and Promotion Dossier Builder generators;
- shared article JavaScript to align visible author role and rendered JSON-LD with the official current title.

The article HTML source still contains duplicate DOCTYPE declarations in some legacy article files. They are harmless in rendering but remain a source-cleanliness item for a later direct HTML normalization pass.
