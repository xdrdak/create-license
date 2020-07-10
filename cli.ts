import { writeFileStr } from "https://deno.land/std@0.60.0/fs/mod.ts";
import { parse } from "https://deno.land/std@0.60.0/flags/mod.ts";
import { printLicenses, retrieveLicense, getLicenseContent, getLicenses } from './mod.ts';

const args = parse(Deno.args);
const [requestedLicense] = args._;
const { l } = args;

const licenses = await getLicenses();

if (l) {
  printLicenses(licenses);
  Deno.exit(0);
}

const license = await retrieveLicense(licenses, requestedLicense?.toString());

if (!license) {
  console.error('No license found...');
  Deno.exit(1);
}

const content = await getLicenseContent(license);

if (!content) {
  console.error('No content found...');
  Deno.exit(1);
}

writeFileStr('./LICENSE.md', content.trim());
console.log('Wrote LICENSE.md')
