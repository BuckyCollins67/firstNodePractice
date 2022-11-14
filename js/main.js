document.querySelector('#clickMe').addEventListener('click', makeReq) //smurf listening for click

async function makeReq(){  //async simplifies promises, makes it more readable

  const userName = document.querySelector("#userName").value; //variable grabbed from #username
  const res = await fetch(`/api?student=${userName}`)  //fetch somethign, wait for it, use that data as "username"
  const data = await res.json()

  console.log(data);
  document.querySelector("#personName").textContent = data.name  //on the dom, replace the person name with the data you got from the fetch
  document.querySelector("#personStatus").textContent = data.status
  document.querySelector("#personOccupation").textContent = data.currentOccupation
}