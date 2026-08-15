# Wave 6 Runtime QA

HTTP smoke test completed against a local Python HTTP server.

- `/executive-os/` → HTTP 200
- `/executive-os/mission-control/` → HTTP 200
- `/executive-os/copilot/` → HTTP 200
- `/executive-os/knowledge-graph/` → HTTP 200
- `/executive-os/career-digital-twin/` → HTTP 200

Static QA also validates JSON parsing, JavaScript syntax with `node --check`, local relative references, protected-file exclusion, and ZIP integrity.

A Chromium headless DOM smoke attempt did not complete within the runtime timeout in this environment, so it is not counted as a passed browser test.
