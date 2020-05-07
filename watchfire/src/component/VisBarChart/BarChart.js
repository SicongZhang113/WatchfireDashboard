import React from 'react';
import { ComposedChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend, Area, BarChart, Bar } from 'recharts';
import Title from '../dashboard/Title';
import $ from "jquery";
import { withTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class VisBarChart extends React.Component{
    constructor() {
        super();
        this.state = {
            data: this.createData(),
            time: new Date(this.convertDate("2020-02-02")),
        }
    }

    createData() {
        let data = []
        let i = 0;
        for( i ; i < 10; i++) {
            data.push({ model:"model", time:0, quantity:i, firm_prediction:0, IBC_prediction: 0})
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
        return [date.getFullYear(), month, day].join("-");
    }


    update() {
        $.get("api/select_barchart", (data) =>{
            this.setState({
                data: data,
            })
        });
    }


    render() {
    
    const handleChange_time = date => {
        var pick_time = this.convertDate(date);
        console.log(pick_time)
        $.ajax({
            type: "POST",
            url: "api/select_barchart",
            data: {time: pick_time},
            success: () => this.update(),
            error: () => this.update()
        });
        this.setState({
          time: date
        });
    };

    return (
    console.log(this.state.time),
    <React.Fragment>
    <div>
        Target Date:
        <DatePicker
        selected={this.state.time}
        onChange={handleChange_time}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        />
    </div>
      

      <Title>Quantity vs. Model</Title>
      <ResponsiveContainer>
            <BarChart 
                margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 34,
                }} 
                data={this.state.data}
            >
                <XAxis dataKey="model" padding={{ left: 30, right: 30 }}/>
                <YAxis dataKey="quantity">
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
                <Bar dataKey="quantity" fill="#6b79c7" />
            </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
    )

    }
}
export default withTheme(VisBarChart);