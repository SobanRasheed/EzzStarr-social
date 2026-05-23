# Ezzstar Platform Frontend Extensions

This repository contains the frontend extensions added to support Wallet balances dashboards, gamification XP progress bars, Gist circle boards, alerts inbox panels, and real-time WebSockets synchronization.

---

## 📁 File Structure Overview

```
social-frontend/src/
├── components/
│   ├── BracketView.jsx              # Tournament bracket structure
│   ├── NotificationBell.jsx         # Real-time dropdown and badge bell
│   ├── TipModal.jsx                 # Creator tip modal
│   ├── WalletWidget.jsx             # Small sidebar/navbar balance widget
│   └── XPBar.jsx                    # Neon-gradient progress bar
├── pages/
│   ├── OnboardingRole.jsx           # Selection of primary goals
│   ├── OnboardingProfile.jsx        # Completion of user profile fields
│   ├── WalletPage.jsx               # Balances dashboard and transactions logs
│   ├── NotificationsPage.jsx        # alerts list panel
│   ├── ProfilePage.jsx              # Detailed character sheet
│   ├── AdminDashboard.jsx           # Flag audits, suspensions, payments commands
│   ├── GistDetailPage.jsx           # Circles topic list and thread launcher
│   ├── GistTopicPage.jsx            # Thread view, reactions, tips, and views recorder
│   └── BoostCreatePage.jsx          # Sponsored boosts creator
├── store/
│   ├── index.js                     # Extended with new reducers
│   └── slices/
│       ├── walletSlice.js           # Balance and transactions state thunks
│       ├── xpSlice.js               # XPProfile levels state thunks
│       ├── notificationSlice.js     # alert counts and Socket.io listener reducer
│       ├── gistSlice.js             # circles and topics creation thunks
│       └── feedSlice.js             # aggregator thunks
├── socket.js                        # Client socket instance
└── App.jsx                          # Router extended with new lazy-loaded pages
```

---

## 🎨 Component Breakdown

### 1. `XPBar.jsx`
*   **Props**: `currentLevel`, `totalXP`, `xpToNextLevel`, `progressPercent`.
*   **Styling**: Labeled progress bar styled with a sleek gradient backing moving from Ezzstar Pink (`#DF28E2`) to Spica Teal (`#1ED6C6`).

### 2. `WalletWidget.jsx`
*   **Props**: `utilityBalance`, `earnedBalance`.
*   **Design**: Placed on top navbar to render a summary update of utility tokens vs. earned tokens.

### 3. `NotificationBell.jsx`
*   Renders a bell icon alongside a real-time unread badge.
*   Triggers an interactive dropdown listing the 5 newest in-app notifications.

### 4. `TipModal.jsx`
*   Instantiates overlay screens centering tipping inputs, with full support for creator tipping and splits confirmation.

### 5. `BracketView.jsx`
*   Parses bracket tree JSON structures to arrange single-elimination tournament match cards side-by-side inside responsive columns.

---

## ⚙️ Pages & Routing Hooks

*   **Lazy-Loaded Router**: Implemented inside `App.jsx` utilizing `async lazy()` code splitting to preserve fast page loading.
*   **Onboarding Flows**: Guides new accounts seamlessly through role selectors and profile customization forms, directly launching onboarding XP rewards.
*   **Views Tracking**: The `GistTopicPage.jsx` sets up an automatic 20-second timeout tracking duration views before calling `/api/views/record`.
*   **Real-time synchronization**: Hooked inside `NotificationBell.jsx` utilizing client-side `socket.io-client` listening to immediately bump unread badges.

---

## 🚀 Running locally

1. **Install Packages**:
   ```bash
   npm install
   ```
2. **Launch Dev Mode**:
   ```bash
   npm run dev
   ```
3. **Verify Build**:
   ```bash
   npm run build
   ```
