import { getCommitsForBranch, getTree, getBlob, Tree } from './github-api.ts';
import { ask } from './ask.ts';

type Licenses = Tree[];

export async function getLicenses() {
  const response = await getCommitsForBranch({
    owner: 'github',
    repo: 'choosealicense.com',
    branch: 'gh-pages'
  });
  const treeSha = response.commit.tree.sha;

  const treeResponse = await getTree({
    owner: 'github',
    repo: 'choosealicense.com',
    treeSha: treeSha,
  });

  const licensesFolder = treeResponse.tree.find(x => x.path === '_licenses');
  if (licensesFolder?.sha) {
    const licenceFiles = await getTree({
      owner: 'github',
      repo: 'choosealicense.com',
      treeSha: licensesFolder?.sha,
    });

    return licenceFiles.tree;
  }

  return [];
}


export function printLicenses(licenses: Licenses) {
  licenses.forEach(item => {
    console.log(`${item.path.split('.')[0]}`)
  });
}

export function printLicensesChoiceList(licenses: Licenses) {
  console.log('List of available licenses \n');
  licenses.forEach((item, index) => {
    console.log(`${index + 1}) ${item.path.split('.')[0]}`)
  });
}

export async function askForLicenseIndex(licenses: Licenses) {
  const answer = await ask('Choose a license (enter the number corresponding to a license)');

  if (!answer) {
    Deno.exit(1);
  }

  const answerNumber = parseInt(answer, 10);

  const selectedLicense = licenses[answerNumber - 1];
  if (!selectedLicense) {
    Deno.exit(1);
  }

  return selectedLicense;
}

export async function getLicenseContent(license: Tree) {

  const blobResponse = await getBlob({
    owner: 'github',
    repo: 'choosealicense.com',
    fileSha: license.sha,
  });

  // Response from getBlob always returns a base64 hashed string
  // Also, strip the frontmatter from the license.
  const content = atob(blobResponse.content).split('---').pop();

  return content;
}

export async function retrieveLicense(licenses: Licenses, requestedLicense?: string) {
  if (requestedLicense) {
    const license = licenses.find(l => l.path.split('.')[0] === requestedLicense);
    return license;
  }

  printLicensesChoiceList(licenses);
  console.log('Fetching the license file...')
  const license = await askForLicenseIndex(licenses);
  return license;
}