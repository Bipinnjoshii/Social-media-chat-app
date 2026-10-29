---
name: Campus Connect Design System
description: Warm Editorial Craft design system for a co-equal hybrid social and real-time chat application.
colors:
  primary: "#C25E3E"
  primary-hover: "#A64B2D"
  primary-light: "#FBF1EB"
  primary-dark: "#E07A5F"
  secondary: "#D97736"
  accent: "#E08D58"
  neutral-bg: "#FAF7F2"
  neutral-bg-dark: "#121214"
  surface-card: "#FFFFFF"
  surface-card-dark: "#1C1B1F"
  border-light: "#E8E2D9"
  border-dark: "#2F2C33"
  text-main: "#292524"
  text-main-dark: "#F5EFEB"
  text-muted: "#78716C"
  text-muted-dark: "#A8A29E"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.01em"
  micro:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
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
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  card:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.lg}"
    padding: "20px 24px"
---

# Design System: Campus Connect

## Overview
Campus Connect operates in a **Warm Editorial Craft** design language. It rejects generic AI design cliches (purple gradients, unstyled system scrollbars, low-contrast grays, card-inside-card sprawl) in favor of high-legibility typography, directional elevation, tactile micro-interactions, and a cohesive warm ivory / deep obsidian dual-theme environment.

## Colors
- **Light Ground:** Warm Ivory (`#FAF7F2`) with crisp porcelain white surface cards (`#FFFFFF`).
- **Dark Ground:** Deep Obsidian (`#121214`) with elevated slate surface cards (`#1C1B1F`).
- **Signatures:** Terracotta (`#C25E3E` in light, `#E07A5F` in dark) and Warm Amber (`#D97736` / `#E58E4B`).
- **Text & Contrast:** Heavy stone contrast (`#292524` light, `#F5EFEB` dark), meeting WCAG AA standards (≥ 4.5:1).
- **Status Signals:** Emerald Green (`#15803D`), Crimson Red (`#DC2626`), and Amber Warning (`#D97706`).

## Typography
- **Primary Font Stack:** `-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Inter', 'Segoe UI', Roboto, sans-serif`.
- **Display & Headings:** Negative tracking (`-0.02em` to `-0.03em`) for authoritative, editorial presence.
- **Body Measure:** Optimized for 65–75 characters per line to ensure effortless scanability and reading rhythm.
- **Numerals & Metrics:** Enforced `font-variant-numeric: tabular-nums` for counters, like tallies, and timestamps.

## Layout
- **Co-equal Hybrid Structure:**
  - Center: Social feed column with dedicated card breathing room (`margin-bottom: 24px`).
  - Right: Sticky suggestions and conversation triggers.
  - Messenger Drawer: Full-height, frictionless conversation viewport with tactile message grouping.
- **Mobile Adaptivity:** Bottom navigation with touch-friendly targets (≥ 44px) and full-screen message views.

## Elevation & Depth
- **Soft Directional Shadows:**
  - Sm: `0 1px 3px 0 rgba(41, 37, 36, 0.04)`
  - Md: `0 4px 16px -2px rgba(41, 37, 36, 0.06), 0 2px 4px -2px rgba(41, 37, 36, 0.02)`
  - Card: `0 4px 20px -2px rgba(41, 37, 36, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)`
- **Glassmorphism Discipline:** Subtle frosted glass reserved strictly for the sticky header navigation (`backdrop-filter: blur(14px)`). No decorative, low-contrast glass cards on the feed.

## Shapes
- **Container Geometry:**
  - Content Cards & Modals: `border-radius: 18px - 20px`.
  - Buttons, Inputs, and Badges: `border-radius: 12px - 14px`.
  - Avatars and Reaction Triggers: Full circular pill (`border-radius: 9999px`).

## Components
- **Navbar:** Sticky translucent bar with branded wordmark, global search, direct notifications pill, and profile dropdown.
- **Post Card:** Clean header (avatar + username + relative timestamp), high-legibility body, optional media carousel with rounded aspect-ratio containers, and minimal action bar (heart reaction, comment count, share, bookmark).
- **Chat Messenger (`RightSide` & `MsgDisplay`):**
  - Sender Bubbles: Terracotta gradient with crisp white text.
  - Receiver Bubbles: Soft ivory/slate container with high-contrast stone text.
  - Media: Rounded inline previews with smooth hover zooms.
- **Alert Toast:** Fixed pill notification at `top: 24px; right: 24px; z-index: 999999;` with glassmorphic depth and auto-dismissal.
- **Loading Spinner:** Compact 32px dual-ring terracotta spinner with letter-spaced uppercase text.

## Do's and Don'ts
- **DO** use real directional shadows and subtle borders (`rgba(0,0,0,0.06)` or `#2F2C33`).
- **DO** use exponential easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`) for all modal and toast entrances.
- **DO** maintain pure images and avatars without CSS color inversion (`filter: invert(1)` is banned).
- **DON'T** nest cards inside cards or create 3-column card sprawl.
- **DON'T** use purple-to-blue text gradients or harsh zero-offset halos.
- **DON'T** allow unstyled browser scrollbars or unstyled text-selection highlights.
