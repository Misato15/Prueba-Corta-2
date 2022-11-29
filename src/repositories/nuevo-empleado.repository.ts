import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {NuevoEmpleado, NuevoEmpleadoRelations} from '../models';

export class NuevoEmpleadoRepository extends DefaultCrudRepository<
  NuevoEmpleado,
  typeof NuevoEmpleado.prototype.id,
  NuevoEmpleadoRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(NuevoEmpleado, dataSource);
  }
}
