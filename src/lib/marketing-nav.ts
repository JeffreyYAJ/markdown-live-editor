export function navItemHref(item: string): string {
  switch (item.toUpperCase()) {
    case "HOME":
      return "/";
    case "DOCS":
      return "/docs";
    case "FEATURES":
      return "/#features";
    case "PRICING":
      return "/#features";
    case "COMMUNITY":
      return "/#features";
    case "GITHUB":
      return "https://github.com/kyler004/markdown-live-editor";
    default:
      return "/";
  }
}

export function isExternalNav(item: string): boolean {
  return item.toUpperCase() === "GITHUB";
}
