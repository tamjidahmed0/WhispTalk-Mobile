import React, {useState, useEffect, useLayoutEffect} from 'react';
import { View, Text, } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

import moment from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';


  import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';






const TimeSpend = () => {
const [timeSpend, settimeSpend] = useState([])
const [Average, setAverage] = useState(null)

const data = {
  labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      // data: [20, 45, 58, 10, 33, 48, 1],
      data : timeSpend,
      colors:[
          (opacity = 1) => `#5EB1FF`,
          (opacity = 1) => `#5EB1FF`,
          (opacity = 1) => `#5EB1FF`,
          (opacity = 1) => `#5EB1FF`,
          (opacity = 1) => `#5EB1FF`,
          (opacity = 1) => `#5EB1FF`,
          (opacity = 1) => `#5EB1FF`,
         
      ]
    },
  ],
  
};








  useEffect(()=>{
  
    let weeks = []

const timeData = async() =>{
 
try {











  const data = await AsyncStorage.getItem('date')
  const data2 = JSON.parse(data)
console.log(data2.start)
  const timestamp = data2.start;
  const minutesAgo = moment().diff(moment(timestamp), 'seconds');


  console.log(minutesAgo, 'come from else block ')



  const currentDate = moment(); // or specify a specific date
  const weekName = currentDate.format('dddd');

 

  const saturday = async() =>{
try {
      // Retrieve and log the updated value
      const updatedSundayItem = await AsyncStorage.getItem('Saturday');
      const updatedSunday = JSON.parse(updatedSundayItem);
    console.log(updatedSunday)
      // const duration = moment.duration(updatedSunday.duration , 'seconds');
      // const minutes = duration.minutes();
      const duration = updatedSunday.duration + minutesAgo
      const minutes = Math.floor(duration / 60)
      console.log(minutes, 'min and saturday');
  
      weeks.push(minutes)

      

      

      
} catch (error) {
  console.log(error)
  weeks.push(0)
}

}



await saturday()


const sunday = async() =>{
  try {
        // Retrieve and log the updated value
        const updatedSundayItem = await AsyncStorage.getItem('Sunday');
        const updatedSunday = JSON.parse(updatedSundayItem);
      console.log(updatedSunday)
        // const duration = moment.duration(updatedSunday.duration , 'seconds');
        // const minutes = duration.minutes();
        const duration = updatedSunday.duration + minutesAgo
        const minutes = Math.floor(duration / 60)
        console.log(minutes, 'min and Sunday');
    
        weeks.push(minutes)
  
        
  
        
  
        
  } catch (error) {
    console.log(error)
    weeks.push(0)
  }
  
  }

await sunday()







const monday = async () =>{

  try {

    
     // Retrieve and log the updated value
     const updatedSundayItem = await AsyncStorage.getItem('Monday');
     const updatedSunday = JSON.parse(updatedSundayItem);

   
   
     // const duration = moment.duration(updatedSunday.duration , 'seconds');
     // const minutes = duration.minutes();
     const duration = updatedSunday.duration + minutesAgo
     const minutes = Math.floor(duration / 60)
     console.log(minutes, 'min');
 
     weeks.push(minutes) 
  } catch (error) {
    console.log(error)
    weeks.push(0) 
  }

  
}



await monday()


const tuesday = async() =>{

  try {
     // Retrieve and log the updated value
     const updatedSundayItem = await AsyncStorage.getItem('Tuesday');
     const updatedSunday = JSON.parse(updatedSundayItem);
   
     // const duration = moment.duration(updatedSunday.duration , 'seconds');
     // const minutes = duration.minutes();
     const duration = updatedSunday.duration + minutesAgo
     const minutes = Math.floor(duration / 60)
     console.log(minutes, 'min');
 
     weeks.push(minutes) 
  } catch (error) {
    console.log(error)
    weeks.push(0) 
  }

  
}


await tuesday()



const wednesday = async() =>{

  try {
     // Retrieve and log the updated value
     const updatedSundayItem = await AsyncStorage.getItem('Wednesday');
     const updatedSunday = JSON.parse(updatedSundayItem);
   
     // const duration = moment.duration(updatedSunday.duration , 'seconds');
     // const minutes = duration.minutes();
     const duration = updatedSunday.duration + minutesAgo
     const minutes = Math.floor(duration / 60)
     console.log(minutes, 'min');
 
     weeks.push(minutes) 
  } catch (error) {
    console.log(error)
    weeks.push(0) 
  }

  
}


await wednesday()



const thursday = async () =>{

  try {
     // Retrieve and log the updated value
     const updatedSundayItem = await AsyncStorage.getItem('Thursday');
     const updatedSunday = JSON.parse(updatedSundayItem);
   
     // const duration = moment.duration(updatedSunday.duration , 'seconds');
     // const minutes = duration.minutes();
     const duration = updatedSunday.duration + minutesAgo
     const minutes = Math.floor(duration / 60)
     console.log(minutes, 'min');
 
     weeks.push(minutes) 
  } catch (error) {
    console.log(error)
    weeks.push(0) 
  }

  
}

await thursday()


const friday = async () =>{

  try {
     // Retrieve and log the updated value
     const updatedSundayItem = await AsyncStorage.getItem('Friday');
     const updatedSunday = JSON.parse(updatedSundayItem);
   
     // const duration = moment.duration(updatedSunday.duration , 'seconds');
     // const minutes = duration.minutes();
     const duration = updatedSunday.duration + minutesAgo
     const minutes = Math.floor(duration / 60)
     console.log(minutes, 'min');
 
     weeks.push(minutes) 
  } catch (error) {
    console.log(error)
    weeks.push(0) 
  }

  
}


await friday()








if(weekName === 'Saturday'){





}else if (weekName === 'Sunday'){

}else if (weekName === 'Monday'){


  // const data = await AsyncStorage.getItem('Monday')

//   console.log(data,'Monday')

 
// const sampleDateTime = moment(data.day);

// const currentDateTime = moment(); // Get the current date and time
// const startOfCurrentDay = currentDateTime.startOf('day'); // Set the time to the start of the current day (12 AM)

// const daysSinceStartOfDay = sampleDateTime.diff(startOfCurrentDay, 'days');

// const weeksSinceStartOfDay = Math.floor(daysSinceStartOfDay / 7);


// console.log(weeksSinceStartOfDay,'week'); // Output: Number of weeks since 12 AM of the current day considering at least six days



// if(weeksSinceStartOfDay === 1){
//   await AsyncStorage.removeItem('Monday')
// }




    // // Retrieve and log the updated value
    // const updatedSundayItem = await AsyncStorage.getItem('Monday');
    // const updatedSunday = JSON.parse(updatedSundayItem);
  
    // // const duration = moment.duration(updatedSunday.duration , 'seconds');
    // // const minutes = duration.minutes();
    // const duration = updatedSunday.duration + minutesAgo
    // const minutes = Math.floor(duration / 60)
    // console.log(minutes, 'min');

    // weeks.push(minutes)






   

}else if (weekName === 'Tuesday'){

}else if (weekName === 'Wednesday'){

}else if (weekName === 'Thursday'){

//   const data = await AsyncStorage.getItem('Thursday')

//   console.log(data,'thursedat')

 
// const sampleDateTime = moment(data.day);

// const currentDateTime = moment(); // Get the current date and time
// const startOfCurrentDay = currentDateTime.startOf('day'); // Set the time to the start of the current day (12 AM)

// const daysSinceStartOfDay = sampleDateTime.diff(startOfCurrentDay, 'days');

// const weeksSinceStartOfDay = Math.floor(daysSinceStartOfDay / 7);


// console.log(weeksSinceStartOfDay,'g'); // Output: Number of weeks since 12 AM of the current day considering at least six days


// if(weeksSinceStartOfDay === 1){
//   await AsyncStorage.removeItem('Thursday')
// }




//     // Retrieve and log the updated value
//     const updatedSundayItem = await AsyncStorage.getItem('Thursday');
//     const updatedSunday = JSON.parse(updatedSundayItem);
  
//     // const duration = moment.duration(updatedSunday.duration , 'seconds');
//     // const minutes = duration.minutes();
//     const duration = updatedSunday.duration + minutesAgo
//     const minutes = Math.floor(duration / 60)
//     console.log(minutes, 'tamjid');





}else if (weekName === 'Friday'){
//   const data = await AsyncStorage.getItem('Friday')

//   console.log(data,'Friday')

 
// const sampleDateTime = moment(data.day);

// const currentDateTime = moment(); // Get the current date and time
// const startOfCurrentDay = currentDateTime.startOf('day'); // Set the time to the start of the current day (12 AM)

// const daysSinceStartOfDay = sampleDateTime.diff(startOfCurrentDay, 'days');

// const weeksSinceStartOfDay = Math.floor(daysSinceStartOfDay / 7);


// console.log(weeksSinceStartOfDay,'g'); // Output: Number of weeks since 12 AM of the current day considering at least six days


// if(weeksSinceStartOfDay === 1){
//   await AsyncStorage.removeItem('Friday')
// }




//     // Retrieve and log the updated value
//     const updatedSundayItem = await AsyncStorage.getItem('Thursday');
//     const updatedSunday = JSON.parse(updatedSundayItem);
  
//     // const duration = moment.duration(updatedSunday.duration , 'seconds');
//     // const minutes = duration.minutes();
//     const duration = updatedSunday.duration + minutesAgo
//     const minutes = Math.floor(duration / 60)
//     console.log(minutes, 'tamjid');
}



} catch (error) {
  console.log(error)
}

settimeSpend(weeks)
console.log(weeks, 'come from weeks')

const sum = weeks.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

const avgTime = Math.floor(sum/7)

console.log(avgTime)

setAverage(avgTime)

}


timeData()
    
  },[])




  return (
    <View style ={{ backgroundColor:'#fff', flex:1}} >
        <View style ={{paddingHorizontal:20, marginVertical:30 ,}} >
        <Text style ={{fontSize:18, fontWeight:'bold'}} >Time on this app</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop:20 }}>
  <View style={{ width: responsiveWidth(80), alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 25, fontWeight: 'bold', color :'#77DD77'  }}>{`${Average}m`}</Text>
    <Text style={{ fontSize: 15, fontWeight: 'bold' , color:'gray'}} >Daily Average</Text>
    <Text style={{ fontSize: 17, color:'gray' }} >Average time you spent per day using this app on this device in the last week</Text>
  </View>
