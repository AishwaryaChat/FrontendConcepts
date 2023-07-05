// The Strategy Design Pattern
// The strategy is pattern is like an advanced version of an if else statement.  It's basically where you make an interface for a method you have in your base class. This interface is then used to find the right implementation of that method that should be used in a derived class. The implementation, in this case, will be decided at runtime based on the client.

// The strategy design pattern is a powerful one when you are dealing with methods that have multiple implementations. It might feel like you're using an interface, but you don't have to write an implementation for the method every time you call it in a different class. It gives you more flexibility than interfaces.

const config = {
    paymentMethod: {
        strategy: 'paypal'
    }
}

type customerInfoType = {
    country?: string;
    emailAddress?: string;
    name?: string;
    accountNumber?: number;
    address?: string;
    cardNumber?: number;
    city?: string;
    routingNumber?: number;
    state?: string;
}

class PaymentMethodStrategy {
    static BankAccount(customerInfo: customerInfoType) {
        const {name, accountNumber, routingNumber} = customerInfo
        // Do payment stuff
    }
    static BitCoin(customerInfo: customerInfoType) {
        const {emailAddress, accountNumber} = customerInfo
        // Do payment stuff
    }
    static CreditCard(customerInfo: customerInfoType) {
        const {name, cardNumber, emailAddress} = customerInfo
        // Do payment stuff
    }
    static MailIn(customerInfo: customerInfoType) {
        const {name, address, city, state, country} = customerInfo
        // Do payment stuff
    }
    static PayPal(customerInfo: customerInfoType) {
        const {emailAddress, accountNumber} = customerInfo
        // Do payment stuff
    }
}

class Checkout {
    strategy
    constructor(strategy: "CreditCard") {
        this.strategy = PaymentMethodStrategy[strategy]
    }

    changeStrategy(strategy) {
        this.strategy = PaymentMethodStrategy[strategy]
    }

    postPayment(userInput) {
        this.changeStrategy(userInput)
    }
}