import en from '../src/locales/en';
import fr from '../src/locales/fr';

type Dict = Record<string, unknown>;

function getFlattenedKeys(obj: Dict, prefix = ''): string[] {
  return Object.keys(obj).reduce<string[]>((acc, key) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      acc.push(...getFlattenedKeys(obj[key] as Dict, pre + key));
    } else {
      acc.push(pre + key);
    }
    return acc;
  }, []);
}

const frKeys = new Set(getFlattenedKeys(fr as Dict));
const enKeys = new Set(getFlattenedKeys(en as Dict));

const missingInEn = [...frKeys].filter((k) => !enKeys.has(k));
const missingInFr = [...enKeys].filter((k) => !frKeys.has(k));

console.log('🔍 Auditing i18n Dictionaries...\n');

if (missingInEn.length === 0 && missingInFr.length === 0) {
  console.log('✅ All dictionaries are perfectly synchronized!');
  process.exit(0);
}

if (missingInEn.length > 0) {
  console.error('❌ Missing keys in EN locale:');
  missingInEn.forEach((k) => {
    console.error(`   - ${k}`);
  });
}

if (missingInFr.length > 0) {
  console.error('❌ Missing keys in FR locale:');
  missingInFr.forEach((k) => {
    console.error(`   - ${k}`);
  });
}

process.exit(1);
