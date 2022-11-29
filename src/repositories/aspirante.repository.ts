import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Aspirante, AspiranteRelations, NuevoEmpleado} from '../models';
import {NuevoEmpleadoRepository} from './nuevo-empleado.repository';

export class AspiranteRepository extends DefaultCrudRepository<
  Aspirante,
  typeof Aspirante.prototype.id,
  AspiranteRelations
> {

  public readonly nuevoEmpleados: HasManyRepositoryFactory<NuevoEmpleado, typeof Aspirante.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('NuevoEmpleadoRepository') protected nuevoEmpleadoRepositoryGetter: Getter<NuevoEmpleadoRepository>,
  ) {
    super(Aspirante, dataSource);
    this.nuevoEmpleados = this.createHasManyRepositoryFactoryFor('nuevoEmpleados', nuevoEmpleadoRepositoryGetter,);
    this.registerInclusionResolver('nuevoEmpleados', this.nuevoEmpleados.inclusionResolver);
  }
}
