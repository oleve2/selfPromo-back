
// https://www.linode.com/docs/guides/getting-started-with-nodejs-sqlite/
// https://github.com/TryGhost/node-sqlite3/wiki/API

// пример как делать
// https://stackoverflow.com/questions/44442028/how-to-make-koa-wait-for-a-node-sqlite3-result

/*
const testCrap = async (ctx, next) => {
  await new Promise( (resolve, reject) => {
    ctx.app.dbs.all('select id, name from test1', [], function(err, rows) {
      if (rows === null) {
        ctx.body = 'no data';
      } else {
        ctx.body = rows;
      }
      resolve()
    })
  })
}
*/

// articles all
const getArticles = async(ctx, next) => {
  await new Promise( (resolve, reject) => {
    ctx.app.dbs.all('select id, name, date, articleLink, text, comments from articles', [], function(err, rows) {
      if (rows === null) {
        ctx.body = 'no data';
      } else {
        let r2 = rows.map( (item) => {
          let commentsArr = [];
          let commsSplit = item.comments.split('\\t');
          commsSplit.forEach( (item) => {
            commentsArr.push(item.trim());
          })
          return {...item, comments: commentsArr} //[1,2,3]
        })
        ctx.body = r2;
      }
      resolve()
    })
  })  
}

// articles by id
const getArticlesById = async(ctx, next) => {
  let id = ctx.params.id;
  await new Promise( (resolve, reject) => {
    ctx.app.dbs.all('select id, name, date, articleLink, text, comments from articles where id=?', [id], function(err, rows) {
      if (rows === null) {
        ctx.body = 'no data';
      } else {
        let r2 = rows.map( (item) => {
          let commentsArr = [];
          let commsSplit = item.comments.split('\\t');
          commsSplit.forEach( (item) => {
            commentsArr.push(item.trim());
          })
          return {...item, comments: commentsArr} //[1,2,3]
        })
        ctx.body = r2[0];
      }
      resolve()
    })
  })  
}

// reviews all
const getReviews = async (ctx, next) => {
  let revs = await DataReviews(ctx.app.dbs);
  //console.log('revs=', revs);
  let comms = await DataReviewsComments(ctx.app.dbs); 
  //console.log('comms=', comms);

  let rev2 = revs.map( (item) => {
    let reviewsFilt = comms.filter( (elem) => elem.reviews_comment_id === item.id);
    return {...item, showReview: JSON.parse(item.showReview), reviews: reviewsFilt}
  })

  ctx.body = rev2;
  return;
}

const DataReviews = (dbs) => {
  return new Promise( (resolve, reject) => {
    let reviews;
    dbs.all('select id, reviewName, photoLink, cntStars, showReview from reviews', [], function(err, rows) {
      if (rows === null) {
        ctx.body = [];
      } else {
        reviews = rows;
        //console.log('2 reviews', reviews);
      }
      resolve(reviews);
    })
  })   
}

const DataReviewsComments = (dbs) => {
  return new Promise( (resolve, reject) => {
    let reviewsComments;
    dbs.all('select id, userName, reviewText, reviews_comment_id from reviews_comments', [], function(err, rows) {
      if (rows === null) {
        ctx.body = [];
      } else {
        reviewsComments = rows;
        //console.log('2 reviewsComments', reviewsComments);
      }
      resolve(reviewsComments);
    })
  })   
}




// ---------------------------------
//exports.testCrap = testCrap;
exports.getArticles = getArticles;
exports.getArticlesById = getArticlesById;
exports.getReviews = getReviews;
