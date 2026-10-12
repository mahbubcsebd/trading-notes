// @ts-nocheck
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
// @ts-nocheck
import { docs, meta, patternDocs, patternMeta } from '@/.source';

import { i18n } from '@/lib/i18n';

const learnMdx = createMDXSource(docs, meta);
const learnFiles = typeof learnMdx.files === 'function' ? learnMdx.files() : learnMdx.files;

export const source = loader({
  baseUrl: '/learn',
  source: { files: learnFiles },
  i18n,
});

const patternsMdx = createMDXSource(patternDocs, patternMeta);
const patternFiles = typeof patternsMdx.files === 'function' ? patternsMdx.files() : patternsMdx.files;

export const patternsSource = loader({
  baseUrl: '/patterns',
  source: { files: patternFiles },
  i18n,
});
