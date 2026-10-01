import { mkdir, readFile, writeFile } from 'node:fs/promises';

const icons = [
  ['rust', 'Rust', ['Rust']],
  ['c', 'C', ['C']],
  ['cpp', 'C++', ['C++']],
  ['go', 'Go', ['Go']],
  ['ts', 'TypeScript', ['TypeScript']],
  ['js', 'JavaScript', ['JavaScript']],
  ['html', 'HTML', ['HTML']],
  ['css', 'CSS', ['CSS']],
  ['swift', 'Swift / SwiftUI', ['Swift / SwiftUI']],
  ['objectivec', 'Objective-C', ['Objective-C']],
  ['objectivecpp', 'Objective-C++', ['Objective-C++']],
  ['metal', 'Metal', ['Metal']],
  ['py', 'Python', ['Python']],
  ['bash', 'Shell', ['Shell']],
  ['ruby', 'Ruby', ['Ruby']],
  ['julia', 'Julia', ['Julia']],
  ['perl', 'Perl', ['Perl']],
  ['nix', 'Nix', ['Nix']],
  ['powershell', 'PowerShell', ['PowerShell']],
  ['hlsl', 'HLSL', ['HLSL']],
  ['wgsl', 'WGSL', ['WGSL']],
  ['logos', 'Logos', ['Logos']],
  ['renderscript', 'RenderScript', ['RenderScript']],
  ['slint', 'Slint', ['Slint']],
  ['tree-sitter-query', 'Tree-sitter Query', ['Tree-sitter', 'Query']],
  ['react', 'React', ['React']],
  ['nextjs', 'Next.js', ['Next.js']],
  ['threejs', 'Three.js / WebGL', ['Three.js', '/ WebGL']],
  ['astro', 'Astro', ['Astro']],
  ['svelte', 'Svelte', ['Svelte']],
  ['web-dev-master', 'Web Dev Master', ['Web Dev', 'Master'], 'specializations'],
  ['deep-dev', 'Deep Dev', ['Deep Dev'], 'specializations'],
  ['wars-fought', 'Wars Fought', ['Wars Fought'], 'specializations'],
  ['dragons-slayed', 'Dragons Slayed', ['Dragons', 'Slayed'], 'specializations'],
  ['revolutions-plotted', 'Revolutions Plotted', ['Revolutions', 'Plotted'], 'specializations'],
  ['ideas-daddy', 'Ideas Daddy', ['Ideas Daddy'], 'specializations'],
  ['ai-ml-world-takeover', 'AI / ML World Takeover', ['AI / ML World', 'Takeover'], 'specializations'],
];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const output = new URL('../assets/icons/', import.meta.url);
await mkdir(output, { recursive: true });
for (const [key, title, lines, source = 'tech'] of icons) {
  const artwork = await readFile(new URL(`../assets/${source}/${key}.svg`, import.meta.url));
  const caption = lines.map((line, index) => `<text x="44" y="${lines.length === 1 ? 73 : 67 + index * 13}" text-anchor="middle" font-family="Arial,sans-serif" font-size="11.5" font-weight="500" fill="#f0f1f4">${escape(line)}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88"><title>${escape(title)}</title><rect x="0.5" y="0.5" width="87" height="87" rx="12" fill="#16191f" stroke="#333"/><image x="20" y="6" width="48" height="48" href="data:image/svg+xml;base64,${artwork.toString('base64')}"/>${caption}</svg>\n`;
  await writeFile(new URL(`${key}.svg`, output), svg);
}
console.log(`Rendered ${icons.length} named technology and specialization icons.`);
