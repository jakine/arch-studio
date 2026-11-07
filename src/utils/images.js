// Project pictures, processed at build time by vite-imagetools into
// responsive AVIF/WebP sets plus a 1×1 inline placeholder: the photo's
// average colour, shown flat until the photo loads.
// imagetools never upscales: smaller sources stop at their own width.
const pictures = import.meta.glob('../assets/project_pictures/*/*.png', {
  eager: true,
  import: 'default',
  query: '?w=480;960;1280&format=avif;webp&quality=72&as=picture',
});

const placeholders = import.meta.glob('../assets/project_pictures/*/*.png', {
  eager: true,
  import: 'default',
  query: '?w=1&h=1&fit=cover&format=png&inline',
});

const FOLDER = '../assets/project_pictures/';

/**
 * Get a processed project picture by its folder/name key, e.g. 'tower/p1'.
 * A missing picture logs an error and returns null instead of breaking the page.
 * @returns {{ sources: Record<string, string>, img: { src: string, w: number, h: number }, placeholder: string } | null}
 */
export const getImage = (key) => {
  const path = `${FOLDER}${key}.png`;
  const picture = pictures[path];

  if (!picture) {
    console.error(`Missing project image: ${key} (expected src/assets/project_pictures/${key}.png)`);
    return null;
  }

  return { ...picture, placeholder: placeholders[path], key };
};

/**
 * Every picture in a project's folder, in name order (p1, p2 … p10). Adding or
 * removing files in the folder is all it takes to change a project's photos.
 */
export const getProjectImages = (folder) => Object.keys(pictures)
  .filter((path) => path.startsWith(`${FOLDER}${folder}/`))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path) => getImage(path.slice(FOLDER.length, -'.png'.length)));
