import type { Category } from "@/types";

/**
 * Storefront categories. These also seed the `categories` table in Supabase
 * (see /supabase/seed.sql) and act as the offline fallback content.
 */
export const categories: Category[] = [
  {
    id: "cat-seals-stamps",
    slug: "seals-stamps",
    name: "Seals & Stamps",
    tagline: "Leave your mark",
    description:
      "Laser-cut rubber stamps, self-inking stamps, wax seals and monogram brass seals — crisp, lasting impressions of your logo, signature or name.",
    icon: "Stamp",
    image: "/images/categories/seals-stamps.webp",
    sort: 1,
  },
  {
    id: "cat-apparel",
    slug: "apparel",
    name: "Custom Apparel",
    tagline: "Wear your idea",
    description:
      "Printed t-shirts, couple and family combos, panjabis and hoodies — your design, your colours, made to order in soft, breathable fabric.",
    icon: "Shirt",
    image: "/images/categories/apparel.webp",
    sort: 2,
  },
  {
    id: "cat-drinkware",
    slug: "drinkware",
    name: "Mugs & Bottles",
    tagline: "Sip something personal",
    description:
      "Photo mugs, colour-changing magic mugs and personalised steel bottles — printed with your photos, names or messages and built to last.",
    icon: "Coffee",
    image: "/images/categories/drinkware.webp",
    sort: 3,
  },
  {
    id: "cat-bags",
    slug: "bags",
    name: "Bags",
    tagline: "Carry your story",
    description:
      "Canvas totes, eco jute bags and personalised backpacks — printed for events, brands, gifts or everyday use, kind to the planet.",
    icon: "ShoppingBag",
    image: "/images/categories/bags.webp",
    sort: 4,
  },
  {
    id: "cat-gifts",
    slug: "gifts",
    name: "Personalised Gifts",
    tagline: "Make it unforgettable",
    description:
      "Photo frames, engraved keychains, name plates and gift hampers — thoughtful, one-of-a-kind keepsakes for every occasion.",
    icon: "Gift",
    image: "/images/categories/gifts.webp",
    sort: 5,
  },
  {
    id: "cat-stationery",
    slug: "stationery",
    name: "Business & Stationery",
    tagline: "Look the part",
    description:
      "Premium business cards, wedding invitations, notebooks and branded stationery — professionally designed and printed to impress.",
    icon: "FileText",
    image: "/images/categories/stationery.webp",
    sort: 6,
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
