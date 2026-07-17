# LoungeFeed Pinterest access preparation checklist

This checklist records the minimum Pinterest Trial integration and the work needed before Standard access.

## 1. Create product-owned public accounts

- [ ] Create a product-specific GitHub account.
- [ ] Enable two-factor authentication.
- [ ] Use a product-specific email address.
- [ ] Do not use a personal avatar, personal profile text, personal email, or personal public location.
- [ ] Configure Git commits for this website repo with the product email, not a personal email.

Suggested public Git config for the website repo:

```sh
git config user.name "LoungeFeed"
git config user.email "<product-support-email>"
```

## 2. Publish the temporary website

Recommended GitHub Pages options:

### Option A: User Pages

Repository name:

```text
loungefeed.github.io
```

Publish files from `website/loungefeed/` to the repository root.

Result:

```text
https://loungefeed.github.io/
```

### Option B: Project Pages

Repository name:

```text
loungefeed-site
```

Publish files from `website/loungefeed/` to the repository root.

Result:

```text
https://loungefeed.github.io/loungefeed-site/
```

Option A is cleaner for a temporary official-looking product site.

## 3. Replace placeholders

- [x] Use support email `loungefeed@outlook.com` in `index.html`, `privacy.html`, and `pinterest-application.md`.
- [ ] Confirm `privacy.html` opens publicly without login.
- [ ] Confirm every public link works.

Recommended temporary public operator value:

```text
LoungeFeed Project
```

Use a legal company/studio name later if available.

## 4. Pinterest Developer Trial access

Submit the smallest read-only application.

- [x] Trial access granted on 2026-07-15.

### App name

```text
LoungeFeed
```

### Website URL

Use:

```text
https://loungefeed.github.io/
```

### Privacy Policy URL

Use:

```text
https://loungefeed.github.io/privacy.html
```

### Requested scopes

- [ ] `user_accounts:read`
- [ ] `boards:read`
- [ ] `pins:read`

Do not request write scopes for the first application.

### Trial access description

Use the copy in `pinterest-application.md`.

## 5. What not to claim yet

Do not submit a fake Standard access demo.

`PINTEREST_DEV_MOCK=1` may still be used for deterministic Host/TV UI tests, but it must never be presented as a live Pinterest API integration or used in the Standard access demo.

Do not claim support for:

- Pinterest home recommendation feed
- Creating pins
- Saving pins
- Following accounts
- Comments
- Messages
- Web scraping
- Cookie-based Pinterest login

## 6. After Trial access is granted

Only then implement a small OAuth/API probe.

Minimum probe goals:

- [x] Reserve Host UI entry for Pinterest OAuth app Client ID/Secret.
- [x] Add `http://localhost:4077/control/source/oauth/callback/pinterest` as the exact Mac Host redirect URI.
- [x] Validate real Mac OAuth and account identity, and open Pinterest OAuth in the system browser so Google sign-in is not constrained by Electron popup handling.
- [x] Keep the default Mac preview bounded to the account's own Pins and board Pins; do not represent it as Pinterest Home/For You.
- [x] Validate the production Mac preview against a real authorized account with public test Pins (13 Pins loaded).
- [x] Save the granted App ID and App secret key encrypted in Mac Host.
- [ ] Start OAuth.
- [ ] Exchange code for token.
- [ ] Read connected account identity.
- [ ] List boards.
- [ ] List pins for one board.
- [ ] Confirm media/image fields available for Apple TV display.

If the probe works, record the Standard access demo using the script in `pinterest-application.md`.

## 7. Release-stage credential decision

Decide this only after the Trial OAuth/API probe is validated.

Release options to decide later:

- Store Pinterest app credentials in Host/iPhone Host release config with obfuscation and rotation plan.
- Add a small LoungeFeed service for token exchange if the product later justifies the operational cost.
- Drop Pinterest if API access/terms make the source too expensive or risky.

For now, validate the Mac Trial OAuth/API path first, then implement the iPhone-equivalent path and prepare the real Standard access demo.
