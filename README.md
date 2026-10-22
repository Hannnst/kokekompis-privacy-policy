# KokeKompis — Privacy Policy

This repository hosts the official privacy policy for **KokeKompis**, a local-first recipe app for Android.

## What is KokeKompis?

KokeKompis is a recipe extractor and cookbook app that turns recipe web pages into clean Markdown files. It is built around three principles:

- **Local-first:** All recipes are stored as plain Markdown files on your own device. There is no cloud backend, no account, and no server.
- **Private by design:** KokeKompis has no accounts, no analytics, no advertising and no tracking. Your recipes, photos and settings never leave your device. The only data the app ever transmits is the feedback you choose to send — and you can read the full list of what that contains before you send it.
- **Yours forever:** Your recipes live in a folder you choose. You can back them up, sync them with Syncthing, or version them with Git — whatever you prefer.

## Privacy Policy

- **English:** https://hannnst.github.io/kokekompis-privacy-policy/
- **Norsk (Bokmål):** https://hannnst.github.io/kokekompis-privacy-policy/no.html

---

## Repository layout

| Path | Purpose |
| --- | --- |
| `index.html` | The policy, English. Served at the root URL. |
| `no.html` | The policy, Norwegian (Bokmål). |
| `no/index.html` | Redirect stub to `no.html`, so the shorter `/no/` URL also works. |
| `assets/style.css` | All styling, including the light/dark theme. |
| `assets/theme.js` | The sun/moon theme toggle, stored in `localStorage`. |
| `assets/logo.svg` | The app icon — a standalone copy of the launcher icon. |
| `assets/logo-mark.svg` | The app icon's glyph on its own, without the background. |
| `assets/favicon.svg` | Site icon, light theme. |
| `assets/favicon-dark.svg` | Site icon, dark theme. Swapped in by `theme.js`. |
| `kokekompis-privacy-policy.html` | Redirect stub to the root URL, kept so older links keep working. |

There is no build step and no dependencies. The site is plain HTML, CSS and
JavaScript, published straight from the `main` branch by GitHub Pages.

Both language pages sit in the repository root and use the same relative paths
(`assets/…`), so they work no matter which directory a preview tool serves
them from.

## Branding

The page uses the app's own identity, taken directly from the app source in
`Hannnst/KokeKompis`:

| Element | App source | Used here as |
| --- | --- | --- |
| Icon | `app/src/main/res/drawable/ic_launcher_foreground.xml` | `assets/logo.svg`, `assets/logo-mark.svg`, the favicons, the header mark and the footer badge |
| Icon colours | `app/src/main/res/values/colors.xml`, `values-night/colors.xml` | `--icon-fg`, `--icon-bg` |
| Palette | `app/src/main/java/no/kokekompis/ui/theme/Color.kt` | `--bg`, `--fg`, `--surface`, `--primary`, `--accent`, … |
| Title | `ui/RecipeListScreen.kt` — `Icons.Default.Restaurant` + `Text("KokeKompis", titleLarge.copy(fontWeight = Bold))` | The header mark and wordmark |
| Typeface | `ui/theme/Type.kt` — `FontFamily.Default` | The system font stack (Roboto on Android); no font file is downloaded |

The Android `vector` drawables and the SVG here use the same path data and the
same `108×108` viewport, so the icon is the app's icon and not a redrawing of
it. Only `--border` is not from the app: it has no border token, so it is a
warm tone derived from the app's surface and background colours.

## Theme

The sun/moon button in the header switches between light and dark. Until you
press it, the page follows the operating system's light/dark setting. Your
choice is kept in your own browser's `localStorage` and never sent anywhere.
The favicon follows the theme as well: `theme.js` swaps it for the dark
variant when the effective theme is dark.

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000/ and http://localhost:8000/no.html
```

## Editing the policy

1. Update **both** `index.html` and `no.html` — they are translations of each
   other and must stay in sync.
2. Bump the effective date. It appears in two places per file: the
   `Effective date` line under the title, and the footer.
3. Check every technical claim against the app source before you publish it.
   The app's behaviour is the only thing this document may assert.
4. Commit and push. GitHub Pages rebuilds the site automatically.

The page sets no cookies, runs no analytics, and loads no third-party
resources. The only client-side state is your theme choice, which is kept in
your own browser's `localStorage` and never sent anywhere.

### Things that must stay in step with the app

If the app changes, these parts of the policy are affected:

- **The feedback form** — the list of data it sends, where it goes and how
  long it is kept is described under *Sending feedback*. It also has to be
  declared in the Google Play Data Safety form.
- **New network destinations** — every place the app talks to a server has to
  appear under *Network access*.
- **New permissions** — the app currently declares only `INTERNET` itself.
- **New third-party libraries** — the list under *Third-party software* is
  meant to be complete.

---

*Last updated: October 2026*
