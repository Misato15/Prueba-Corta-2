import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {PuestoDisponible, PuestoDisponibleRelations} from '../models';

export class PuestoDisponibleRepository extends DefaultCrudRepository<
  PuestoDisponible,
  typeof PuestoDisponible.prototype.id,
  PuestoDisponibleRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(PuestoDisponible, dataSource);
  }
}
