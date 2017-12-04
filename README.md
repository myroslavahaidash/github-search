GitHub Search
===================


The project allows user to search for github repositories by repos' name.


How to run
-------------

Use ```yarn``` to install dependencies.
Use ```yarn start``` to run the project.

GitHub API restrictions
-------------
1. GitHub doesn't allow to sort repos by name (only by stars, forks, update and best match (by default)).
2. GitHub returns only first 1000 of search results.
3. GitHub allows to perform only 10 API requests per minute.
