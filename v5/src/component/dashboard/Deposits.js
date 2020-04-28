import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import $ from "jquery";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";




export default class Deposits extends React.Component{
    constructor() {
        super();
        this.state = {
            data: this.createData()
        }
    }

    createData() {
        let data = []
        let i = 0;
        for( i ; i < 194; i++){
            data.push({IBC_prediction: 0})
        }
     return data;
    }

     componentDidMount() {
        this.update()
    }

    update(){
       $.get("api/deposit", (data) =>{
            console.log(data)
            this.setState({data: data})
       })
    }

    render() {

        const handleChange = (event) => {
            $.ajax({
                type: "POST",
                url: "api/deposit",
                data: {model: event.target.value},
                success: () => this.update(),
                error: () => this.update()
        });
            //console.log(event.target.value)

    };

       return (
    <React.Fragment>
        <div>
            <Title>Recent Prediction</Title>
            <Typography component="p" variant="h4">
                {this.state.data[0].IBC_prediction}
            </Typography>
            <Typography color="textSecondary" >
               on {this.state.data[0].time}
            </Typography>
            <FormControl >
                <InputLabel htmlFor="age-native-simple">Model</InputLabel>
                <Select
                    native
                    value={this.state.model}
                    onChange={handleChange}
                    inputProps={{
                        name: 'model',
                        id: 'age-native-simple',
                    }}>
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
        </div>
        <br></br>
      <div>
        <Link color="primary" href="/vis" >
          View More
        </Link>
      </div>
    </React.Fragment>
  );
    }
}
