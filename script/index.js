if(localStorage.getItem("login") !== "true"){
    window.location.href = "login.html"
}

const allBtn = document.getElementById("all-btn")
const openBtn = document.getElementById("open-btn")
const closedBtn = document.getElementById("closed-btn")

let allIssues =[]

function toggleStyle(id) {

    // added background and text color
    allBtn.classList.add('bg-white', 'text-gray-500');
    openBtn.classList.add('bg-white', 'text-gray-500');
    closedBtn.classList.add('bg-white', 'text-gray-500');

    // remove background and text colore 
    allBtn.classList.remove('bg-primary', 'text-white');
    openBtn.classList.remove('bg-primary', 'text-white');
    closedBtn.classList.remove('bg-primary', 'text-white');


    const selected = document.getElementById(id);
    currentStatus = id

    selected.classList.remove('bg-white', 'text-gray-500')
    selected.classList.add('bg-primary', 'text-white')

}

async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()

    // console.log(data.data)
    // displayIssues(data.data)
     allIssues = data.data;
    filterIssues('all')
}

function showSpinner() {
    document.getElementById("loading-spinner").classList.remove("hidden");
}

function hideSpinner() {
    document.getElementById("loading-spinner").classList.add("hidden");
}

function filterIssues(filter){
     showSpinner();
    let filtered = []

    if(filter === 'all') {
        filtered = allIssues;
    } 
    else if(filter === 'open') {
        filtered = allIssues.filter(issue => issue.status.toLowerCase() === 'open');
    } 
    else if(filter === 'closed') {
        filtered = allIssues.filter(issue => issue.status.toLowerCase() === 'closed');
    }

    setTimeout(() => {
        displayIssues(filtered);
        hideSpinner();
    }, 100);

    displayIssues(filtered);
}



const loadDetail = async(id) =>{
    const url =`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    // console.log(url)

    const res =await fetch(url)
    const details = await res.json()
    displayDetails(details.data)

}

const displayDetails = (detail) =>{
    const detailBox = document.getElementById("details-container")

     // labbels genaret

        const labelHTML = detail.labels.map(label => {
            const cardLabel = label.toLowerCase();

            if (cardLabel === "bug") {
                return `<p class="px-4 py-2 bg-red-100 text-red-500 font-bold rounded-4xl">
                    <i class="fa-solid fa-bug"></i> Bug
                </p>`;
            }
            else if (cardLabel === "help wanted") {
                return `<p class="px-4 py-2 bg-amber-100 text-amber-500 font-bold rounded-4xl">
                    <i class="fa-solid fa-life-ring"></i> Help Wanted
                </p>`;
            }
            else if (cardLabel === "documentation") {
                return `<p class="px-4 py-2 bg-blue-100 text-blue-500 rounded-4xl">
                    <i class="fa-solid fa-book"></i> Documentation
                </p>`;
            }
            else if (cardLabel === "enhancement") {
                return `<p class="px-4 py-2 bg-purple-100 text-purple-500 rounded-4xl">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Enhancement
                </p>`;
            }
            else if (cardLabel === "good first issue") {
                return `<p class="px-4 py-2 bg-green-100 text-green-500  rounded-4xl">
                    <i class="fa-solid fa-star"></i> Good First Issue
                </p>`;
            }
            else {
                return "";
            }
        }).join("");

    detailBox.innerHTML = `
         <h2 class="text-xl font-bold mb-2"">${detail.title}</h2>
                    <ul class="space-y-2 text-gray-700 mb-4">
                        <li><span class="font-semibold">Status:</span> ${detail.status}</li>
                        <li><span class="font-semibold">Author:</span> ${detail.author}</li>
                        <li><span class="font-semibold">Assignee:</span> ${detail.createdAt}</li>
                    </ul>

                    <div class="flex gap-2 mx-auto mt-4">
                        ${labelHTML}
                    </div>

                     <p class="text-gray-500 line-clamp-2">${detail.description}</p>

                     <div class="bg-gray-100 flex justify-between p-4">
                        <p>Assignee: ${detail.assignee}</p>
            <p>Priority: ${detail.priority}</p>
                     </div>
    `
     document.getElementById("my_modal").showModal();
}



function displayIssues(issues) {
    const container = document.getElementById("issues-container")
    container.innerHTML = ""




    issues.forEach(issue => {

        // labbels genaret

        const labelHTML = issue.labels.map(label => {
            const cardLabel = label.toLowerCase();

            if (cardLabel === "bug") {
                return `<p class="px-4 py-2 bg-red-100 text-red-500 rounded-4xl">
                    <i class="fa-solid fa-bug"></i> Bug
                </p>`;
            }
            else if (cardLabel === "help wanted") {
                return `<p class="px-2 py-2 bg-amber-100 text-amber-500  rounded-4xl">
                    <i class="fa-solid fa-life-ring"></i> Help Wanted
                </p>`;
            }
            else if (cardLabel === "documentation") {
                return `<p class="px-2 py-2 bg-blue-100 text-blue-500 rounded-4xl">
                    <i class="fa-solid fa-book"></i> Documentation
                </p>`;
            }
            else if (cardLabel === "enhancement") {
                return `<p class="px-2 py-2 bg-purple-100 text-purple-500  rounded-4xl">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Enhancement
                </p>`;
            }
            else if (cardLabel === "good first issue") {
                return `<p class="px-2 py-2 bg-green-100 text-green-500 rounded-4xl">
                    <i class="fa-solid fa-star"></i> Good First Issue
                </p>`;
            }
            else {
                return "";
            }
        }).join("");



        const div = document.createElement("div")
        div.innerHTML = ` 
        <div onclick="loadDetail(${issue.id})" class="${issue.status.toLowerCase() === 'open' ? 'border-t-4 border-green-500' : 'border-t-4  border-purple-500'} rounded-lg shadow-lg h-full">
                <div class="p-8">
                    <div class="flex justify-between mb-4">
                        <img src="${issue.status.toLowerCase() === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="status">
                        <p class="px-4 text-center font-bold rounded-4xl uppercase
                        ${issue.priority.toUpperCase() === 'HIGH' ? 'bg-red-100 text-red-500' :
                issue.priority.toUpperCase() === 'MEDIUM' ? 'bg-yellow-100 text-yellow-500' :
                    'bg-gray-200 text-gray-500'}">
                        ${issue.priority}
                        </p>
                    </div>

                    <h2 class="text-xl font-bold mb-2">${issue.title}</h2>
                    <p class="text-gray-500 line-clamp-2">${issue.description}</p>

                    <div class="flex gap-2 mx-auto mt-4">
                        ${labelHTML}
                    </div>

                </div>

                <hr class="border border-gray-300 mb-4">

                <div class="pl-8 pb-8  space-y-4"> 
                    <p class="text-gray-500">#${issue.id} by ${issue.author}</p>
                    <p class="text-gray-500">${issue.createdAt}</p>
                </div>

            </div>
        
        `

        container.appendChild(div);
    })

        // Update issues count
   document.getElementById("issues-count").textContent = `${issues.length} Issues`;
  
}




loadIssues()



document.getElementById("search-btn").addEventListener("click", () => { 
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    // Fix the fetch URL to include the search term properly
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {  // Changed res to data here
            const allIssues = data.data;
            console.log(allIssues);

            // Filtering the issues based on the title
            const filteredIssues = allIssues.filter(issue => 
                issue.title.toLowerCase().includes(searchValue)
            );

            displayIssues(filteredIssues);
        })
        
});