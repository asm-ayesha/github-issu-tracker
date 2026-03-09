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


    // if (id == 'interview-filter-btn') {
    //     cardContainer.classList.add('hidden');
    //     filterSection.classList.remove('hidden');
    //     if(interviewArry.length == 0){
    //         showEmptyMessage(filterSection)
    //         calCount()
    //     }
    //     else{
    //         renderInterview()
    //     }
    // }
    // else if (id == 'all-filter-btn') {
    //     cardContainer.classList.remove('hidden');
    //     filterSection.classList.add('hidden');
    //     calCount()
    // }
    // else if (id == 'rejected-filter-btn') {
    //     cardContainer.classList.add('hidden');
    //     filterSection.classList.remove('hidden');
    //     if(rejectedArry.length == 0){
    //         showEmptyMessage(filterSection)
    //         calCount()
    //     }
    //     else{
    //         renderRejected()
    //     }
    // }

}

