import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { quitar } from '../components/actions/carritoActions';

class Carrito extends Component {

    //al quitar uno de la lista
    click_quitar = (id) => {
        this.props.quitar(id);
    }

    render() {
        const linkLista = React.forwardRef((props, ref) => (
            <Link to='/' {...props} />
        ));

        //comprobar que haya productos en agregados
        let vacio = this.props.carrito.length;

        //validaciones para saber si hay productos y que hacer
        let mensajeSeleccionar = vacio ? (
            <Typography variant='caption' color='textSecondary'>
                Seleccione cada articulo para ver el detalle
            </Typography>
        ) : (<div></div>);

        let agregadosCarrito = vacio ?
            (
                //Recorre el carrito (agregados)
                this.props.carrito.map(producto => {
                    return (
                        //Comienza el panel de un producto en carrito
                        <ExpansionPanel>
                            <ExpansionPanelSummary>
                                <div>
                                    <Typography>{producto.nombre}</Typography>
                                </div>
                                <div style={{ marginLeft: '1%' }}>
                                    <Typography color='textSecondary'> x{producto.cantidad}</Typography>
                                </div>
                                <div style={{ marginLeft: 'auto' }}>
                                    <Typography>${producto.totalProd}</Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{ display: 'inherit' }}>
                                <div>
                                    <img src={producto.img} alt={producto.nombre} height='100px' />
                                </div>
                                <Typography>
                                    {producto.descripcion}
                                </Typography>
                                <Typography variant='caption' color='textSecondary'>
                                    Precio por unidad: ${producto.precio}
                                </Typography>
                            </ExpansionPanelDetails>
                            <Divider />
                            <ExpansionPanelActions>
                                <Button onClick={() => { this.click_quitar(producto.id) }} size='small' color='secondary'>Quitar</Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                        //Termina el panel de un producto en carrito
                    )
                })
            ) : (
                <div>
                    <Typography variant='h6'>No hay productos agregados en el carrito</Typography>
                    <br />
                    <Button component={linkLista} size='small' variant='contained' color='primary'>Ver Productos</Button>
                </div>
            );

        return (
            <div className='Carrito'>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={8}>
                            {mensajeSeleccionar}
                            {agregadosCarrito}
                        </Grid>
                        <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h6'>
                                        Resumen
                                    </Typography>
                                    <hr />
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Sub Total</TableCell>
                                                <TableCell align="right">${this.props.total}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>IV</TableCell>
                                                <TableCell align="right">13%</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Total</TableCell>
                                                <TableCell align="right">${(this.props.total * 1.13).toFixed(2)}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardActions>
                                    <Button style={{ marginLeft: 'auto' }} variant='outlined' color='primary' size='small'>Proceder al Pago</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        carrito: state.agregados,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        quitar: (id) => { dispatch(quitar(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito);