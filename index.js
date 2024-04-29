async function getData(URL){
   let res= await fetch(URL);
   let value = await res.json();
   value = value.data;
   showData(value)
}
let tableBody = document.querySelector("tbody");
 function showData(arr){
     arr.forEach(function(ele){
        let tr = document.createElement("tr");
        let snum = document.createElement("td");
        snum.innerText = ele.id;
        let name = document.createElement("td");
        name.innerText = ele.name;
        let gender = document.createElement("td");
        gender.innerText = ele.gender;
        let department = document.createElement("td");
        department.innerText = ele.department;
        let salary = document.createElement("td");
        salary.innerText = ele.salary;

        tr.append(snum,name,gender,department,salary)
        tableBody.append(tr)
     })
 }

let departmentSelector = document.getElementById("deparmentName")
departmentSelector.addEventListener("change", function(e){
    let value = e.target.value;
    filterDepartment(value)
}
)

async function filterDepartment(value){
    tableBody.innerHTML = null;
    if(value == "select department"){
        getData(URL)
    }
   let response = await fetch (`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=department&filterValue=${value}`)

   let val = await response.json()
    
   showData(val.data)
}

let genderInp = document.getElementById("genderInput")
genderInp.addEventListener("change", function(e){
    let val = e.target.value;
    filterGender(val)
})


async function filterGender(val){
  tableBody.innerHTML = null;
  if(val == "gender"){
    getData(URL)
  }
  let response = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=gender&filterValue=${val}`)
  let value = await response.json()
  showData(value.data)
}

let salaryInp = document.getElementById("salaryInput")
salaryInp.addEventListener("change", function(e){
    let val = e.target.value;
    sortSalary(val)
})


async function sortSalary(val){
    tableBody.innerHTML = null;
    let res= await fetch(URL);
   let value = await res.json();
   let  result = value.data;
   if(val == "Low to High"){
    result.sort((a,b)=> a.salary - b.salary)
   }
   else if(val =="High to Low"){
    result.sort((a,b)=> b.salary - a.salary)
   }
  
    
   showData(result)
    
}

let pageNum = 1

function next(){
    tableBody.innerHTML=null;
    pageNum++
    if(pageNum >= 1 && pageNum <=10){
        getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${pageNum}&limit=10`)
    }
    else{
        pageNum = 1;
        getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${pageNum}&limit=10`)
    }
}

function prev(){
    tableBody.innerHTML = null;
    pageNum--
    if(pageNum >= 1 && pageNum <=10){
        getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${pageNum}&limit=10`)
    }
    else{
        pageNum = 1;
        getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${pageNum}&limit=10`)
        alert("This is the first page use next button to go to the next page")
}
}

                 


let URL = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${pageNum}&limit=10`
 getData(URL)