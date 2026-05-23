---
name: enhanced-message-context
description: Provide additional context for messages based on the codebase and the context of the message to improve the quality of the translations.
---

# Enhanced Message Context

When implementing Lingui i18n, add translator comments to messages so translators have context to provide the best translation. Even when the message text is self-explanatory, it is important to know where and how it appears in the UI to choose the correct tone, length, and wording.

## This project (expertcont2)

- **Source locale is Romanian (`ro`)**, targets are **Russian (`ru`)** and **English (`en`)**. Source strings in `Trans`/`t`/`msg` are written in Romanian — comments should help a translator going **from RO → RU/EN**.
- **Domain:** accounting / tax / bookkeeping services in Moldova. Many terms (e.g. *contabilitate*, *TVA*, *raportare*, *patentă*, *SRL*) have specific legal/fiscal meaning — call this out in comments when the literal translation would mislead.
- **Tone:** formal/professional B2B (clients are businesses, not consumers). Comments should mention when a string is conversational vs. legal/contractual so translators match register.
- **Romanian-specific disambiguation worth flagging:**
  - Gender (m/f/n) of the noun the adjective/participle refers to (e.g. *Selectat* vs *Selectată*).
  - Formality: Romanian *tu* vs *dumneavoastră* — note which form is intended.
  - Diacritics: write `ș`/`ț` (comma below), not `ş`/`ţ` (cedilla); keep this convention in source.
- **Comments are written in English** so they're useful for both RU and EN translators.
- Always write Romanian source strings in real Romanian — never English placeholders like `<Trans>TODO</Trans>`.

## When to Add Comments

Add a `comment` field when the message:

- **Is ambiguous**: Short words/phrases that can be different parts of speech
  - "Back" (noun or verb?), "Delete" (button or confirmation?), "Close" (verb or adjective?)
- **Lacks UI context**: Labels isolated from their surroundings
  - Table column headers, tooltip content, standalone button labels, menu items
- **Has domain-specific meaning**: Terms with different meanings across contexts
  - "Post" (verb or noun?), "Tag" (noun or verb?), "Follow" (social media or instruction?)
- **Depends on grammatical gender**: The translation depends on what the message refers to
  - "Selected" (masculine/feminine/neutral depends on what is selected)
- **Uses unclear variables**: Placeholder names don't reveal what they contain
  - `{count}` (count of what?), `{name}` (user name, file name, project name?)
- **Could benefit from UI context even if clear**: Where the text appears (button, dialog, banner, form field) affects tone and length—add a brief location or purpose comment when it helps.

## Writing Effective Comments

A good translator comment includes:

1. **Location**: Where in the UI the message appears
   - "Button in the top navigation bar"
   - "Tooltip for the save icon"
   - "Column header in the users table"

2. **Action/Purpose**: What happens or what it means
   - "Navigates back to the previous page"
   - "Deletes the selected item permanently"
   - "Shows the number of unread notifications"

3. **Disambiguation**: Clarify part of speech or meaning
   - "Used as a verb, not a noun"
   - "Refers to email addresses, not postal addresses"
   - "Singular form, user will see 'item' or 'items' based on count"

## API Reference

Lingui provides three ways to add translator comments:

### 1. JS Macro (`t`)

For JavaScript code outside JSX:

```js
import { t } from "@lingui/core/macro";

// With comment
const backLabel = t({
  comment: "Button in the navigation bar that returns to the previous page",
  message: "Back",
});

// With comment and variable
const uploadSuccess = t({
  comment: "Success message showing the name of the file that was uploaded",
  message: `File ${fileName} uploaded successfully`,
});
```

### 2. React Macro (`Trans`)

For JSX elements:

```jsx
import { Trans } from "@lingui/react/macro";

// With comment
<Trans comment="Button that deletes the selected email message">Delete</Trans>

// With comment in a component
<button>
  <Trans comment="Label for button that saves changes to user profile">
    Save
  </Trans>
</button>
```

### 3. Deferred/Lazy Messages (`defineMessage` / `msg`)

For messages defined separately from their usage:

```js
import { defineMessage } from "@lingui/core/macro";

const messages = {
  deleteButton: defineMessage({
    comment: "Button that permanently removes the item from the database",
    message: "Delete",
  }),

  statusLabel: defineMessage({
    comment: "Shows whether the service is currently operational. Values: 'Active', 'Inactive', 'Pending'",
    message: "Status: {status}",
  }),
};
```

## Examples

### Example 1: Ambiguous Short Word (RO source)

**Before** (no context):

```jsx
<button onClick={goBack}>
  <Trans>Înapoi</Trans>
</button>
```

**After** (with context):

```jsx
<button onClick={goBack}>
  <Trans comment="Toolbar button that navigates to the previous page. Romanian 'înapoi' is an adverb here; EN should be 'Back', RU 'Назад'.">
    Înapoi
  </Trans>
</button>
```

### Example 2: UI Label Without Context

**Before** (no context):

```jsx
const columns = [
  { key: "name", label: t`Name` },
  { key: "status", label: t`Status` },
];
```

**After** (with context):

```jsx
const columns = [
  { 
    key: "name", 
    label: t({
      comment: "Column header in the projects table showing project name",
      message: "Name"
    })
  },
  { 
    key: "status", 
    label: t({
      comment: "Column header showing project status: Active, Inactive, or Archived",
      message: "Status"
    })
  },
  { 
    key: "created", 
    label: t({
      comment: "Column header showing the date when the project was created",
      message: "Created"
    })
  },
];
```

### Example 3: Domain-Specific Term (accounting context)

**Before** (ambiguous — *raport* in Romanian = report, but also colloquially "relationship"):

```jsx
<Trans>Raport lunar</Trans>
```

**After** (clarified with fiscal context):

```jsx
<Trans comment="Heading on the dashboard for the monthly fiscal report (TVA/IVAO). 'Raport' here is the formal accounting/financial report, EN: 'Monthly report', RU: 'Ежемесячный отчёт' (not 'отношение').">
  Raport lunar
</Trans>
```

### Example 4: Variable Without Clear Meaning

**Before** (unclear what count represents):

```js
const message = t`${count} items selected`;
```

**After** (clarified):

```js
const message = t({
  comment: "Shows the number of email messages currently selected in the inbox",
  message: `${count} items selected`,
});
```

### Example 5: Self-Explanatory Message (Comment Still Optional but Helpful)

```jsx
// Message is clear on its own; adding a comment with location still helps translators
<Trans comment="Validation hint shown below the password field on the sign-up form">
  Your password must contain at least 8 characters, including one uppercase letter and one number.
</Trans>
```

## Workflow

When implementing or reviewing Lingui messages:

1. **Read the message**: Look at the string itself
2. **Check context**: Consider where and how it's used in the code
3. **Ask**: "Could a translator misinterpret this without seeing the UI?"
4. **If yes**: Add a `comment` field with location, purpose, and any disambiguation
5. **If no**: Skip the comment and keep the code clean

## Notes

- Comments are extracted into message catalogs for translators (they appear on `#.` lines in `.po`)
- Comments are stripped from production builds (zero runtime cost)
- Comments appear in translation management systems (TMS) — and in this repo, directly in `packages/i18n/src/locales/{ru,en}/messages.po`
- Use consistent terminology across all comments in your project — particularly for fiscal/legal terms (TVA, SRL, IVAO, patentă) so RU and EN stay consistent across the site
- Run `pnpm extract` after adding comments to push them into the `.po` catalogs
