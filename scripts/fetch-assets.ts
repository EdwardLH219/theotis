/*
 * Mirrors photographs and logos from the legacy Wix CDN into public/.
 * Run: `pnpm fetch-assets`
 *
 * The script is idempotent — it skips files that already exist on disk.
 * The downloaded JPEGs/PNGs are served from our own domain in production,
 * not via Wix, which is what next/image expects.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

interface Asset {
  url: string;
  dest: string;
}

const STRIP_TRANSFORM = (url: string) =>
  // Wix URLs include a `/v1/fill/...` transform segment; drop it to fetch
  // the original asset at its native size.
  url.replace(/\/v1\/fill\/[^/]+\/[^?]*/, "");

const assets: Asset[] = [
  // Brand
  {
    url: "https://static.wixstatic.com/media/c24933_c39516dfbd6143c898ba04bd09be4737~mv2.png/v1/fill/w_400,h_400/TMLP%20Print%20LOGO%202025.png",
    dest: "public/brand/tmlp-logo.png",
  },

  // Hero & partners
  {
    url: "https://static.wixstatic.com/media/c24933_1d4aa78a0846483699f3239e2e9c8114~mv2.jpg/v1/fill/w_2400,h_2500/_FFM7051-Edit.jpg",
    dest: "public/images/_FFM7051-Edit.jpg",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_62456a1395ca46a38cd78b18825847c9~mv2.jpg/v1/fill/w_2000,h_1500/_FFM7070-Edit.jpg",
    dest: "public/images/_FFM7070-Edit.jpg",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_b38dfffb52924aeda1db0d391ae24d6f~mv2.jpg/v1/fill/w_2000,h_1500/_FFM6996-Edit.jpg",
    dest: "public/images/_FFM6996-Edit.jpg",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_0eb216a60d214e9d968878785f7fc0d9~mv2.jpg/v1/fill/w_2000,h_1500/_FFM7033-Edit.jpg",
    dest: "public/images/_FFM7033-Edit.jpg",
  },

  // Lawyer portraits
  {
    url: "https://static.wixstatic.com/media/c24933_29e5c1f5ea274bf1a8cc6937e22f001a~mv2.jpg/v1/fill/w_1200,h_1600/_FFM6904-Edit.jpg",
    dest: "public/images/people/anne-desiree-armanda-theotis.jpg",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_6b8b80b8a7184a5e99985ecb5a189021~mv2.jpg/v1/fill/w_1200,h_1600/Joy.jpg",
    dest: "public/images/people/joy-rachel-mutemi-mondoka.jpg",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_33421e99c3ad4e71bf3266c7680fd45a~mv2.jpg/v1/fill/w_1200,h_1600/Natasha.jpg",
    dest: "public/images/people/natasha-mutambo.jpg",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_1112974de09c40dfb99c7598147121c2~mv2.jpg/v1/fill/w_1200,h_1600/_FFM6464-Edit.jpg",
    dest: "public/images/people/ethel-thelma-changufu.jpg",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_556e71b2be714c3b9968462618a26cdb~mv2.jpg/v1/fill/w_1200,h_1600/_FFM6345-Edit.jpg",
    dest: "public/images/people/melissa-phiri.jpg",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_db5f61512c604e6a95387c1ae498f357~mv2.jpg/v1/fill/w_1200,h_1600/_FFM6385-Edit.jpg",
    dest: "public/images/people/nandi-lourna-moyo.jpg",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_499ac74de4eb4a7ab1c14c504aea0778~mv2.png/v1/fill/w_1200,h_1600/Thokozile.png",
    dest: "public/images/people/thokozile-neeta.png",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_6d906e8b7c824f68ae495897f37c883d~mv2.jpg/v1/fill/w_1200,h_1600/DSC_4546.jpg",
    dest: "public/images/people/francis-mwewa.jpg",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_453761f152c244f19e8372af4da48db1~mv2.jpg/v1/fill/w_1200,h_1600/_FFM6589-Edit.jpg",
    dest: "public/images/people/esther-nyirenda.jpg",
  },

  // Affiliations
  {
    url: "https://static.wixstatic.com/media/c24933_45382df5162b438cb6b1a9405374bce7~mv2.png/v1/fill/w_400,h_200/c24933_45382df5162b438cb6b1a9405374bce7~mv2.png",
    dest: "public/images/affiliations/europlaw-group.png",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_bb045da3ad834ba79d2910c3bb5cc6fa~mv2.jpeg/v1/fill/w_400,h_200/c24933_bb045da3ad834ba79d2910c3bb5cc6fa~mv2.jpeg",
    dest: "public/images/affiliations/global-law-experts.jpg",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_ed874e007631449cb14fa42f5c492f9d~mv2.png/v1/fill/w_400,h_200/c24933_ed874e007631449cb14fa42f5c492f9d~mv2.png",
    dest: "public/images/affiliations/association-european-attorneys.png",
  },

  // Insight covers
  {
    url: "https://static.wixstatic.com/media/c24933_b82fe38c2c834c18b7082210248c1af4~mv2.jpg/v1/fill/w_1600,h_900/c24933_b82fe38c2c834c18b7082210248c1af4~mv2.jpg",
    dest: "public/images/insights/zambias-draft-adr-bill-2026.jpg",
  },
  {
    url: "https://static.wixstatic.com/media/c24933_2d2e49ac483240d3b888e5461b6d751b~mv2.jpg/v1/fill/w_1600,h_900/c24933_2d2e49ac483240d3b888e5461b6d751b~mv2.jpg",
    dest: "public/images/insights/road-traffic-offences-zambia-vehicle-impound.jpg",
  },
];

async function exists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function downloadOne(asset: Asset) {
  const out = path.resolve(asset.dest);
  if (await exists(out)) {
    console.warn(`✓  already exists: ${asset.dest}`);
    return;
  }
  await mkdir(path.dirname(out), { recursive: true });

  // We deliberately fetch the transformed URL — it includes useful sizing —
  // but if you would prefer the originals, call STRIP_TRANSFORM(asset.url).
  const _stripped = STRIP_TRANSFORM(asset.url);

  const res = await fetch(asset.url, {
    headers: { "User-Agent": "tmlp-asset-pipeline/1.0" },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${asset.url}: ${res.status} ${res.statusText}`,
    );
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(out, buf);
  console.warn(`↓  ${asset.dest} (${(buf.byteLength / 1024).toFixed(1)} KB)`);
}

async function main() {
  console.warn(`Fetching ${assets.length} assets…\n`);
  for (const a of assets) {
    try {
      await downloadOne(a);
    } catch (err) {
      console.error(`✗ ${a.dest}:`, err);
    }
  }
  console.warn("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
