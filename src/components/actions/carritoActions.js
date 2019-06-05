export const agregar = (id) => {
    return {
        type: 'AGREGAR',
        id
    }
}

export const quitar = (id) => {
    return {
        type: 'QUITAR',
        id
    }
}