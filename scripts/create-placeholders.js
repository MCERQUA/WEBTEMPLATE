#!/usr/bin/env node

const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

const PLACEHOLDER_CONFIG = [
  {
    name: 'placeholder-service.jpg',
    width: 800,
    height: 600,
    text: 'Service Image',
    color: { r: 100, g: 120, b: 140, alpha: 1 }
  },
  {
    name: 'placeholder-hero.jpg',
    width: 1920,
    height: 1080,
    text: 'Hero Image',
    color: { r: 80, g: 100, b: 120, alpha: 1 }
  },
  {
    name: 'placeholder-team.jpg',
    width: 400,
    height: 400,
    text: 'Team Member',
    color: { r: 120, g: 100, b: 140, alpha: 1 }
  },
  {
    name: 'placeholder-gallery.jpg',
    width: 600,
    height: 400,
    text: 'Gallery Image',
    color: { r: 100, g: 140, b: 120, alpha: 1 }
  },
  {
    name: 'placeholder-testimonial.jpg',
    width: 200,
    height: 200,
    text: 'Client Photo',
    color: { r: 140, g: 120, b: 100, alpha: 1 }
  }
];

async function createPlaceholder({ name, width, height, text, color }) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="rgb(${color.r}, ${color.g}, ${color.b})" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.1}" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
      <rect x="10%" y="10%" width="80%" height="80%" fill="none" stroke="white" stroke-width="2" opacity="0.3" />
    </svg>
  `;

  const outputPath = path.join(process.cwd(), 'public/images', name);
  
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 90 })
    .toFile(outputPath);
    
  console.log(`✓ Created ${name}`);
}

async function main() {
  console.log('🎨 Creating placeholder images...\n');

  try {
    // Ensure directory exists
    await fs.mkdir(path.join(process.cwd(), 'public/images'), { recursive: true });

    // Create all placeholders
    for (const config of PLACEHOLDER_CONFIG) {
      await createPlaceholder(config);
    }

    console.log('\n✨ All placeholder images created successfully!');
  } catch (error) {
    console.error('❌ Error creating placeholders:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}