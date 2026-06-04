# Astra
## 08.05
Minimalist time tracking application focused on conscious time awareness.

Astra is my next frontend project after building larger applications like Journalist and smaller state-focused exercises like Ritual.

The goal of this project is not only to build another UI, but to better understand frontend application architecture and state design in real-world flows.

This project already differs from my previous ones because it requires working with more complex state objects and longer-term application thinking.

While planning Astra, I started understanding that state is not just “data for rendering UI”, but a representation of the application's reality.

Each activity in Astra contains its own logic and data:

* identity
* timer state
* daily progress
* reset logic
* goals
* persistence
* UI representation

The project is helping me understand:

* state → UI flow
* application architecture
* why state shape matters
* separation between raw data and presentation
* localStorage persistence
* timer logic
* render cycles
* thinking ahead before writing code

Current stack:

* HTML
* CSS
* Vanilla JavaScript
* localStorage

Planned MVP features:

* live clock
* activity creation
* daily goals
* individual activity timers
* detail view
* localStorage persistence
* automatic daily reset

Design direction:
Minimal futuristic interface inspired by calm Apple-like clarity, soft gradients and large whitespace.

The focus of Astra is not productivity pressure.
The focus is awareness of where time truly goes.


## 12.05.2026

Four days have passed since creating the Astra project folder.

Today i built the first real foundation of the application: 
* activity state
* rendering flow
* activity creation
* deleting activities
* first UI generated fully from state

this is also first larger state structure i have designed myself.

Working on Astra started showing me much more clearly how frontEnd data actualy works and how important application planning is before writing more code.

For the first time, i began feeling the difference between:
* raw aplication data
* derived UI data
* rendered interface 

Today i also ecountered real calculation logic for the first time while buildiing time formating functionality. 
At first the logic behind hours, minutes, seconds, modulo operations and formatting looked confusing, but after spending time breaking it down step by step, I now understand much better how applications transform raw numbers into state usable UI output. 

One important realization from today:
- good frontend work is often less about writing large amounts of code and more about understanding the flow of data and predicting how the application should behave before building it.

## 13.05.2026

Today Astra started feeling like a real application instead of a simple frontend exercise.

I focused on understanding application flow and state structure more deeply.  
This project already uses more complex objects than my previous projects, which forced me to think ahead and design the app architecture more carefully.

Today I worked on:

- activity state structure
- localStorage persistence
- formatting dynamic timer values
- rendering activity cards from state
- creating a separate detail view for activities
- switching between views (Home ↔ Detail)
- improving UI consistency and visual hierarchy

One of the most important things I learned today was how frontend applications transform state into UI.

I also spent time improving the visual direction of Astra.  
The app is moving toward a calm, futuristic and minimal interface with soft glassmorphism and large typography inspired by premium productivity tools.

For the first time, I feel like I’m not only writing code — I’m starting to understand how applications are actually designed.

## 21.05.2026

The last few days were not focused on adding new features.

Instead, I spent time revisiting the existing code, rewriting parts from memory and making sure I understood the logic behind them. I wanted to avoid moving forward without understanding the foundations of the project.

During this period I reviewed:

- state management
- localStorage persistence
- rendering flow
- detail view architecture
- array methods such as find() and filter()
- utility functions and data transformation

Today I moved forward with Astra's first time-related functionality.

I implemented a live clock and, more importantly, took time to fully understand how JavaScript works with time values. I learned how to retrieve the current time using the Date object, how to format hours, minutes and seconds into a readable HH:MM:SS format, and why methods such as String() and padStart() are necessary when displaying time.

I also planned the architecture of the activity timer. Before writing the feature itself, I mapped out how timer state should work, how start and pause actions will be handled, and how elapsed time can be calculated using timestamps.

This was a small coding day, but an important learning day. The goal was not to write more code, but to understand the mechanisms that the next features will rely on.

## 23.05.2026

Today was focused almost entirely on application logic rather than writing large amounts of code.

Before implementing Astra's timer system, I wanted to understand exactly how it should work and what information needs to be stored inside the state.

I mapped out the full timer flow:

- what happens when Start is pressed
- how the application remembers the moment tracking began
- how Pause calculates elapsed time
- how tracked time is added to the current daily total
- how the UI and state should stay synchronized

The most important realization was understanding that the timer should not simply count seconds endlessly. Instead, Astra stores the moment when tracking starts (`startedAt`) and later calculates the elapsed time using timestamps.

Current timer architecture:

Start:
- `isRunning = true`
- `startedAt = Date.now()`

Pause:
- calculate elapsed time using `Date.now() - startedAt`
- convert milliseconds into seconds
- add the result to `todaySeconds`
- set `isRunning = false`
- reset `startedAt` to `null`

