// Inserts f_auto,q_auto transformation into a Cloudinary URL for fast mobile loading
export const optimizedUrl = (url, width = 600) => {
  if (!url) return '';
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
};
