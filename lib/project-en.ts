export type ProjectEnglish = {
  title: string;
  summary: string;
  tags: string[];
  features: string[];
  gallery: { alt: string; caption: string }[];
  body: string;
};

/** English case-study copy. Vietnamese stays in content/projects/*.mdx. */
export const PROJECT_EN: Record<string, ProjectEnglish> = {
  "ban-ve-live-show": {
    title: "Live-show ticketing",
    summary:
      "A full ticketing platform for one live show: an event and checkout site, a CRM for the organizer, and a backend for orders, payment, QR tickets, check-in, and invoices. The show name is not on this page.",
    tags: ["Tickets", "CRM"],
    features: [
      "Bilingual event landing, dark interface, line-up, FAQ, and sponsor logos",
      "Seat selection on a map by ticket tier, a hold countdown, and sign-in",
      "QR bank transfer, reconciliation by webhook, and an emailed ticket with a QR code",
      "Check-in by scanning a QR code, plus check-in stats",
      "Organizer CRM: events, tickets, orders, payments, coupons, bulk email, organizations, and users",
      "Multi-tenant backend, queues, PDF and QR files, and an invoicing module",
    ],
    gallery: [
      { alt: "Abstract illustration of an event ticket", caption: "Ticket" },
      { alt: "Abstract illustration of a checkout step", caption: "Checkout" },
      { alt: "Abstract illustration of a ticketing operations board", caption: "Operations" },
    ],
    body: "Three parts run together: a page for the audience, a portal for the organizer, and an order backend.\n\nBank-transfer reconciliation in the code goes through a SePay webhook. Other gateways without an SDK in the dependencies are not listed here.\n\nTicket count, number of nights, and event photos: Coming soon.",
  },
  "ban-ve-su-kien": {
    title: "Event ticketing",
    summary:
      "One deployment of the ticketing platform for a single event. The notes in the repo were copied from the original platform, so what the event was is not recorded here.",
    tags: ["Tickets"],
    features: [
      "Landing, ticket selection, and a seat map",
      "Sign-in through a shared login gateway",
      "Payment by webhook, ticket email, and QR check-in",
      "Dashboard for orders, users, and settings",
      "A public page that opens the event",
    ],
    gallery: [
      { alt: "Abstract illustration of one event's ticket", caption: "Ticket" },
      { alt: "Abstract illustration of a seating chart", caption: "Seating chart" },
      { alt: "Abstract illustration of an order list", caption: "Order list" },
    ],
    body: "Same family as the studio's ticketing platform, deployed for one event. This page does not name the event.\n\nWhether it was a show, an artist, or a brand, and the date and ticket count: Coming soon.",
  },
  "brand-package-crm": {
    title: "Brand Package CRM",
    summary:
      "An internal console and a single source for brands. Many brands, each with packages, branches, and released versions. Downstream sites pull a package through a public API with a token.",
    tags: ["Brand", "API"],
    features: [
      "Brand, package, and branch: identity, site layout, products, notices, and differences between versions",
      "Versioned releases, a JSON package that does not change after release, and a release channel",
      "Consumer sites, scoped API keys, webhooks, and a test send",
      "A public API for the manifest, docs, and a place to try a call inside the app",
      "Permissions, an audit log, and a request log",
    ],
    gallery: [
      { alt: "Abstract illustration of a brand and package tree", caption: "Brand and package" },
      { alt: "Abstract illustration of a version list", caption: "Versions" },
      { alt: "Abstract illustration of an API docs page", caption: "API docs" },
    ],
    body: "This tool keeps the studio's brands in one place, and other sites pull a released version.\n\nThe external name, and which brands have actually called the API: Coming soon.",
  },
  "crm-van-phong-luat": {
    title: "Law-firm CRM",
    summary:
      "A CRM for a law firm. Clients and leads, contracts, services, money from contract to payment and invoice, notifications, and a dashboard. The client's name is not on this page.",
    tags: ["CRM"],
    features: [
      "Screens for the dashboard, clients, services, orders, payments, and invoices",
      "Email, expense approval, payroll, notifications, users, and permissions",
      "A modular backend: identity, clients, legal, services, finance, communication, and system",
      "Sign-in first, then permissions and a policy per resource",
      "A few metrics exported to a phone widget",
      "File upload and email sending",
    ],
    gallery: [
      { alt: "Abstract illustration of a CRM client table", caption: "Clients" },
      { alt: "Abstract illustration of a contract list", caption: "Contracts" },
      { alt: "Abstract illustration of an operations chart", caption: "Operations" },
    ],
    body: "This system is for one law firm, not a public product of the studio. This page does not name the client.\n\nThe interface README calls the frontend a mockup. The backend has a vertical slice for clients. Whether the live build is still the mock or is wired to the backend, and the project's internal name: Coming soon.",
  },
  "cua-hang-in-3d": {
    title: "3D print shop",
    summary:
      "A shop for 3D-printed products, storefront and admin in one repo. An order moves from awaiting payment, to paid, to processing, to printing, to delivered. There is an order lookup page, an email center, and reports.",
    tags: ["Shop"],
    features: [
      "Search, a product page with variants, a synced cart, sign-in, order history, and order lookup",
      "QR bank transfer, a countdown, and a status refresh; custom orders can be cash on delivery or pay later",
      "Admin: metrics, orders as a list and a drag-and-drop board, customers, and custom orders",
      "Email center: templates, campaigns, and a log",
      "Counter sales, profit and loss, cost campaigns, and order labels",
      "A thank-you page via a tap card, and a signed link that resists tampering",
    ],
    gallery: [
      { alt: "Abstract illustration of a shop product grid", caption: "Products" },
      { alt: "Abstract illustration of an orders page", caption: "Orders" },
      { alt: "Abstract illustration of shop content blocks", caption: "Content" },
    ],
    body: "The shop and the admin live in one codebase. An order has a clear path from waiting for payment to delivery.\n\nWhich brand this shop belongs to, and how many real orders it has had: Coming soon.",
  },
  "cuon-album": {
    title: "Cuốn Album",
    summary:
      "A tool for tagging people in photos. Step through each photo, pick an avatar, and get suggestions from earlier tags. The gallery filters by person, selects many photos, and downloads them at once.",
    tags: ["Photos"],
    features: [
      "Tagging page: move between photos with the keyboard, avatar suggestions, and a progress bar",
      "Gallery: search, filter by avatar, multi-select, and a bulk download with feedback",
      "Saved in the browser and as JSON through an API, with JSON export",
      "Dark interface, usable on a small screen",
    ],
    gallery: [
      { alt: "Abstract illustration of stacked photo frames", caption: "Photo set" },
      { alt: "Abstract illustration of a photo grid", caption: "Photo grid" },
      { alt: "Abstract illustration of a filter list", caption: "Filters" },
    ],
    body: "Cuốn Album marks who appears in each photo, then filters and downloads by person.\n\nWhich occasion the album was for, and whether it was client work: Coming soon. This page does not use photos of real people.",
  },
  "fitting-lab": {
    title: "Fitting Lab",
    summary:
      "An AI virtual try-on storefront. It compares two integrations: a third-party widget, and realtime try-on through the camera. A demo sales platform creates a room per brand, sends a link, and shows leads.",
    tags: ["AI", "Try-on"],
    features: [
      "Realtime try-on through the camera, changing outfits without reconnecting",
      "A short-lived token issued by the server; the real key never reaches the browser",
      "A demo mode when there is no key, labeled on screen",
      "Admin creates a brand and a demo room, publishes products, shares a tracked link, and reviews stats and leads",
      "A shopper's photo stays in the browser and is not stored on the server",
    ],
    gallery: [
      { alt: "Abstract illustration of a try-on frame", caption: "Try-on frame" },
      { alt: "Abstract illustration of a product grid", caption: "Products" },
      { alt: "Abstract illustration of a results layout", caption: "Results layout" },
    ],
    body: "Fitting Lab is for trying clothes on virtually, and for sending a prospect a demo room built around their brand.\n\nThe repo does not name one client. Which mode is on in the live build, and which brands have been demoed: Coming soon.",
  },
  "game-kiosk": {
    title: "Game kiosk",
    summary:
      "An offline game kiosk for one event booth. Players control it with a webcam, and play does not need a network. There are Windows and macOS builds, three stages each. The name of the booth's host is not on this page.",
    tags: ["Game", "Offline"],
    features: [
      "Runs offline after the package is copied, and opens with one press",
      "Camera control, one person in frame",
      "A waiting screen, booth layout instructions, and error handling",
      "A download page for the Windows and macOS builds",
    ],
    gallery: [
      { alt: "Abstract illustration of a play screen", caption: "Play screen" },
      { alt: "Abstract illustration of a game download page", caption: "Download page" },
      { alt: "Abstract illustration of booth layout instructions", caption: "Booth layout" },
    ],
    body: "A kiosk for one event booth. The public repo only has the download page and the instructions. The game source is not in that repo.\n\nThe technology inside the game, the event date, play counts, and gameplay video: Coming soon.",
  },
  "howls-studio": {
    title: "Howl Studio website",
    summary:
      "A studio site in two phases. The first talked about the studio and the products in progress. The later one became a gallery of interactive games controlled by hand and body, with no controller.",
    tags: ["Website"],
    features: [
      "Bilingual landing, a 3D background, and a projects page",
      "An internal tool that scans a QR code, compares two documents, and exports a report",
      "A project grid filtered by kind of interaction, with video cells",
      "Five games listed: Jump Jump, Hand Hockey, 3D Naked Eye, Live Puzzle, Lucky Draw",
    ],
    gallery: [
      { alt: "Abstract illustration of a studio intro page", caption: "Studio page" },
      { alt: "Abstract illustration of a project grid", caption: "Project grid" },
      { alt: "Abstract illustration of a motion band", caption: "Motion" },
    ],
    body: "Two versions, one after the other. The first introduced the studio and the ticketing product. The later one is a cabinet of motion-controlled games.\n\nLogos and photos that belong to clients are not on this page. Whether each game has its own page: Coming soon.",
  },
  howlsos: {
    title: "HowlsOS",
    summary:
      "A sales and proposal system for the studio. The open build is a clickable prototype on sample data, with no backend yet. The spec aims at many tenants and permissions per project.",
    tags: ["Sales", "Proposals"],
    features: [
      "Revenue dashboard: pipeline, collected and forecast, win rate, charts, and work coming due",
      "A drag-and-drop pipeline from lead to won or lost; each deal has a next step and a due date",
      "A proposal composer for scope, schedule, and pricing, plus a public proposal page",
      "Clients, contracts, and payment milestones",
      "Projects, members, roles, and an email log",
    ],
    gallery: [
      { alt: "Abstract illustration of a sales dashboard", caption: "Dashboard" },
      { alt: "Abstract illustration of a proposal composer", caption: "Proposal composer" },
      { alt: "Abstract illustration of an opportunity list", caption: "Opportunity list" },
    ],
    body: "HowlsOS puts the studio's pipeline, proposals, and contracts in one place. The live build is a prototype: sample data, no backend yet.\n\nThe items above follow the spec. Which screens actually run on the open build: Coming soon.",
  },
  howlsticket: {
    title: "Howlsticket",
    summary:
      "An admin portal for event organizers, under the Howlsticket name. The frontend calls an external API. It ships with a shared Google sign-in gateway for several ticket sites.",
    tags: ["Tickets", "Admin"],
    features: [
      "A dashboard per event: revenue, tickets by type, check-in, charts, and recent orders",
      "E-invoices: issue one or a batch, retry, a timeline, PDF and XML download, and a log",
      "Email and password sign-in, token refresh, permissions, two languages, and a dark interface",
      "A central Google sign-in gateway, one redirect for many domains, blocking unexpected redirects",
    ],
    gallery: [
      { alt: "Abstract illustration of an admin sign-in", caption: "Sign in" },
      { alt: "Abstract illustration of an event metrics table", caption: "Event metrics" },
      { alt: "Abstract illustration of an operations list", caption: "Operations list" },
    ],
    body: "Howlsticket is the studio's product for event organizers. Order and buyer data belong to each event's client, so this page names no client and has no operations photos.\n\nSome screens in the docs are still empty: orders, marketing, and the check-in report. Channel revenue in the docs is sample data. How much of it actually runs: Coming soon.",
  },
  "landing-giai-chay": {
    title: "Race landing",
    summary:
      "A landing page for a running race, built on an existing ticketing codebase. A 3D background, motion on scroll, and four distances. The repo still has the original platform's ticket purchase, check-in, and dashboard.",
    tags: ["Tickets", "Landing"],
    features: [
      "Race page: a 3D opener, an intro, four distance cards, a gallery, and a registration call to action",
      "Smooth scroll and animation as sections enter view",
      "Inherited from the ticketing platform: ticket purchase, payment webhook, ticket email, QR check-in, and a dashboard",
    ],
    gallery: [
      { alt: "Abstract illustration of a race page rhythm", caption: "Page rhythm" },
      { alt: "Abstract illustration of distance cards", caption: "Distances" },
      { alt: "Abstract illustration of an intro layout", caption: "Intro" },
    ],
    body: "This page is an introduction laid over a ticketing system that already existed. The four distances recorded in the repo are 5K, 10K, 21K, and 42K.\n\nThe README lists a real registration form and a real countdown as not done yet. Whether the race happened, and whether the ticketing half was used for real: Coming soon.",
  },
  "man-led-su-kien": {
    title: "Event LED screen",
    summary:
      "A realtime app for an internal event. A guest picks a name on a tablet in front of the stage, and the LED screen shows that name in motion, the number of days together, and that person's message.",
    tags: ["Events", "Realtime"],
    features: [
      "A tablet entry page, name suggestions, fullscreen, and a way to send the name to the main screen",
      "A fullscreen show page with a 3D and video background, and a connection-status dot",
      "Realtime sync of one shared state",
      "An admin list of people, spreadsheet import, and a message composer",
    ],
    gallery: [
      { alt: "Abstract illustration of a name-entry screen", caption: "Entry screen" },
      { alt: "Abstract illustration of blocks on a show screen", caption: "Show screen" },
      { alt: "Abstract illustration of an admin layout", caption: "Admin" },
    ],
    body: "Someone in front of the stage picks a name. The large screen changes to that person immediately.\n\nThis page does not name the organizer or the guests. The date, the scale, and photos from the room: Coming soon.",
  },
  "personal-os": {
    title: "Personal OS",
    summary:
      "A personal operating system for the person running the studio. Tasks, time, money, relationships, and notes in one Postgres, opened through a versioned REST API. The live build is in Demo mode on sample data.",
    tags: ["Personal tools"],
    features: [
      "Tasks: filter, sort, change status, a drag-and-drop board, today, and projects",
      "A REST API for projects and tasks, with validation, pagination, and a health route",
      "A metrics dashboard, the day's calendar, progress, and an activity stream",
      "A desktop-style app shell, a command palette, and light and dark interfaces",
      "Two modes: an in-memory demo, or Supabase with owner sign-in and an append-only log",
      "Calendar, finance, relationships, inbox, and notes are read-only previews",
    ],
    gallery: [
      { alt: "Abstract illustration of task blocks in Personal OS", caption: "Tasks and projects" },
      { alt: "Abstract illustration of a notes area", caption: "Notes" },
      { alt: "Abstract illustration of a calendar grid", caption: "Calendar" },
    ],
    body: "Personal OS is a personal data layer for the person running the studio, starting with tasks. The open build uses sample data.\n\nThe layer an AI assistant would read and write, and the API keys: Coming soon.",
  },
  "virtual-visit-lite": {
    title: "Virtual Visit Lite",
    summary:
      "The first MVP of Virtual Visit: a short Apple-style landing. A guest enters a name and is sent to a 2D space on ZEP. The app has no backend, database, or sign-in.",
    tags: ["Landing", "Virtual space"],
    features: [
      "A name form with validation, a waiting state, and a message for screen readers",
      "Hands off to a configured ZEP space, and reports that it cannot be used if the address is invalid",
      "A CSS preview of the space that changes as the name is typed",
      "A light interface that respects reduced motion",
    ],
    gallery: [
      { alt: "Abstract illustration of a name-entry page", caption: "Name page" },
      { alt: "Abstract illustration of intro blocks", caption: "Intro blocks" },
      { alt: "Abstract illustration of a doorway into a space", caption: "Doorway" },
    ],
    body: "Virtual Visit Lite is the door before the self-hosted build: a landing, a name field, then a 2D space that ZEP runs. The space itself is not in this app.\n\nWhether it shares one page with Virtual Visit or stays separate: Coming soon.",
  },
  "virtual-visit": {
    title: "Virtual Visit",
    summary:
      "A self-hosted virtual space. A guest enters a name, joins a room, and walks a 2D studio map with everyone else, seeing avatars, names, and who is online in realtime. It does not depend on ZEP. Without Supabase configuration, the app falls back to a local demo mode.",
    tags: ["Virtual space", "Realtime"],
    features: [
      "A private room per URL, a copyable invite link, and a list of who is present",
      "An office map with Lounge, Cinema, Café, and Arcade; move with keys or a joystick, and jump",
      "Proximity chat, Vietnamese typing, and emoji",
      "A Cinema area that plays YouTube in sync for everyone in that area",
      "A Pattern Memory mini-game with a leaderboard",
      "Realtime through Supabase Broadcast and Presence, with a local demo mode",
    ],
    gallery: [
      { alt: "Abstract illustration of avatars in Virtual Visit", caption: "Avatars and people in the room" },
      { alt: "Abstract illustration of zones on a studio map", caption: "Zones on the map" },
      { alt: "Abstract illustration of a mini-game in the space", caption: "Mini-game" },
    ],
    body: "Virtual Visit is the studio's self-hosted virtual space. A guest enters a name and joins a room on a 2D map, seeing avatars and who is online.\n\nThe app does not depend on ZEP. Without Supabase configuration, it runs a demo on the machine.\n\nCamera and voice are not built. Where it has been used outside the lab, and real demo photos: Coming soon.",
  },
  takico: {
    title: "Takico",
    summary:
      "A kiosk interface for a gesture game. The repo README describes five screens: waiting, how-to, play, lose, and win. The live page shows the labels waiting, play, lose, and win.",
    tags: ["Game"],
    features: [
      "Waiting, how-to, play, lose, and win screens, as listed in the repo README",
      "Crouch to charge and stand to release; the UI stand-in is the Space key and a press-and-hold",
      "A 3D character through model-viewer, on a street background",
      "JSX runs in the browser, with no build step",
    ],
    gallery: [],
    body: "Takico is the interface layer for a kiosk game. The player crouches to build momentum, then stands to release it. The repo README lists five screens: waiting, how-to, play, lose, and win. The live page shows four labels: waiting, play, lose, and win.\n\nThe UI currently simulates input with the Space key and with a press-and-hold. The README says a motion engine only has to call two functions, press and release. The 3D character is attached with model-viewer. JSX is compiled in the browser with Babel, with no build step.\n\nThe client name is in the README. This page does not repeat it.",
  },
  "mb-life-photobooth": {
    title: "MB Life Photobooth",
    summary:
      "The opening page is a Photobooth menu with three ways in: an iPad code screen, an LED screen, and an admin list. The README describes the iPad sending a name to Supabase and the LED showing that name with years together.",
    tags: ["Events"],
    features: [
      "An opening menu with three links: iPad, LED, and admin",
      "The iPad enters or picks a name, with suggestions from the list",
      "The LED receives a realtime state and shows the name with years together",
      "The LED background uses Three.js",
    ],
    gallery: [],
    body: "The live page opens on a dark menu titled Photobooth. The three items go to an iPad employee-code screen, an LED stage screen, and an admin list.\n\nThe repo README describes the flow behind that menu. A participant enters a name on the iPad. The app matches the name to an employee table in Supabase, writes one shared state, and the LED shows an animation of the name and the years together. The LED background uses Three.js. The repo does not record an event date or a headcount.",
  },
  "mb-life-lucky-draw": {
    title: "MB Life Lucky Draw",
    summary:
      "A dark opening page with the event title and two buttons: open the LED screen, open the admin page. The repo named in the Drive doc is not publicly readable from here.",
    tags: ["Events"],
    features: [
      "The event title on the opening page",
      "A button that opens the LED screen",
      "A button that opens the admin page",
    ],
    gallery: [],
    body: "The Drive doc lists the repo and the demo link. The demo opens on a dark page with the event title and two buttons: open the LED screen, and open the admin page.\n\nThe repo is not readable from here, so how the draw works behind those two links is not recorded on this page.",
  },
  pendiasure: {
    title: "Pendiasure",
    summary:
      "The live page is a seminar registration form. The page title is PediaSure. A visitor enters a name or a store name, then confirms. The repo is not publicly readable from here.",
    tags: ["Registration"],
    features: [
      "A form on the opening page of the seminar",
      "A field for a name or a store name",
      "A confirm button on the same page",
    ],
    gallery: [],
    body: "The Drive doc lists the Trinity-Abbott repo and the demo link. The live page is titled PediaSure and is a seminar registration form. A visitor enters a name or a store name, then confirms.\n\nThe repo is not readable from here, so the steps after the confirm button are not recorded on this page.",
  },
  "jump-jump": {
    title: "Jump Jump",
    summary:
      "A mic-catching jump game that opens on a waiting screen. It includes stand, crouch, and jump instructions. With no camera, the page tells the visitor to use the keyboard. The repo is not publicly readable from here.",
    tags: ["Game"],
    features: [
      "A waiting screen with a catch-the-mic line",
      "Instructions to stand on a platform, crouch to charge, and stand up to launch",
      "With no camera, use the keyboard; Space starts a run",
      "The page loads a pose-detection library",
    ],
    gallery: [],
    body: "The Drive doc lists the micatcher-jump-jump repo and the demo link. The demo opens on a waiting screen, with the line about catching the mic and catching the moment. The same page includes instructions: stand, crouch to charge, and stand up to launch.\n\nWhen the browser has no camera, the page says to use the keyboard. Space starts a run. The app is Next.js and loads a pose-detection library. The repo is not readable from here.",
  },
  "live-puzzle": {
    title: "Live Puzzle",
    summary:
      "The Drive doc lists the same repo and the same demo link as Jump Jump. That demo is the jump game. It has no /puzzle page and no puzzle mode in the bundle that is running.",
    tags: ["Game"],
    features: [
      "The Drive doc points at the Jump Jump demo",
      "The paths /puzzle and /live-puzzle return not found",
      "The bundle of the live page does not contain the word puzzle",
    ],
    gallery: [],
    body: "The Live Puzzle entry in the Drive doc uses the same GitHub address and the same demo link as Jump Jump. That demo opens on the waiting screen of the jump game.\n\nThe path /puzzle redirects and then returns not found. The path /live-puzzle is also not found. The JavaScript bundle of the live page does not contain the word puzzle, so this page does not attach a demo link.",
  },
};

export function englishProject(slug: string) {
  return PROJECT_EN[slug];
}
