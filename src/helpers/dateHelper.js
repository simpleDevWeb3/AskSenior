import { formatDistanceToNowStrict } from "date-fns";

export function formatTimeAgo(dateUTC) {
  const commentDate = new Date(dateUTC);
  const timeAgo = formatDistanceToNowStrict(commentDate, { addSuffix: false });

  const [value, unit] = timeAgo.split(" ");
  console.log(value, unit);

  if (unit.startsWith("second")) return "now";
  if (unit.startsWith("minute")) return value + "m" + " ago";
  if (unit.startsWith("hour")) return value + "h" + " ago";
  if (unit.startsWith("day")) return value + "d" + " ago";
  if (unit.startsWith("month")) return value + "mo" + " ago";
  if (unit.startsWith("year")) return value + "y" + " ago";

  return timeAgo;
}
