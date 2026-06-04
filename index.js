const clock = document.getElementById("liveClock");
const activityInput = document.getElementById("activityInput");
const goalInput = document.getElementById("goalInput");
const addBtn = document.getElementById("createActivityBtn");
const grid = document.getElementById("activitiesGrid");
const detailView = document.getElementById("detailView")
const homeView = document.getElementById("homeView");

let activities = [];
let currentActivityId = null;

function saveToStorage() {
    localStorage.setItem("saved_activities", JSON.stringify(activities));
}


function loadFromStorage() {
    const savedActivities = localStorage.getItem("saved_activities");
    if(savedActivities) {
        activities = JSON.parse(savedActivities);
    };
}

addBtn.addEventListener('click', () => {
    const name = activityInput.value.trim();
    if(!name) return;

    let goalHours;

    if (goalInput.value.trim() === "") {
        goalHours = null;
    } else {
        goalHours = Number(goalInput.value.trim());
    }

    const lastResetDate = new Date().toISOString().split("T")[0];

    const activity = {
        id: Date.now(),
        name,
        goalHours,
        color: "#e0f2fe",
        todaySeconds: 0,
        isRunning: false,
        startedAt: null,
        lastResetDate
    };

    activities.push(activity);
    activityInput.value = "";
    goalInput.value = "";
    saveToStorage();
    renderActivities();
});

function renderActivities() {
    grid.innerHTML = "";

    activities.forEach(a => {
        const div = document.createElement("div");
        div.classList.add("activity-card");

        const goalText = a.goalHours === null
        ? "No daily goal" : `${a.goalHours}h / day`;

        const progress = a.goalHours === null 
        ? null : Math.round((a.todaySeconds / (a.goalHours * 3600)) * 100);

        div.innerHTML = `
        <h3 class="divH3">${a.name}</h3>
        <p class="activity-time" data-id="${a.id}">${formatTime(getDisplaySeconds(a))}</p>
        <p class="activity-goal">${goalText}</p>
        <p class="activity-progress">
        ${progress === null ? "" : `${progress}% of daily goal`}
        </p>
        <div class="activity-actions">
            <button class="openBtn" data-id="${a.id}">Open</button>
            <button class="deleteBtn" data-id="${a.id}">X</button>
        </div>

        `

        const deleteBtn = div.querySelector(".deleteBtn");

        deleteBtn.addEventListener('click', () => {
            const aId = Number(deleteBtn.dataset.id);

            activities = activities.filter(a => aId !== a.id);
            saveToStorage();
            renderActivities();
        });

        const openBtn = div.querySelector(".openBtn");

        openBtn.addEventListener('click', () => {
            const id = Number(openBtn.dataset.id);
            openActivity(id);
        });

        grid.appendChild(div);
    })
};

function openActivity(id) {
    const selectedActivity = activities.find(a => a.id === id);

    if (!selectedActivity) return;
    currentActivityId = id;

    homeView.style.display = "none";
    detailView.style.display = "block";

    const goalText = selectedActivity.goalHours === null ? "No Daily goal" : `${selectedActivity.goalHours}h / day`;
    const progress = selectedActivity.goalHours === null ? null : Math.round((selectedActivity.todaySeconds / (selectedActivity.goalHours * 3600)) * 100);

    detailView.innerHTML = `
    <button id="backBtn" class="back-btn">← Back</button>
    <div class="detail-card">
        <h2 class="detail-title">${selectedActivity.name}</h2>
        <p class="detail-time">${formatTime(getDisplaySeconds(selectedActivity))}</p>
        <p class="detail-goal">${goalText}</p>
        <p class="detail-progress">${progress === null ? "" : `${progress}% of daily goal`}</p>

        <div class="timer-controls">
            <button id="startBtn" class="timer-btn primary">Start</button>
            <button id="pauseBtn" class="timer-btn">Pause</button>
            <button id="resetBtn" class="timer-btn ghost">Reset</button>
        </div>
    </div>
    `;

    const backBtn = document.getElementById("backBtn");

    backBtn.addEventListener("click", () => {
        detailView.style.display = "none";
        homeView.style.display = "block";
        currentActivityId = null;
        renderActivities();
    });

    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener('click', () => {
        startTimer(id);
    });

    const pauseBtn = document.getElementById("pauseBtn");
    pauseBtn.addEventListener('click', () => {
    pauseTimer(id);
    });

    const resetBtn = document.getElementById("resetBtn");
    resetBtn.addEventListener('click', () => {
        showResetModal(id);
    })


   startBtn.disabled = selectedActivity.isRunning;
   pauseBtn.disabled = !selectedActivity.isRunning;

};

