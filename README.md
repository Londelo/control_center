CC-1 TODO:
  - done - More clearly define controllers, app logic and business logic
    - Hooks are not Controllers
    - use case:Defines how the outside world interacts with the business logic
    - logic: Core rules and policies that never change regardless of UI
    - DB is part of the outer most ring
  - done - Reduce the amount of functions im sure this can be simplified
  - Fix issues
    - done - On init we want to get all the data and then pass it to the other init functions
    - done - total lost count is off
    - done - navigating does not change the list
    - done - lastSavedDate should be lastVisitedDate and it should be updated on init
    - done - data from the db needs to be saved on init in the state so I dont have to constantly call the db
    - done - we should not be allowed to navigate back if there is not record
    - done - the list status is incorrect on init for a win

