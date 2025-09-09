const inputEL = document.querySelector('input');

async function getJSONData() {
    const response = await fetch('./assets/json/data.json');    
    return await response.json();
}

const searchRecord = async (value) => {
  console.log("Entered value = ", value.toUpperCase());

  const jsonData = await getJSONData();

  const recordFound = jsonData.find(
    (record) => record.code.trim() === value.trim().toUpperCase());

  //console.log(recordFound.code);

  const resultSectionEl = document.querySelector("#resultSection");
  const none = document.querySelector("#none");

  if (recordFound) {
    //update UI fields
    resultSectionEl.classList.remove("hidden");
    none.classList.add("hidden");
    resultSectionEl.querySelector("#query").innerText = value.toUpperCase();
    resultSectionEl.querySelector("#rto_id").innerText = recordFound.id;
    resultSectionEl.querySelector("#rto_code").innerText = recordFound.code;
    resultSectionEl.querySelector("#rto_location").innerText =
      recordFound.location;
    resultSectionEl.querySelector("#rto_type").innerText = recordFound.type;
    resultSectionEl.querySelector("#rto_district").innerText =
      recordFound.district;
  } 
  else{
    resultSectionEl.classList.add("hidden");
    none.classList.remove('hidden')
  } 
}

inputEL.addEventListener('keyup' , (e) => {
    //check my validation here
    if (e.key === 'Enter') {
        if (inputEL.value.length > 3 && inputEL.value.length < 10) {
            searchRecord(inputEL.value);
        }
    }
});