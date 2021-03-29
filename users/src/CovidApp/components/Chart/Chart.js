import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
// eslint-disable-next-line 
import { Line, Bar, Pie } from 'react-chartjs-2'
import styles from './Chart.module.css'
import Map from '../../Geomap1'


const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData())
    }
    fetchAPI()
  }, [])

  const lineChart = (
    dailyData.length ?
      (<Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: 'blue',
            backgroundColor: '#93a2bf',
            fill: true
          }, {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true
          },
          ]
        }} />) : null
  )

  const barChart = (
    confirmed ?
      (
        <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
              label: 'People',
              backgroundColor: [
                'rgba(0, 0, 255, 0.5)',
                'rgba(0, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)'
              ],
              data: [confirmed.value, recovered.value, deaths.value]
            }]

          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
          }}
        />
      ) : null
  )
  const pieChart = (
    confirmed ?
      (
        <Pie
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
              label: 'People',
              backgroundColor: [
                'rgba(0, 0, 255, 0.5)',
                'rgba(0, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)'
              ],
              data: [confirmed.value, recovered.value, deaths.value]
            }]

          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
          }}
        />
      ) : null
  )
  return (
    <div style={{margin:'0px 50px'}}>
      <div className={styles.container}>
        <Map />
        {country &&
          <div className={styles.countrychart}>{barChart}
            <hr style={{ color: 'white', width: '100%' }}></hr>{pieChart}
          </div>
        }
      </div>

      <div className={styles.globalchart}>{lineChart}</div>
    </div>
  )
}

export default Chart