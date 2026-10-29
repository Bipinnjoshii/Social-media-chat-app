# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
General Friends & Creators: Broad social media platform for sharing media, real-time messaging, stories, and staying in touch.

## Product Purpose
Campus Connect is a real-time social platform combining rich media sharing (posts, threaded comments, reactions, bookmarks) with instant 1-on-1 direct messaging, user discovery, and notifications.

## Positioning
A co-equal hybrid social and chat experience (inspired by modern Instagram / Threads standards) where a dynamic social media feed and a dedicated, full-height chat inbox coexist seamlessly without sacrificing conversational immediacy.

## Operating Context
Modern web and mobile-responsive browsers. Supports seamless dual-mode lighting (warm ivory daylight and obsidian dark mode). Desktop viewports provide balanced multi-column hierarchy; mobile viewports adapt with touch-first navigation and immersive full-screen chat drawers.

## Capabilities and Constraints
- Real-time 1-on-1 direct messaging powered by Socket.io, with media attachments, typing indicators, and audio alerts.
- Social feed supporting text-only and multi-media posts, interactive reactions, threaded comments, and saved post collections.
- User discovery, profile showcases, and follow/unfollow graph.
- Role-based administration portal (user management, spam controls).
- Pure CSS design token architecture (`--bg-main`, `--bg-card`, `--primary`, `--text-main`, etc.) without brittle third-party CSS dependencies.

## Brand Commitments
- Visual Aesthetic: Warm Editorial Craft.
  - Light Ground: Warm ivory (`#FAF7F2`) with subtle warm stone cards (`#FFFFFF`).
  - Dark Ground: Obsidian (`#121214`) with elevated slate cards (`#1C1B1F`).
  - Signature Accent: Terracotta (`#C25E3E`) and warm amber (`#D97736`).
  - Typography: Stone high-contrast text (`#292524` in light, `#EDEDED` in dark).
- Strict craft standards: No generic card grids inside cards, no neon text gradients, no unstyled system scrollbars, and real directional elevation.

## Product Principles
1. **Conversational Immediacy:** Chat interactions, message delivery, and feedback must feel fluid, tactile, and low-latency.
2. **Harmonious Co-existence:** Browsing the feed and continuing a conversation should never feel disconnected or jarring.
3. **Typographic Rhythm & Restraint:** Content and connections lead; chrome and borders stay subtle and supportive.
4. **Mechanical Craft Floor:** Flawless contrast (≥ 4.5:1), custom selection and scrollbars, and exponential ease-out motion (`cubic-bezier(0.16, 1, 0.3, 1)`).
