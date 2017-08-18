# Node Template
## Installation

### Requirements
You should have [node.js](https://nodejs.org) and [git](https://git-scm.com/) installed on your system.
S3 configuration requires a [Amazon Web Services(AWS)](https://aws.amazon.com) account to create a bucket, receive a access key id and secret access key.
Email configuration requires free registration at [SendGrid](http://sendgrid.com/) to register for an API key.


### Clone Project
In your terminal/console clone the project by entering the following command:
```
git clone https://github.com/matthewstewart/node-template.git
```


### Configure
You will need to create the following configuration file in `/config/env.js`:
```js
// Environment Variables

// Application
process.env['APP_TITLE'] = "Node Template";
process.env['APP_ADMIN'] = "admin";

// Database
// Host @ https://mlab.com/

// ex.
// process.env['DB_USERNAME'] = "dbadmin";
process.env['DB_USERNAME'] = <your database username>;

// ex.
// process.env['DB_PASSWORD'] = "mysecretpassword";
process.env['DB_PASSWORD'] = <your database password>;

// ex.
// process.env['DB_URI'] = "olympia.modulusmongo.net:27017/a1B2c2D4";
process.env['DB_URI'] = <your database resource identifier>;



// Amazon S3
// Learn More @ https://aws.amazon.com

// ex.
// process.env['AWS_ACCESS_KEY_ID'] = "1A2B3C4D5E6F7G8H9I0J";
process.env['AWS_ACCESS_KEY_ID'] = <your aws access key id>;

// ex.
// process.env['AWS_SECRET_ACCESS_KEY'] = "1A2B3C4D5E6F7G8H9I0JpI92WiObzeL3PtuBpMsu";
process.env['AWS_SECRET_ACCESS_KEY'] = <your aws secret access key>;

// ex.
// process.env['S3_BUCKET'] = "mybucketname";
process.env['S3_BUCKET'] = <your aws bucket name>;



// SendGrid
// Learn More @ http://sendgrid.com/

// ex.
// process.env['SENDGRID_API_KEY'] = "1A2B3C4D5E6F7G8H9I0JpI92WiObzeL3PtuBpMsuAtIAtIJsv8ADzycbwBOrHOTeTbaIg";
process.env['SENDGRID_API_KEY'] = <your sendgrid api key>;
```

### Run From Terminal/Console
Change directory to the project, install and launch:
```
cd node-template
npm install
node server
```

### Open In Browser
Open your browser and type in:
```
localhost:3000
```


