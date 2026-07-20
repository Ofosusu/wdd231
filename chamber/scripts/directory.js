const memberURL="data/members.json";

async function getSpotlights(){

const response=await fetch(memberURL);

const members=await response.json();

displaySpotlights(members);

}

function displaySpotlights(members){

const spotlight=document.querySelector("#spotlights");

const qualified=members.filter(member=>

member.membership===2 ||

member.membership===3

);

qualified.sort(()=>0.5-Math.random());

const selected=qualified.slice(0,3);

selected.forEach(member=>{

const card=document.createElement("section");

card.innerHTML=`

<img src="images/${member.image}" alt="${member.name}">

<h3>${member.name}</h3>

<p>${member.phone}</p>

<p>${member.address}</p>

<a href="${member.website}" target="_blank">

Visit Website

</a>

<p>

<strong>

${member.membership===3 ? "Gold Member" : "Silver Member"}

</strong>

</p>

`;

spotlight.appendChild(card);

});

}

getSpotlights();