# Pangarkar Prism Boutique

> **Tradition • Craft • Contemporary**

Pangarkar Prism Boutique is a responsive luxury fashion storefront for handcrafted collections, bespoke customization, appointment enquiries, and creative collaboration.

## Features

- Ready-made product catalogue with category filtering and product details.
- Bespoke customization studio with product type, silhouette, fabric, colour, sizing, budget, requirements, reference image upload, and contact validation.
- WhatsApp-first concierge flows for enquiries, appointments, customization requests, and checkout.
- Dedicated pages for the home experience, catalogue, customization studio, About Us, and contact appointments.
- Fashion design collaboration call-to-action for designers, stylists, textile artists, and other creative professionals.
- Local browser persistence for cart contents and owner-managed catalogue/site content.
- Responsive deep-green, ivory, and gold luxury visual system.
- SEO/AEO foundations including page metadata, Open Graph/Twitter cards, Organization and WebSite JSON-LD, robots.txt, and sitemap.xml.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Boutique home page and featured collections |
| `/catalogue` | Ready-made collection |
| `/customization` | Bespoke customization studio |
| `/about` | Brand story and heritage |
| `/contact` | Appointment and concierge enquiries |
| `/robots.txt` | Crawler rules |
| `/sitemap.xml` | Search engine sitemap |

## Tech stack

- [Next.js](https://nextjs.org/) 15 with the App Router
- [React](https://react.dev/) 18
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) icons
- CSS custom properties and utility classes for the boutique design system

## Requirements

- Node.js 18 or newer
- npm

## Local development

Install dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create a production build:

```bash
npm run build
```

Run the production build locally:

```bash
npm start
```

`npm run preview` is retained as an alias for `npm start`.

## Configuration

Public site content and contact settings are defined in [`src/data/siteConfig.ts`](./src/data/siteConfig.ts). The WhatsApp and phone number are currently configured as `9892924721`. The official email is intentionally left blank until it is supplied.

For production metadata, set the canonical site URL:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

This value is used for `metadataBase`, canonical asset URLs, and social metadata. Do not commit credentials or private customer data.

## Content and data

- Product catalogue data: [`src/data/products.ts`](./src/data/products.ts)
- Site and contact configuration: [`src/data/siteConfig.ts`](./src/data/siteConfig.ts)
- Shared types: [`src/types.ts`](./src/types.ts)
- App shell and commerce state: [`src/App.tsx`](./src/App.tsx)
- Next.js route entry points: [`app/`](./app/)

The owner mode editor is available through the existing admin query/hash flow and stores edits in browser `localStorage`; it is not a server-backed CMS.

## Validation

Run the production build before deployment:

```bash
npm run build
```

The build statically validates the application routes, metadata routes, and TypeScript types.

## License

This project is proprietary and crafted for Pangarkar Prism Boutique. All rights reserved.
