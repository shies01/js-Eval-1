async function getData(URL){
   let res= await fetch(URL);
   let value = await res.json();
   value = value.data;
   showData(value)
}
let tableBody = document.querySelector("tbody");
let num = 1
 function showData(arr){
     arr.forEach(function(ele){
        let tr = document.createElement("tr");
        let snum = document.createElement("td");
        snum.innerText = num;
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
        num++
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
    pageNum ++
    if(pageNum >= 1 && pageNum <=10){
        getData(URL)
    }
}

function prev(){
    tableBody.innerHTML = null;
    pageNum--
    if(pageNum >= 1 && pageNum <=10){
        getData(URL)
    }
}

                 


let URL = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${pageNum}&limit=10`
 getData(URL)