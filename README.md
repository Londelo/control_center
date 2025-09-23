CC-1 TODO:
  - More clearly define controllers, app logic and business logic
    - Hooks are not Controllers
    - use case:Defines how the outside world interacts with the business logic
    - logic: Core rules and policies that never change regardless of UI
    - DB is part of the outer most ring
  - Reduce the amount of functions im sure this can be simplified
  - Fix issues
    - navigating doesnt change the list
    - the list status is incorrect on init for a win
    - total lost count is off
    - lastSavedDate should be lastVisitedDate and it should be updated on init
    - data from the db needs to be saved on init in the state so I dont have to constantly call the db


