import type { Product } from "@/types/commerce";

const palette = [
  { name: "Ink", value: "#171716" },
  { name: "Bone", value: "#e8e0d4" },
  { name: "Signal", value: "#dfff38" },
];

const clothingSizes = ["XS", "S", "M", "L", "XL"];
const shoeSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44"];

const base = [
  ["architect-coat", "Architect Coat", "Clothing", "Outerwear", "FORM / 01", 6990, "A long architectural coat with controlled volume and a clean shoulder line."],
  ["folded-wool-jacket", "Folded Wool Jacket", "Clothing", "Outerwear", "NIGHT STUDY", 5690, "Compact wool construction shaped around a folded collar and cropped proportion."],
  ["studio-overshirt", "Studio Overshirt", "Clothing", "Shirts", "PERMANENT", 2990, "A structured overshirt made for layering, movement and year-round utility."],
  ["contour-knit", "Contour Knit", "Clothing", "Knitwear", "FORM / 01", 3290, "A dense knit with a sculpted neckline and soft engineered stretch."],
  ["column-trouser", "Column Trouser", "Clothing", "Trousers", "NIGHT STUDY", 3490, "Wide straight trousers with a long break and controlled drape."],
  ["soft-structure-blazer", "Soft Structure Blazer", "Clothing", "Tailoring", "PERMANENT", 6490, "Unlined tailoring with a relaxed shape and precise internal construction."],
  ["frame-shirt", "Frame Shirt", "Clothing", "Shirts", "FORM / 01", 2590, "Crisp cotton with an elongated cuff and a framed front placket."],
  ["merino-column", "Merino Column", "Clothing", "Knitwear", "NIGHT STUDY", 3790, "Fine merino knit designed as a clean vertical layer."],
  ["wide-pleat-trouser", "Wide Pleat Trouser", "Clothing", "Trousers", "PERMANENT", 3690, "Double-pleat trousers with a fluid leg and adjustable waist tab."],
  ["utility-scarf", "Utility Scarf", "Accessories", "Accessories", "FORM / 01", 1290, "A generous technical scarf that shifts between wrap, hood and shoulder layer."],
  ["quiet-hoodie", "Quiet Hoodie", "Clothing", "Knitwear", "NIGHT STUDY", 2890, "Heavyweight loopback cotton with concealed seams and a sculpted hood."],
  ["night-field-jacket", "Night Field Jacket", "Clothing", "Outerwear", "PERMANENT", 5890, "A modular field jacket with removable storage and a matte weather shell."],
  ["arc-runner", "Arc Runner", "Shoes", "Sneakers", "FOOTWORK / 01", 4490, "A lightweight runner built around an arched sole and layered technical upper."],
  ["pulse-low", "Pulse Low", "Shoes", "Sneakers", "FOOTWORK / 01", 3990, "Low-profile court construction sharpened with a contrast pulse line."],
  ["frame-derby", "Frame Derby", "Shoes", "Formal Shoes", "PERMANENT", 5190, "A squared derby with a cushioned rubber frame and polished leather upper."],
  ["studio-boot", "Studio Boot", "Shoes", "Boots", "NIGHT STUDY", 6490, "A tall studio boot with a soft shaft, reinforced toe and graphic outsole."],
  ["fold-mule", "Fold Mule", "Shoes", "Mules", "FORM / 01", 3790, "A folded leather mule balanced on a flexible sculpted sole."],
  ["night-trainer", "Night Trainer", "Shoes", "Sneakers", "NIGHT STUDY", 4690, "A dark technical trainer with responsive cushioning and reflective details."],
] as const;

export const products: Product[] = base.map((item, index) => {
  const [slug, name, category, type, collection, price, description] = item;
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `tr-${number}`,
    slug,
    name,
    category,
    type,
    collection,
    price,
    compareAtPrice: index % 7 === 1 ? price + 1100 : undefined,
    image: `/products/product-${number}-a.svg`,
    alternateImage: `/products/product-${number}-b.svg`,
    description,
    material: category === "Shoes" ? "Leather and technical textile upper. Rubber outsole." : "Premium cotton, wool and technical blends selected by style.",
    fit: category === "Shoes" ? "Fits true to size. Half sizes should size up." : "Relaxed unisex fit. Choose your regular size.",
    colors: palette,
    sizes: category === "Shoes" ? shoeSizes : clothingSizes,
    badges: index < 4 ? ["New"] : index % 5 === 0 ? ["Limited"] : [],
    featured: index < 8 || index >= 12,
  };
});

export const productBySlug = Object.fromEntries(products.map((product) => [product.slug, product])) as Record<string, Product>;
export const featuredProducts = products.filter((product) => product.featured);

export const collections = [
  { slug: "new-arrivals", title: "New arrivals", description: "Fresh tailoring, knitwear and footwear for the current edit.", filter: "All", accent: "#dfff38" },
  { slug: "clothing", title: "Clothing", description: "Architectural layers, shirts and trousers with quiet utility.", filter: "Clothing", accent: "#e76f51" },
  { slug: "shoes", title: "Footwear", description: "Sneakers, boots and formal shoes shaped for daily movement.", filter: "Shoes", accent: "#b8a7ff" },
  { slug: "night-study", title: "Night Study", description: "Dark tonal pieces with reflective and tactile details.", filter: "NIGHT STUDY", accent: "#8df0d1" },
  { slug: "form-01", title: "Form / 01", description: "Volume, structure and high-contrast accents.", filter: "FORM / 01", accent: "#ffd36e" },
  { slug: "accessories", title: "Objects", description: "Scarves and compact additions that complete the silhouette.", filter: "Accessories", accent: "#f0a3c2" },
] as const;

export function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(value);
}
