import type { Locale, ProfileId } from '../domain/cv/types';
import type { CVTemplate } from '../templates/cv';

export const CV_LOCALES = ['fr', 'en'] as const satisfies readonly Locale[];

export const CV_PROFILES = [
  'master',
  'software-architect',
  'data-scientist',
  'data-analyst',
] as const satisfies readonly ProfileId[];

export const CV_TEMPLATES = [
  'default',
  'futurist',
  'minimal',
  'modern',
  'manifesto',
  'compact',
  'technical',
] as const satisfies readonly CVTemplate[];

export const DEFAULT_CV_LOCALE: Locale = 'fr';

export const DEFAULT_CV_PROFILE: ProfileId = 'master';

export const DEFAULT_CV_TEMPLATE: CVTemplate = 'default';