Today was less about coding and more about designing a reliable system before implementation. Understanding the flow of data and state transitions is becoming just as important as writing the code itself.


## 26.05.2026 

Over the last two sessions I focused on understanding how Astra's timer should work internally.

The implementation itself is not particularly large, but it introduces a new concept for me: calculating time using timestamps and updating displayed values based on elapsed time.

At the moment I understand the overall architecture:

- Start should save the current timestamp
- Pause should calculate elapsed time
- Elapsed time should be added to the daily total
- The timer displayed on screen should reflect both saved and currently tracked time

However, I still need more time to fully understand the flow and how all parts work together. Rather than rushing implementation, I decided to spend additional time analyzing the logic and making sure I understand the mechanism before moving forward.

The goal of the next session is to finish understanding the timer architecture and begin implementing the tracking logic.

### 31.05.2026 — Timer System Complete

Over the last few sessions I focused almost entirely on understanding and implementing Astra's timer system.

At first, the timer seemed deceptively simple. However, it introduced several concepts that were new to me:

timestamps (Date.now())
elapsed time calculations
live UI updates with setInterval
separating application state from displayed values
understanding the difference between stored data and calculated data

Instead of rushing the implementation, I spent multiple sessions breaking the mechanism down into smaller pieces and making sure I understood how each part worked before moving on.

What was implemented

The timer now supports:

starting a tracking session
pausing a tracking session
live time updates in the activity detail view
calculating elapsed time using timestamps
storing completed session time in todaySeconds
preserving timer data through Local Storage
Important architectural decision

During development I considered a simpler approach where the application would increment todaySeconds every second:

todaySeconds++;

While this would have been easier to implement, I decided to use a timestamp-based solution instead.

The final timer stores the moment when a session starts (startedAt) and calculates elapsed time from the difference between the current timestamp and the start timestamp.

I chose this approach because I don't want to take shortcuts in my learning process. The implementation was harder to understand and required significantly more effort, but it helped me gain a deeper understanding of how timers, state management, and time calculations work in real applications.

Key lesson

One of the most important things I learned is the difference between:

stored application state (todaySeconds)
calculated display values (getDisplaySeconds())

The timer does not continuously save every second to the state. Instead, it calculates what should be displayed to the user and only updates the stored time when a session is paused.

Understanding this distinction was the main goal of this stage of the project.

## 03.06.2026

Today I focused on improving the timer system and strengthening my understanding of the architecture behind it.

Implemented:

- Reset timer functionality
- Confirmation modal before reset
- Dynamic modal creation through JavaScript
- Button state management (Start / Pause)
- Protection against multiple Start clicks while a timer is already running

Key lessons

Today I spent a significant amount of time understanding why some functions receive an id argument and others rely on currentActivityId.

A particularly important realization was understanding the difference between:

- functions triggered directly by user actions (which usually receive id)
- functions running independently through setInterval (which often need access to stored context)

I also learned how HTML button properties such as disabled work. Instead of creating custom logic with if statements, I can use built-in browser behavior by assigning boolean values directly to DOM properties.

Example:

startBtn.disabled = selectedActivity.isRunning;
pauseBtn.disabled = !selectedActivity.isRunning;

This reinforced my understanding of state-driven UI, where interface behavior is derived directly from application state.

## 03.06.2026

Implemented an automatic daily reset mechanism for all activities.

The application now checks activity dates during startup and automatically resets activity progress when a new day is detected.

Reset behavior:

- todaySeconds → 0
- isRunning → false
- startedAt → null
- lastResetDate → updated to current date

Application startup flow:

loadFromStorage()
↓
dailyReset()
↓
renderActivities()

Key lesson

Today I learned how startup logic can be used to keep application state valid before rendering any UI.

I also learned the difference between user-triggered actions (Start, Pause, Reset) and automatic application processes that run during initialization.

The daily reset system updates activity state only when necessary and persists the changes back to localStorage.

## 04.06.2026 

Today I focused on keeping the Home View synchronized with the timer system.

Implemented:

- Live timer updates on activity cards
- Automatic synchronization between Detail View and Home View
- Timer display based on getDisplaySeconds(activity)
- Grid timer updates running every second

Key lesson

Today I learned how to update multiple DOM elements using:

- querySelectorAll()
- forEach()
- data-id attributes

Each activity card stores its activity id in the DOM. This allows the application to find the corresponding activity in state and update its displayed timer without re-rendering the entire view.

The update flow:

setInterval()
↓
updateGridTimers()
↓
find activity by data-id
↓
getDisplaySeconds(activity)
↓
formatTime()
↓
update DOM element

I also spent time debugging a real-world issue caused by an incorrect data-id 