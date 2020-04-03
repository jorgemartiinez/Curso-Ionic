import { Schema, Document, model } from 'mongoose';

const postSchema = new Schema({

    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    imgs: [{
        type: String
    }],
    coords: {
        type: String // -13.324324, 1231232
    },
    usuario: {
        type: Schema.Types.ObjectId, //referenciamos al id de usuario
        ref: 'Usuario', // de la coleccion de usuarios
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    },

})

//funcion que se ejecuta antes de guardar los datos
postSchema.pre<IPost>( 'save', function( next ) {
    this.created = new Date();
    next();
});

interface IPost extends Document {
    created: Date;
    mensaje: string,
    img: string[],
    coords: string,
    usuario: string,
}

export const Post = model<IPost>('Post', postSchema);