</View>

        </View>

     <BarChart
        data={data}
        width={ responsiveWidth(100)}
        height={responsiveWidth(50)}
      
        showBarTops = {false}
        flatColor={true}
      
        withHorizontalLabels ={false}
        withCustomBarColorFromData ={true}
        withInnerLines={ false}
        fromZero = {true}
        
        showValuesOnTopOfBars ={true}
        chartConfig={{
            count:9,
            backgroundColor:'transparent',
            backgroundGradientFrom: '#fff',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#fff',
            backgroundGradientToOpacity: 0,
            barRadius:2,
            // formatTopBarValue: (value) => {
            //     const hours = Math.floor(value / 60); // Calculate the hours
            //     const minutes = value % 60; // Calculate the remaining minutes
            //     return `${hours} hours ${minutes} min`; // Format the value as "X hours X min"
            //   },
        formatTopBarValue: (value) => value + ' min',
            color: (opacity = 1) => '#333', // THIS
            strokeWidth: 2,
            barPercentage: 1,
        
            propsForLabels: {
              fontSize: '13',
            },
            
        
             
          
        
        }}
        style={{
          marginVertical: 10,
          borderRadius: 16,
         
          paddingRight:0,
          
        }}
        
      />
    </View>
  );
};

export default TimeSpend;
