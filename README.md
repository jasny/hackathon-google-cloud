# Agent Connect

An AI trust layer that stores your personal data and payment preferences in a personal memory bank, letting you share information with websites through a controlled consent flow — keeping you in full control while making interactions faster and more seamless.

## The Problem

Every time you sign up for a new service or make a payment, you fill in the same form fields over and over: name, address, date of birth, payment method. You have no visibility into what data is stored where, and no easy way to revoke it.

## The Solution

Agent Connect is a Chrome extension that acts as a personal data agent. Websites can declare they support the Agent Connect protocol, and users can choose to share specific data fields — and complete payments — through the extension, without typing anything manually. All shared data is tracked and revocable from a central permissions dashboard.

---

## User Flows

### Without the Extension — The Normal Flow

When a user visits **De Staatsman** (a demo political party website) and clicks **Join Us**, they go through a standard two-step signup:

**Step 1 — Personal Details**

The user fills in their full name, email address, date of birth, gender, and home address manually.

![Join form — personal details](screenshots/screenshot-localhost-5173-2026-03-17-11-46-00.png)

**Step 2 — Membership Contribution**

The user selects an annual membership fee (€25.00), optionally adds a donation, picks a payment method (iDEAL or Credit Card), and clicks **Complete & Pay**.

![Join form — payment](screenshots/screenshot-localhost-5173-2026-03-17-11-47-05.png)

---

### With the Extension — The Agent Connect Flow

When the extension is installed, the De Staatsman website detects it and shows an **Agent Discovery** widget in the corner, signalling that the Agent Connect protocol is available.

![Agent Discovery widget on homepage](screenshots/screenshot-localhost-5173-2026-03-17-11-43-43.png)

The user clicks **Connect Agent**. The extension opens a consent popup showing exactly which data fields the website is requesting — Name, Demographics, Political Affiliation, and Address — each with a toggle to include or exclude it. The user selects what they want to share and clicks **Share Selected**.

![Extension data sharing consent popup](screenshots/Screenshot%20from%202026-03-17%2011-44-55.png)

Instead of a full payment form, a compact **AFT Payment Mandate** popup appears directly in the extension. It shows the line items (Political Party X membership, additional donation) and the total, and the user signs and pays in one click.

![Extension payment mandate popup](screenshots/Screenshot%20from%202026-03-17%2011-45-17.png)

---

### Managing Permissions

At any time the user can open the extension's **Permissions** page to see every site they have shared data with, what fields were shared, and when. Each entry has a **Revoke All & Delete** button to instantly withdraw consent and remove the stored data.

![Permissions dashboard in the extension](screenshots/Screenshot%20from%202026-03-17%2011-47-40.png)

---

## Why is this the top pick for the hackathon?

Agent Connect is a **progressive improvement** — it works for everyone without requiring anyone to change their existing setup.

**Users get a better experience.** No more filling in the same name, address, and payment details on every new website. With the extension installed, a single consent click pre-fills forms and completes payments. Returning to a site that already has your consent is even faster: it just works.

**Websites get access to more data.** Because sharing is low-friction, users are more willing to provide richer information — demographics, political affiliation, preferences — that they would otherwise skip on a manual form. Sites get higher completion rates and better data quality.

**Users stay in control.** The permissions dashboard gives a clear, single place to see exactly which data was shared with which service, for what stated purpose, and when. Revoking access is one button press. No hunting through cookie banners or privacy settings buried in account pages.

**It is purpose-built for GDPR compliance.** GDPR does not just require consent — it requires *purpose limitation*: data collected for one reason cannot be silently reused for another. Agent Connect surfaces the stated purpose of every data request at the moment of consent ("campaign optimization and member management"), stores it alongside the permission, and makes it visible in the dashboard. This gives both users and organisations a transparent, auditable record that maps directly onto GDPR's core requirements.

---

## Protocols

Agent Connect is built on three open protocols that together cover the full lifecycle of an agent-mediated interaction.

### A2A — Agent-to-Agent

