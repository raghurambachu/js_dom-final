const tabList_DOM = document.querySelector(".tab-list");
const peopleContainer_DOM = document.querySelector(".people-container");



function createTabContainer(data = got) {
    let tabContent = data.houses.map((family,index) => {
        return `
                    <li class="tab-item" data-id="${index}"> 
                        ${family.name}
                    </li>
                `;
    }).join("");    
    tabList_DOM.innerHTML = "";
    tabList_DOM.innerHTML = tabContent;
}

function removeActiveFromTab() {
    const allTabs = document.querySelectorAll(".tab-item");
    allTabs.forEach(tab => {
        if(tab.classList.contains("active")){
            tab.classList.remove("active")
        }
    })
}

function createPersonContent(familyContent) {
    return familyContent.people.map(person => {
        return `
        <div class="person-item">
            <div class="person-item-top flex">
                <div class="person-image">
                    <img src=${person.image} alt="${person.name}">
                </div>
                <h2>
                    ${person.name}
                </h2>
            </div>
            <div>
                <p class="content">
                    ${person.description}
                </p>
            </div>
        </div>
        `
    }).join("");
}

function handleClick(event){
    if(!event.target.closest(".tab-item")) return;
    let tabItem = event.target.closest(".tab-item");
    removeActiveFromTab();
    tabItem.classList.add("active");
    let id = tabItem.dataset.id;
    
    let familyContent = got.houses[id];
    
    let personContent = createPersonContent(familyContent);
    peopleContainer_DOM.innerHTML = "";
    peopleContainer_DOM.innerHTML = personContent;
}

function starkSelected(stark) {
    const starkTab = document.querySelector(".tab-item[data-id='0']")
    starkTab.classList.add("active");
    let personContent = createPersonContent(got.houses[0]);
    peopleContainer_DOM.innerHTML = "";
    peopleContainer_DOM.innerHTML = personContent;
}

document.body.addEventListener("click",handleClick);

window.addEventListener("load",function(e){
    createTabContainer(got);
    starkSelected(got.houses[0]);

})