import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component  } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  {
  totalProducts: number = 0;
  totalProductEntrant: number = 0;
  totalProductSortant: number = 0;

  private apiBaseUrl = 'http://localhost:9090/api/v1/admin/product/';
  private productHistoryUrl = `${this.apiBaseUrl}history`;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProductCounts();
    this.loadProductHistory();

  }

  loadProductCounts(): void {
    this.http.get< number >('http://localhost:9090/api/v1/admin/product/productCount')
    .subscribe(count => this.totalProducts = count);
  }

  loadProductHistory(): void {
    this.http.get<any[]>(this.productHistoryUrl)
      .subscribe(history => {
        this.totalProductEntrant = history.filter(item => item.state === 'Entrant').length;
        this.totalProductSortant = history.filter(item => item.state === 'Sortant').length;
      });
  }



}