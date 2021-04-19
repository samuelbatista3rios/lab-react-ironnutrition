  
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// new imports
import foods from './foods.json'
import FoodBox from './components/foodBox.jsx'
import FoodForm from './components/foodForm'
import Search from './components/search.jsx'


// let state = {
//   allFoods: [...foods]
// }
// let allFoods = [...foods]

// function foodBox(arr){

// }

// foodBox(arrayOfAllFoods)

class App extends Component {
  state = {
    allFoods: foods,
    filteredFoods: foods,   // the original value fo filteredFoods is going to be the original array in foods.json
    showForm: false,
    todaysFood: [],
    totalCalories: 0,
  }

  // function newFunc(parameterName){

  // }

  displayFood = () => {
    let copyOfAllFoods = this.state.filteredFoods.map((eachFood, index) => {
      // console.log(eachFood)
      // return(<FoodBox name={eachFood.name} calories={eachFood.calories} image={eachFood.image}/>)
      return(<FoodBox key={eachFood.name} {...eachFood} addFoodToTodaysList={this.addFoodToTodaysList}/>)
    })
    // eachFood= {
    //   name: "pizza",
    //   image: "pizza.png",
    //   calories: 1000,
    //   quantity: 1
    // }

    return copyOfAllFoods;
  }

  addNewFoodToArray = (newFoodObj) => {
    console.log(newFoodObj)
    let copyOfAllFoods = this.state.allFoods.slice()
    copyOfAllFoods.unshift(newFoodObj)
    console.log(copyOfAllFoods)
    this.setState({
      allFoods: copyOfAllFoods
    })
  }

  handleAddFoodClick = () => {
    // console.log(this.state.showForm)
    this.setState({
      // we use !this.state.showForm so that the form will not show if the button is clicked again
      // if we just  said showForm: true then we would need to figure out another way to turn showForm back to false to not display the form
      showForm: !this.state.showForm, 
    })
  }

  filterFoods = searchInput => {
    console.log(searchInput)
    let filteredFoodsCopy = this.state.allFoods.filter(eachFood =>
      eachFood.name.toLowerCase().includes(searchInput.toLowerCase())
      // loop through the array using filter
      // I'm going to look at the name of each food in lowercase format (toLowerCase())
      // if the name of the food includes (i.e. matches) the searchInput in lowerCase format
      // then return that food to the new filteredFoodsCopy
    )

    this.setState({ 
      filteredFoods: filteredFoodsCopy 
    })
  }

  // Wise words of Stefan
  // func() is a function invocation - this will get called right away
  // () => func() is a function reference - this will get called when something (example an event) happens 
  addFoodToTodaysList = (name, calories, quantity) => {
    // console.log(name, calories, quantity)
    // console.log("Hi mom")
    let foodObj = {
      nameKey: name,
      caloriesKey: calories,
      quantityKey: Number(quantity)
      // could have used the same parameter name as the object key name and then it would look like this
      // let foodObj = {name, calories, quantity}
    }
    let todaysFoodCopy = [...this.state.todaysFood] // copy the array from state
    todaysFoodCopy.push(foodObj) // push food object to the array
    // console.log(todaysFoodCopy)
    this.setState({
      todaysFood: todaysFoodCopy
    })
  }

  displayTodaysFood = () => {
    console.log(this.state.todaysFood)
    let todaysFoodCopy = this.state.todaysFood.map((eachFood, index) => {
      return(<li key={index}>{eachFood.quantityKey} {eachFood.nameKey} = {eachFood.caloriesKey * eachFood.quantityKey} calories </li>)
    })

    return todaysFoodCopy;
  }
  // let array1 = [1, 2, 3, 4];
  // let total = array1.reduce((accumulator, currentValue) => {
  // console.log(accumulator + " += " + currentValue)
  // return accumulator + currentValue}, 0);
  // console.log("Final ", total);

  calculateTotalCalories = () => {

    let total = this.state.todaysFood.reduce((accumulator, eachFood) => {
    return accumulator + (eachFood.quantityKey * eachFood.caloriesKey)}, 0);
      console.log(total)
    return total
  }
 
  render() {
    return (
      <div className="App">
        <Search filterFoods={this.filterFoods}/>
        <button className="button" onClick={this.handleAddFoodClick}>
          Add Food
        </button>
        {/* if(true && true) {show the form }  if(false && true) {do not show form}*/}
        {this.state.showForm && <FoodForm addNewFoodToArray={this.addNewFoodToArray}/>}
        <ul>
        {this.displayTodaysFood()}
        <p>Total = {this.calculateTotalCalories()} calories</p>  
        </ul>  
        {this.displayFood()}
      </div>
    );
  }
}

export default App;