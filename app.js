let searchInputEl=document.getElementById('searchInput')
let resultCountriesEl=document.getElementById('resultCountries')
let spinnerEl=document.getElementById('spinner')

function countryPage(eachData){
    let colContainer=document.createElement('div')
    colContainer.classList.add('col-12','col-md-6','country-card')
    resultCountriesEl.appendChild(colContainer)

    let divEl=document.createElement('div')
    divEl.classList.add('d-flex')
    divEl.style.gap="12px"
    colContainer.appendChild(divEl)

    let imageEl=document.createElement('img')
    imageEl.src=eachData.flag
    imageEl.classList.add('country-flag')
    divEl.appendChild(imageEl)

    let divEl2=document.createElement('div')
    divEl.classList.add('d-flex')
    divEl.appendChild(divEl2)

    let titleEl=document.createElement('h1')
    titleEl.textContent=eachData.name;
    titleEl.classList.add('country-name')
    divEl2.appendChild(titleEl)

    let paragrahEl=document.createElement('p')
    paragrahEl.textContent=eachData.population
    paragrahEl.classList.add('country-population')
    divEl2.appendChild(paragrahEl)
}




function containerPage(results){
    for(let data of results)
        countryPage(data)
}


spinnerEl.classList.toggle('d-none')
fetch('https://apis.ccbp.in/countries-data')
.then(response=>response.json())
.then(apiData=>{
    spinnerEl.classList.toggle('d-none')
    let countriesData=apiData;
    containerPage(countriesData)

    searchInputEl.addEventListener('keydown',(e)=>{
        resultCountriesEl.textContent=''
        let filteredArray=countriesData.filter(data=>{
            let countryName=data.name
            if(countryName.toLowerCase().includes(e.target.value.toLowerCase()))
                return true
        })
        containerPage(filteredArray)
    })
})

