import React, { Component } from 'react';
import styles from'./App.module.css';
import {Cards, Chart, CountryPicker} from './components';
import {fetchData} from './api';


export class App extends Component {
  state = {
    data: {},
    country: ''
  }

  async componentDidMount(){
    const data = await fetchData()
    this.setState( { data: data})
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country)
    this.setState({ data:fetchedData, country: country})  }
  render() {
    const {data, country} = this.state
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>COVID-19 APP TRACKER</h1>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>

        <Cards data={data}/>
        
        <Chart data={data} country={country}/>

      </div>
    )
  }
}

export default App
 
