const NS =  'org.demo.theater';
/**
 * when booking any movie
 * @param {org.demo.theater.BookMovie} bookmovie - to book a movie
 * @transaction
 */
async function movieBook(bookmovie){
    console.log('bookmovie:',bookmovie);
    const show = bookmovie.show;
    const user = bookmovie.user;
    const food = bookmovie.food;
   
    const n = bookmovie.numberOfSeats;
  	const orderPrice = n * show.price;
    console.log('orderPrice:',orderPrice);
    const results = await query('selectBookingsByShow',{"show": "resource:org.demo.theater.Shows#"+show.showId+""});
    
    console.log('results:',results);
    console.log('user:',user.userId);
    let nextBookingId  = results.length + 1;
    console.log('nextBookingId:',nextBookingId);
   
    const sum = results.reduce(function (acc, currValue) {
      return acc + currValue.numberOfSeats;
    }, 0);
    const availableSeats = 100 - sum;
    console.log('availableSeats:',availableSeats);
    
    if (n <= availableSeats){
    const factory = getFactory();  
    const bookReg = await getAssetRegistry(NS + '.Booking');   
    const book = await factory.newResource(NS, 'Booking', ""+nextBookingId+"");
    //var dateString = "2019-01-01";
    //book.date = new Date();
    book.numberOfSeats = n;
    book.orderPrice = orderPrice;
    book.show = show;
    book.user = user;
    book.food = food;
  
    await bookReg.add(book);  
      
    // emitting ObjectReservered event

   let objectreservedEvent = factory.newEvent(NS, 'ObjectReservered');
   objectreservedEvent.object = book;
   await emit(objectreservedEvent);  

    } 
} 

/**
 * when exchange any food option
 * @param {org.demo.theater.BookMovieFoodExchange} param - to exchange food water to soda
 * @transaction
 */

async function movieFoodExchange(param){
   console.log('param:',param);
   let book = param.booking
   let food = param.food;
  
  	const results = await query('selectBookingsByFood',{"food": "resource:org.demo.theater.Food#2"});
   
    const sumSoda = results.length;
    const availableSoda = 200 - sumSoda;
    console.log('availableSoda:',availableSoda);
  
    if (availableSoda > 0){
         const factory = getFactory(); 
         const bookReg = await getAssetRegistry(NS + '.Booking'); 
         book.food = food;
         await bookReg.update(book); 
          // emitting ObjectExchanged event
         let objectreservedEvent = factory.newEvent(NS, 'ObjectExchanged');
         objectreservedEvent.object = book;
         objectreservedEvent.to = food;
         await emit(objectreservedEvent);
    }

}

/**
 * Initializing test data.
 * @param {org.demo.theater.InitTestData} param The sample transaction instance.
 * @transaction
 */
async function InitTestDataTransaction(param) {  
    console.log('init test data');

    console.log('Creating a Hotel');  
    const factory = getFactory(); 
	
  	// adding theater 1
    const theaterReg = await getParticipantRegistry(NS + '.Theater');   
    const theater = await factory.newResource(NS, 'Theater', "1");
    theater.TheaterName = "PVR Saket";
    const newAddress = await factory.newConcept(NS, 'Address');
	newAddress.country = "Saket Delhi";
	newAddress.city = "India";
  	theater.address = newAddress;
  
    await theaterReg.add(theater); 
  
  	// adding User 1
    const userReg = await getParticipantRegistry(NS + '.Users');   
    const user = await factory.newResource(NS, 'Users', "1");
    user.name = "Abdul";
    user.email = "abdul@gmail.com";
    user.country = "India";
 	await userReg.add(user); 
  
    console.log('Creating Food 1');  
  	// adding food 1
    const foodReg = await getAssetRegistry(NS + '.Food');   
    const food = await factory.newResource(NS, 'Food', "1");
    food.foodType = "water";
    food.price = 5;
    food.maxQty = 300;
    await foodReg.add(food); 
    
    // adding food 2
    const food2 = await factory.newResource(NS, 'Food', "2");
    food2.foodType = "popcorn";
    food2.price = 12;
    food2.maxQty = 100;
    await foodReg.add(food2); 
  
    // adding food 3
    const food3 = await factory.newResource(NS, 'Food', "3");
    food3.foodType = "soda";
    food3.price = 10;
    food3.maxQty = 200;
    await foodReg.add(food3); 

    console.log('Creating Movie 1');  
  	// adding movie 1
    const movieReg = await getAssetRegistry(NS + '.Movie');   
    const movie = await factory.newResource(NS, 'Movie', "1");
    movie.title = "Deadpool2";
    movie.genere = "Action";
    movie.duration = 2;
    movie.director = "David Leitch";
  
    await movieReg.add(movie);       

    // adding movie 2
    const movie2 = await factory.newResource(NS, 'Movie', "2");
    movie2.title = "Black Panther";
    movie2.genere = "Action";
    movie2.duration = 3;
    movie2.director = "Ryan Coogler";
    await movieReg.add(movie2);       

    // adding show
    const showReg = await getAssetRegistry(NS + '.Shows');  
    const show = await factory.newResource(NS, 'Shows', "1");
    show.screen = "OD1";
    show.slot = "FIRST";
    show.numberOfSeats = 100;
    show.price = 10;
    show.movie = movie;
    await showReg.add(show); 
  
  	const show2 = await factory.newResource(NS, 'Shows', "2");
    show2.screen = "OD2";
    show2.slot = "FIRST";
    show2.numberOfSeats = 100;
    show2.price = 20;
    show2.movie = movie2;
    await showReg.add(show2); 

}

/**
 * Clearing test data.
 * @param {org.demo.theater.ClearData} param The sample transaction instance.
 * @transaction
 */
async function ClearDataTransaction(param) {  
    console.log('clearing test data');
  
    // deleting assets
    const foodReg = await getAssetRegistry(NS + '.Food'); 
    let Foods = await foodReg.getAll();
    await foodReg.removeAll(Foods);
  
  	const movieReg = await getAssetRegistry(NS + '.Movie'); 
    let movies = await movieReg.getAll();
    await movieReg.removeAll(movies);
  
  	const showReg = await getAssetRegistry(NS + '.Shows'); 
    let shows = await showReg.getAll();
    await showReg.removeAll(shows);
  
  	const bookingReg = await getAssetRegistry(NS + '.Booking');
    let bookings = await bookingReg.getAll();
    await bookingReg.removeAll(bookings);
  
  	// deleting participants
    const theaterReg = await getParticipantRegistry(NS + '.Theater');
    let theaters = await theaterReg.getAll();
    await theaterReg.removeAll(theaters);
    
    const userReg = await getParticipantRegistry(NS + '.Users');
    let users = await userReg.getAll();
    await userReg.removeAll(users);
}
