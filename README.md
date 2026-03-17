
# AI Trust Agent

**AI Trust Agent** introduces a new model for personalization on the web:  
instead of websites directly collecting personal data, **AI agents negotiate data access on behalf of users**.

A personal **AI Trust Agent** runs inside a Chrome extension and acts as the user's data gatekeeper.  
When a website wants to personalize an experience, its AI agent communicates with the user's agent to request specific information.

The Trust Agent evaluates the request, checks stored preferences and consent, and—if necessary—asks the user for approval. Only the **minimal information required** is shared.

This enables **privacy-first personalization** while keeping users in control of their data.

---

# Key Idea

Today’s web works like this:

User → Website → Data Collection → Personalization

This project proposes a different model:

Website AI Agent ⇄ User AI Trust Agent ⇄ User

Instead of collecting data, websites **request information from a trusted agent** that represents the user.

The browser becomes a **trust layer for the internet**.

---

# Architecture

The system consists of four main components.

## 1. Chrome Extension (User Trust Layer)

The **AI Trust Agent runs locally inside a Chrome extension**.

The extension acts as the interface between the user, websites, and cloud services.

The extension allows users to:

- view what their AI agent remembers
- manage preferences and consent
- approve or deny data requests
- see which websites requested data

The extension also hosts the **user agent logic**, which participates in agent-to-agent communication with websites.

---

## 2. Preference Store (Firestore)

User preferences and consent settings are stored in **Firestore**.

This includes:

- personalization preferences
- consent permissions
- allowed data categories
- access history

Firestore acts as the **source of truth** for what data the Trust Agent is allowed to share.

---

## 3. Contextual Memory (Google ADK Memory Bank)

The agent uses **Google ADK Memory Bank** to store contextual interaction memories across sessions.

This memory layer helps the agent maintain context without storing sensitive preference data.

Examples of contextual memory:

- previous interactions with websites
- conversation history between agents
- session context

Preferences and consent are **not stored here**, but in Firestore.

---

## 4. Agent-to-Agent Communication

When a user visits a compatible website, the website's AI agent communicates with the **AI Trust Agent**.

Instead of requesting data directly from the user, the website interacts with the user's agent.

Website AI Agent ⇄ AI Trust Agent (Chrome Extension)

The agents negotiate which data can be shared.

---

# Agent Negotiation Flow

When a website wants to personalize an experience:

## 1. Website request

The website AI agent sends a request describing:

- which data it wants
- why it needs the data
- how it will be used

Example request:

Request:
preferred_clothing_style

Purpose:
personalize product recommendations

---

## 2. Trust Agent evaluation

The Trust Agent checks:

- if the requested data exists
- if sharing it is allowed by user preferences
- if consent has already been granted

---

## 3. User confirmation (if needed)

If explicit approval is required, the Chrome extension prompts the user.

The user can:

- approve
- deny
- approve once
- approve permanently for the website

---

## 4. Minimal data sharing

If the request is approved, the Trust Agent returns only the **minimal information required**.

Example response:

{
"style_preference": "minimalist"
}

---

## 5. Access logging

The interaction is recorded in the preference store to ensure transparency.

Users can later see:

- which websites requested data
- which information was shared
- when consent was granted

---

# Why This Matters

Modern personalization systems rely on large-scale data collection with limited transparency.

AI Trust Agent explores a different model:

- users keep control of their data
- websites request information instead of collecting it
- AI agents negotiate safe data sharing
- personalization becomes **privacy-preserving**

This creates a **trust-based internet architecture** where users and services interact through agents.

---

# Tech Stack

- Chrome Extension (Manifest V3)
- Vertex AI
- Google Agent Development Kit (ADK)
- ADK Memory Bank for contextual memories
- Firestore for preferences and consent
- Google Cloud backend services

---

# Future Vision

This project explores how AI agents could become a **standard trust layer for the web**.

Possible future extensions include:

- standardized agent-to-agent negotiation protocols
- selective disclosure of personal attributes
- privacy-preserving personalization APIs
- cross-platform AI trust agents

---

# Built For

This project was built for the **Google Cloud Hackathon**.

It explores how **AI agents, contextual memory, and cloud infrastructure** can enable a more trusted and transparent internet.
