const core = [
  {name:"🏫 College",xp:15},
  {name:"💪 Gym",xp:15},
  {name:"📖 Reading",xp:10},
  {name:"🎸 Ukulele",xp:5},
  {name:"🧩 Cube",xp:5},
  {name:"🧘 Meditation",xp:5}
];

const normal = [
  {name:"🤸 Stretching",xp:5},
  {name:"🥚 Eggs",xp:5},
  {name:"💰 Spending",xp:5},
  {name:"🪥 Brush",xp:5}
];

const bonus = [
  {name:"🏋️ Weights",xp:5},
  {name:"⚡ Cube PB",xp:10},
  {name:"🔥 Hard Practice",xp:10}
];

let data = JSON.parse(localStorage.getItem("lifeGame")) || {
  xp:0,streak:0,level:1,levelXP:0,history:{}
};

function today(){
  return new Date().toDateString();
}

function showDate(){
  document.getElementById("date").innerText = today();
}

function render(){
  const coreDiv = document.getElementById("core");
  const normalDiv = document.getElementById("normal");
  const bonusDiv = document.getElementById("bonus");

  coreDiv.innerHTML = "";
  normalDiv.innerHTML = "";
  bonusDiv.innerHTML = "";

  core.forEach((h,i)=>{
    coreDiv.innerHTML += `<label><input id="c${i}" type="checkbox">${h.name} (+${h.xp})</label>`;
  });

  normal.forEach((h,i)=>{
    normalDiv.innerHTML += `<label><input id="n${i}" type="checkbox">${h.name} (+${h.xp})</label>`;
  });

  bonus.forEach((h,i)=>{
    bonusDiv.innerHTML += `<label><input id="b${i}" type="checkbox">${h.name} (+${h.xp})</label>`;
  });
}

function need(l){
  return 100 + (l - 1);
}

function update(){
  document.getElementById("xp").innerText = data.xp;
  document.getElementById("streak").innerText = data.streak;
  document.getElementById("level").innerText = data.level;

  let percent = (data.levelXP / need(data.level)) * 100;

  document.getElementById("xp-fill").style.width = percent + "%";
  document.getElementById("xp-text").innerText =
    `${data.levelXP}/${need(data.level)}`;
}

function endDay(){
  let k = today();
  if(data.history[k]) return alert("Already done today");

  let dailyXP = 0;
  let done = 0;

  core.forEach((h,i)=>{
    if(document.getElementById("c"+i).checked){
      dailyXP += h.xp;
      done++;
    }
  });

  normal.forEach((h,i)=>{
    if(document.getElementById("n"+i).checked){
      dailyXP += h.xp;
    }
  });

  bonus.forEach((h,i)=>{
    if(document.getElementById("b"+i).checked){
      dailyXP += h.xp;
    }
  });

  // punishments
  if(!document.getElementById("c0").checked) dailyXP -= 20;
  if(!document.getElementById("c1").checked) dailyXP -= 10;
  if(!document.getElementById("c2").checked) dailyXP -= 3;
  if(!document.getElementById("c3").checked) dailyXP -= 3;
  if(!document.getElementById("c4").checked) dailyXP -= 3;

  let skip = 6 - done;

  if(skip >= 3){
    data.streak = 0;
  } else {
    data.streak++;
    dailyXP += 2;
    if(data.streak % 10 === 0) dailyXP += 15;
  }

  data.levelXP += dailyXP;

  while(data.levelXP >= need(data.level)){
    data.levelXP -= need(data.level);
    data.level++;
  }

  data.xp += dailyXP;

  data.history[k] = {
    xp: dailyXP,
    notes: document.getElementById("notes").value || "-"
  };

  localStorage.setItem("lifeGame", JSON.stringify(data));

  update();
  showHistory();
  resetDay();
}

function showHistory(){
  const historyDiv = document.getElementById("history");

  historyDiv.innerHTML = "";

  const days = Object.keys(data.history);

  if(days.length === 0){
    historyDiv.innerHTML = "<p>No history yet</p>";
    return;
  }

  // sort latest first
  days.sort((a,b)=> new Date(b) - new Date(a));

  days.forEach(day=>{
    const d = data.history[day];

    historyDiv.innerHTML += `
      <div class="history-day">
        <b>${day}</b><br>
        XP: ${d.xp}<br>
        Notes: ${d.notes}
      </div>
    `;
  });
}

function resetDay(){
  document.querySelectorAll("input").forEach(i=>i.checked=false);
  document.getElementById("notes").value = "";
}

function showResetPopup(){
  document.getElementById("reset-popup").style.display="flex";
}

function closePopup(){
  document.getElementById("reset-popup").style.display="none";
}

function completeReset(){
  localStorage.clear();
  location.reload();
}

showDate();
render();
update();
showHistory();