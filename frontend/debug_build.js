const { execSync } = require('child_process');
try {
    execSync('npx ng build', { stdio: 'pipe' });
} catch (e) {
    console.log(e.stdout.toString('utf8'));
    console.error(e.stderr.toString('utf8'));
}
