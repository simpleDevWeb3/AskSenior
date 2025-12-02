export function truncateText(text, maxLength = 40) {
  return text.length > maxLength
    ? text
        .split("")
        .splice(0, maxLength - 1)
        .concat("......")
    : text;
}
