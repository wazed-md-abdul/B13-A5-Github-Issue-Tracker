
console.log("home connected");

const loadingContainer = document.getElementById("loading-section");
const allIssueContainer = document.getElementById("cards-section");

const showLoading = () => {

    loadingContainer.classList.remove("hidden")
    allIssueContainer.classList.add("hidden")
}
const hideLoading = () => {
    
    loadingContainer.classList.add("hidden")
    allIssueContainer.classList.remove("hidden")
}

const allIssues = async () => {
  showLoading();
  const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
  const data = await response.json();
  document.getElementById('issues-counter').textContent = data.data.length;
  hideLoading();
  displayCards(data.data);
};
const openIssues = async () => {
  showLoading();
  const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
  const data = await response.json();
  const open = data.data.filter(issue => issue.status === "open");
  document.getElementById('issues-counter').textContent = open.length;
  hideLoading();
  displayCards(open);
}
const closedIssues = async () => {
  showLoading();
  const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
  const data = await response.json();
  const closed = data.data.filter(issue => issue.status === "closed");
  document.getElementById('issues-counter').textContent = closed.length;
  hideLoading();
  displayCards(closed);
}
document.getElementById('search-boxs').addEventListener('change', async (e) => {

  const query = e.target.value.toLowerCase();
  const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
  const data = await response.json();
  document.getElementById('issues-counter').textContent = data.data.length;
  displayCards(data.data);
});


const allFilter = document.getElementById("all-btn");
const interviewFilter = document.getElementById("open-btn");
const rejectedFilter = document.getElementById("closed-btn");
  allFilter.addEventListener("click", function () {
  interviewFilter.classList.remove("btn-primary");
  rejectedFilter.classList.remove("btn-primary");

  allFilter.classList.add("btn-primary");
});
interviewFilter.addEventListener("click", function () {
  allFilter.classList.remove("btn-primary");
  rejectedFilter.classList.remove("btn-primary");

  interviewFilter.classList.add("btn-primary");
});
rejectedFilter.addEventListener("click", function () {
  allFilter.classList.remove("btn-primary");
  interviewFilter.classList.remove("btn-primary");

  rejectedFilter.classList.add("btn-primary");
});
allIssues();

const displayCards = (issues) => {
  const cardsSection = document.getElementById('cards-section');
  cardsSection.innerHTML = '';
  issues.forEach(issue => {

    // Priority color
    let priorityColor = "bg-gray-200 text-gray-700";

    if (issue.priority === "high") {
      priorityColor = "bg-red-100 text-red-600";
    } 
    else if (issue.priority === "medium") {
      priorityColor = "bg-yellow-100 text-yellow-600";
    }

    // Status border
    const statusBorder = issue.status === "open"
      ? "border-green-400"
      : "border-primary/60";

    const card = document.createElement('div');

    card.className = `
      bg-white border-t-4 ${statusBorder}
      rounded-xl shadow-md hover:shadow-lg
      transition-colors duration-300 ease-in-out hover:bg-gray-100 p-5 flex flex-col justify-between
    `;

    card.innerHTML = `
      
      <div class="flex items-start justify-between mb-3">

        <div class="w-8 h-8 flex items-center justify-center rounded-full">
          <img src="./assets/${issue.status === 'open' ? 'Open-Status' : 'Closed-Status'}.png" alt="">
        </div>

        <span class="text-xs font-semibold px-3 py-1 rounded-full ${priorityColor}">
          ${issue.priority.toUpperCase()}
        </span>

      </div>

      <h3 class="font-semibold text-gray-800 mb-2">
        ${issue.title}
      </h3>

      <!-- Description -->
      <p class="text-sm text-gray-500 mb-4">
        ${issue.description}
      </p>

     
      <div class="flex flex-wrap gap-2 mb-4">
        ${
          issue.labels
          .map(tag => `
            <span class="text-xs px-3 py-1 rounded-full ${tag === 'bug' ? 'bg-red-100 text-red-600 border border-red-200' :tag === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-200' :tag==='help wanted' ? 'bg-yellow-100 text-yellow-600 border border-yellow-200' : tag === 'good first issue' ? 'bg-gray-100 text-gray-600 border border-gray-200' : tag ==='documentation' ? 'bg-blue-100 text-blue-600 border border-blue-200':''}">
              ${tag}
            </span>
          `)
          .join('')
        }
      </div>

      <hr>

     
      <div class="flex justify-between pt-3 text-gray-500 text-xs">

        <div>
          <p>#${issue.id} by </p>
          <p class="font-semibold">Author</p>
          <p class="font-bold">${issue.author}</p>
          <p>Created: ${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>

        <div class="text-right space-y-2">
          <p class="font-semibold">Assigned</p>
          <p class="font-bold">${issue.assignee || 'Unassigned'}</p>
          <p>Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</p>
        </div>

      </div>
    `;

    cardsSection.appendChild(card);
  });
};


