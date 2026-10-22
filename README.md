# Bala

Bala is a mobile-first food allergy profile opened from an NFC wristband. The prototype is a static React application designed for GitHub Pages and later deployment to S3 and CloudFront without changing its client-side routing.

## Local development

```bash
npm install
npm run dev
```

The prototype includes two public routes:

- `#/p/alex-demo` — public allergy profile
- `#/p/alex-demo/staff` — enlarged restaurant staff view
- `#/p/talia` — Talia's public allergy profile
- `#/p/talia/staff` — Talia's restaurant staff view

Owner setup is gated and hidden by default. For local development only, set `VITE_ENABLE_OWNER_SETUP=true` to expose `#/owner/alex-demo` while that flow is under construction.

## Verification

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

GitHub Pages deployment is configured in `.github/workflows/deploy-pages.yml`. Enable Pages with **GitHub Actions** as its source after the repository is created on GitHub.

The prototype HTML includes site-wide `noindex` directives. Because every hash route uses the same HTML document, this covers all visitor and staff profiles. This controls search indexing; it does not make a deployed Pages site private.

Main workspace for the NFC wristband idea and additional ideas to be defined.

## Ideas

- NFC wristband profiles: first prototype; see [project brief](docs/nfc-wristbands.md).
- Additional ideas: pending the owner's description; no scope or shared architecture assumed yet.

## Current stage

Hardware research and prototype planning. No application has been implemented.
