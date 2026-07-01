# LoungeFeed Pinterest Developer Application Draft

This document is an internal copy deck for applying for Pinterest API access.
Replace all bracketed placeholders before submitting.

## Public URLs

- Product website: `https://loungefeed.github.io/`
- Privacy Policy: `https://loungefeed.github.io/privacy.html`
- Support email: `loungefeed@outlook.com`
- Public operator / developer name: `LoungeFeed Project`

## App name

LoungeFeed

## Short description

LoungeFeed lets users view their own authorized Pinterest boards and pins on Apple TV through a local Mac or iPhone Host. The Pinterest integration is read-only and uses Pinterest OAuth.

## Full app description

LoungeFeed is a local-first Apple TV viewing app for personal social and content feeds. The Apple TV app pairs with a LoungeFeed Host running on the user's Mac or iPhone. The Host handles source authorization and serves authorized content to the user's paired Apple TV viewer on the local network.

For Pinterest, LoungeFeed will use Pinterest OAuth and the official Pinterest API to let users view their own authorized Pinterest account identity, boards, and pins on Apple TV. The integration is read-only. LoungeFeed will not create pins, save pins, follow accounts, comment, send messages, scrape Pinterest web pages, use Pinterest session cookies, or ask users to type their Pinterest password into LoungeFeed.

## Pinterest use case

Users want to browse their own Pinterest visual collections in a relaxed Apple TV experience. LoungeFeed will let a user connect their Pinterest account through OAuth on the local Host, select their authorized boards/pins, and view those pins on Apple TV with a remote-friendly interface.

The integration is intended for personal viewing only. It does not automate user actions and does not modify Pinterest content or account state.

## Requested scopes

Request only the minimum read-only scopes for the first application.

### `user_accounts:read`

Needed to confirm the connected Pinterest account, show the account name/avatar in LoungeFeed Host, and help the user understand which account is connected.

### `boards:read`

Needed to list the user's authorized boards so LoungeFeed can show board-level browsing on Apple TV.

### `pins:read`

Needed to show authorized pins inside a selected board or Pinterest browsing surface in LoungeFeed.

## Explicit non-goals

LoungeFeed will not request write scopes in the initial Pinterest integration.

LoungeFeed will not:

- Create, update, or delete pins.
- Save or unsave pins.
- Follow or unfollow accounts or boards.
- Send comments or messages.
- Scrape Pinterest web pages.
- Use Pinterest browser session cookies.
- Ask users for their Pinterest password.
- Export Pinterest access tokens to Apple TV or other viewer devices.

## OAuth redirect URI candidates

Use the final URL that matches the Host callback implementation.

For local Mac Host testing:

```text
http://127.0.0.1:4077/control/source/oauth/callback/pinterest
```

Optional local alias if Pinterest accepts multiple redirect URIs:

```text
http://localhost:4077/control/source/oauth/callback/pinterest
```

For future iPhone Host, define a separate callback after the iOS Host auth flow is implemented. Do not submit an unimplemented iOS redirect URI yet.

## Trial access answer

Suggested answer:

```text
LoungeFeed is preparing a read-only Pinterest integration for Apple TV viewing. A user signs in with Pinterest OAuth from the LoungeFeed Host app running on their Mac or iPhone. LoungeFeed then uses official Pinterest API read scopes to show the user's authorized Pinterest account, boards, and pins on their paired Apple TV viewer.

The initial integration only needs user_accounts:read, boards:read, and pins:read. LoungeFeed does not write to Pinterest, does not save pins, does not follow users, does not comment or message, does not scrape Pinterest web pages, does not use Pinterest cookies, and does not collect Pinterest passwords.
```

## Standard access demo script after Trial is granted

Do not record this as a fake API demo. Record it only after Trial API access is granted and a real OAuth/API probe exists.

1. Open LoungeFeed Host.
2. Choose Pinterest from Feed Sources.
3. Click Connect Pinterest.
4. Complete Pinterest OAuth in the browser/authorization window.
5. Return to LoungeFeed Host and show the connected Pinterest account name.
6. Open the paired Apple TV viewer.
7. Select Pinterest.
8. Show authorized boards.
9. Open a board and show pins.
10. Open a pin in large-image detail view.
11. Show that there are no write actions such as Save, Create, Follow, Comment, or Message.

## Support / reviewer note

Suggested note:

```text
The Pinterest integration is under development and will remain read-only. We are requesting Trial access first so we can implement and validate the OAuth flow and the minimum read-only board/pin browsing experience before applying for Standard access.
```
