#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { getPlaiceholder } = require('plaiceholder');
const sharp = require('sharp');

/**
 * Configuration
 */
const IMAGE_DIRECTORIES = [
  'public/images',
  'public/images/services',
  'public/images/team',
  'public/images/gallery',
];

const OUTPUT_FILE = 'lib/images/blur-data.json';
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Get all image files from directories
 */
async function getImageFiles() {
  const imageFiles = [];

  for (const dir of IMAGE_DIRECTORIES) {
    const fullPath = path.join(process.cwd(), dir);
    
    try {
      const files = await fs.readdir(fullPath);
      
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (SUPPORTED_FORMATS.includes(ext)) {
          const relativePath = path.join(dir.replace('public/', '/'), file);
          imageFiles.push({
            relativePath,
            fullPath: path.join(fullPath, file),
            filename: file,
          });
        }
      }
    } catch (error) {
      console.warn(`Directory not found: ${dir}`);
    }
  }

  return imageFiles;
}

/**
 * Generate blur data for a single image
 */
async function generateBlurData(imagePath) {
  try {
    // Get image metadata
    const metadata = await sharp(imagePath).metadata();
    
    // Generate plaiceholder
    const { base64, img } = await getPlaiceholder(imagePath);
    
    return {
      base64,
      img: {
        ...img,
        format: metadata.format,
        originalWidth: metadata.width,
        originalHeight: metadata.height,
      },
    };
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Generating blur placeholders for images...\n');

  try {
    // Get all image files
    const imageFiles = await getImageFiles();
    console.log(`Found ${imageFiles.length} images to process\n`);

    if (imageFiles.length === 0) {
      console.log('No images found. Skipping blur data generation.');
      return;
    }

    // Generate blur data for each image
    const blurDataMap = {};
    let processed = 0;
    let failed = 0;

    for (const { relativePath, fullPath, filename } of imageFiles) {
      process.stdout.write(`Processing ${filename}...`);
      
      const blurData = await generateBlurData(fullPath);
      
      if (blurData) {
        blurDataMap[relativePath] = blurData;
        processed++;
        console.log(' ✓');
      } else {
        failed++;
        console.log(' ✗');
      }
    }

    // Create output directory if it doesn't exist
    const outputDir = path.dirname(path.join(process.cwd(), OUTPUT_FILE));
    await fs.mkdir(outputDir, { recursive: true });

    // Write blur data to file
    await fs.writeFile(
      path.join(process.cwd(), OUTPUT_FILE),
      JSON.stringify(blurDataMap, null, 2)
    );

    console.log(`\n✨ Blur data generated successfully!`);
    console.log(`   - Processed: ${processed} images`);
    console.log(`   - Failed: ${failed} images`);
    console.log(`   - Output: ${OUTPUT_FILE}\n`);

    // Generate TypeScript definition file
    const tsDefinition = `// Auto-generated blur data types
export interface BlurData {
  base64: string;
  img: {
    src: string;
    width: number;
    height: number;
    type?: string;
    format?: string;
    originalWidth?: number;
    originalHeight?: number;
  };
}

export type BlurDataMap = Record<string, BlurData>;

declare const blurData: BlurDataMap;
export default blurData;
`;

    await fs.writeFile(
      path.join(process.cwd(), OUTPUT_FILE.replace('.json', '.d.ts')),
      tsDefinition
    );

    console.log('📝 TypeScript definitions generated\n');

  } catch (error) {
    console.error('❌ Error generating blur data:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateBlurData, getImageFiles };