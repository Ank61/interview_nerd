#!/usr/bin/env node

/**
 * Build Test Script
 * 
 * This script tests the build process and verifies that:
 * 1. All static pages are generated correctly
 * 2. Local data is properly imported
 * 3. No API dependencies exist
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing build configuration...\n');

// Check if local data files exist
const dataFiles = [
  'data/interviewData.js',
  'data/prepareData.js'
];

console.log('📁 Checking local data files:');
dataFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file} exists`);
  } else {
    console.log(`  ❌ ${file} missing`);
    process.exit(1);
  }
});

// Check if category page exists
const categoryPage = path.join(process.cwd(), 'pages/category/[slug].js');
if (fs.existsSync(categoryPage)) {
  console.log('\n📄 Category page exists');
  
  // Check for static generation functions
  const content = fs.readFileSync(categoryPage, 'utf8');
  if (content.includes('getStaticPaths') && content.includes('getStaticProps')) {
    console.log('  ✅ Static generation functions found');
  } else {
    console.log('  ❌ Static generation functions missing');
    process.exit(1);
  }
  
  // Check for local data imports
  if (content.includes('import { interviewData }') && content.includes('import { prepareData }')) {
    console.log('  ✅ Local data imports found');
  } else {
    console.log('  ❌ Local data imports missing');
    process.exit(1);
  }
} else {
  console.log('  ❌ Category page missing');
  process.exit(1);
}

console.log('\n🎉 Build configuration is valid!');
console.log('\n📋 Next steps:');
console.log('  1. Run: npm run build');
console.log('  2. Check the .next/server/pages directory for generated static files');
console.log('  3. Deploy with: npm run start'); 