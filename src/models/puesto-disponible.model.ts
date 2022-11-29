import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<PuestoDisponible>) {
    super(data);
  }
}

export interface PuestoDisponibleRelations {
  // describe navigational properties here
}

export type PuestoDisponibleWithRelations = PuestoDisponible & PuestoDisponibleRelations;
