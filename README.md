# k6 Load Tests

Load testing suite using [k6](https://k6.io) targeting the k6 demo API (`https://test.k6.io`).

## Tests

| Script | VUs | Duration | Purpose |
|---|---|---|---|
| `smoke.js` | 1 | 30s | Sanity check — is the system up? |
| `load.js` | up to 20 | ~5m | Normal traffic simulation |
| `stress.js` | up to 100 | ~16m | Find the breaking point |
| `api.js` | 10 | 1m | Endpoint-level checks with per-request thresholds |

## Requirements

- [k6](https://k6.io/docs/get-started/installation/)

## Usage

```bash
k6 run tests/smoke.js
k6 run tests/load.js
k6 run tests/stress.js
k6 run tests/api.js
```

## Thresholds

| Test | Metric | Threshold |
|---|---|---|
| load | p95 response time | < 500ms |
| load | error rate | < 1% |
| stress | p95 response time | < 1000ms |
| stress | error rate | < 5% |
| api | p95 per endpoint | < 400ms |
| api | error rate | < 1% |
