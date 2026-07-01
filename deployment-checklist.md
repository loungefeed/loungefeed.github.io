# LoungeFeed Pinterest access preparation checklist

This checklist keeps the Pinterest application lightweight and avoids unnecessary engineering before Trial access is granted.

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

## 5. What not to submit yet

Do not submit a fake Standard access demo.

Before Trial access is granted, we cannot show a real Pinterest OAuth/API integration. `PINTEREST_DEV_MOCK=1` may be used to validate LoungeFeed Host/TV UI, pagination, and local media proxy behavior, but any mock video must clearly say it is a local mock and not a live Pinterest API integration.

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
- [ ] Start OAuth.
- [ ] Exchange code for token.
- [ ] Read connected account identity.
- [ ] List boards.
- [ ] List pins for one board.
- [ ] Confirm media/image fields available for Apple TV display.

If the probe works, record the Standard access demo using the script in `pinterest-application.md`.

## 7. Release-stage credential decision

Do not solve this before Trial access.

Release options to decide later:

- Store Pinterest app credentials in Host/iPhone Host release config with obfuscation and rotation plan.
- Add a small LoungeFeed service for token exchange if the product later justifies the operational cost.
- Drop Pinterest if API access/terms make the source too expensive or risky.

For now, Trial access first.
