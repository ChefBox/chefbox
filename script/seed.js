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
const { Review } = require('../server/db/models')
const Chance = require('chance')

const chance = new Chance(2378) //seeding value for predictable randomness
const maxReviews = 5 //per product
const numOfUsersToGen = 20;
const generateReview = () => {
  let title = chance.word()
  let titleLength = chance.integer({min: 0, max: 3})
  for (let i = 0; i < titleLength; i++){
    title += ' ' + chance.word()
  }
  return {
    title,
    content: chance.paragraph(chance.integer({min: 1, max: 3})),
    rating: chance.integer({min: 1, max: 5}),
  }
}
const associateCategories = (categories, products) => {
  const productCategoryAssociations = []
  for (let product of products){
    const randomInt = chance.integer({
      min: 0,
      max: categories.length - 1
    })
    productCategoryAssociations.push(product.setCategories(categories[randomInt]))
  }
  return productCategoryAssociations
}
const createUsers = numOfUsers => {
  const users = [
    {
      firstName: 'Cody',
      lastName: 'Doe',
      email: 'cody@email.com',
      password: '123',
      role: 'admin',
      address: chance.address(),
      city: chance.city(),
      state: chance.state({ full: true}),
      zip: chance.zip(),
    },
    {
      firstName: 'Murphy',
      lastName: 'Smith',
      email: 'murphy@email.com',
      password: '123',
      address: chance.address(),
      city: chance.city(),
      state: chance.state({ full: true}),
      zip: chance.zip(),
    }
  ]
  const emails = chance.unique(chance.email, numOfUsers)
  for (let i = users.length; i <= numOfUsers; i++){
    users.push({
      firstName: chance.first(),
      lastName: chance.last(),
      email: emails.pop(),
      password: chance.string(),
      address: chance.address(),
      city: chance.city(),
      state: chance.state({ full: true}),
      zip: chance.zip(),
    })
  }
  return users
}  /* eslint-disable max-statements */
async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promgit sise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const userList = createUsers(numOfUsersToGen)
  const users = await Promise.all(userList.map(user => User.create(user)));

  console.log(`seeded ${users.length} users`);

  const categories = await Promise.all([
    Category.create({ name: 'American', description: 'Its from America!' }),
    Category.create({ name: 'Chinese', description: 'Food with an asian flare from China' }),
    Category.create({ name: 'BBQ', description: 'Southern American Cuisine' }),
    Category.create({ name: 'Sushi', description: 'Raw Fish' }),
    Category.create({ name: 'Vegitarian', description: 'Has no meat' }),
    Category.create({ name: 'seafood', description: 'fish and shellfish' }),
    Category.create({ name: 'Thai', description: 'Food from thailand' }),
    Category.create({ name: 'Deli', description: 'sandwiches made of meat' }),
    Category.create({ name: 'Brazilian', description: 'Food from the country of brazil' }),
  ])
  console.log(`seeded ${categories.length} categories`)


  const products = await Promise.all([
    Product.create({ name: 'Fish Tacos', description: 'Amazingly yummy', ingredients: ['tacos', 'fish'], price: 8.50, timeToPrep: 30, availabilty: 'pending', numberInStock: 45, calories: 750 }),
    Product.create({ name: 'Jalapeno Burgers', description: 'Amazingly yummy', ingredients: ['ground beef', 'bun', 'onion', 'spice mix', 'pickles', 'jack cheese', 'ketchup'], price: 9.00, timeToPrep: 35, availabilty: 'pending', numberInStock: 45, calories: 650 }),
    Product.create({ name: 'Asian Salad', description: 'Amazingly yummy', ingredients: ['tacos', 'fish'], price: 10.95, timeToPrep: 2, availabilty: 'pending', numberInStock: 45, calories: 755 }),
    Product.create({ name: 'Grandmas\'s Chicken Noodel Soup', description: 'Amazingly yummy', ingredients: ['tacos', 'fish'], price: 9.95, timeToPrep: 60, availabilty: 'pending', numberInStock: 18, calories: 755 }),

    Product.create({ name: 'Shrimp Scampi with Pasta', description: 'Well-rounded seafood and pasta dish. Good with any pasta.', ingredients: ['shrimp', 'fish'], price: 9.00, timeToPrep: 30, availabilty: 'pending', numberInStock: 120, calories: 850 }),

    Product.create({ name: 'Rigatoni alla Genovese', description: 'Slow-simmered perfection! Sure, this old school recipe flies in the face of the convention that recipes must be, above all, quick, but the proof is in the process—and it’s an easy one! After rendering some pork fat from pancetta, brown your beef chuck in the fat, then add celery and carrot and seasonings, a little white wine, and finally, count them, 6 pounds of sliced onions! Everything gets cooked down and reduced over 10 hours until all the intermingled flavors become something akin to pure poetry in a pasta sauce. Serve with rigatoni or your favorite pasta. Get the recipe for Rigatoni alla Genovese.', ingredients: ['pancetta', 'beef chuck', 'celery', 'carrot', 'tomato paste'], price: 11.00, timeToPrep: 35, availabilty: 'pending', numberInStock: 64, calories: 800 }),

    Product.create({ name: 'Arroz Con Pollo', description: 'Wonderful homey chicken dish. This is a recipe from a relative in Panama. Fluff the rice carefully.', ingredients: ['tacos', 'fish'], price: 12.95, timeToPrep: 30, availabilty: 'pending', numberInStock: 45, calories: 755 }),

    Product.create({ name: 'Roasted Asparagus Salda with Feta Cheese', description: 'Yummy.', ingredients: ['tacos', 'fish'], price: 8.00, timeToPrep: 25, availabilty: 'pending', numberInStock: 53, calories: 600 }),


  ]);
  console.log(`seeded ${products.length} products`)
  const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8080' : 'https://chef-box.herokuapp.com'
  const productImages = await Promise.all([
    ProductImages.create({ imageUrl: baseUrl + '/seedMisc/img/1.jpeg', altCaption: 'im not sure what this is, TRY IT!' }),
    ProductImages.create({ imageUrl: baseUrl + '/seedMisc/img/2.jpeg', altCaption: 'ewwwwww' }),
    ProductImages.create({ imageUrl: baseUrl + '/seedMisc/img/3.jpeg', altCaption: 'Looks weird, i think' }),
    ProductImages.create({ imageUrl: baseUrl + '/seedMisc/img/4.jpeg', altCaption: '' }),
    ProductImages.create({ imageUrl: baseUrl + '/seedMisc/img/5.jpeg', altCaption: `I'm a teepot short and stout` }),
    ProductImages.create({ imageUrl: baseUrl + '/seedMisc/img/6.jpeg', altCaption: '' }),
    ProductImages.create({ imageUrl: baseUrl + '/seedMisc/img/7.jpeg', altCaption: '' }),
    ProductImages.create({ imageUrl: baseUrl + '/seedMisc/img/8.jpeg', altCaption: '' }),
  ])
  console.log(`seeded ${productImages.length} productsImages`)
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!

  console.log('Creating required associations')
  const productImagesAssociations = []
  let i = 0;
  for (let product of products) {
    productImagesAssociations.push(product.addProductImages(productImages[i]))
    i++
  }
  await Promise.all(productImagesAssociations)
  console.log(`Associated ${productImagesAssociations.length} productsImages`)

  const productReviewAssociations = []
  for (let product of products){
    for (i = 0; i < maxReviews; i++){
      const randomUser = users[chance.integer({min: 0, max: users.length - 1})]
      const newReview = await Review.create(generateReview())
      productReviewAssociations.push(randomUser.addReviews(newReview))
      productReviewAssociations.push(product.addReviews(newReview))
    }
  }
  await Promise.all(productReviewAssociations)
  console.log(`Made ${productReviewAssociations.length} associations for product reviews`)
  const associatedCategories =  await Promise.all(associateCategories(categories, products))
  console.log(`Made ${associatedCategories.length} associations for categories.`)

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
