import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import axios from 'axios'
import { connect } from 'react-redux'
import {Button} from '@material-ui/core'
import {myStore} from './store'
import EnhancedTableToolbar from './EnhancedTableToolbar'



function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'customer_name', numeric: false, disablePadding: true, label: 'Name of Customer' },
    { id: 'customer_number', numeric: true, disablePadding: true, label: 'Customer Number' },
    { id: 'acct_doc_header_id', numeric: true, disablePadding: false, label: 'Account Header ID' },
    { id: 'company_id', numeric: true, disablePadding: false, label: 'Company ID' },
    { id: 'document_number', numeric: true, disablePadding: false, label: 'Document Number' },
    { id: 'business_code', numeric: false, disablePadding: true, label: 'Business Code' },
    { id: 'doctype', numeric: false, disablePadding: true, label: 'Document Type' },
    { id: 'fk_customer_map_id', numeric: true, disablePadding: false, label: 'Customer Map ID' },
    { id: 'document_create_date', numeric: false, disablePadding: false, label: 'Document Create Date' },
    { id: 'invoice_id', numeric: true, disablePadding: false, label: 'Invoice ID' },
    { id: 'baseline_create_date', numeric: false, disablePadding: true, label: 'Baseline Date' },
    { id: 'invoice_date_norm', numeric: false, disablePadding: true, label: 'Invoice Date' },
    { id: 'total_open_amount', numeric: true, disablePadding: false, label: 'Total Open Amount' },
    { id: 'cust_payment_terms', numeric: true, disablePadding: false, label: 'Customer Payment Terms' },
    { id: 'ship_date', numeric: false, disablePadding: true, label: 'Shipping Date' },
    { id: 'clearing_date', numeric: false, disablePadding: true, label: 'Clear Date' },
    { id: 'isOpen', numeric: true, disablePadding: false, label: 'Is Open Invoice' },
    { id: 'document_creation_date', numeric: false, disablePadding: false, label: 'Document Create Date' },
    { id: 'invoice_amount_doc_currency', numeric: true, disablePadding: false, label: 'Invoice Currency' },
    { id: 'document_id', numeric: true, disablePadding: false, label: 'Doc Id' },
    { id: 'actual_open_amount', numeric: true, disablePadding: false, label: 'Actual Amount Outstanding' },
    { id: 'paid_amount', numeric: true, disablePadding: false, label: 'Payment Amount' },
    { id: 'dayspast_due', numeric: true, disablePadding: false, label: 'Days past Due date' },
    { id: 'invoice_age', numeric: true, disablePadding: false, label: 'Age of Invoice' },
    { id: 'pred_paid_amount', numeric: true, disablePadding: false, label: 'Predicted Amount' },
    { id: 'pred_payment_type', numeric: false, disablePadding: false, label: 'Predicted Payment Type' }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead >
        <TableRow >
          <TableCell padding="checkbox" style={{backgroundColor:'#1B1F38'}}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              style={{color:'white'}}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
                style={{backgroundColor:'#1B1F38',color:'white'}}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// const toolbarStyles = theme => ({
