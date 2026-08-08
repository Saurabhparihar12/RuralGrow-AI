const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const stagingDir = path.join(rootDir, 'scratch', 'w9_staging');

// Clean staging directory
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

function copyFileSync(src, dest) {
  const targetFolder = path.dirname(dest);
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

function copyFolderSync(srcDir, destDir, ignoreList = []) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const items = fs.readdirSync(srcDir);
  for (const item of items) {
    if (ignoreList.includes(item)) continue;
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyFolderSync(srcPath, destPath, ignoreList);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

console.log('📦 Staging Week 9 deliverables...');

// 1. Copy root deliverable files
const rootFiles = [
  'README.md',
  'DEPLOYMENT.md',
  'W9_DeploymentChecklist.md',
  'W9_DeploymentProof_TBI-26100640.md',
  'W9_DeploymentProof_TBI-26100640.pdf',
  'W9_Final_Presentation_TBI-26100640.pdf',
  'PEER_REVIEW.md',
  'PEER_TESTING_FEEDBACK.txt',
  'PROMPTS.md',
  'Forum_Introduction_Post.txt',
  'render.yaml',
  'vercel.json',
  'package.json',
  'package-lock.json',
  '.gitignore'
];

for (const file of rootFiles) {
  const src = path.join(rootDir, file);
  if (fs.existsSync(src)) {
    copyFileSync(src, path.join(stagingDir, file));
    console.log(`  ✓ Added ${file}`);
  } else {
    console.warn(`  ⚠️ Warning: Root file ${file} not found.`);
  }
}

// 2. Copy frontend folder
console.log('📂 Copying frontend directory...');
copyFolderSync(path.join(rootDir, 'frontend'), path.join(stagingDir, 'frontend'), [
  'node_modules',
  'dist',
  '.env',
  '.env.local',
  '.git',
  '.vercel'
]);

// 3. Copy backend folder
console.log('📂 Copying backend directory...');
copyFolderSync(path.join(rootDir, 'backend'), path.join(stagingDir, 'backend'), [
  'node_modules',
  'mongodb',
  '.env',
  '.env.local',
  '.git'
]);

// 4. Compress staging directory to W9_Submission_TBI-26100640.zip
const zipDest = path.join(rootDir, 'W9_Submission_TBI-26100640.zip');
if (fs.existsSync(zipDest)) {
  fs.unlinkSync(zipDest);
}

console.log('🔒 Compressing staged files into W9_Submission_TBI-26100640.zip...');
// Use PowerShell Compress-Archive on the staging directory contents
const psCmd = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${stagingDir.replace(/\\/g, '/')}', '${zipDest.replace(/\\/g, '/')}')"`;
execSync(psCmd, { stdio: 'inherit' });

console.log(`✅ Created W9_Submission_TBI-26100640.zip (${(fs.statSync(zipDest).size / 1024 / 1024).toFixed(2)} MB)`);

// 5. Copy to submission folder as well
const submissionDir = path.join(rootDir, 'submission');
if (fs.existsSync(submissionDir)) {
  const subZip = path.join(submissionDir, 'W9_Submission_TBI-26100640.zip');
  copyFileSync(zipDest, subZip);
  console.log(`  ✓ Synced to ${subZip}`);
  const subPdf = path.join(submissionDir, 'W9_DeploymentProof_TBI-26100640.pdf');
  copyFileSync(path.join(rootDir, 'W9_DeploymentProof_TBI-26100640.pdf'), subPdf);
  console.log(`  ✓ Synced PDF to ${subPdf}`);
}

console.log('🎉 Week 9 deliverables packaging completed successfully!');
