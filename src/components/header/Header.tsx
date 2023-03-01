import {
  AppBar,
  Button,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

// @ts-ignore
const useStyles = makeStyles(theme => ({
  navbarLeft: {
    marginLeft: 'auto',
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const linkList = React.forwardRef((props, ref) => <Link to='/' {...props} />);
const linkCart = React.forwardRef((props, ref) => (
  <Link to='/cart' {...props} />
));

function NavBar() {
  // @ts-ignore
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar>
          <Typography variant='h6'>Virtual Store</Typography>

          <Button
            className={classes.navbarLeft}
            component={linkList}
            color='inherit'>
            Product list
          </Button>

          <Button
            className={classes.button}
            component={linkCart}
            color='inherit'>
            My Cart
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
