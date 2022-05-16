export default function toggleTheme(mode: boolean): void {
  //changes the theme colors
  if (process.browser) {
    //light,dark
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty("--secondaryColorBg", mode ? "white" : "#191b1f");
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty("--mainColorBg", mode ? "lightgray" : "#1f2128");
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty("--mainColorText", mode ? "black" : "white");
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty(
        "--linkColor",
        mode ? "#329BE7" : "rgb(147, 197, 253)"
      );
    document
      .querySelector<HTMLInputElement>(":root")
      ?.style.setProperty(
        "--linkColorHover",
        mode ? "#1869EF" : "rgb(59, 130, 246)"
      );
  }
}
