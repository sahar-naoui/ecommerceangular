export class Order {
    OrderID?: bigint;
    CustomerID!: string;
    EmployeeID!: number;
    OrderDate!: string;
    RequiredDate!: string;
    ShippedDate!: string;
    ShipVia!: bigint;
    Freight!: number;
    ShipName!: string;
    ShipAddress!: string;
    ShipCity!: string;
    ShipRegion!: string;
    ShipPostalCode!: string;
    ShipCountry!: string;
}
  