const fs = require('fs');
const path = require('path');

const [,, moduleDir, lessonTitle] = process.argv;

if (!moduleDir || !lessonTitle) {
  console.error('Usage: npm run new:lesson "<module-dir>" "<lesson-title>"');
  console.error('Example: npm run new:lesson "01-foundations" "Understanding Pips and Lots"');
  process.exit(1);
}

const contentDir = path.join(process.cwd(), 'content', 'learn');
const targetModulePath = path.join(contentDir, moduleDir);

if (!fs.existsSync(targetModulePath)) {
  console.error(`Error: Module directory '${moduleDir}' does not exist in content/learn/`);
  process.exit(1);
}

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

// Find the next lesson number
const files = fs.readdirSync(targetModulePath).filter(f => f.endsWith('.mdx'));
let maxNum = 0;
for (const f of files) {
  const match = f.match(/^(\d+)-/);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num > maxNum) maxNum = num;
  }
}
const nextNum = (maxNum + 1).toString().padStart(2, '0');
const fileName = `${nextNum}-${slugify(lessonTitle)}.mdx`;
const filePath = path.join(targetModulePath, fileName);

const today = new Date().toISOString().split('T')[0];

const template = `---
title: "${lessonTitle}"
description: "Short description here"
level: beginner
tags: []
status: draft
updated: ${today}
---

# ${lessonTitle}

<KeyTakeaways>
- Key point 1
- Key point 2
</KeyTakeaways>

## Introduction

Content goes here...
`;

fs.writeFileSync(filePath, template, 'utf8');

// Update meta.json
const metaPath = path.join(targetModulePath, 'meta.json');
if (fs.existsSync(metaPath)) {
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const pageName = fileName.replace('.mdx', '');
  if (!meta.pages) meta.pages = [];
  meta.pages.push(pageName);
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');
}

console.log(`Created new lesson at: content/learn/${moduleDir}/${fileName}`);
