export interface RespuestaPosts {
    ok: boolean;
    pagina: number;
    posts: Post[];
}

export interface Post {
    imgs?: any[];
    _id?: string;
    img?: any[];
    mensaje?: string;
    coords?: string;
    usuario?: Usuario;
    created?: string;
    // __v?: number; esto es de mongo
}

export interface Usuario {
    avatar?: string;
    _id?: string;
    nombre?: string;
    email?: string;
    // __v?: number; esto es de mongo
    password?: string;
}
