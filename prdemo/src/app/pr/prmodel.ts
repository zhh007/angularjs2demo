import { PRItemModel }      from './PRItemModel';

export class PRModel {
  constructor(
    public ID: number,
    public Deptment: string,
    public User: string,
    public Phone: string,
    public CreateTime: string,
    public IsPrePay: boolean,
    public Supplier: string,
    public SupplierAddress: string,
    public Total: number,
    public Items: PRItemModel[]
  ) {  }
}
