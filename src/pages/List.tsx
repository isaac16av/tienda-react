import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Snackbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add } from '../state/actions/cartActions';

interface State {
  open: boolean;
}

const styles = {
  media: {
    height: 140,
  },
};

class List extends Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  state: State = {
    open: false,
  };

  // @ts-ignore
  onClickAdd = id => {
    // @ts-ignore
    this.props.addProduct(id);
    this.onSnackPress();
  };

  onSnackPress = () => {
    this.setState({ open: true });
  };

  onCloseSnack = () => {
    this.setState({ open: false });
  };

  render() {
    // @ts-ignore
    let productsToShow = this.props.list.map((product: Product) => {
      return (
        <Grid item xs={3}>
          <Card key={product.id}>
            <CardMedia
              // @ts-ignore
              className={this.props.classes.media}
              image={product.img}
            />
            <CardContent>
              <Typography variant='h6'>
                {product.name} <small>${product.price}</small>
              </Typography>
              <hr />
              <Typography color='textSecondary'>
                {product.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => {
                  this.onClickAdd(product.id);
                }}
                color='secondary'
                size='small'>
                Add to cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });

    return (
      <div>
        <Container>
          <Grid container spacing={4}>
            {productsToShow}
          </Grid>
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.onCloseSnack}
          message={<span id='message-id'>Product successfully added!</span>}
        />
      </div>
    );
  }
}

// @ts-ignore
const mapStateToProps = state => {
  return {
    list: state.productList,
  };
};

// @ts-ignore
const mapDispatchToProps = dispatch => {
  return {
    addProduct: (id: number) => {
      dispatch(add(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withStyles(styles)(List));
