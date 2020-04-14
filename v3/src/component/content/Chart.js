import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import $ from "jquery";


class Chart extends React.Component{
    constructor() {
        super();
        this.state = {
            data: this.createData()
        }
    }

    createData() {
        let data = []
        let i = 0;
        for( i ; i < 10; i++){
            data.push({ time:0, quantity:0})
        }
     return data;
    }

    componentDidMount() {
        this.newgetList()
    }

    newgetList() {
       $.get("api/tasks", (data) =>{
           this.setState({data: data})
           //console.log(data)
       })
   }

    render() {
      return (
    <React.Fragment>
      <Title>Quantity vs. Date</Title>
      <ResponsiveContainer>
        <LineChart
          data={this.state.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time"  />
          <YAxis >
            <Label
              angle={270}
              position="middle"
              style={{ textAnchor: 'middle'}}
            >
              Quantity
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount"  dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
    }
}
export default Chart;


// stroke={theme.palette.text.secondary}
// stroke={theme.palette.text.secondary}
// , fill: theme.palette.text.primary
// stroke={theme.palette.primary.main}
// // Generate Sales Data
// function createData(time, amount) {
//   return { time, amount };
// }
//
// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00', undefined),
// ];
//
// export default function Chart() {
//   const theme = useTheme();
//
//   return (
//     <React.Fragment>
//       <Title>Today</Title>
//       <ResponsiveContainer>
//         <LineChart
//           data={data}
//           margin={{
//             top: 16,
//             right: 16,
//             bottom: 0,
//             left: 24,
//           }}
//         >
//           <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
//           <YAxis stroke={theme.palette.text.secondary}>
//             <Label
//               angle={270}
//               position="left"
//               style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
//             >
//               Sales ($)
//             </Label>
//           </YAxis>
//           <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
//         </LineChart>
//       </ResponsiveContainer>
//     </React.Fragment>
//   );
// }
