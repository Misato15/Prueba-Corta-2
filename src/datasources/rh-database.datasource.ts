import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'conn',
  connector: 'mongodb',
  url: 'mongodb+srv://admin:taehyun@cluster0.irewiil.mongodb.net/candidatos',
  host: 'cluster0.irewiil.mongodb.net',
  port: 27018,
  user: '',
  password: '',
  database: 'rh_database',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RhDatabaseDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'rh_database';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.rh_database', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
