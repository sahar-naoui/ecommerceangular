import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  shippers: any[] = [];
  orders: any[] = [];
  products: any[] = [];
  suppliers: any[] = [];
  customers: any[] = [];
  categories: any[] = [];
  employees: any[] = [];
  territories: any[] = [];
  regions: any[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('barChart', { static: false }) barChart?: BaseChartDirective;
  @ViewChild('radarChart', { static: false }) radarChart?: BaseChartDirective;
  @ViewChild('polarChart', { static: false }) polarChart?: BaseChartDirective;
  @ViewChild('pieChart', { static: false }) pieChart?: BaseChartDirective;
  @ViewChild('lineChart', { static: false }) lineChart?: BaseChartDirective;
  @ViewChild('doughnutChart', { static: false }) doughnutChart?: BaseChartDirective;
  
  // Chart.js options
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public polarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mois'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Ventes'
        }
      }
    },
  };

  public doughnutChartOptions: ChartOptions = { responsive: true };

  public barChartLabels: string[] = ['Shippers', 'Orders', 'Products', 'Suppliers', 'Customers', 'Categories',
    'Employees', 'Territories', 'Regions'];
  public barChartType: ChartType = 'bar';
  public barChartData: ChartDataset[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Total par entité' }
  ];

  public radarChartLabels: string[] = ['Employees', 'Territories', 'Regions'];
  public radarChartType: ChartType = 'radar';
  public radarChartData: ChartDataset[] = [{ data: [0, 0, 0], label: 'Ressources internes' }];
  

  
  public polarChartLabels: string[] = [];
  public polarChartType: ChartType = 'polarArea';
  public polarChartData: ChartDataset[] = [{ data: [], label: 'Clients par pays' }];
  
  public pieChartType: ChartType = 'pie';
  public pieChartLabels: string[] = ['Produits', 'Fournisseurs'];
  public pieChartData: ChartDataset[] = [{ data: [0, 0], label: 'Produits vs Fournisseurs' }];
  
  public lineChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartDataset[] = [
    {
      data: [],  // Données dynamiques de ventes mensuelles
      label: 'Ventes mensuelles',
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ];

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartDataset[] = [
    { data: [], label: 'Produits par catégorie' }
  ];
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    console.log("DashboardComponent loaded");
    this.loadData();
  }

  loadData(): void {
    let loadedCount = 0;

    const updateChart = () => {
      loadedCount++;
      if (loadedCount === 9) {
        this.chart?.update();
        this.loadMonthlySalesData();  
        console.log("All data loaded, chart updated");
      }
    };

    this.dashboardService.getListShipper().subscribe(data => {
      console.log("Shippers", data);
      this.shippers = data.Data;
      this.barChartData[0].data[0] = data.Data.length;
      updateChart();
    });

    this.dashboardService.getListOrder().subscribe(data => {
      this.orders = data.Data;
      this.barChartData[0].data[1] = data.Data.length;
      updateChart();
    });

    this.dashboardService.getListProduct().subscribe(data => {
      this.products = data.Data;
      this.barChartData[0].data[2] = data.Data.length;
      updateChart();
    });

    this.dashboardService.getListSupplier().subscribe(data => {
      this.suppliers = data.Data;
      this.barChartData[0].data[3] = data.Data.length;
      updateChart();
    });

    this.dashboardService.getListCustomer().subscribe(data => {
      this.customers = data.Data;
      this.barChartData[0].data[4] = data.Data.length;
      updateChart();
    });

    this.dashboardService.getListCategorie().subscribe(data => {
      this.categories = data.Data;
      this.barChartData[0].data[5] = data.Data.length;
      updateChart();
    });

    let radarCounts = { employees: 0, territories: 0, regions: 0 };
    let radarLoaded = { employees: false, territories: false, regions: false };

    const updateRadarChart = () => {
      if (radarLoaded.employees && radarLoaded.territories && radarLoaded.regions) {
        this.radarChartLabels = ['Employés', 'Territoires', 'Régions'];
        this.radarChartData = [
          {
            data: [radarCounts.employees, radarCounts.territories, radarCounts.regions],
            label: 'Ressources internes'
          }
        ];
        this.radarChart?.update();
      }
    };



    this.dashboardService.getListEmployee().subscribe(data => {
      this.employees = data.Data;
      this.barChartData[0].data[6] = data.Data.length;
      radarCounts.employees = data.Data.length;
      radarLoaded.employees = true;
      updateRadarChart();
      updateChart();
    });
    
    this.dashboardService.getListTerritory().subscribe(data => {
      this.territories = data.Data;
      this.barChartData[0].data[7] = data.Data.length;
      radarCounts.territories = data.Data.length;
      radarLoaded.territories = true;
      updateRadarChart();
      updateChart();
    });
    
    this.dashboardService.getListRegion().subscribe(data => {
      this.regions = data.Data;
      this.barChartData[0].data[8] = data.Data.length;
      radarCounts.regions = data.Data.length;
      radarLoaded.regions = true;
      updateRadarChart();
      updateChart();
    });
    
    this.dashboardService.getListCustomer().subscribe(data => {
      this.customers = data.Data;
      const countryCount: { [key: string]: number } = {};
      data.Data.forEach((c: any) => {
        if (!countryCount[c.Country]) countryCount[c.Country] = 0;
        countryCount[c.Country]++;
      });
      this.polarChartLabels = Object.keys(countryCount);
      this.polarChartData[0].data = Object.values(countryCount);
      this.polarChart?.update();
      updateChart();
    });
    
    this.dashboardService.getListProduct().subscribe(data => {
      this.products = data.Data;
      this.barChartData[0].data[2] = data.Data.length;
      this.pieChartData = [
        {
          data: [this.products.length, this.suppliers.length],
          label: 'Produits vs Fournisseurs'
        }
      ];
      this.pieChart?.update();
      updateChart();
    });
    
    this.dashboardService.getListSupplier().subscribe(data => {
      this.suppliers = data.Data;
      this.barChartData[0].data[3] = data.Data.length;
      this.pieChartData[0].data[1] = data.Data.length;
      this.pieChart?.update();
      updateChart();
    });
    combineLatest([
      this.dashboardService.getListProduct(),
      this.dashboardService.getListCategorie()
    ]).subscribe(([productData, categoryData]) => {
      this.products = productData.Data;
      this.categories = categoryData.Data;

      const categoryCount: { [key: string]: number } = {};
      this.categories.forEach((cat: any) => {
        categoryCount[cat.CategoryName] = 0;
      });

      this.products.forEach((prod: any) => {
        const cat = this.categories.find(c => c.CategoryID === prod.CategoryID);
        if (cat) {
          categoryCount[cat.CategoryName]++;
        }
      });

      this.doughnutChartLabels = Object.keys(categoryCount);
      this.doughnutChartData[0].data = Object.values(categoryCount);
      this.doughnutChart?.update();
    });
  }

  loadMonthlySalesData(): void {
    const monthlySales: number[] = Array(12).fill(0);
    this.orders.forEach((order: any) => {
      const orderDate = new Date(order.OrderDate);
      const month = orderDate.getMonth();
      monthlySales[month] += order.Freight;  // Ajoute la valeur de la vente (Freight ou toute autre métrique)
    });
    this.lineChartData = [
      {
        data: monthlySales,
        label: 'Ventes mensuelles',
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ];
    this.lineChart?.update();
  }
}
