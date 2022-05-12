export default function toggleTheme(mode: boolean): void {
  //changes the theme colors
  if (process.browser) {
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty("--secondaryColorBg", mode ? "white" : "#191b1f");
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty("--mainColorBg", mode ? "lightgray" : "#1f2128");
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty("--mainColorText", mode ? "black" : "white");
  }
}
