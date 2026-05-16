*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

:root{
  --card:rgba(8,15,35,0.68);

  --border:rgba(255,255,255,0.12);

  --primary:#00eaff;

  --green:#00ff95;

  --pink:#ff3cac;

  --text:#f8fbff;
}

/* LIGHT MODE */

body.light{

  --card:rgba(255,255,255,0.78);

  --border:rgba(0,0,0,0.08);

  --primary:#0077ff;

  --green:#00aa66;

  --pink:#ff0066;

  --text:#101828;

  background:
    linear-gradient(
      rgba(230,240,255,0.70),
      rgba(230,240,255,0.82)
    ),

    url("https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1974&auto=format&fit=crop");

  background-size:cover;

  background-position:center;

  background-attachment:fixed;
}

body{
  font-family:'Poppins',sans-serif;

  min-height:100vh;

  padding:20px;

  overflow-x:hidden;

  color:var(--text);

  position:relative;

  background:
    linear-gradient(
      rgba(2,6,23,0.72),
      rgba(2,6,23,0.82)
    ),

    url("https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2070&auto=format&fit=crop");

  background-size:cover;

  background-position:center;

  background-attachment:fixed;

  transition:0.35s;
}

/* TOP */

.top-fixed{
  display:flex;

  justify-content:space-between;

  align-items:center;

  margin-bottom:15px;
}

.floating-stats{
  display:flex;

  gap:16px;
}

.floating-item{
  padding:12px 22px;

  border-radius:18px;

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,0.12),
      rgba(255,255,255,0.05)
    );

  border:1px solid rgba(255,255,255,0.10);

  backdrop-filter:blur(14px);

  display:flex;

  align-items:center;

  gap:10px;

  font-size:14px;

  font-weight:600;

  box-shadow:
    0 0 25px rgba(255,255,255,0.08);
}

.floating-item span{
  font-size:18px;

  font-weight:700;
}

.xp-ui{
  box-shadow:
    0 0 20px rgba(0,234,255,0.25);
}

.streak-ui{
  box-shadow:
    0 0 20px rgba(255,120,0,0.25);
}

/* THEME */

.theme-toggle{
  padding:10px 16px;

  border:none;

  border-radius:14px;

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,0.12),
      rgba(255,255,255,0.05)
    );

  color:var(--text);

  cursor:pointer;

  backdrop-filter:blur(10px);

  transition:0.25s;
}

.theme-toggle:hover{
  transform:translateY(-2px);
}

/* TITLE */

h1{
  text-align:center;

  font-size:42px;

  font-family:'Orbitron';

  color:white;

  letter-spacing:5px;

  text-shadow:
    0 0 20px rgba(255,255,255,0.7);

  margin-bottom:5px;
}

#date{
  text-align:center;

  opacity:0.7;

  font-size:14px;

  margin-bottom:24px;
}

/* LEVEL */

.level-section{
  max-width:500px;

  margin:0 auto 28px;

  text-align:center;
}

.level-text{
  font-size:22px;

  margin-bottom:10px;
}

.xp-bar{
  width:100%;

  height:15px;

  background:rgba(255,255,255,0.08);

  border-radius:30px;

  overflow:hidden;
}

#xp-fill{
  width:0%;

  height:100%;

  background:
    linear-gradient(
      90deg,
      var(--primary),
      var(--green)
    );

  box-shadow:
    0 0 18px var(--primary);

  transition:0.3s;
}

#xp-text{
  display:block;

  margin-top:8px;

  font-size:13px;
}

/* GRID */

.container{
  display:grid;

  grid-template-columns:
    repeat(3,1fr);

  gap:18px;
}

.bottom-grid{
  margin-top:20px;

  display:grid;

  gap:18px;
}

/* CARDS */

.card{
  background:var(--card);

  border:1px solid rgba(255,255,255,0.10);

  border-radius:24px;

  padding:22px;

  backdrop-filter:blur(18px);

  transition:0.3s;

  overflow:hidden;

  position:relative;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.25);
}

.card::before{
  content:"";

  position:absolute;

  inset:0;

  background:
    linear-gradient(
      120deg,
      transparent,
      rgba(255,255,255,0.05),
      transparent
    );

  transform:translateX(-100%);

  transition:0.7s;
}

.card:hover::before{
  transform:translateX(100%);
}

