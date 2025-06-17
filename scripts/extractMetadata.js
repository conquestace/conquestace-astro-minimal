import fs from 'fs';
import path from 'path';
import { exiftool } from 'exiftool-vendored';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function walkPngFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkPngFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export async function extractMetadata(inputDir, outputDir) {
  const files = walkPngFiles(inputDir);
  for (const file of files) {
    try {
      const data = await exiftool.read(file);
      const rating =
        (data.Rating || data.RatingLabel || data.ImageDescription || '').toString().toLowerCase();
      let category = 'general';
      if (rating.includes('sensitive')) category = 'sensitive';
      else if (rating.includes('questionable')) category = 'questionable';
      else if (rating.includes('explicit')) category = 'explicit';
      const outCategoryDir = path.join(outputDir, category);
      fs.mkdirSync(outCategoryDir, { recursive: true });
      const outFile = path.join(outCategoryDir, path.basename(file) + '.json');
      fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
      console.log(`Saved metadata for ${file} -> ${outFile}`);
    } catch (err) {
      console.error(`Failed to read metadata for ${file}:`, err.message);
    }
  }
  await exiftool.end();
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  const inputDir = process.argv[2];
  const outputDir = process.argv[3] || path.join(__dirname, 'metadata');
  if (!inputDir) {
    console.error('Usage: node scripts/extractMetadata.js <inputDir> [outputDir]');
    process.exit(1);
  }
  extractMetadata(inputDir, outputDir).catch((err) => {
    console.error('Unexpected error', err);
    process.exit(1);
  });
}
