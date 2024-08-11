import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../Models/Product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit {

  displayedColumns: string[] = ['index', 'image', 'name', 'description', 'quantity', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<Product[]>('http://localhost:9090/api/v1/admin/product')
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/managementProduct/addProduct']); // Navigate to the Add Product component
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editProduct(product: Product): void {
    this.router.navigate(['/managementProduct/editProduct/', product.idProduct]);
  }

  deleteProduct(idProduct: number): void {
    const confirmDelete = window.confirm('Souhaitez-vous vraiment supprimer ce produit ?');
    if (confirmDelete) {
      this.http.delete(`http://localhost:9090/api/v1/admin/product/${idProduct}`)
        .subscribe(
          () => {
            this.loadProducts();
          },
          error => {
            console.error('Error deleting product:', error);
          }
        );
    }
  }
}