A2A is the **server-to-server messaging protocol**. It defines how agents discover each other and exchange structured capability requests.

A website that supports Agent Connect publishes an agent manifest at `/.well-known/agent.json`. This manifest lists the site's capabilities (e.g. `membership_application`) and the endpoints the user's agent can call. When the Chrome extension detects this file, it reads the manifest and the user's server agent can begin sending A2A messages to the website agent.

In this app:
- `packages/server-website/public/.well-known/agent.json` — the De Staatsman website publishes its capabilities here
- `packages/server-agent/` — the user's agent receives and responds to A2A messages
- `packages/user-agent/src/client.ts` — the client that sends capability requests to remote A2A endpoints

### A2UI — Agent-to-UI

A2UI is the **dynamic UI protocol**. Instead of hardcoding consent forms in the extension, agents send a serialized tree of UI component definitions at runtime. The extension renders whatever the agent describes.

When the user initiates a flow, the user agent responds with an A2UI payload — a list of typed component definitions such as `DataRequestItem` (a toggleable data field), `NestedDataRequestItem` (a collapsible group of sub-fields), and `SectionHeader`. The extension's `A2UIRenderer` walks this tree and renders the consent UI dynamically. As the user toggles fields on and off, the state is sent back to the agent, which can respond with an updated A2UI tree.

This means the extension never needs to know what fields a particular website requests — the agent decides and describes them at runtime.

In this app:
- `packages/dummy-user-agent/src/index.ts` — generates A2UI component trees (Name, Demographics, Political Affiliation, Address toggles)
- `packages/chrome-extension/src/components/A2UIRenderer.tsx` — recursively renders the component tree
- `packages/chrome-extension/src/components/Chat.tsx` — receives A2UI updates from the agent and passes them to the renderer

### AP2 — Agent Payment Protocol

AP2 is the **payment authorization protocol**. Rather than the user filling in payment details on the website, the website agent sends a signed payment mandate to the user's agent. The user reviews the mandate — merchant name, line items, total — and authorizes it with a single **Sign & Pay** action. The agent's wallet signs the mandate and the payment is processed.

This removes payment details from the website entirely: the site never sees a card number or bank account. The mandate is shown in a compact popup inside the extension, replacing the multi-field payment form the user would otherwise complete on the website.

In this app:
- `packages/chrome-extension/src/components/Payment.tsx` — renders the AP2 payment mandate UI
- The mandate is triggered when the user agent sets `triggerPayment: true` in an A2A response, switching the extension from the A2UI consent view to the AP2 payment view

### How the protocols fit together

```
Website publishes /.well-known/agent.json
        ↓  (A2A discovery)
Extension reads manifest, user's agent connects
        ↓  (A2A capability request)
User agent generates consent form
        ↓  (A2UI — component tree sent to extension)
Extension renders toggleable data fields
        ↓  (user selects fields, confirms)
User agent prepares payment mandate
        ↓  (AP2 — mandate sent to extension)
User reviews and signs with one click
        ↓  (AP2 authorization)
Transaction complete, permissions stored
```

---

## Architecture

The project is structured as a monorepo with three main packages:

| Package | Description |
|---|---|
| `packages/chrome-extension` | Plasmo-based Chrome extension — data agent, consent UI, permissions dashboard |
| `packages/website` | Demo political party website (De Staatsman) — implements the Agent Connect protocol |
| `packages/agent-server` | Backend agent server — handles A2A communication and data storage |

The extension and website communicate via the **Agent Connect protocol**: a standardised A2A (agent-to-agent) handshake where websites advertise their data requirements and the extension mediates the user's consent and data transfer.

## Getting Started

Install dependencies from the repo root:

```bash
yarn install
```

Start the website:

```bash
yarn workspace website dev
```

Build the Chrome extension:

```bash
yarn workspace chrome-extension build
```

Then load the unpacked extension from `packages/chrome-extension/build/chrome-mv3-dev` in Chrome (`chrome://extensions` → **Load unpacked**).
