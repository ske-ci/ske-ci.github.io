import type { Component } from 'astro';
import CompactTemplate from './Compact.astro';
import DefaultTemplate from './Default.astro';
import FuturistTemplate from './Futurist.astro';
import ManifestoTemplate from './Manifesto.astro';
import MinimalTemplate from './Minimal.astro';
import ModernTemplate from './Modern.astro';
import TechnicalTemplate from './Technical.astro';

export type CVTemplate =
  | 'default'
  | 'modern'
  | 'minimal'
  | 'compact'
  | 'futurist'
  | 'technical'
  | 'manifesto';

export const DEFAULT_TEMPLATE: CVTemplate = 'default';

export const templates = {
  default: DefaultTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  compact: CompactTemplate,
  futurist: FuturistTemplate,
  manifesto: ManifestoTemplate,
  technical: TechnicalTemplate,
} satisfies Record<CVTemplate, Component>;
