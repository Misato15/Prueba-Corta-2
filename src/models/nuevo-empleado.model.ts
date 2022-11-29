import {Entity, model, property} from '@loopback/repository';

@model()
export class NuevoEmpleado extends Entity {
  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<NuevoEmpleado>) {
    super(data);
  }
}

export interface NuevoEmpleadoRelations {
  // describe navigational properties here
}

export type NuevoEmpleadoWithRelations = NuevoEmpleado & NuevoEmpleadoRelations;
