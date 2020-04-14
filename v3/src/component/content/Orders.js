import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import $ from "jquery";


class Orders extends React.Component {

    constructor() {
        super()
        this.state = {
            data: this.createData()
        }
        this.preventDefault = this.preventDefault.bind(this);
        this.newgetList = this.newgetList.bind(this);
    }

    createData() {
        let data = []
        let i = 0;
        for( i ; i < 195; i++){
            data.push({model:0, time:0, quantity:0, prediction: 0})
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

    preventDefault(event)
    {
        event.preventDefault();
    }

    createTable(limit){
        let table = []
        for (let i = 0; i < limit; i++) {
            let columns = []
            columns.push(<TableCell>{this.state.data[i].model}</TableCell>)
            columns.push(<TableCell>{this.state.data[i].time}</TableCell>)
            columns.push(<TableCell>{this.state.data[i].quantity}</TableCell>)
            columns.push(<TableCell>{this.state.data[i].prediction}</TableCell>)
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

            //const classes = useStyles();

            return (
                <React.Fragment>
                    <Title>{}</Title>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Model</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Predicted Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.createTable(10)}
                            </TableBody>
                    </Table>
                    <div className="seeMore">
                        <Link color="primary" href="#" onClick={this.preventDefault}>
                            See more orders
                        </Link>
                    </div>
                </React.Fragment>
            )
    }
}


export default Orders;

// //const row = getList();
// const row = newgetList();
//
// function newgetList(){
//     $.get("api/tasks", (data) => {
//         console.log(data)
//
//         return data
//     });
// }
// //const row = async () => {
// //return await getList()
// //}
//
//
// // Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//     return { id, date, name, shipTo, paymentMethod, amount };
// }
//
//
// const rows = [
//     createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
//     createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
//     createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//     createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
//     createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
// ];
//
// function preventDefault(event) {
//     event.preventDefault();
// }
//
// const useStyles = makeStyles(theme => ({
//     seeMore: {
//         marginTop: theme.spacing(3),
//     },
// }));
//
// export default function Orders() {
//     const classes = useStyles();
//
//     return (
//         <React.Fragment>
//             <Title>{}</Title>
//             <Table size="small">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>Date</TableCell>
//                         <TableCell>Name</TableCell>
//                         <TableCell>Ship To</TableCell>
//                         <TableCell>Payment Method</TableCell>
//                         <TableCell align="right">Sale Amount</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {console.log(row.task[1])}
//                     {rows.map(row => (
//                         <TableRow key={row.id}>
//                             <TableCell>{row.model}</TableCell>
//                             <TableCell>{row.time}</TableCell>
//                             <TableCell>{row.quantity}</TableCell>
//                             <TableCell>{row.prediction}</TableCell>
//                             <TableCell align="right">{row[1]}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//             <div className={classes.seeMore}>
//                 <Link color="primary" href="#" onClick={preventDefault}>
//                     See more orders
//                 </Link>
//             </div>
//         </React.Fragment>
//     );
// }
