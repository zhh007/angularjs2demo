import { PRModel }      from './PRModel';

export class PRListRsponse {
  constructor(
    public PageIndex: number,
    public Total: number,
    public List: PRModel[]
  ) {  }
}