#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PAYLOAD_TYPES_SOURCE = path.join(__dirname, '../apps/admin/payload-types.ts');
const PAYLOAD_TYPES_TARGET = path.join(__dirname, '../packages/types/src/payload/index.ts');

function syncPayloadTypes() {
  if (!fs.existsSync(PAYLOAD_TYPES_SOURCE)) {
    console.error('❌ PayloadCMS types file not found in apps/admin/');
    process.exit(1);
  }

  if (fs.existsSync(PAYLOAD_TYPES_TARGET)) {
    const sourceContent = fs.readFileSync(PAYLOAD_TYPES_SOURCE, 'utf8');
    const targetContent = fs.readFileSync(PAYLOAD_TYPES_TARGET, 'utf8');

    if (sourceContent === targetContent) {
      console.log('✅ PayloadCMS types are already synchronized');
      return;
    }
  }

  const targetDir = path.dirname(PAYLOAD_TYPES_TARGET);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log('📁 Created directory:', targetDir);
  }

  try {
    let content = fs.readFileSync(PAYLOAD_TYPES_SOURCE, 'utf8');

    content = content.replace(
      /\n*declare module 'payload' \{[\s\S]*?\}\s*$/,
      ''
    );

    fs.writeFileSync(PAYLOAD_TYPES_TARGET, content);
    console.log('✅ PayloadCMS types synchronized successfully!');
    console.log(`   Source: ${PAYLOAD_TYPES_SOURCE}`);
    console.log(`   Target: ${PAYLOAD_TYPES_TARGET}`);
  } catch (error) {
    console.error('❌ Error copying types:', error.message);
    process.exit(1);
  }
}

syncPayloadTypes();
