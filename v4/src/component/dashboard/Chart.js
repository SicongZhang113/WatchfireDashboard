import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import $ from "jquery";
import { withTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

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
            data.push({ time:0, quantity:i})
        }
     return data;
    }

    componentDidMount() {
        this.update()
    }


   update(){
        $.get("api/select", (data) =>{
            console.log(data)
            this.setState({data: data})
       })
   }


    render() {
        const handleChange = (event) => {
            $.ajax({
                type: "POST",
                url: "api/select",
                data: {model: event.target.value},
                success: () => this.update(),
                error: () => this.update()
        });
            //console.log(event.target.value)

    };
      return (
    <React.Fragment>
        <FormControl >
        <InputLabel htmlFor="age-native-simple">Model</InputLabel>
        <Select
          native
          value={this.state.model}
          onChange={handleChange}
          inputProps={{
            name: 'model',
            id: 'age-native-simple',

          }}
        >
            <option value={'2219 (Includes T/T)'}>2219 (Includes T/T)</option>
            <option value={'S16'}>S16</option>
            <option value={'W08'}>W08</option>
            <option value={'W10'}>W10</option>
            <option value={'W12'}>W12</option>
            <option value={'W16'}>W16</option>
            <option value={'W19'}>W19</option>
            <option value={'X08'}>X08</option>
            <option value={'X10'}>X10</option>
            <option value={'X12'}>X12</option>
            <option value={'X16'}>X16</option>
            <option value={'X19'}>X19</option>
        </Select>
      </FormControl>

      <Title>Quantity vs. Date</Title>
      <ResponsiveContainer>
        <LineChart
          data={this.state.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 34,
          }}
        >
          <XAxis dataKey="time"  stroke={this.props.theme.palette.text.secondary} />
          <YAxis dataKey="quantity" stroke={this.props.theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: this.props.theme.palette.text.primary}}
            >
              Quantity
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="quantity" stroke={this.props.theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
    }
}
export default withTheme(Chart);



