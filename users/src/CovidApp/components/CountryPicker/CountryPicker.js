import React,{useState, useEffect} from 'react'
import{NativeSelect, FormControl} from '@material-ui/core'
import styles from './CountryPicker.module.css'
import {fetchData} from '../../api';
import {fetchCountries} from '../../api' //with only index we dont add .js
                       
const CountryPicker = ({handleCountryChange}) =>{
 const [fetchedCountries, setFetchedCountries] = useState([])

  useEffect(() => {
   const fetchAPI = async() => {
     setFetchedCountries(await fetchCountries())
   }
   fetchAPI()
   console.log('work')
  },[setFetchedCountries])    //[]only first time when render, without [] means will reflect on every event on the site, with a parameter means will update when this value changes
    return (
        <FormControl className= {styles.formControl}>

          <NativeSelect 
           defaultValue='' onChange ={(e) =>handleCountryChange(e.target.value)}>

            <option value="">Global</option>
           {fetchedCountries.map((country,i) => <option key={i} value={country}> {country}</option>)}            
          </NativeSelect>
            
        </FormControl>
    )
}

export default CountryPicker