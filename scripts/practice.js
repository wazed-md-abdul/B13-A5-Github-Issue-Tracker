const labels = ["bug","enhancement","documentary"]
const output = labels.map(tag => `
            <span class="text-xs px-3 py-1 rounded-full $">
              ${tag}
            </span>
          `).join('');
console.log(output);
