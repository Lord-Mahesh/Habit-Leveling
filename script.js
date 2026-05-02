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
  {name:"🌅 Wake before 6:30",xp:5},
  {name:"🌙 Sleep before 11",xp:5},
  {name:"🏋️ Weights",xp:5},
  {name:"⚡ Cube PB",xp:10},
  {name:"🔥 Hard Practice",xp:10}
];

function initialData(){
  return {
    xp:0,
    streak:0,
    level:1,
    levelXP:0,
    history:{}
  };
}

let data = JSON.parse(localStorage.getItem("lifeGame")) || initialData();

function today(){
  return new Date().toDateString();
}

function getDay(){
  return new Date().getDay(); // 0=Sun, 6=Sat
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
  percent = Math.min(percent,100);

  document.getElementById("xp-fill").style.width = percent + "%";
  document.getElementById("xp-text").innerText =
    `${data.levelXP}/${need(data.level)}`;
}

function endDay(){
  const k = today();

  if(data.history[k]){
    alert("Already submitted today");
    return;
  }

  const day = getDay();
  const isWeekend = (day === 0 || day === 6);
  const isSunday = (day === 0);

  let dailyXP = 0;
  let coreDone = 0;

  // CORE
  core.forEach((h,i)=>{
    if(document.getElementById("c"+i).checked){
      dailyXP += h.xp;
      coreDone++;
    }
  });

  // NORMAL
  let allNormalDone = true;
  normal.forEach((h,i)=>{
    if(document.getElementById("n"+i).checked){
      dailyXP += h.xp;
    } else {
      allNormalDone = false;
    }
  });

  // BONUS
  bonus.forEach((h,i)=>{
    if(document.getElementById("b"+i).checked){
      dailyXP += h.xp;
    }
  });

  // PENALTIES (weekend logic)
  core.forEach((h,i)=>{
    const checked = document.getElementById("c"+i).checked;

    if(i === 0 && isWeekend) return; // College skip
    if(i === 1 && isSunday) return;  // Gym skip

    if(!checked){
      if(i === 0) dailyXP -= 20;
      else if(i === 1) dailyXP -= 10;
      else dailyXP -= 3;
    }
  });

  // PERFECT DAY
  const allCoreDone = coreDone === core.length;
  const notLazy = document.getElementById("lazyNo").checked;

  if(allCoreDone && allNormalDone && notLazy){
    dailyXP += 5;
  }

  // STREAK
  let effectiveCore = 6;
  if(isWeekend) effectiveCore--;
  if(isSunday) effectiveCore--;

  const skipped = effectiveCore - coreDone;

  if(skipped >= 3){
    data.streak = 0;
  } else {
    data.streak++;
    dailyXP += 2;
    if(data.streak % 10 === 0){
      dailyXP += 15;
    }
  }

  // LEVEL
  data.levelXP += dailyXP;

  while(data.levelXP >= need(data.level)){
    data.levelXP -= need(data.level);
    data.level++;
  }

  data.xp += dailyXP;

  data.history[k] = { xp: dailyXP };

  localStorage.setItem("lifeGame", JSON.stringify(data));

  update();
  showHistory();
}

function resetDay(){
  const confirmReset = confirm(
    "Reset TODAY?\nThis will clear XP, level, streak, history, notes."
  );
  if(!confirmReset) return;

  // Full wipe of app state
  data = initialData();

  // Clear UI
  document.querySelectorAll("input").forEach(i=>{
    if(i.type === "checkbox" || i.type === "radio") i.checked = false;
  });
  document.getElementById("notes").value = "";

  localStorage.setItem("lifeGame", JSON.stringify(data));

  update();
  showHistory();
}

function completeReset(){
  const confirmReset = confirm(
    "⚠️ This will delete EVERYTHING from storage.\nContinue?"
  );
  if(!confirmReset) return;

  localStorage.clear();
  location.reload();
}

function showHistory(){
  const historyDiv = document.getElementById("history");
  historyDiv.innerHTML = "";

  const days = Object.keys(data.history);

  if(days.length === 0){
    historyDiv.innerHTML = "<p>No history yet</p>";
    return;
  }

  days.sort((a,b)=> new Date(b) - new Date(a));

  days.forEach(day=>{
    const d = data.history[day];
    historyDiv.innerHTML += `
      <div class="history-day">
        <b>${day}</b><br>
        XP: ${d.xp}
      </div>
    `;
  });
}

showDate();
render();
update();
showHistory();