.card:hover{
  transform:translateY(-5px);

  box-shadow:
    0 0 30px rgba(255,255,255,0.08);
}

.core{
  border-color:rgba(0,234,255,0.5);
}

.normal{
  border-color:rgba(0,255,149,0.5);
}

.bonus{
  border-color:rgba(255,60,172,0.5);
}

.notes{
  border-color:#9d4dff;
}

.mind-card{
  border-color:#ffcc00;
}

.card h3{
  font-size:20px;

  margin-bottom:18px;
}

/* HABITS */

label{
  display:flex;

  justify-content:space-between;

  align-items:center;

  margin:14px 0;

  font-size:15px;
}

input[type="checkbox"]{
  appearance:none;

  width:20px;
  height:20px;

  border-radius:6px;

  border:2px solid rgba(255,255,255,0.6);

  margin-right:10px;

  position:relative;

  cursor:pointer;
}

input[type="checkbox"]:checked{
  background:var(--primary);

  border-color:var(--primary);

  box-shadow:
    0 0 12px var(--primary);
}

input[type="checkbox"]:checked::after{
  content:"✓";

  position:absolute;

  top:50%;
  left:50%;

  transform:translate(-50%,-50%);

  color:black;

  font-size:12px;

  font-weight:bold;
}

/* NOTES */

textarea{
  width:100%;

  height:150px;

  border:none;

  outline:none;

  border-radius:18px;

  background:rgba(0,0,0,0.35);

  color:var(--text);

  padding:16px;

  font-size:14px;

  resize:none;
}

textarea::placeholder{
  color:rgba(255,255,255,0.45);
}

.auto-save{
  margin-top:10px;

  text-align:right;

  font-size:12px;

  opacity:0.7;
}

/* MIND */

.mind-options{
  display:grid;

  grid-template-columns:1fr 1fr;

  gap:15px;
}

.mind-option{
  border:2px solid rgba(255,255,255,0.1);

  border-radius:18px;

  padding:20px;

  display:flex;

  justify-content:center;

  align-items:center;

  transition:0.25s;

  cursor:pointer;
}

.good.selected{
  border-color:var(--green);

  box-shadow:
    0 0 20px rgba(0,255,149,0.3);
}

.bad.selected{
  border-color:var(--pink);

  box-shadow:
    0 0 20px rgba(255,60,172,0.3);
}

.mind-option input{
  display:none;
}

.mind-content{
  display:flex;

  flex-direction:column;

  align-items:center;

  gap:8px;

  font-size:22px;
}

.mind-content span{
  font-size:14px;
}

/* BUTTONS */

.buttons{
  display:flex;

  justify-content:center;

  gap:15px;

  flex-wrap:wrap;

  margin-top:28px;
}

button{
  border:none;

  padding:14px 28px;

  border-radius:14px;

  font-size:16px;

  font-family:'Rajdhani';

  font-weight:700;

  cursor:pointer;

  transition:0.25s;
}

button:hover{
  transform:translateY(-2px);
}

.end{
  background:
    linear-gradient(
      135deg,
      #00bfff,
      #00eaff
    );

  color:white;

  box-shadow:
    0 0 20px rgba(0,234,255,0.3);
}

.reset{
  background:
    linear-gradient(
      135deg,
      #ff0066,
      #ff3366
    );

  color:white;
}

.danger-zone{
  text-align:center;

  margin-top:15px;
}

.danger-btn{
  background:
    linear-gradient(
      135deg,
      #990000,
      #ff0033
    );

  color:white;
}

/* HISTORY */

.history-title{
  text-align:center;

  margin:35px 0 18px;

  font-size:28px;
}

#history{
  display:grid;

  grid-template-columns:
    repeat(auto-fit,minmax(220px,1fr));

  gap:16px;
}

.history-day{
  background:rgba(10,20,40,0.72);

  border-radius:18px;

  padding:18px;

  border-left:5px solid var(--primary);

  backdrop-filter:blur(12px);
}

.history-note{
  margin-top:10px;

  font-size:13px;

  opacity:0.8;

  line-height:1.5;
}

/* MOBILE */

@media(max-width:1000px){

  .container{
    grid-template-columns:1fr;
  }

}

@media(max-width:700px){

  h1{
    font-size:30px;
  }

  .mind-options{
    grid-template-columns:1fr;
  }

  .top-fixed{
    flex-direction:column;

    gap:14px;
  }

}
