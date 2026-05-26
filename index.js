const clock = document.getElementById("liveClock");
const activityInput = document.getElementById("activityInput");
const goalInput = document.getElementById("goalInput");
const addBtn = document.getElementById("createActivityBtn");
const grid = document.getElementById("activitiesGrid");
const detailView = document.getElementById("detailView")
const homeView = document.getElementById("homeView");

let activities = [];

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
        <p class="activity-time">${formatTime(a.todaySeconds)}</p>
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

    homeView.style.display = "none";
    detailView.style.display = "block";

    const goalText = selectedActivity.goalHours === null ? "No Daily goal" : `${selectedActivity.goalHours}h / day`;
    const progress = selectedActivity.goalHours === null ? null : Math.round((selectedActivity.todaySeconds / (selectedActivity.goalHours * 3600)) * 100);

    detailView.innerHTML = `
    <button id="backBtn" class="back-btn">← Back</button>
    <div class="detail-card">
        <h2 class="detail-title">${selectedActivity.name}</h2>
        <p class="detail-time">${formatTime(selectedActivity.todaySeconds)}</p>
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
        renderActivities();
    });

    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener('click', () => {
        startTimer(id);
    });
};

function startTimer(id) {
    activities = activities.map(a => {
        if (a.id === id) {
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

updateClock();

setInterval(updateClock, 1000);

loadFromStorage();
renderActivities();

