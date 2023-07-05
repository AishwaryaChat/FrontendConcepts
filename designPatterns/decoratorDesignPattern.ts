// The Decorator Design Pattern
// Using the decorator design pattern is fairly simple. You can have a base class with methods and properties that are present when you make a new object with the class. Now say you have some instances of the class that need methods or properties that didn't come from the base class.

// You can add those extra methods and properties to the base class, but that could mess up your other instances. You could even make sub-classes to hold specific methods and properties you need that you can't put in your base class.

// Either of those approaches will solve your problem, but they are clunky and inefficient. That's where the decorator pattern steps in. Instead of making your code base ugly just to add a few things to an object instance, you can tack on those specific things directly to the instance.

// So if you need to add a new property that holds the price for an object, you can use the decorator pattern to add it directly to that particular object instance and it won't affect any other instances of that class object.

// Have you ever ordered food online? Then you've probably encountered the decorator pattern. If you're getting a sandwich and you want to add special toppings, the website isn't adding those toppings to every instance of sandwich current users are trying to order.

class Customer {
  balance;
  foodItems;
  constructor(balance = 20) {
    this.balance = balance;
    this.foodItems = [];
  }

  buy(food) {
    if (food.price < this.balance) {
      console.log("you should get it");
      this.balance -= food.price;
      this.foodItems.push(food);
    } else {
      console.log("maybe you should get something else");
    }
  }
}


class Sandwich {
  type;
  price;
  constructor(type, price) {
    this.type = type;
    this.price = price;
  }
  order() {
    console.log(`You ordered a ${this.type} sandwich for $ ${this.price}.`);
  }
}

class DeluxeSandwich {
  type;
  price;
  constructor(baseSandwich) {
    this.type = `Deluxe ${baseSandwich.type}`;
    this.price = baseSandwich.type + 7.5;
  }
}

class ExquisiteSandwich {
  type;
  price;
  constructor(baseSandwich) {
    this.type = `Exquisite ${baseSandwich.type}`;
    this.price = baseSandwich.type + 10.5;
  }
}

let cust = new Customer(35)
const turkeySandwich = new Sandwich("turkey", 20);
const bltSandwich = new Sandwich("BLT", 100);

const deluxeBltSandwich = new DeluxeSandwich(bltSandwich);
const exquisiteTurkeySandWich = new ExquisiteSandwich(turkeySandwich);

cust.buy(deluxeBltSandwich)
cust.buy(exquisiteTurkeySandWich)
