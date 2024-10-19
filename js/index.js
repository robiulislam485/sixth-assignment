const loadCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await response.json()
    displayCategories(data.categories);
};
const loadAllPets = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await response.json();
    displayAllPets(data.pets);
    sortedByprice(data.pets);
};
const loadDetails = async (petId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await response.json();
    displayDetailsModal(data.petData);
};
const removeClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (let button of buttons) {
        button.classList.remove('active')
    }
}
const loadPetsByCategory = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            const activeBtn = document.getElementById(`btn-${category}`);
            removeClass();
            activeBtn.classList.add("active")
            showPetsByCategory(data.data);
        })
        .catch((error) => console.log(error))
};
const sortedByprice = (allData) => {
    const sorted = allData.sort((a, b) => b.price - a.price);
    document.getElementById('sortBtn').addEventListener('click', () => {
        document.getElementById('loader').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden');
            displayAllPets(sorted);
        }, 2000);
    });
};
const showPetsByCategory = (categories) => {
    document.getElementById('loader').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        displayAllPets(categories);
    }, 2000);
};
const displayDetailsModal = (id) => {
    const data = id;
    const { image, pet_name, vaccinated_status, breed, gender, price, date_of_birth, pet_details } = data;
    const createModal = document.getElementById('modal-content');
    const modalContent = document.createElement("div")
    modalContent.classList = ""
    createModal.innerHTML = ` 
    <div class="space-y-1">
    <div class="flex items-center justify-center">
    <img class="rounded-lg w-full h-56" src="${image}"/>
    </div>
    <p class="text-2xl text-black font-bold"> ${pet_name}</p>
   <div class="flex  gap-8">
   <div>
    <p class="text-gray-500 flex gap-1 items-center font-semibold"><img class="w-4" src="https://img.icons8.com/?size=50&id=GhW7E6TRTWHw&format=png"/>Breed: ${breed == null && breed == undefined ? `N/A` : `${breed}`}</p>
    <p class="text-gray-500 flex gap-1 items-center font-semibold"><i class="fa-solid fa-venus-double"></i> Gender: ${gender == null && gender == undefined ? `N/A` : `${gender}`}</p>
    <p class="text-gray-500 flex gap-1 items-center font-semibold"><i class="fa-solid fa-venus-double"></i> Vaccinated Status: ${vaccinated_status}</p>
   </div>
   <div>
   <p class="text-gray-500 flex gap-1 items-center font-semibold"><i class="fa-solid fa-cake-candles"></i> Birth: ${date_of_birth == null && date_of_birth == undefined ? `N/A` : `${date_of_birth}`}</p>
   <p class="text-gray-500 flex gap-1 items-center font-semibold"><i class="fa-solid fa-hand-holding-dollar"></i> Price: ${price == null && price == undefined ? `N/A` : `${price}`}$</p>
   </div>
   </div>
    <p class="text-xl text-black font-semibold ">Details Information</p>
    <p class="text-gray-500"> ${pet_details}</p>
   </div>
    `;
    createModal.append(modalContent);
    document.getElementById('customModal').showModal();
};

const adoptBtn = () => {
    const adoptModal = document.getElementById('modal');
    const countText = document.getElementById('countDownText');
    let countDown = 3;
    adoptModal.classList.remove('hidden');
    countText.innerText = countDown;
    const countDownFunction = setInterval(() => {
        countDown--;
        countText.innerText = countDown;
        if (countDown <= 0) {
            clearInterval(countDownFunction);
            adoptModal.classList.add('hidden');
        };
    }, 1000);
};
const displayAllPets = (pets) => {
    const allPetContainer = document.getElementById("all-pets-container");
    allPetContainer.innerHTML = "";
    if (pets == 0) {
        document.getElementById('noContainer').classList.remove('hidden');
        return;
    }
    document.getElementById('noContainer').classList.add('hidden');
    pets.forEach(item => {
        const { image, pet_name, breed, date_of_birth, gender, price, petId } = item;
        const card = document.createElement("div");
        card.classList = "border border-gray-300 rounded-lg shadow-xl p-6 space-y-4";
        card.innerHTML = `
    <img class="rounded-lg" src="${image}" />
    <h1 class="text-lg text-black font-bold">  ${pet_name}</h1>
    <h1 class="text-gray-500 flex gap-1 items-center font-semibold"> <img class="w-4" src="https://img.icons8.com/?size=50&id=GhW7E6TRTWHw&format=png"/> Breed: ${item?.breed == null && item?.breed == undefined ? `N/A` : `${item?.breed}`}</h1>
    <h1 class="text-gray-500 flex gap-1 items-center font-semibold"><i class="fa-solid fa-cake-candles"></i> Birth: ${item?.date_of_birth == undefined && item?.date_of_birth == null ? `N/A` : `${item?.date_of_birth}`}</h1>
    <h1 class="text-gray-500 flex gap-1 items-center font-semibold"><i class="fa-solid fa-venus-double"></i> Gender: ${item?.gender == undefined && item?.gender == null ? `N/A` : `${item?.gender}`}</h1>
    <h1 class="text-gray-500 flex gap-1 items-center font-semibold"><i class="fa-solid fa-hand-holding-dollar"></i> Price: ${item?.price == undefined && item?.ptice == null ? `N/A` : `${item?.price}`}$</h1>
    <hr class="bg-gray-600">
   <div class=" flex justify-between">
   <button onclick="showImageRight('${image}')" id="likeBtn" class="btn"><i class="fa-solid fa-thumbs-up"></i></button>
   <button onclick="adoptBtn()" class="btn text-forBtn text-lg font-bold">Adopt</button>
   <button id="detailsBtn" onclick="loadDetails('${petId}')" class="btn text-forBtn text-lg font-bold">Details</button>
   </div>
    `;
        allPetContainer.append(card);
    })
};
const showImageRight = (image) => {
    const showCard = document.getElementById("right-image-container");
    const createCard = document.createElement('div');
    createCard.classList = "justify-start";
    createCard.innerHTML = `
    <img class="p-1 border border-gray-300 rounded-lg" src="${image}"/>
    `;
    showCard.append(createCard);
};
const displayCategories = (categories) => {
    const buttonConatiner = document.getElementById("button-container");
    categories.forEach(item => {
        const { id, category, category_icon } = item;
        const button = document.createElement("button");
        button.innerHTML = `
    <button id="btn-${item.category}" onclick="loadPetsByCategory('${item.category}')" class="btn category-btn px-3 md:px-12 py-2 flex gap-2 md:gap-3"><p>${category}</p>
    <img class="w-8" src="${category_icon}"/></button>
    `;
        buttonConatiner.append(button);
    });
};
loadCategories();
loadAllPets();
