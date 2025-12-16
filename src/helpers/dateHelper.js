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

export function formatDate_DD_MM_YYY(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString);

  // "en-GB" ensures the format is DD/MM/YYYY
  return date.toLocaleDateString("en-GB");
}

export function filterDataByDays(data, days) {
  if (!data) return [];
  // If days is 0, null, or undefined, return all data (All Time)
  if (!days || days === 0) return data;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return data.filter((item) => {
    // Assumes your DB has a 'created_at' field. Change this string if yours is different.
    const itemDate = new Date(item.created_at || item.createdAt);
    return itemDate >= cutoffDate;
  });
}
