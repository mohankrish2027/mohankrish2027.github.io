const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/courses.ts');
let code = fs.readFileSync(filePath, 'utf8');

// Parse the courses array (it's safe plain JS)
const dataStr = code.replace('export const courses = ', '').replace(/;\s*$/, '');
// Use Function to safely evaluate the JS object array
const courses = new Function('return ' + dataStr)();

for (const c of courses) {
  for (const m of c.modules) {
    // 1. Remove "(X Days)" or "- X Days" from titles
    m.title = m.title.replace(/[\-\(]*\d+\s*days?[\)\-]*/gi, '').trim();
    // Clean any trailing hyphens/colons
    m.title = m.title.replace(/[:\-]+$/, '').trim();

    // 2. Clean items vigorously
    let newItems = [];
    for (let i of m.items) {
      i = i.trim();
      // Remove prefixes
      i = i.replace(/^(Topics Covered|Hands-On Labs|Learning Outcome|Duration|Service|Topics|Labs|Outcome|Activities|Course Level|Total Program Duration|Course Section|Total Course Duration|Course\s|Basic Course|Advanced Course|Total Program)[:\-]*\s*/i, '');
      
      // If it's literally just "2 Days" or something
      if (i.match(/^\d+\s*days?$/i)) continue;
      
      // Drop line if it's "Day X" or "Section X"
      if (i.match(/^(Day \d+|Section \d+)/i)) continue;

      // Drop line if it contains these phrases entirely
      if (i.toLowerCase().includes('learning outcome')) continue;
      // Many labs are "Hands-On Labs: Connect via SSH". If we replaced the prefix above, and it's left with "Connect via SSH", it's fine. 
      // But if the string still has "Hands-on: Mount EFS" we keep "Mount EFS" if prefix was removed.
      // We already removed "Hands-On Labs:" via regex.

      if (i.length <= 4) continue;
      
      newItems.push(i.trim());
    }
    m.items = [...new Set(newItems)]; // deduplicate
  }
  
  c.modules = c.modules.filter(m => m.items.length > 0);
}

fs.writeFileSync(filePath, 'export const courses = ' + JSON.stringify(courses, null, 2) + ';\n');
console.log('Courses data deep cleaned successfully.');
