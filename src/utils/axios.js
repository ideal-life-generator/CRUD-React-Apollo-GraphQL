import { create } from 'axios';
import { graphQLServer } from '../config';

export default create({
  baseURL: graphQLServer,
});
