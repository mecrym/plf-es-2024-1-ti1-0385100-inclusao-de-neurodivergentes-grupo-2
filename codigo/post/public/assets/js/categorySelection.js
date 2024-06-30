const cardSport = document.querySelector(".card-sport");
const cardArt = document.querySelector(".card-art");
const cardHealth = document.querySelector(".card-health");
const cardWork = document.querySelector(".card-work");
const cardNutrition = document.querySelector(".card-nutrition");
const cardHome = document.querySelector(".card-home");
const cardStudy = document.querySelector(".card-study");
const cardBadHabit = document.querySelector(".card-badHabit");
const cardEntertainment = document.querySelector(".card-entertainment");
const cardRead = document.querySelector(".card-read");
const cardFinance = document.querySelector(".card-finance");
const cardOther = document.querySelector(".card-other");
var data = {tasks: [{category:"null"}]};
cardSport.addEventListener("click", (event)=>{data.tasks[0].category="Sports"; dataSave(data);});
cardArt.addEventListener("click", (event)=>{data.tasks[0].category="Art"; dataSave(data);});
cardHealth.addEventListener("click", (event)=>{data.tasks[0].category="Health"; dataSave(data);});
cardWork.addEventListener("click", (event)=>{data.tasks[0].category="Work"; dataSave(data);});
cardNutrition.addEventListener("click", (event)=>{data.tasks[0].category="Nutrition"; dataSave(data);});
cardStudy.addEventListener("click", (event)=>{data.tasks[0].category="Study"; dataSave(data); });
cardHome.addEventListener("click", (event)=>{data.tasks[0].category="Home"; dataSave(data);});
cardBadHabit.addEventListener("click", (event)=>{data.tasks[0].category="Bad Habit"; dataSave(data);});
cardEntertainment.addEventListener("click", (event)=>{data.tasks[0].category="Entertainment"; dataSave(data);});
cardRead.addEventListener("click", (event)=>{data.tasks[0].category="Read"; dataSave(data);});
cardFinance.addEventListener("click", (event)=>{data.tasks[0].category="Finance"; dataSave(data);});
cardOther.addEventListener("click", (event)=>{data.tasks[0].category="Other"; dataSave(data);});
function dataSave(data){
    localStorage.setItem('db', JSON.stringify(data));
}