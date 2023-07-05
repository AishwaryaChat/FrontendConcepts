// The Observer Design Pattern
// If you've ever used the MVC pattern, you've already used the observer design pattern. The Model part is like a subject and the View part is like an observer of that subject. Your subject holds all of the data and the state of that data. Then you have observers, like different components, that will get that data from the subject when the data has been updated.

// The goal of the observer design pattern is to create this one-to-many relationship between the subject and all of the observers waiting for data so they can be updated. So anytime the state of the subject changes, all of the observers will be notified and updated instantly.

// Some examples of when you would use this pattern include: sending user notifications, updating, filters, and handling subscribers.

class CategoryDropdown {
    categories
    subscribers
    constructor() {
        this.categories = ['appliances', 'doors', 'tools']
        this.subscribers = []
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber)
    }

    onChange(selectedCategory) {
        this.subscribers.forEach(subscriber => subscriber.update(selectedCategory))
    }
}

class FilterDropdown {
    filterType
    items
    constructor(filterType) {
        this.filterType = filterType
        this.items = []
    }

    update(category) {
        fetch(`https://example.com/${category}`)
        .then(items => this.items=items)
    }
}

const categoryDropdown = new CategoryDropdown()

const colorsDropDown = new FilterDropdown("color")
const priceDropDown = new FilterDropdown("price")
const brandDropDown = new FilterDropdown("brand")

categoryDropdown.subscribe(colorsDropDown)
categoryDropdown.subscribe(priceDropDown)
categoryDropdown.subscribe(priceDropDown)

