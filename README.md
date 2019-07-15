## Public Deployment
Deployed as a Heroku app at https://ivan-gt-api.herokuapp.com. 

# Prerequisites:
developed on the following:
* node 11.6.0
* npm 6.5.0
* mySQL 5.7.26

* create database with `init.sql` script. Uses `st_tc_db` as the database name.
  Change mySQL credentials as needed according to your local environment.
  **WARNING: will drop the database `st_tc_db`  when run.**

  **please use mySQL5.7, mySQL 8 is not supported.**

```
mysql -uroot < init.sql
```

# Development
* Start dev server with desired database configuration using the following
  environment variables:
  * DBUSER // default `root`
  * DBPASSWORD // default `password`
  * DBHOST // default `localhost`
  * DBPORT // default `3306`
  * DBNAME // default `st_tc_db`

example:
```
env DBUSER=root DBPASSWORD=password npm run dev
```

* or build server files directly without hosting


```
env DBUSER=root DBPASSWORD=password npm run build
```

# API Endpoints
see [API.md](API.md)

# Tests

* Run tests with mocha. This assumes that the target API server is set up and
  deployed. URL can be configured with the environment variable `DEPLOYMENT_URL`,
  or defaults to `http://localhost:3000`.


```
npm run tests
```

The tests are written as API unit/integration tests and does nothing other than
call the exposed APIs. As such, there are limitations with the current
specifications, such as not being able to reset the data because there is no
API to perform such actions.

# Notes

## Further Improvement

* Instantize testing - either connect to the SQL database in the tests
  themselves and execute commands, or expose APIs to reset/set database status
  outside of production functionality. Or, spin up a fresh database for each
  deployment and destroy it after tests pass

* Move tests to beside API files, however the tests currently rely on a
  specific order and a more verbose test command will be needed eventually.

* Write schema for API (Swagger, etc)

* Implement middleware for API call logs

* implement precommit hooks to lint files with Prettier for better coding style
  cohesion

## Code

### For this small project I have used the following:

* ExpressJS - simple API endpoint setup

* TypeScript - shifts errors to compile time instead of runtime with type
  checking. Not particularly beneficial for a small project like this, but it
  will have more benefits as the codebase grows and the code gets harder to
  maintain.

* async/await mySQL requests with mysql2 - more readable code, better data
  consistency

* Heroku - PaaS for deployment with considerably easy setup, quick to get a
  Node app up and running online, provides mySQL database instance as an add on
  in a few clicks -- configure environment variables and you're good to go.
  Managed to utilize Heroku CI to run test before each deployment whenever a
  commit is detected.
  Bonus: it's free for low tier usage
