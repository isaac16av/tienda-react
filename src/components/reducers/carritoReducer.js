//con esto comienza la aplicaicon, la lista de productos y la lista de agregados al carrito
const initialState = {
    lista: [
        { id: 1, nombre: 'Video Juego', descripcion: 'Juego de acción para todas las edades.', precio: 40, img: 'https://cdn.pixabay.com/photo/2017/06/19/08/44/samus-2418643_960_720.png' },
        { id: 2, nombre: 'Camisa', descripcion: 'Camisa sensilla en tallas S, M y L.', precio: 20, img: 'https://cdn.pixabay.com/photo/2016/07/17/20/19/t-shirt-1524677_960_720.jpg' },
        { id: 3, nombre: 'Parlante Bluetooth', descripcion: 'Parlante inalábrico compatible con todos los dispositivos.', precio: 50, img: 'https://cdn.pixabay.com/photo/2018/01/30/15/53/speaker-3119037_960_720.jpg' },
        { id: 4, nombre: 'Tenis Nike', descripcion: 'Tenis Nike blancas, en todas las tallas.', precio: 70, img: 'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg' },
        { id: 5, nombre: 'Teclado', descripcion: 'Teclado USB de color negro.', precio: 15, img: 'https://cdn.pixabay.com/photo/2014/09/20/13/55/keyboard-453795_960_720.jpg' },
        { id: 6, nombre: 'Control de PS4', descripcion: 'Mando para PS4 de color azul.', precio: 60, img: 'https://cdn.pixabay.com/photo/2017/05/26/15/07/joystick-2346237_960_720.jpg' },
        { id: 7, nombre: 'Laptop', descripcion: 'MacBook de 7ma generación. Procesador 1.6GHz Core i5, Almacenamiento 128GB, RAM 8GB', precio: 1500, img: 'https://cdn.pixabay.com/photo/2016/10/12/13/32/office-1734485_960_720.jpg' },
    ],
    agregados: [], //agregados al carrito
    total: 0
}

function carritoReducer(state = initialState, action) {
    switch (action.type) {
        //Si es agregar
        case 'AGREGAR':
            //busca el producto
            let productoAgregar = state.lista.find(prod => prod.id === action.id);
            //revisar si ya esta en agregados
            let estaAgregado = state.agregados.find(prod => prod.id === action.id);

            if (estaAgregado) {
                //si esta entonces le aumenta la cantidad
                productoAgregar.cantidad++;
                //actualiza el precio total del producto
                productoAgregar.totalProd = productoAgregar.cantidad * productoAgregar.precio;
                return {
                    ...state,
                    //actualiza el total, sumando el precio
                    total: state.total + productoAgregar.precio
                }
            } else {
                //Si no esta, fija la cantidad
                productoAgregar.cantidad = 1;
                productoAgregar.totalProd = productoAgregar.precio;
                return {
                    ...state,
                    //agrega el producto recien agregado a la lista de agregados
                    agregados: [...state.agregados, productoAgregar],
                    total: state.total + productoAgregar.precio
                }
            }
        //Si se esta quitando
        case 'QUITAR':
            //Busca y quita de la lista el encontrado
            let productoQuitar = state.agregados.find(prod => prod.id === action.id);
            let agregadosFiltrada = state.agregados.filter(prod => prod.id !== action.id);

            //resta el total del producto del total de la lista
            let total = state.total - (productoQuitar.totalProd);
            return {
                ...state,
                agregados: agregadosFiltrada,
                total: total
            }
        default:
            return state;
    }
}

export default carritoReducer;