//   root: {
//     paddingRight: theme.spacing.unit,
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   spacer: {
//     flex: '1 1 100%',
//   },
//   actions: {
//     color: theme.palette.text.secondary,
//   },
//   title: {
//     flex: '0 0 auto',
//   },
// });

// let EnhancedTableToolbar =(props)=> {


  

//   // FlaskCall()
//   // {
//   //    const dataNew={
//   //      'id':'1705076',
//   //      'data':this.props.RowData
//   //    }
//   //    axios.post('http://localhost:5000/predict?', {},{
//   //      header:{'Content-Type':'application/json'},
//   //      params:{
//   //        data:dataNew
//   //      }
//   //    })
//   //   .then((response) => {
//   //     console.log(response);
//   //   }, (error) => {
//   //     console.log(error);
//   //   });

//   // }

//   // render(){

  
//   const { numSelected, classes } = props;

  

//   return (
//     <Toolbar style={{backgroundColor:'#252C48'}}
//       className={classNames(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       <div className={classes.title}>
        
//           <Typography variant="h6" id="tableTitle" style={{color:'white'}}>
//             Invoices
//           </Typography>
        
//       </div>
//       <div className={classes.spacer} />
//       <div className={classes.actions}>
//         {numSelected > 0 ? (
//           <Button  style={{backgroundColor:'rgb(93,175,240,0.5)',fontSize:13,color:'white',borderColor:'rgb(93,175,240,0.5)'}}
//           onClick={()=>{
//             const dataNew={
//               'id':'1705076',
//               'data':props.RowData
//             }
//             console.log(dataNew)
//             axios.post('http://localhost:5000/predict?',{},{
//               header:{'Content-Type':'application/json'},
//               params:{
//                 data:dataNew
//               }
//             })
//            .then((response) => {
//              console.log(response);
//            }, (error) => {
//              console.log(error);
//            });
//           }}
          
//           >PREDICT</Button>
//         ) : (
//           <Button disabled='true' style={{backgroundColor:'gray',fontSize:13,color:'white',borderColor:'gray'}}>PREDICT</Button>
//         )}
//       </div>
//     </Toolbar>
//   );
//         // }

        

// };
// // const mapStateToProps = state => {
// //   return{
  
  
// //   RowData:state.RowData
// // }}
// EnhancedTableToolbar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
// };

// EnhancedTableToolbar =withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
    overflowY:'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props)
  {
    super(props)
    
  }
  state = {
    order: 'asc',
    orderBy: 'pk_id',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 7,
  };
  // componentWillMount() {
    
  //       this.setState({ data:[...this.props.DATA] });
        
      
  // }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.data.map(n => n.pk_id) }));
      // console.log(this.state.selected)
      return;
    }
    this.setState({ selected: [] });
  };

  handleRowData(d)
  {
      var DD=this.props.RowData;
      DD.push(d);
      myStore.dispatch({
        type: "FETCH_ROW_DATA",
        payload:DD
      })
    //  console.log(this.props.RowData)
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id.pk_id);
    // console.log(selectedIndex)
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id.pk_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
     
    this.setState({ selected: newSelected });
    this.handleRowData(id);
    // console.log(selected)
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.data.length - page * rowsPerPage);
    
    return (
         <div style={{width:"63vw" ,paddingLeft:"1vw" }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Paper className={classes.root} style={{ height:'50vh',overflowY:'scroll' }}>
        <div className={classes.tableWrapper}>
          <Table 
          autoid="invoice-table-collector"
          className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.props.data.length}
            />
            <TableBody style={{backgroundColor:'#1B1F38',overflowY:'scroll'}} >
              {stableSort(this.props.data, getSorting(order, orderBy))
                .filter(A=> this.props.FilterP.indexOf(A.business_code)!=-1||this.props.FilterP.length==0)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.pk_id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.pk_id}
                      selected={isSelected}
                      style={{height:'2vh'}}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} style={{color:'white'}}/>
                      </TableCell>
                      <TableCell style={{color:'white'}} component="th" scope="row" padding="none">
                        {n.customer_name}
                      </TableCell>
                      <TableCell style={{color:'white'}}  align="right">{n.customer_number}</TableCell>
                      <TableCell style={{color:'white'}} align="right">{n.acct_doc_header_id}</TableCell>
                      <TableCell style={{color:'white'}} align="right">{n.company_id}</TableCell>
                       <TableCell style={{color:'white'}} align="right">{n.document_number}</TableCell>
                       <TableCell style={{color:'white'}} align="right">{n.business_code}</TableCell>
                      <TableCell style={{color:'white'}} align="right">{n.doctype}</TableCell>
                       <TableCell style={{color:'white'}} align="right">{n.fk_customer_map_id}</TableCell>
                       <TableCell style={{color:'white'}} align="right">{n.document_create_date}</TableCell>
                         <TableCell style={{color:'white'}} align="right">{n.invoice_id}</TableCell>
                          <TableCell style={{color:'white'}} align="right">{n.baseline_create_date}</TableCell>
                          <TableCell style={{color:'white'}} align="right">{n.invoice_date_norm}</TableCell>
                             <TableCell style={{color:'white'}} align="right">{n.total_open_amount}</TableCell>
                          <TableCell style={{color:'white'}} align="right">{n.cust_payment_terms}</TableCell>
                           <TableCell style={{color:'white'}} align="right">{n.ship_date}</TableCell>
                         <TableCell style={{color:'white'}} align="right">{n.clearing_date}</TableCell>
                      <TableCell style={{color:'white'}} align="right">{n.isOpen}</TableCell>
                         <TableCell style={{color:'white'}} align="right">{n.document_creation_date}</TableCell>
                         <TableCell style={{color:'white'}} align="right">{n.invoice_amount_doc_currency}</TableCell>
                           <TableCell style={{color:'white'}} align="right">{n.document_id}</TableCell>
                            <TableCell style={{color:'white'}} align="right">{n.actual_open_amount}</TableCell>
                            <TableCell style={{color:'white'}} align="right">{n.paid_amount}</TableCell>
                          <TableCell style={{color:'white'}} align="right">{n.dayspast_due}</TableCell>
                        <TableCell style={{color:'white'}} align="right">{n.invoice_age}</TableCell>
                       <TableCell style={{color:'white'}} align="right">{n.predictions}</TableCell>
                          <TableCell style={{color:'white'}} align="right">{n.predicted_payment_type}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows,backgroundColor:"#1B1F38" }}>
                  <TableCell colSpan={12} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        </Paper>
        <TablePagination
          autoid="invoice-table-pagination-collector"
          style={{backgroundColor:'#252C48',color:'white'}}
          rowsPerPageOptions={[5,10,25]}
          component="div"
          count={this.props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          } }
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
  
  data:state.data,
  RowData:state.RowData,
  FilterP:state.FilterP
}}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(EnhancedTable));