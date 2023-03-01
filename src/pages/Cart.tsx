import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { remove } from '../state/actions/cartActions';

class Cart extends Component {
  // @ts-ignore
  onClickRemove = id => {
    // @ts-ignore
    this.props.removeProduct(id);
  };

  render() {
    const listLink = React.forwardRef((props, ref) => (
      <Link to='/' {...props} />
    ));

    // @ts-ignore
    let empty = this.props.cart.length;

    let selectItemMsg = empty ? (
      <Typography variant='caption' color='textSecondary'>
        Click on each item to see more details
      </Typography>
    ) : null;

    let cartItems = empty ? (
      // @ts-ignore
      this.props.cart.map((product: Product) => {
        return (
          <Accordion>
            <AccordionSummary>
              <div>
                <Typography>{product.name}</Typography>
              </div>
              <div style={{ marginLeft: '1%' }}>
                <Typography color='textSecondary'> x{product.qty}</Typography>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <Typography>${product.total}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails style={{ display: 'inherit' }}>
              <div>
                <img src={product.img} alt={product.name} height='100px' />
              </div>
              <Typography>{product.description}</Typography>
              <Typography variant='caption' color='textSecondary'>
                Single price: ${product.price}
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Button
                onClick={() => {
                  this.onClickRemove(product.id);
                }}
                size='small'
                color='secondary'>
                Remove
              </Button>
            </AccordionActions>
          </Accordion>
        );
      })
    ) : (
      <div>
        <Typography variant='h6'>There are no items in your cart</Typography>
        <br />
        <Button
          component={listLink}
          size='small'
          variant='contained'
          color='primary'>
          Add Items
        </Button>
      </div>
    );

    return (
      <div className='Carrito'>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              {selectItemMsg}
              {cartItems}
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>Summary</Typography>
                  <hr />
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Sub total</TableCell>
                        {/* @ts-ignore */}
                        <TableCell align='right'>${this.props.total}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Taxes</TableCell>
                        <TableCell align='right'>13%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell align='right'>
                          {/* @ts-ignore */}$
                          {(this.props.total * 1.13).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardActions>
                  <Button
                    style={{ marginLeft: 'auto' }}
                    variant='outlined'
                    color='primary'
                    size='small'>
                    Finish purchase
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

// @ts-ignore
const mapStateToProps = state => {
  return {
    cart: state.inCart,
    total: state.total,
  };
};
// @ts-ignore
const mapDispatchToProps = dispatch => {
  return {
    // @ts-ignore
    removeProduct: id => {
      dispatch(remove(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
