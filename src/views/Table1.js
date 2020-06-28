import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux'
import { myStore } from './store'
import EnhancedTableToolbar2 from './EnhancedToolbarP2'




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
    { id: 'document_create_date', numeric: false, disablePadding: true, label: 'Document Create Date' },
    { id: 'invoice_id', numeric: true, disablePadding: false, label: 'Invoice ID' },
    { id: 'baseline_create_date', numeric: false, disablePadding: true, label: 'Baseline Date' },
    { id: 'invoice_date_norm', numeric: false, disablePadding: true, label: 'Invoice Date' },
    { id: 'total_open_amount', numeric: true, disablePadding: false, label: 'Total Open Amount' },
    { id: 'cust_payment_terms', numeric: true, disablePadding: false, label: 'Customer Payment Terms' },
    { id: 'ship_date', numeric: false, disablePadding: true, label: 'Shipping Date' },
    { id: 'clearing_date', numeric: false, disablePadding: true, label: 'Clear Date' },
    { id: 'isOpen', numeric: true, disablePadding: false, label: 'Is Open Invoice' },
    { id: 'document_creation_date', numeric: false, disablePadding: true, label: 'Document Create Date' },
    { id: 'invoice_amount_doc_currency', numeric: true, disablePadding: false, label: 'Invoice Currency' },
    { id: 'document_id', numeric: true, disablePadding: false, label: 'Doc Id' },
    { id: 'actual_open_amount', numeric: true, disablePadding: false, label: 'Actual Amount Outstanding' },
    { id: 'paid_amount', numeric: true, disablePadding: false, label: 'Payment Amount' },
    { id: 'dayspast_due', numeric: true, disablePadding: false, label: 'Days past Due date' },
    { id: 'invoice_age', numeric: true, disablePadding: false, label: 'Age of Invoice' }
    
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



const styles = theme => ({
  root: {
    width: '100%',
    marginRight:theme.spacing.unit*2,
    marginLeft:theme.spacing.unit*2
  },
  table: {
    // minWidth: 1020,
  },
  tableWrapper: {
    // overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      order: 'asc',
      orderBy: 'pk_id',
      selected: [],
      
      open: false,
      page: 0,
      rowsPerPage: 8,
      PK_id:0
    };
  }
  

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
      console.log(event.target.checked)
      // this.setState({ selected: this.props.data.map(n => n.pk_id) });
      myStore.dispatch({
        type:"SELTABLE",
        payload:this.props.data.map(n => n.pk_id)
      })
      
      return;
    }
    
    myStore.dispatch({
      type:"SELTABLE",
      payload:[]
    })
  
    
  };

  handleClick = (event, id) => {
    
    console.log(id)
    const selectedIndex = this.props.SELTable.indexOf(id);
    console.log(selectedIndex)
    let newSelected = [];
    this.setState({PK_id:id})
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.props.SELTable, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.props.SELTable.slice(1));
    } else if (selectedIndex === this.props.SELTable.length - 1) {
      newSelected = newSelected.concat(this.props.SELTable.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.props.SELTable.slice(0, selectedIndex),
        this.props.SELTable.slice(selectedIndex + 1),
      );
    }
    // console.log(newSelected)
    // this.setState({ selected: newSelected });
    myStore.dispatch({
      type:"SELTABLE",
      payload:newSelected
    })
    // console.log(selected)
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
    console.log(this.props.SELTable)
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.props.SELTable.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const {  order, orderBy,  rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.data.length - page * rowsPerPage);

    return (
      
      
        <div>
        <EnhancedTableToolbar2 numSelected={this.props.SELTable}  A={this.state.PK_id} />
        <Paper className={classes.root} style={{height:'67vh',overflowX:'scroll', width:'98vw'}}>
        <div className={classes.tableWrapper}>
          <Table 
          autoid="invoice-table-customer"
          className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={this.props.SELTable.length}
              
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.props.data.length}
              style={{align:'left'}}
            />
            {/* <Paper style={{overflowY:'scroll'}}> */}
            <TableBody style={{backgroundColor:'#1B1F38',overflowY:'scroll'}} >
              {stableSort(this.props.data, getSorting(order, orderBy))
              .filter(name => name.customer_number==this.props.val)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.pk_id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event,n.pk_id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.pk_id}
                      selected={isSelected}
                      style={{height:"8vh"}}
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
                       
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows ,backgroundColor:"#1B1F38" }}>
                  <TableCell colSpan={12} />
                </TableRow>
              )}
            </TableBody>
            
          </Table>
        </div>
        </Paper>
        <TablePagination
          autoid="invoice-table-pagination-customer"
          style={{backgroundColor:'#252C48',color:'white'}}
          rowsPerPageOptions={[5, 10, 25]}
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
  SELECTED:state.SELECTED,
  val:state.val,
  SELTable:state.SELTable
}}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(EnhancedTable));