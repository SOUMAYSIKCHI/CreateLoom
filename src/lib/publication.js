export function isPublished(date) {
  if (!date) return false;

  const publishDate = new Date(date);

  if (Number.isNaN(publishDate.getTime())) {
    return false;
  }

  return publishDate <= new Date();
}
