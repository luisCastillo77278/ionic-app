export interface Gastos{
    uid?: string;
    nombre?: string;
    id?: string;
    ondometro: string;
    precio_l: string;
    costo_t: string;
    total_c: string;
    hora?: number;
}

export interface Usuario {
    uid?: string;
    nombre?: string;
    apellido?: string;
    email: string;
    password: string;

}

export interface Marker{
    position: {
        lat: number;
        lng: number;
    };
    title: string;
}

export interface WayPoint {
    location: {
      lat: number,
      lng: number,
    };
    stopover: boolean;
  }
  