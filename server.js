
/* 
https://blog.logrocket.com/running-node-js-scripts-continuously-forever/
https://stackoverflow.com/questions/14556852/how-to-stop-node-js-application-using-forever-module-on-windows
forever list 
forever stop 0 
*/

/*
node postgres https://node-postgres.com/features/connecting
*/

// -------------------------------------------------------------
const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const dotenv = require('dotenv');
//const { Pool } = require('pg');     // postgres
const sqlite3 = require('sqlite3'); // sqlite

// handlers postgres (heroku)
//const handlers = require('./handlers_postgres');

// handlers sqlite3 (local) -> prefered 
const handlers_sqlite = require('./handlers_sqlite');


const app = new Koa();
app.use(cors());
app.use(koaBody( {json: true} ));
dotenv.config();


/*
// postgres init and check (for heroku)
app.pool = new Pool({ 
  connectionString: process.env.CONN_STR,
  ssl: {rejectUnauthorized: false}
});


// check for auth in heroku
app.pool.query('SELECT NOW()', (err, res) => { console.log('connected => ', err, res.rows) }); //pool.end() 
*/

/**/ 
app.dbs = new sqlite3.Database('./promoDB.db',  (err) => {
  if (err && err.code == "SQLITE_CANTOPEN") {
    console.log('cant open db');
    return;
  } else if (err) {
    console.log("Getting error " + err);
    exit(1);
  }
});



// routing
const router = new Router();

/*
// postgres urls
router.get('/', handlers.homePage);
router.get('/posts', handlers.postsGet);
router.post('/posts', handlers.postsPost);
router.put('/posts', handlers.postsUpdate);
router.delete('/posts/:id', handlers.postsDelete);
*/

// sqlite urls // handlers_sqlite.testCrap
//router.get('/test_crap',    handlers_sqlite.testCrap);
router.get('/articles',     handlers_sqlite.getArticles);
router.get('/articles/:id', handlers_sqlite.getArticlesById);
router.get('/reviews',      handlers_sqlite.getReviews);

app.use(router.routes()).use(router.allowedMethods());

// -------------------------------------------------------------
const port = process.env.PORT || 7000;
const server = http.createServer(app.callback());
server.listen(port, () => console.log(`server started on http://localhost:${port}`));
