import {Entity, model, property, hasMany} from '@loopback/repository';
import {NuevoEmpleado} from './nuevo-empleado.model';

@model()
export class PuestoDisponible extends Entity {
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
  puesto: string;

  @property({
    type: 'number',
    required: true,
  })
  anios: number;

  @property({
    type: 'string',
    required: true,
  })
  especialidad: string;

  @property({
    type: 'boolean',
    required: true,
  })
  requisitos: boolean;

  @hasMany(() => NuevoEmpleado)
  nuevoEmpleados: NuevoEmpleado[];

  constructor(data?: Partial<PuestoDisponible>) {
    super(data);
  }
}

export interface PuestoDisponibleRelations {
  // describe navigational properties here
}

export type PuestoDisponibleWithRelations = PuestoDisponible & PuestoDisponibleRelations;
