---
name: Campus Connect — The Modern Studio
description: Utilitarian, functional design system with clean pill geometry, tactile confidence, and media-forward clarity for social and real-time chat.
colors:
  primary: "#C25E3E"
  primary-hover: "#A64B2D"
  primary-light: "#FBF1EB"
  primary-subtle: "#F5E8E0"
  primary-dark: "#E07A5F"
  secondary: "#D97736"
  accent: "#E08D58"
  accent-soft: "#FDF6EE"
  neutral-bg: "#FAF7F2"
  neutral-bg-dark: "#121214"
  surface-card: "#FFFFFF"
  surface-card-dark: "#1C1B1F"
  surface-subtle: "#F5EFEB"
  surface-subtle-dark: "#25242A"
  border-light: "#E8E2D9"
  border-dark: "#2F2C33"
  border-subtle: "#F0ECE4"
  border-subtle-dark: "#38353D"
  text-main: "#292524"
  text-main-dark: "#F5EFEB"
  text-muted: "#78716C"
  text-muted-dark: "#A8A29E"
  text-sub: "#A8A29E"
  text-sub-dark: "#78716C"
  status-success: "#15803D"
  status-danger: "#DC2626"
  status-warning: "#D97706"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
    fontSize: "1.45rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
    fontSize: "1.1rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.94rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.01em"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "20px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-send:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.full}"
    size: "44px"
  card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.lg}"
    padding: "16px 20px"
  input-search:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.full}"
    height: "42px"
---

# Design System: Campus Connect

## Overview
**Creative North Star: The Modern Studio.**
Campus Connect is designed as a utilitarian, focused creative commons that combines real-time direct chat and social media expression. The visual voice is **Tactile & Confident** — interface chrome is disciplined and understated so that user-created photography, writing, and direct conversations lead from the first viewport.

The design language rejects AI-generated tropes (nested card grids, gratuitous purple text gradients, unblurred offset drop shadows, and unstyled native scrollbars) in favor of authentic dual-theme lighting, physical directional elevation, responsive pill geometry, and deliberate typographic measure.

## Colors
Color tokens are organized into distinct functional roles across daylight (Warm Ivory) and night (Deep Obsidian):

### Primary Brand Harmony
- **Primary:** Terracotta (`#C25E3E` in Light, `#E07A5F` in Dark). The signature visual anchor for buttons, active accents, and brand badges.
- **Primary Hover & Pressed:** `#A64B2D` (Light) / `#F28E73` (Dark).
- **Primary Soft Tint:** `#FBF1EB` (Light) / `#2D1E19` (Dark). Used for active conversation lists and gentle badge backings.
- **Secondary & Accent:** Warm Amber (`#D97736` / `#E58E4B`) and Soft Ochre (`#E08D58` / `#F4A261`).

### Surfaces & Grounds
- **Application Ground:** Warm Ivory (`#FAF7F2`) daylight; Deep Obsidian (`#121214`) night.
- **Surface Cards:** Pure White (`#FFFFFF`) in Light; Elevated Slate (`#1C1B1F`) in Dark.
- **Subtle Surface Containers:** `#F5EFEB` in Light; `#25242A` in Dark.
- **Navigation Bar:** Translucent frosted ground (`rgba(250, 247, 242, 0.92)` / `rgba(18, 18, 20, 0.92)`) with `backdrop-filter: blur(18px)`.

### Text & Contrast Hierarchy (WCAG AA Compliant ≥ 4.5:1)
- **Primary Text:** Deep Stone `#292524` (Light) / Crisp Ivory `#F5EFEB` (Dark).
- **Muted Text:** Warm Stone `#78716C` (Light) / Slate Gray `#A8A29E` (Dark).
- **Subtle / Border Text:** `#A8A29E` (Light) / `#78716C` (Dark).

### Signal Indicators
- **Success:** Emerald `#15803D` (Light) / `#22C55E` (Dark). Active online status dot.
- **Danger:** Crimson `#DC2626` (Light) / `#EF4444` (Dark). Destructive actions and error states.
- **Warning:** Amber `#D97706` (Light) / `#F59E0B` (Dark).

## Typography
The system enforces deliberate typographic hierarchy using negative tracking on headings and tabular numbers on dynamic metrics:

- **Typeface Stacks:**
  - Headings & Wordmark: `-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif`.
  - Body & UI Controls: `-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif`.
- **Display (1.75rem / 800):** Negative tracking `-0.03em`. Reserved for prominent page headings and landing titles.
- **Headline (1.45rem / 700):** Negative tracking `-0.025em`. Branded wordmark in navigation.
- **Title (1.1rem / 600):** Negative tracking `-0.015em`. Card headers, modal titles, and conversation headers.
- **Body (0.94rem / 400 / 1.55 line-height):** Measure held strictly to 65–75 characters per line for optimal reading rhythm.
- **Micro & Metadata (0.78rem / 500):** Timestamps, badges, and counters with `font-variant-numeric: tabular-nums`.

