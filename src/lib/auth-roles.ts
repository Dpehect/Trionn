export type AppRole = "admin" | "editor" | "viewer";

export const permissions = {
  admin: [
    "projects.read",
    "projects.write",
    "projects.publish",
    "projects.delete",
    "inquiries.read",
    "inquiries.write",
    "users.manage",
    "settings.manage",
  ],
  editor: [
    "projects.read",
    "projects.write",
    "inquiries.read",
    "inquiries.write",
  ],
  viewer: [
    "projects.read",
    "inquiries.read",
  ],
} satisfies Record<AppRole, string[]>;

export function can(role: AppRole, permission: string) {
  return permissions[role].includes(permission);
}
