export const projectTypes = [
  "Digital product",
  "Web platform",
  "AI system",
  "Growth foundation",
  "Other",
] as const;

export const budgetRanges = [
  "€5k–€10k",
  "€10k–€25k",
  "€25k–€50k",
  "€50k+",
  "Not defined yet",
] as const;

export const launchWindows = [
  "As soon as possible",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Exploratory",
] as const;

export type ProjectEnquiry = {
  name: string;
  email: string;
  company: string;
  projectType: (typeof projectTypes)[number];
  budget: (typeof budgetRanges)[number];
  launchWindow: (typeof launchWindows)[number];
  message: string;
  website?: string;
};

export type ValidationErrors = Partial<Record<keyof ProjectEnquiry, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateProjectEnquiry(input: unknown): {
  data?: ProjectEnquiry;
  errors?: ValidationErrors;
} {
  if (!input || typeof input !== "object") {
    return { errors: { message: "Invalid submission." } };
  }

  const source = input as Record<string, unknown>;
  const data: ProjectEnquiry = {
    name: String(source.name ?? "").trim(),
    email: String(source.email ?? "").trim().toLowerCase(),
    company: String(source.company ?? "").trim(),
    projectType: String(source.projectType ?? "") as ProjectEnquiry["projectType"],
    budget: String(source.budget ?? "") as ProjectEnquiry["budget"],
    launchWindow: String(source.launchWindow ?? "") as ProjectEnquiry["launchWindow"],
    message: String(source.message ?? "").trim(),
    website: String(source.website ?? "").trim(),
  };

  const errors: ValidationErrors = {};
  if (data.name.length < 2 || data.name.length > 80) errors.name = "Enter your full name.";
  if (!emailPattern.test(data.email) || data.email.length > 160) errors.email = "Enter a valid email address.";
  if (data.company.length > 120) errors.company = "Company name is too long.";
  if (!projectTypes.includes(data.projectType)) errors.projectType = "Select a project type.";
  if (!budgetRanges.includes(data.budget)) errors.budget = "Select a budget range.";
  if (!launchWindows.includes(data.launchWindow)) errors.launchWindow = "Select a launch window.";
  if (data.message.length < 30 || data.message.length > 4000) errors.message = "Describe the project in 30–4000 characters.";

  return Object.keys(errors).length ? { errors } : { data };
}
