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

    console.log(data.data)
}