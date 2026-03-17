# User Trust Agent

The **User Trust Agent** is a personal AI agent that runs inside a Chrome extension and acts as the user's data gatekeeper.

It is responsible for managing user preferences, consent, and decision-making around data sharing.  
Instead of websites directly collecting personal data, all access is mediated by this agent.

The Trust Agent ensures that users remain in control while still enabling personalized experiences.

---

# Core Responsibilities

The User Trust Agent:

- stores and retrieves user preferences and consent (via Firestore)
- maintains contextual understanding of interactions (via Memory Bank)
- evaluates incoming data requests from websites
- negotiates what information can be shared
- asks the user for approval when required
- returns only the **minimal necessary data**

---

# How It Works

## 1. Triggered by a Website Agent

When a user visits a compatible website, the **website's AI agent triggers the Chrome extension**.

This activates the **User Trust Agent**, which is responsible for handling the request.

---

## 2. Agent-to-Agent Connection

The Trust Agent establishes an **agent-to-agent (A2A) connection** with the website’s AI agent.

Website AI Agent ⇄ User Trust Agent (Chrome Extension)


All communication and negotiation happens through this connection.

---

## 3. Request Evaluation

The website agent sends a request describing:

- what data it needs
- why it needs it (purpose)

The Trust Agent evaluates:

- whether the data exists
- whether sharing aligns with user preferences
- whether consent has already been given

---

## 4. User Interaction (if needed)

If the request requires approval, the Trust Agent prompts the user through the extension UI.

The user can:

- approve
- deny
- allow once
- allow permanently

---

## 5. Controlled Response

If approved, the Trust Agent responds with only the **minimal required data**.

Example:

```json
{
  "style_preference": "minimalist"
}
```

The agent never exposes unnecessary or raw personal data.

6. Transparency & Logging
   git@github.com:student-00-9ffaf522eae6-web/hackathon-google-cloud.git
All interactions are logged in the preference store.

Users can always see:

- which websites requested data
- what was shared
- when consent was given
