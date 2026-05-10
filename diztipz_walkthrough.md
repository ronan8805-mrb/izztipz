# DizTipz Elite — Platform Walkthrough & Business Specification

## 1. Brand Philosophy & Business Overview
**DizTipz Elite** is a premier, high-fidelity sports betting intelligence ecosystem. Built for the modern bettor, the platform bridges the gap between raw data and actionable profit. The business operates on a membership-driven model, offering tiered access to proprietary betting algorithms, head-tipster insights, and an exclusive high-stakes community.

---

## 2. Homepage: The Gateway to Intelligence
The homepage is designed to create an immediate "Premium" first impression using glassmorphism, gold-gradient aesthetics, and fluid typography.

*   **Elite Hero Section**: Features an interactive, static padlock symbol representing the security and exclusivity of the data. The headline "SOMETHING BIG IS COMING" utilizes fluid `clamp()` scaling to look perfect on both 4K monitors and mobile screens.
*   **Secondary Tagline**: *"Elite data, expert eyes, maximum returns"* (Visible on Desktop; streamlined on Mobile).
*   **The Unmatched Edge**: A centered, high-impact section describing the DizTipz philosophy—combining statistical modeling with years of professional field experience.
*   **Trust Ecosystem**: A scrolling bar of global partner badges (Bet365, Champions League, etc.) and a dedicated section for legal compliance.

---

## 3. Membership & The Acquisition Funnel
Access to DizTipz is gated through a multi-tier subscription model:

*   **Gold Plan (£7.99/mo)**: The entry point for daily football and racing tips.
*   **Elite Plan (£19.99/mo)**: Full access to the Dashboard, Live Feed, and Chatroom.
*   **VIP Access**: A specialized landing page for "The Inner Circle," detailing high-stakes networking, instant Telegram alerts, and Max Bet selections.

---

## 4. The Member Dashboard (The Inner Circle)
The crown jewel of the platform, the dashboard is a real-time command center for active members.

*   **High-Tech Stats Strip**: A 4-column (Desktop) or 2x2 (Mobile) grid displaying key performance indicators:
    *   **Total Profit (Units)**
    *   **Strike Rate %**
    *   **Avg Odds**
    *   **Tips Accepted**
*   **Diz Live Feed**: A dynamically filtered feed where members see the latest selections. Filters include **All**, **Football**, and **Racing**.
*   **Elite Chatroom**: A Discord-style real-time interface where members discuss strategy. Features include user avatars and timestamped messaging.
*   **Security Gating**: The entire dashboard is protected by a blurred "Lock Overlay." Only verified, logged-in members with an active tier can bypass the blur to interact with the feed.

---

## 5. Administrative Mastery
The platform includes a hidden administrative suite for content management:

*   **Admin Dashboard**: A high-level overview of total members, monthly revenue, and active tips.
*   **Tip Management**: Tools for admins to broadcast new selections directly to the member feed.
*   **User Management**: A searchable registry of members with the ability to manage subscription statuses.
*   **Admin Override**: The special account `dizadmin` automatically bypasses all locks, providing unrestricted access for testing and moderation.

---

## 6. Technical Specifications & Compliance
*   **Mobile-Hardened**: 100% responsive architecture with a forced-visibility full-screen hamburger menu.
*   **Legal Suite**: Dedicated pages for **Privacy Policy**, **Terms of Service**, and **Responsible Gambling** linked globally in the footer.
*   **Security**: Integrated `localStorage` session management and credential encryption (MVP state).

---
*Developed for DizTipz Elite — The Future of Betting Intelligence.*
