const searchTeam = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    searchField.value = "";
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayTeam(data.teams));
};
const displayTeam = (teams) => {
    // console.log(teams);
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    teams.forEach((team) => {
        // console.log(team.strTeam);
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div onclick="loadTeamDetails(${team.idTeam})" class="card pt-3">
            <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${team.strTeam}</h5>
                <p class="card-text">${team.strDescriptionEN.slice(0, 250)}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
};

const loadTeamDetails = (teamId) => {
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayTeamDetails(data.teams[0]));
};

const displayTeamDetails = (team) => {
    console.log(team);
    const teamDetail = document.getElementById("team-details");
    teamDetail.textContent = "";
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <img src="${team.strTeamJersey}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${team.strTeam}</h5>
            <h6>country:- ${team.strCountry}</h6>
            <p class="card-text">${team.strDescriptionEN}</p>
            <a href="https://${team.strYoutube}" target="_blank" class="btn btn-primary">YouTube</a>
            <a href="https://${team.strFacebook}" target="_blank" class="btn btn-primary">FaceBook</a>
        </div>
     `;
    teamDetail.appendChild(div);
};