function updateGridTimers() {
    const timeElements = document.querySelectorAll(".activity-time");
    console.log("grid timer update");
    timeElements.forEach(el => {
        const id = Number(el.dataset.id);
        const activity = activities.find(a => a.id === id);

        if (!activity) return;

        el.textContent = formatTime(getDisplaySeconds(activity));
    });
}


function startTimer(id){
    activities = activities.map(a => {
        if(a.id === id) {
            if (a.isRunning) {
                return a;
            }
            return {
                ...a,
                isRunning: true,
                startedAt: Date.now()
            }
        }
        return a
    });
    saveToStorage();
    openActivity(id);
}

function pauseTimer(id) {
    activities = activities.map(a => {
        if (a.id === id) {
            if (!a.isRunning || a.startedAt === null){
                return a;
            }
            
            const elapsedSeconds = Math.floor((Date.now() - a.startedAt) / 1000);

            return {
                ...a,
                todaySeconds: a.todaySeconds + elapsedSeconds,
                isRunning: false,
                startedAt: null
            };
        }

        return a;
    });

    saveToStorage();
    openActivity(id);
}

function resetTimer(id) {
    activities = activities.map(a => {
        if (a.id === id) {
            return {
                ...a,
                todaySeconds: 0,
                isRunning: false,
                startedAt: null
            };
        }
        return a;
    });
    saveToStorage();
    openActivity(id);
}

function showResetModal(id){
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
    <div class="reset-modal">
    <p class="modal-label">Reset activity</p>
    <h2 class="modal-h2">Are you sure?</h2>
    <p class="modal-text">
    This will reset time for this activity </p>

        <div class="modal-actions">
                <button id="cancelResetBtn" class="modal-btn ghost">Cancel</button>
                <button id="confirmResetBtn" class="modal-btn danger">Reset</button>
        </div>
    </div>
    `;

    document.body.appendChild(overlay);

    const cancelBtn = document.getElementById("cancelResetBtn");
    const confirmBtn = document.getElementById("confirmResetBtn");

    cancelBtn.addEventListener("click", () => {
        overlay.remove();
    });

    confirmBtn.addEventListener("click", () => {
        resetTimer(id);
        overlay.remove();
    });
}


function getDisplaySeconds(activity){
   if (!activity.isRunning){
    return activity.todaySeconds
   }
    const elepsedSeconds = Math.floor((Date.now() - activity.startedAt) / 1000);
    return activity.todaySeconds + elepsedSeconds
}

function updateDetailTimer() {
    if(currentActivityId === null) return;
    const currentActivity = activities.find(a => a.id === currentActivityId);

    if(!currentActivity) return;
    if(!currentActivity.isRunning) return;

    const detailTime = document.querySelector(".detail-time");

    if(!detailTime) return;

    detailTime.textContent = formatTime(getDisplaySeconds(currentActivity));
    
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateClock() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const currentTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    clock.innerHTML = currentTime;
}

function dailyReset(){
    const today = new Date().toISOString().split("T")[0];

    activities = activities.map(a => {
        if (a.lastResetDate !== today) {
            return {
                ...a,
                todaySeconds: 0,
                isRunning: false,
                startedAt: null,
                lastResetDate: today
            };
        }
        return a;
    });
    saveToStorage();
}

updateClock();

setInterval(updateClock, 1000);
setInterval(updateDetailTimer, 1000);
setInterval(updateGridTimers, 1000);

loadFromStorage();
dailyReset();
renderActivities();


