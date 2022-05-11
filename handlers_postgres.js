
// https://node-postgres.com/features/queries

// homepage --------------------------------
const homePage = async (ctx) => {
  //let reqBody = ctx.request.body;
  //let id = ctx.params.id;
  ctx.response.body = 'welcome home!';
}

// posts get -------------------------------
const postsGet = async (ctx) => {
  let res = await ctx.app.pool.query('select * from TEST_tab1 order by id');
  //console.log(res);
  let rows = res.rows;
  //await pool.end();
  ctx.body = rows;
}

const postsPost = async (ctx) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);

  /**/
  let sql = 'INSERT INTO TEST_tab1(topic, contents) VALUES($1, $2)'
  let  values = [ reqBody.topic, reqBody.contents ];
  try {
    const res = await ctx.app.pool.query(sql, values)
    ctx.response.status = 204;
    return;
  } catch (err) {
    console.log(err.stack);
    return;
  }
  
}

const postsUpdate = async (ctx) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);

  let sql = 'update TEST_tab1 set topic=$1, contents=$2 where id=$3'
  let  values = [ reqBody.topic, reqBody.contents, reqBody.id ];
  try {
    const res = await ctx.app.pool.query(sql, values)
    ctx.response.status = 204;
    return;
  } catch (err) {
    console.log(err.stack);
    return;
  }  

}

const postsDelete = async (ctx) => {
  let id = ctx.params.id;

  let sql = 'delete from TEST_tab1 where id=$1';
  let values = [id];
  try {
    const res = await ctx.app.pool.query(sql, values)
    ctx.response.status = 204;
    return;
  } catch (err) {
    console.log(err.stack);
    return;
  }
}

exports.homePage = homePage;
//------------
exports.postsGet = postsGet;
exports.postsPost = postsPost;
exports.postsUpdate = postsUpdate;
exports.postsDelete = postsDelete;
//------------

