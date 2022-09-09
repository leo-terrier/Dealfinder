
# Deal Finder

This App was made as a web developer portefolio project, to practice React, CSS, HTML, CRUD operations, API, and databases (final codecademy project, Full Stack Career Path). 

**Objective**: Building a simple app to browse the FR national record of real estate deals and get market insights about any location in France.  


## Tech Stack

**Client:** React, MUI, google-map-react, 

**Server:** Node, Express, Passport, Node-postgres, Redis


## Features
The first step is to enter a valid location (number, street and zipcode), then clicking Find Deals. 

This will retreive up to 100 deals, within 300 meters around the given address. 

It's also possible to add more filters to narrow down the search : surface (min, max), price (min, max), specific street withing the perimeter around the given address

Results are then be displayed on a map and inside a datagrid.

The grid allows for sorting / filtering each column (address, price, surface, number of rooms, date).

The map can be dynamically draggued and filtered, to get new deals in nearby neighborhoods. 

Both results and searches can be saved in database for the next visit (if the user is registered and signed in). 


## Screenshots

![App Screenshot](https://github.com/leo-terrier/dealfinder/blob/master/screenshots/screenshot-1.png?raw=true)
![App Screenshot](https://github.com/leo-terrier/dealfinder/blob/master/screenshots/screenshot-2.png?raw=true)
![App Screenshot](https://github.com/leo-terrier/dealfinder/blob/master/screenshots/screenshot-3.png?raw=true)

## Data source

API calls : https://public.opendatasoft.com/explore/dataset/demande-de-valeurs-foncieres/table/?flg=fr&sort=date_mutation

Data : https://www.data.gouv.fr/fr/organizations/etalab/

## Authors

Léo Terrier
