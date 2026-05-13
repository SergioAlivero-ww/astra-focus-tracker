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