import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    navbarizq: {
        marginLeft: 'auto',
    },
    button: {
        margin: theme.spacing(2),
    }
}));

const linkLista = React.forwardRef((props, ref) => (
    <Link to='/' {...props} />
));

const linkCarrito = React.forwardRef((props, ref) => (
    <Link to='/carrito' {...props} />
));

function NavBar() {
    const classes = useStyles();

    return (
        <AppBar position='static'>
            <Container>
                <Toolbar>
                    <Typography variant="h6">
                        Tienda Virtual
                    </Typography>

                    <Button className={classes.navbarizq}
                        component={linkLista} color='inherit'>Lista de productos</Button>

                    <Button className={classes.button}
                        component={linkCarrito} color='inherit'>Ver Carrito</Button>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;