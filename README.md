CC-1 TODO:
  - done - More clearly define controllers, app logic and business logic
    - Hooks are not Controllers
    - use case:Defines how the outside world interacts with the business logic
    - logic: Core rules and policies that never change regardless of UI
    - DB is part of the outer most ring
  - done - Reduce the amount of functions im sure this can be simplified
  - Fix issues
    - navigating does not change the list
    - total lost count is off
    - done - lastSavedDate should be lastVisitedDate and it should be updated on init
    - done - data from the db needs to be saved on init in the state so I dont have to constantly call the db
    - done - we should not be allowed to navigate back if there is not record
    - done - the list status is incorrect on init for a win


