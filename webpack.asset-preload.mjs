import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const baseUrl = process.env.WORDPRESS_URL;

if (!baseUrl) {
  throw new Error('WORDPRESS_URL environment variable is not defined');
}

function getUrl(path) {
  return `${baseUrl}${path}`;
}

let media = [];

(async function fetchMedia(offset = 0) {
  const url = getUrl(`/wp-json/wp/v2/media?per_page=5&offset=${offset}`);
  const res = await fetch(url);

  media = [...media, ...(await res.json())];
  const total = parseInt(res.headers.get('x-wp-total'));

  if (total > Object.keys(media).length) {
    return fetchMedia(Object.keys(media).length);
  }

  for (const k in media) {
    const src_url = media[k].source_url;
    const local_url = `./public/assets/${media[k].id}.gen.${src_url.split('.').pop()}`;
    const response = await fetch(src_url);

    if (!response.ok) {
      console.error(`Failed to download ${src_url}: ${response.statusText}`);
      continue;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.mkdirSync(path.dirname(local_url), { recursive: true });
    fs.writeFileSync(local_url, buffer);
  }
})();
