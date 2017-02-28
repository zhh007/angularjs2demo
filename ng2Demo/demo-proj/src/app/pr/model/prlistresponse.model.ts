import {PRModel} from './pr.model'

export class PRListResponse {
  constructor(
    public PageIndex: number,
    public Total: number,
    public List: PRModel[]
  ) {  }
}