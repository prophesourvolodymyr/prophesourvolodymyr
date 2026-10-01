import { mkdir, readFile, writeFile } from 'node:fs/promises';

const icons = [
  ['rust', 'Rust', ['Rust']],
  ['art-practitioners', 'Art Practitioners', ['Art', 'Practitioners'], 'specializations'],
  ['swift', 'Swift / SwiftUI', ['Swift / SwiftUI']],
  ['linux', 'Linux', ['Linux']],
  ['py', 'Python', ['Python']],
  ['heist-hacking', 'Heist Hacking', ['Heist Hacking'], 'specializations'],
  ['react', 'React', ['React']],
  ['c', 'C', ['C']],
  ['nix', 'Nix', ['Nix']],
  ['postgres', 'PostgreSQL / SQL', ['PostgreSQL', '/ SQL']],
  ['ideas-daddy', 'Ideas Daddy', ['Ideas Daddy'], 'specializations'],
  ['ts', 'TypeScript', ['TypeScript']],
  ['qml', 'QML', ['QML']],
  ['go', 'Go', ['Go']],
  ['dragons-slayed', 'Dragons Slayed', ['Dragons', 'Slayed'], 'specializations'],
  ['julia', 'Julia', ['Julia']],
  ['css', 'CSS', ['CSS']],
  ['powershell', 'PowerShell', ['PowerShell']],
  ['cpp', 'C++', ['C++']],
  ['revolutions-plotted', 'Revolutions Plotted', ['Revolutions', 'Plotted'], 'specializations'],
  ['threejs', 'Three.js / WebGL', ['Three.js', '/ WebGL']],
  ['perl', 'Perl', ['Perl']],
  ['metal', 'Metal', ['Metal']],
  ['ai-ml-world-takeover', 'AI / ML World Takeover', ['AI / ML World', 'Takeover'], 'specializations'],
  ['svelte', 'Svelte', ['Svelte']],
  ['objectivec', 'Objective-C', ['Objective-C']],
  ['js', 'JavaScript', ['JavaScript']],
  ['wgsl', 'WGSL', ['WGSL']],
  ['wars-fought', 'Wars Fought', ['Wars Fought'], 'specializations'],
  ['astro', 'Astro', ['Astro']],
  ['ruby', 'Ruby', ['Ruby']],
  ['slint', 'Slint', ['Slint']],
  ['objectivecpp', 'Objective-C++', ['Objective-C++']],
  ['bash', 'Shell', ['Shell']],
  ['html', 'HTML', ['HTML']],
  ['nextjs', 'Next.js', ['Next.js']],
  ['logos', 'Logos', ['Logos']],
  ['hlsl', 'HLSL', ['HLSL']],
];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const output = new URL('../assets/icons/', import.meta.url);
await mkdir(output, { recursive: true });
for (const [key, title, lines, source = 'tech'] of icons) {
  const artwork = await readFile(new URL(`../assets/${source}/${key}.svg`, import.meta.url));
  const specialization = source === 'specializations';
  const image = specialization ? artwork.toString().match(/<image href="([^"]+)"/)[1] : `data:image/svg+xml;base64,${artwork.toString('base64')}`;
  const size = specialization ? 56 : 48;
  const caption = lines.map((line, index) => `<text x="44" y="${lines.length === 1 ? (specialization ? 77 : 73) : (specialization ? 69 : 67) + index * 13}" text-anchor="middle" font-family="Arial,sans-serif" font-size="11.5" font-weight="500" fill="#f0f1f4">${escape(line)}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88"><title>${escape(title)}</title><rect x="0.5" y="0.5" width="87" height="87" rx="12" fill="#16191f" stroke="#333"/><image x="${(88 - size) / 2}" y="${specialization ? 2 : 6}" width="${size}" height="${size}" href="${image}"/>${caption}</svg>\n`;
  await writeFile(new URL(`${key}${specialization ? '-large' : ''}.svg`, output), svg);
}
console.log(`Rendered ${icons.length} named technology and specialization icons.`);
console.log('<p align="center">\n' + icons.map(([key, title, , source]) => {
  const image = `<img src="https://raw.githubusercontent.com/prophesourvolodymyr/prophesourvolodymyr/main/assets/icons/${key}${source === 'specializations' ? '-large' : ''}.svg" alt="${escape(title)}" title="${escape(title)}" width="88" height="88">`;
  return '  ' + (source === 'specializations' ? `<a href="https://www.professorvolodymyr.com/#specializations">${image}</a>` : image);
}).join('\n') + '\n</p>');
