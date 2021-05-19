import { Frontier } from "../frontier/interfaces/app.state";
import { RootInterface } from './root-interface';


export interface AppState {
  frontier: Frontier;
  root: RootInterface;
}
