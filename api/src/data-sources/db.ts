import { SQLDataSource } from "datasource-sql";
import config from 'config';
import { Knex } from "knex";

import { SortByField } from "../graphql/resolvers";
import { IParaglinder, IBrand, CENCertifications, ParaglindingPractices } from "../types";

const KNEX_CONFIG = {
  client: 'pg',
  connection: config.get('database') as Knex.PgConnectionConfig,
};

const MINUTE = 60;

class ParaCompDb extends SQLDataSource {

  constructor() {
    super(KNEX_CONFIG);
  }

  getParaglinders = (pageSize: number, pageNumber: number, sortBy?: SortByField) => {
    let query = this.knex
      .select<Array<IParaglinder>>("*")
      .from("brand_model");
    if (sortBy)
      query.orderBy(sortBy, "asc")
    query.limit(pageSize)
      .offset(pageSize * (pageNumber - 1))
      .cache(MINUTE);
    return query;
  }

  updateParaglinder(name: string, brand: string, CEN?: CENCertifications, allon?: number, practice?: ParaglindingPractices, ratio?: number) {
    let fieldToUpdate: Partial<IParaglinder> = {};
    if (CEN)
      fieldToUpdate.CEN = CEN;
    if (allon)
      fieldToUpdate.allon = allon;
    if (practice)
      fieldToUpdate.practice = practice;
    if (ratio)
      fieldToUpdate.ratio = ratio;

    return this.knex("brand_model").update(fieldToUpdate).where({ name: name, brand: brand });
  }
  deleteParaglinder(name: string, brand: string): any {
    return this.knex("brand_model").delete().where({ name: name, brand: brand });
  }

  getParaglinder(name: string, brand: string) {
    return this.knex
      .select<IParaglinder>("*")
      .from("brand_model")
      .where({ name, brand })
      .first()
  }

  getBrands = () => {
    return this.knex
      .select<Array<IBrand>>("*")
      .from("brand")
  }

  getTotal() {
    let query = this.knex
      .count<[{ count: number }]>("*")
      .from("brand_model")
      .cache(MINUTE);
    return query;
  }
}

export default ParaCompDb;