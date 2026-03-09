const allBtn = document.getElementById("all-btn")
const openBtn = document.getElementById("open-btn")
const closedBtn = document.getElementById("closed-btn")

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
    displayIssues(data.data)
}


function displayIssues(issues) {
    const container = document.getElementById("issues-container")
    container.innerHTML = ""




    issues.forEach(issue => {

        const priorityClass =
            issue.priority.toUpperCase() === 'HIGH' ? 'bg-red-100 text-red-500' :
                issue.priority.toUpperCase() === 'MEDIUM' ? 'bg-yellow-100 text-yellow-500' :
                    'bg-green-100 text-green-500';
        console.log('Priority:', issue.priority);

        const div = document.createElement("div")
        div.innerHTML = ` 
        <div class="border-t-4  border-amber-200  rounded-lg shadow-lg h-full">
                <div class="p-8">
                    <div class="flex justify-between mb-4">
                        <img src="./assets/Open-Status.png" alt="">
                        <p class="px-4 text-center font-bold rounded-4xl uppercase
                        ${issue.priority.toUpperCase() === 'HIGH' ? 'bg-red-100 text-red-500' :
                        issue.priority.toUpperCase() === 'MEDIUM' ? 'bg-yellow-100 text-yellow-500' :
                        'bg-gray-200 text-gray-500'}">
                        ${issue.priority}
                        </p>
                    </div>

                    <h2 class="text-xl font-bold mb-2">${issue.title}</h2>
                    <p class="text-gray-500 line-clamp-2">${issue.description}</p>

                    <div class="flex justify-between mt-4">
                        <p class="px-4 py-2 bg-red-100 text-center text-red-500 font-bold rounded-4xl"><i
                                class="fa-solid fa-bug"></i> Bug</p>
                        <p class="px-4 py-2 bg-amber-100 text-center text-amber-500 font-bold rounded-4xl"><i
                                class="fa-solid fa-life-ring"></i> help wanted</p>
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
}

loadIssues()