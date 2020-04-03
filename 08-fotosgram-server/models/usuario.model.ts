import { Schema, model, Document } from "mongoose";
import bcryptjs from 'bcryptjs';

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"]
  },
  avatar: {
    type: String,
    default: "av-1.png"
  },
  email: {
    type: String,
    unique: true,
    required: [true]
  },
  password: {
    type: String,
    required: [true, 'La contraseña es necesaria']
  }
});

usuarioSchema.method('compararPassword', function( password: string = ''): boolean {

    if( bcryptjs.compareSync( password, this.password ) ){
        return true;
    }else{
        return false;
    }

});

interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  avatar: string;

  compararPassword(password: string) :boolean;
}

export const Usuario = model<IUsuario>("Usuario", usuarioSchema);
