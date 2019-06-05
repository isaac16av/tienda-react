import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { agregar } from '../components/actions/carritoActions';
import { withStyles } from '@material-ui/styles';


const styles = {
    media: {
        height: 140,
    },
};

class Lista extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //fijar el estado de snackBar
            open: false
        };
    }

    click_agregar = (id) => {
        this.props.agregar(id);
        this.click_snack();
    }

    click_snack = () => {
        this.setState({ open: true });
    }

    cerrar_snack = () => {
        this.setState({ open: false });
    };

    render() {
        //recorrer los productos
        let productosMostrar = this.props.lista.map(producto => {
            return (
                //Card para un unico producto
                <Grid item xs={3}>
                    <Card key={producto.id}>
                        <CardMedia
                            className={this.props.classes.media}
                            image={producto.img}
                        />
                        <CardContent>
                            <Typography variant='h6'>
                                {producto.nombre} <small>${producto.precio}</small>
                            </Typography>
                            <hr />
                            <Typography color='textSecondary'>
                                {producto.descripcion}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => { this.click_agregar(producto.id) }} color='secondary' size='small'>Agregar al Carrito</Button>
                        </CardActions>
                    </Card>
                </Grid>
            )
        });

        return (
            //muestra los productos
            <div className="Lista">
                <Container>
                    <Grid container spacing={4}>
                        {productosMostrar}
                    </Grid>
                </Container>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.cerrar_snack}
                    message={<span id="message-id">Agregado al Carrito!</span>}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lista: state.lista
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        agregar: (id) => { dispatch(agregar(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Lista));