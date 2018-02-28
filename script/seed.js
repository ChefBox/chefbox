/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const { User } = require('../server/db/models')
const { Product } = require('../server/db/models')
const { ProductImages } = require('../server/db/models')
const { Category } = require('../server/db/models')
const chance = require('chance')
console.log('product: ', User.create);
async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promgit sise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
  ]);

  console.log(`seeded ${users.length} users`);

  const categories = await Promise.all([
    {name: 'American', description: 'Its from America!'},
    {name: 'Chinese', description: 'Food with an asian flare from China'},
    {name: 'BBQ', description: 'Southern American Cuisine'},
    {name: 'Sushi', description: 'Raw Fish'},
    {name: 'Vegitarian', description: 'Has no meat'},
    {name: 'seafood', description: 'fish and shellfish'},
    {name: 'Thai', description: 'Food from thailand'},
    {name: 'Deli', description: 'sandwiches made of meat'},
    {name: 'Brazilian', description: 'Food from the country of brazil'},
  ])


  const products = await Promise.all([
    Product.create({name: 'Fish Tacos', description: 'Amazingly yummy', ingredients: ['tacos', 'fish'], price: 19.00, timeToPrep: 30, availabilty: 'pending', numberInStock: 45, calories: 750}),
    Product.create({name: 'Jalapeno', description: 'Amazingly yummy', ingredients: ['ground beef', 'bun', 'onion', 'spice mix', 'pickles', 'jack cheese', 'ketchup' ], price: 19.00, timeToPrep: 35, availabilty: 'pending', numberInStock: 45, calories: 650}),
    Product.create({name: 'Asian Salad', description: 'Amazingly yummy', ingredients: ['tacos', 'fish'], price: 19.00, timeToPrep: 2, availabilty: 'pending', numberInStock: 45, calories: 755}),
    Product.create({name: 'Grandmas\'s Chicken Noodel Soup', description: 'Amazingly yummy', ingredients: ['tacos', 'fish'], price: 19.00, timeToPrep: 60, availabilty: 'pending', numberInStock: 18, calories: 755}),

    Product.create({name: 'Shrimp Scampi with Pasta', description: 'Well-rounded seafood and pasta dish. Good with any pasta.', ingredients: ['shrimp', 'fish'], price: 19.00, timeToPrep: 30, availabilty: 'pending', numberInStock: 120, calories: 850}),

    Product.create({name: 'Rigatoni alla Genovese', description: 'Slow-simmered perfection! Sure, this old school recipe flies in the face of the convention that recipes must be, above all, quick, but the proof is in the process—and it’s an easy one! After rendering some pork fat from pancetta, brown your beef chuck in the fat, then add celery and carrot and seasonings, a little white wine, and finally, count them, 6 pounds of sliced onions! Everything gets cooked down and reduced over 10 hours until all the intermingled flavors become something akin to pure poetry in a pasta sauce. Serve with rigatoni or your favorite pasta. Get the recipe for Rigatoni alla Genovese.', ingredients: ['pancetta', 'beef chuck', 'celery', 'carrot', 'tomato paste'], price: 11.00, timeToPrep: 35, availabilty: 'pending', numberInStock: 64, calories: 800}),

    Product.create({name: 'Arroz Con Pollo', description: 'Wonderful homey chicken dish. This is a recipe from a relative in Panama. Fluff the rice carefully.', ingredients: ['tacos', 'fish'], price: 19.00, timeToPrep: 30, availabilty: 'pending', numberInStock: 45, calories: 755}),

    Product.create({name: 'Roasted Asparagus Salda with Feta Cheese', description: 'Yummy.', ingredients: ['tacos', 'fish'], price: 8.00, timeToPrep: 25, availabilty: 'pending', numberInStock: 53, calories: 600}),


  ]);
  console.log(`seeded ${products.length} products`)

  const productImages = await Promise.all([
    ProductImages.create({imageUrl: 'http://127.0.0.1:8080/seedMisc/img/1.jpeg', altCaption: 'im not sure what this is, TRY IT!'}),
    ProductImages.create({imageUrl: 'http://127.0.0.1:8080/seedMisc/img/2.jpeg', altCaption: 'ewwwwww'}),
    ProductImages.create({imageUrl: 'http://127.0.0.1:8080/seedMisc/img/3.jpeg', altCaption: 'Looks weird, i think'}),
    ProductImages.create({imageUrl: 'http://127.0.0.1:8080/seedMisc/img/4.jpeg', altCaption: ''}),
    ProductImages.create({imageUrl: 'http://127.0.0.1:8080/seedMisc/img/5.jpeg', altCaption: `I'm a teepot short and stout`}),
    ProductImages.create({imageUrl: 'http://127.0.0.1:8080/seedMisc/img/6.jpeg', altCaption: ''}),
    ProductImages.create({imageUrl: 'http://127.0.0.1:8080/seedMisc/img/7.jpeg', altCaption: ''}),
    ProductImages.create({imageUrl: 'http://127.0.0.1:8080/seedMisc/img/8.jpeg', altCaption: ''}),
  ])
  console.log(`seeded ${productImages.length} productsImages`)
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
