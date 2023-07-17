export default function toggleTheme(): void {
  if (process.browser) {
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty("--secondaryColorBg", "#191b1f");
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty("--mainColorBg", "#1f2128");
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty("--mainColorText", "white");
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty("--linkColor", "rgb(147, 197, 253)");
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty("--linkColorHover", "rgb(59, 130, 246)");
  }
}
