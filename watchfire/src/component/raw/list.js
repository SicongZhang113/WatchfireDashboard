import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import $ from "jquery";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
import './index.module.css'
import { compose } from 'recompose';


class RawList extends React.Component {

    constructor() {
        super()
        this.state = {
            data_quantity: this.createQuantityData()
        }

    }

    createQuantityData() {
        let data = []
        let i = 0;
        for( i ; i < 403; i++){
            data.push({id:0, model:0, time:0, quantity:0, prediction: 0, IBC_prediction:0})
        }
     return data;
    }


    componentDidMount() {
        this.update()
    }


   update() {
       $.get("api/tasks", (data) =>{
           this.setState({data_quantity: data})
       })
   }



    delete(id){
          $.post("api/delete/" + id, null, () => this.update());
          console.log(id)
    }

    createTable(limit){
        let table = []
        for (let i = 0; i < limit; i++) {
            let columns = []
            columns.push(<TableCell>{this.state.data_quantity[i].model}</TableCell>)
            columns.push(<TableCell>{this.state.data_quantity[i].time}</TableCell>)
            columns.push(<TableCell>{this.state.data_quantity[i].quantity}</TableCell>)
            columns.push(<TableCell>{this.state.data_quantity[i].prediction}</TableCell>)
            columns.push(<TableCell>{this.state.data_quantity[i].IBC_prediction}</TableCell>)
            columns.push(
                <TableCell>
                    <IconButton aria-label="delete" color="primary" onClick={() => this.delete(this.state.data_quantity[i].id)} >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>)
            //Create the parent and add the children
            table.push(<TableRow key= {i}>{columns}</TableRow>)
        }
        return table
    }

   render() {




       const handleChange = (event) => {
            $.ajax({
                type: "POST",
                url: "api/tasks",
                data: {model: event.target.value},
                success: () => this.update(),
                error: () => this.update()
            });
            //console.log(event.target.value)
        };



            return (
                <React.Fragment>


                    <div>
                     <FormControl >
                         <InputLabel >Model</InputLabel>
                         <Select
                             native
                             value = {this.state.all}
                             onChange={handleChange}
                             >
                             <option aria-label="None" value="" />
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
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Model</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Historical data</TableCell>
                                <TableCell>Firm Prediction</TableCell>
                                <TableCell>IBC Prediciton</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.createTable(this.state.data_quantity.length)}
                            </TableBody>
                    </Table>
                        </div>
                </React.Fragment>
            )
    }
}



export default RawList;

