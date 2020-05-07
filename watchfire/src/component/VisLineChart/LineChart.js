import React from 'react';
import { ComposedChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend,Area } from 'recharts';
import Title from '../dashboard/Title';
import $ from "jquery";
import { withTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class VisLineChart extends React.Component{
    constructor() {
        super();
        this.state = {
            data: this.createData(),
            startDate: new Date(this.convertDate("2016-01-02")),
            endDate: new Date(this.convertDate("2020-06-02"))
        }
    }

    createData() {
        let data = []
        let i = 0;
        for( i ; i < 10; i++) {
            data.push({ time:0, quantity:i, firm_prediction:0, IBC_prediction: 0, sd_interval:[10,20]})
        }
        return data;
    }

    componentDidMount() {
        this.update()
    }

    convertDate(str) {
        // console.log(str)
        var date = new Date(str),
            month = ("0" + (date.getUTCMonth() + 1)).slice(-2),
            day = ("0" + (date.getUTCDate())).slice(-2);
            // console.log(day);
        return [date.getFullYear(), month, day].join("-");
    }


    update() {
        $.get("api/select_advanced", (data) =>{
            this.setState({
                data: data,
            })
        });
    }


    render() {

    const handleChange_model = (event) => {
        $.ajax({
            type: "POST",
            url: "api/select_advanced",
            data: {model: event.target.value},
            success: () => this.update(),
            error: () => this.update()
        });
            console.log(event.target.value)

    };

    function formatXAxis(str) {
        // console.log(str)
        var date = new Date(str),
            month = ("0" + (date.getUTCMonth() + 1)).slice(-2),
            day = ("0" + date.getUTCDate()).slice(-2);
        return [date.getFullYear(), month, day].join("-");
    }
    
    const handleChange_start = date => {
        var start = this.convertDate(date);
        console.log(start)
        $.ajax({
            type: "POST",
            url: "api/select_advanced",
            data: {start_date: start},
            success: () => this.update(),
            error: () => this.update()
        });
        this.setState({
          startDate: date
        });
    };

    const CustomInput = ({ value, onClick }) => (
      <button className="custom-input" onClick={onClick}>
        {value}
      </button>
    );

    const handleChange_end = date => {
        var end = this.convertDate(date);
        console.log(end)
        $.ajax({
            type: "POST",
            url: "api/select_advanced",
            data: {end_date: end},
            success: () => this.update(),
            error: () => this.update()
        });
        this.setState({
          endDate: date
        });
    };

    return (
    console.log(this.state.startDate),
    console.log(this.state.endDate),
    <React.Fragment>
        <FormControl >
        <InputLabel htmlFor="age-native-simple" >Model</InputLabel>
        <Select
          native
          value={this.state.model}
          onChange={handleChange_model}
          inputProps={{
            name: 'model',
            id: 'age-native-simple',
          }}
        >
            <option value={'2219'}>2219</option>
            <option value={'W8'}>W8</option>
            <option value={'W10'}>W10</option>
            <option value={'W16'}>W16</option>
            <option value={'W19'}>W19</option>
            <option value={'X8'}>X8</option>
            <option value={'X10'}>X10</option>
            <option value={'X16'}>X16</option>
            <option value={'X19'}>X19</option>
        </Select>
      </FormControl>

      <>
        <div>
          Start Date:
        <DatePicker
            selected={this.state.startDate}
            onChange={handleChange_start}
            customInput={<CustomInput />}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            dateFormat="MM/yyyy"
            showMonthYearPicker
        />
        </div>
        <div>
          End Date:
        <DatePicker
            selected={this.state.endDate}
            onChange={handleChange_end}
            customInput={<CustomInput />}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            dateFormat="MM/yyyy"
            showMonthYearPicker
        />
        </div>
        </>

      <Title>Quantity vs. Date</Title>
      <ResponsiveContainer>
        <ComposedChart
          data={this.state.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 34,
          }}
        >
          <XAxis dataKey="time"  tickFormatter={formatXAxis} stroke={this.props.theme.palette.text.secondary} padding={{ left: 30, right: 30 }}/>
          <YAxis dataKey="quantity" stroke={this.props.theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: this.props.theme.palette.text.primary}}
            >
              Quantity
            </Label>
          </YAxis>
            <Tooltip />
            <Legend />
          <Line type="monotone" dataKey="quantity" stroke={this.props.theme.palette.primary.main} />
          <Line type="monotone" dataKey="IBC_prediction" stroke="#82ca9d" activeDot={{ r: 8 }}/>
          <Line type="monotone" dataKey="firm_prediction" stroke="#FF0000" />
          <Area dataKey="sd_interval" stroke="#8884d8" fill="#8884d8" />
        </ComposedChart>
      </ResponsiveContainer>
    </React.Fragment>
    )
    }
}
export default withTheme(VisLineChart);



