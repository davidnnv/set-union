// Downloads the Unsplash photo into public/images/ (the other photos are already in the project).
// Run once: npm run images
// All photos are free under the Unsplash License (commercial use allowed, attribution appreciated).
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'public', 'images');

const PHOTOS = [
  { file: 'factory.jpg', id: 'SLIFI67jv5k', by: 'Ant Rozetsky' },
];

await mkdir(dir, { recursive: true });
for (const p of PHOTOS) {
  const out = join(dir, p.file);
  try { await access(out); console.log(`✓ ${p.file} (already there)`); continue; } catch {}
  const url = `https://unsplash.com/photos/${p.id}/download?force=true&w=1920`;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(out, Buffer.from(await res.arrayBuffer()));
    console.log(`✓ ${p.file} — photo by ${p.by} on Unsplash`);
  } catch (e) {
    console.log(`✗ ${p.file}: ${e.message}. Download manually: https://unsplash.com/photos/${p.id}`);
  }
}
