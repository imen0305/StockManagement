import { Component, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StateChangeDialogComponent } from './state-change-dialog/state-change-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';

export interface ProductHistory {
  idProduct: number;
  name: string;
  description: string;
  quantity: number;
  username: string;
  state: string;
}

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrl: './product-history.component.scss',
})
export class ProductHistoryComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'description', 'quantity', 'state'];
  dataSource = new MatTableDataSource<ProductHistory>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.getProductHistory();
  }

  getProductHistory() {
    this.http.get<ProductHistory[]>('http://localhost:9090/api/v1/admin/product/history')
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openStateChangeModal(row: any): void {
    const dialogRef = this.dialog.open(StateChangeDialogComponent, {
      width: '260px',
      data: { currentState: row.state }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        row.state = result;
        this.updateState(row.idProduct, result);
      }
    });

  }

  updateState(idProduct: number, newState: string): void {
    const url = 'http://localhost:9090/api/v1/admin/product/changeState';

    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new HttpParams()
      .set('productId', idProduct.toString())
      .set('state', newState);

    this.http.patch(url, formData, { headers }).subscribe(
      (response: any) => {
        console.log('State updated successfully:', response);
        this.updateTableRow(idProduct, response.state);
      },
      (error) => {
        console.error('Error updating state:', error);
      }
    );
  }

  updateTableRow(idProduct: number, newState: string): void {
    const row = this.dataSource.data.find(item => item.idProduct === idProduct);
    if (row) {
      row.state = newState;
    }
  }
}