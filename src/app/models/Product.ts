export class Product {
    ProductID?: bigint;
    ProductName?: string;
    SupplierID!: number;
    CategoryID!: number;
    QuantityPerUnit!: string;
    UnitPrice!: number;
    UnitsInStock!: number;
    UnitsOnOrder!: number;
    ReorderLevel!: number;
    Discontinued?: boolean;
    ImageUrl?: string;
}
