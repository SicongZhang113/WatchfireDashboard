import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import StorageIcon from '@material-ui/icons/Storage';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Link from "@material-ui/core/Link";

export const mainListItems = (
  <div>
       <Link color="primary" href="/">
           <ListItem button>
               <ListItemIcon>
                   <DashboardIcon />
               </ListItemIcon>
               <ListItemText primary="Dashboard" />
           </ListItem>
       </Link>

      <Link color="primary" href="/raw">
          <ListItem button >
              <ListItemIcon>
                  <StorageIcon />
              </ListItemIcon >
              <ListItemText primary="Raw Data" />
          </ListItem>
      </Link>

      <Link color="primary" href="/vis">
          <ListItem button>
              <ListItemIcon>
                  <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Visualization" />
          </ListItem>
      </Link>

      <Link color="primary" href="/report">
          <ListItem button>
              <ListItemIcon>
                  <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
          </ListItem>
      </Link>
  </div>
);

// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );
