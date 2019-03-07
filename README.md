# Stracktivity

Visualize and analyse your  sports activities

## Setup
- Clone the project
- Create a folder in Stracktivity named `config`
- Create a file in config named `config.php`
```
  # cd Stracktivity
  # mkdir config && touch config/config.php
```
- Insert this script with your google map Api key in the config.php file:

      <?php
        define(define('GOOGLE_MAPS_KEY', 'YourGoogleMapApiKey');
        
- Run server (need to be in Stracktivity project)
`# php -S localhost:8080`

## Technologies
HTML, CSS, Javascript

Libraries: D3.js, Google Map API, JQuery, JQuery UI
