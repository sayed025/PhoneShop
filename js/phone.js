const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll);
}

const displayPhones = (phones,isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // display show all button is there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length>12 && !isShowAll)
    {
        showAllContainer.classList.remove('hidden');
    }
    else
    {
        showAllContainer.classList.add('hidden');
    }

    if(!isShowAll)
    {
        phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        
        // create a div of card
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4`;
        phoneCard.innerHTML = `
                    <figure>
                      <img
                        src="${phone.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}');" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `;

        //4 append child
        phoneContainer.appendChild(phoneCard);
    });

    //hide looading spinner
    toggleLoadingSpinner(false);
}

// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText,isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
    loadingSpinner.classList.remove('hidden');
    }
    else
    {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all

const handleShowAll = () => {
     handleSearch(true);
}

const handleShowDetail = async(id) => {
    // console.log(id);

    // load single phone data

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    
    showPhoneDetails(data.data);
}

const showPhoneDetails = (phone) => {

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <h3 id="phone-name" class="text-3xl font-bold">${phone.name}</h3>
    <img src="${phone.image}"/>
    <p> <span> Storage:</span> ${phone?.mainFeatures?.storage} </p>
    `
    show_details_modal.showModal();
}

loadPhone();