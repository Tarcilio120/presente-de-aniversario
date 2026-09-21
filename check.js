const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\Tarcilio\\Desktop\\EDA\\Presente de aniversario\\Felizaniversario.html', 'utf8');
const regex = /<script[^>]*>([\s\S]*?)<\/script>/g;
let match;
let i = 0;
while ((match = regex.exec(html)) !== null) {
  i++;
  const code = match[1].trim();
  if (!code || code.includes('tailwind.config')) {
    console.log('Script ' + i + ': SKIPPED (empty or config)');
    continue;
  }
  try {
    new Function(code);
    console.log('Script ' + i + ': OK');
  } catch(e) {
    console.log('Script ' + i + ': ERROR - ' + e.message);
    // Show line of error
    const lines = code.split('\n');
    const lineNum = parseInt((e.message.match(/position (\d+)/) || [])[1]);
    console.log('  Near end of script, last 3 lines:');
    lines.slice(-3).forEach((l, idx) => console.log('  ' + (lines.length - 2 + idx) + ': ' + l));
  }
}
