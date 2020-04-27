import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import $ from "jquery";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";


class Orders extends React.Component {

    constructor() {
        super()
        this.state = {
            data_quantity: this.createQuantityData()
        }
        this.preventDefault = this.preventDefault.bind(this);

    }

    createQuantityData() {
        let data = []
        let i = 0;
        for( i ; i < 195; i++){
            data.push({model:0, time:0, quantity:0, prediction: 0})
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

    preventDefault(event)
    {
        event.preventDefault();
    }

    createTable(limit){
        let table = []
        for (let i = 0; i < limit; i++) {
            let columns = []
            columns.push(<TableCell>{this.state.data_quantity[i].model}</TableCell>)
            columns.push(<TableCell>{this.state.data_quantity[i].time}</TableCell>)
            columns.push(<TableCell>{this.state.data_quantity[i].quantity}</TableCell>)
            columns.push(<TableCell>{this.state.data_quantity[i].prediction}</TableCell>)
            //Create the parent and add the children
            table.push(<TableRow key= {i}>{columns}</TableRow>)
        }
        return table
    }

   render() {
        const useStyles = makeStyles(theme => ({
            seeMore: {
                marginTop: theme.spacing(3),
            },
        }))

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
                     <FormControl >
                         <InputLabel >Model</InputLabel>
                         <Select
                             native
                             value = {this.state.all}
                             onChange={handleChange}
                             >
                             <option aria-label="None" value="" />
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

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Model</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Historical data</TableCell>
                                <TableCell>Predict data</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.createTable(10)}
                            </TableBody>
                    </Table>
                    <div className="seeMore">
                        <Link color="primary" href="/raw">
                            See more orders
                        </Link>
                    </div>
                </React.Fragment>
            )
    }
}



export default Orders;
