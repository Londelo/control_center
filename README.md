
TODO:

  - CC-(?): Make function types more centralized. The idea is basically the app is a set of types and then the functionality underneath. This will allow me to easily visualize the types, then I can make changes to those and the AI can do the work on the logic.
  - CC-(?): Set up a absolute date instead of a total number of days.
  - CC-(?): Set up a way to control the reset failure window, you should be able to make it longer or short as well as turn it off.
  - CC-(?): Centralize Date logic
  - CC-(?): Set up a failure button to restart the count and display when you failed, as well as somehow show that in the stats
  - CC-(?): Add a drag and drop reordering system
  - CC-(?): Create Google Sign in and Excel DB, and a way to switch from Excel DB to IndexDB
  - CC-(?): We need this to be live
  - CC-(?): Implement proper Server vs Client rendering
  - CC-(?): We need some instructions

IDEAS:
  - id love to have it so this app is as cheap to run as possible
    - the plan: have two options, 1 is to host your own data using indexDB but you can only use the service from one device, and 2 is to host your own data on google sheets if you have an account or want to make one


BUGS:
  - For powerLists each list has a unique id and each task it has, has a unique id. The problem is that for each task to be tracked across time it the tasks id must remain the same in each powerList. so powerList 10/11/25 has task id 123 and powerList 10/12/25 has task id 123

