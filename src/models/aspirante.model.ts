import {Entity, model, property, hasMany} from '@loopback/repository';
import {NuevoEmpleado} from './nuevo-empleado.model';

@model()
export class Aspirante extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @property({
    type: 'number',
    required: true,
  })
  experiencia: number;

  @property({
    type: 'string',
    required: true,
  })
  especialidad: string;

  @hasMany(() => NuevoEmpleado)
  nuevoEmpleados: NuevoEmpleado[];

  constructor(data?: Partial<Aspirante>) {
    super(data);
  }
}

export interface AspiranteRelations {
  // describe navigational properties here
}

export type AspiranteWithRelations = Aspirante & AspiranteRelations;
