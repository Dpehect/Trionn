export const styleEdits = [
  {
    slug: "city-uniform",
    question: "Şehir için tek bir güçlü kombin nasıl kurarım?",
    title: "The City Uniform",
    answer: "Architect Coat, Frame Shirt ve Arc Runner ile hacmi sade tabanlara bağlayan üç parçalı bir sistem.",
    meta: ["3 parça", "2 renk", "Gün boyu"],
    products: ["architect-coat", "frame-shirt", "arc-runner"],
    statement: "Long proportions, a clean cotton layer and technical footwear create a repeatable urban uniform.",
  },
  {
    slug: "night-edit",
    question: "Gece için siyah ama düz olmayan bir görünüm?",
    title: "Night Texture",
    answer: "Night Field Jacket, Merino Column ve Night Trainer; mat, örgü ve reflektif yüzeyleri katmanlar.",
    meta: ["Tonal", "Reflektif", "Katmanlı"],
    products: ["night-field-jacket", "merino-column", "night-trainer"],
    statement: "The edit remains monochrome while surface, density and reflected light keep it dimensional.",
  },
  {
    slug: "soft-tailoring",
    question: "Rahat ama ciddi bir iş görünümü?",
    title: "Soft Tailoring",
    answer: "Soft Structure Blazer, Wide Pleat Trouser ve Frame Derby ile keskinlikten vazgeçmeden rahat bir siluet.",
    meta: ["Ofis", "Unisex", "Yumuşak yapı"],
    products: ["soft-structure-blazer", "wide-pleat-trouser", "frame-derby"],
    statement: "Unlined construction and a fluid trouser keep the formal silhouette responsive rather than rigid.",
  },
] as const;

export const styleEditBySlug = Object.fromEntries(styleEdits.map((edit) => [edit.slug, edit]));