## Layout
The structure follows a **Co-equal Hybrid Model**:
- **Social Feed:** Central single-column feed (`max-width: 600px - 640px`) with generous card margins (`margin-bottom: 24px`) preventing visual density fatigue.
- **Suggestions & Connections:** Sticky right column for quick user discovery.
- **Real-Time Messenger:** Full-height container (`height: calc(100vh - 105px)`) split into a scrollable conversation sidebar (`col-md-4`) and active chat viewport (`col-md-8`).
- **Responsive Adaptivity:** Below `768px`, the layout seamlessly stacks: conversation drawer takes full width, and bottom navigation provides one-thumb access to Feed, Messages, and Profile.

## Elevation & Depth
Elevation is achieved through physical directional offsets rather than artificial unblurred halos:

- **Shadow Sm:** `0 1px 3px 0 rgba(41, 37, 36, 0.04)` (Light) / `0 1px 3px 0 rgba(0, 0, 0, 0.3)` (Dark). Used on inputs and minor tags.
- **Shadow Card:** `0 4px 20px -2px rgba(41, 37, 36, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)`. Grounded baseline for feed cards and chat container.
- **Shadow Lg / Hover:** `0 12px 28px -4px rgba(41, 37, 36, 0.08)`. Applied dynamically on card hover and floating menus.
- **Shadow Floating / Toast:** `0 20px 40px -8px rgba(0, 0, 0, 0.3)` with `z-index: 999999`.

## Shapes
Geometric rhythm relies on soft pill radii and rounded container boundaries:
- **Feed Cards & Containers:** `border-radius: 20px`.
- **Action Buttons & Modals:** `border-radius: 12px - 14px`.
- **Inputs & Search Capsules:** Full pill `border-radius: 9999px`.
- **Avatars:** Perfect circles `border-radius: 50%` with crisp border rings (`28px`, `34px`, `46px`, `140px`).

## Components

### 1. Navigation Bar
Sticky header with frosted glass blur (`18px`), gradient wordmark, centered pill search, notifications bell with count indicator, and profile dropdown menu.

### 2. Social Post Card
- **Header:** Big avatar (46px) with username, relative timestamp, and options menu.
- **Body:** Multi-paragraph text with "Read More" truncation at 60 characters and media carousel supporting responsive aspect ratios.
- **Footer:** Redesigned interactive bar: heart reaction with count, comment bubble toggle, share drawer, and bookmark toggle.

### 3. Direct Chat Messenger
- **Active Channel:** Subtly tinted background (`var(--primary-light)`) with rounded container (`12px`) and emerald online indicator dot.
- **Sent Message Bubble (`you_message`):** Warm terracotta gradient (`linear-gradient(135deg, var(--primary), var(--secondary))`), white text, directional radius (`border-radius: 20px 20px 4px 20px`), and tucked timestamp in `rgba(255, 255, 255, 0.75)`.
- **Received Message Bubble (`other_message`):** Surface card background (`var(--bg-card)`), border `1px solid var(--border-color)`, directional radius (`20px 20px 20px 4px`), and stone text.
- **Input Bar:** Full pill capsule input with emoji picker, media upload trigger, and dedicated circular terracotta send button with hover elevation.

### 4. Alert Toasts
Fixed floating capsule at `top: 24px; right: 24px; z-index: 999999;` featuring status icon badges, glassmorphic depth, and automated 4-second dismissal.

### 5. Loading Spinner
Minimal 32px terracotta dual-ring spinner with letter-spaced uppercase text (`LOADING FEED`) eliminating oversized legacy GIFs.

## Do's and Don'ts

### Do's
- **DO** style custom browser surfaces: custom scrollbars (`scrollbar-width: thin`), selection highlights (`::selection { background: var(--primary); color: #fff; }`), and focus rings (`0 0 0 3px rgba(194, 94, 62, 0.15)`).
- **DO** use exponential ease-out motion curves: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **DO** format timestamps cleanly using relative time or short 12-hour format (`moment(createdAt).format('h:mm A')`).
- **DO** preserve original images and user avatars without CSS color inversion (`filter: invert(1)` is banned).

### Don'ts
- **DON'T** use purple-to-blue text gradients or harsh zero-offset halos.
- **DON'T** use side-tab accent stripes on active cards or list items.
- **DON'T** nest cards inside cards or create multi-column card sprawl.
- **DON'T** hardcode `#ffffff`, `#000000`, or `#ddd` hex values inside component stylesheets; always route through CSS custom properties.
