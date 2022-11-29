import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Aspirante} from './aspirante.model';
import {PuestoDisponible} from './puesto-disponible.model';

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

  @belongsTo(() => Aspirante)
  aspiranteId: string;

  @belongsTo(() => PuestoDisponible)
  puestoDisponibleId: string;

  constructor(data?: Partial<NuevoEmpleado>) {
    super(data);
  }
}

export interface NuevoEmpleadoRelations {
  // describe navigational properties here
}

export type NuevoEmpleadoWithRelations = NuevoEmpleado & NuevoEmpleadoRelations;
