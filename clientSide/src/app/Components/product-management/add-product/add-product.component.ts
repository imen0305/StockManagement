import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  product = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,
  };
  selectedFile: File | null = null;
  constructor(private http: HttpClient, private router: Router) {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  addProduct(): void {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('quantity', this.product.quantity.toString());
    formData.append('price', this.product.price.toString());
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    this.http.post('http://localhost:9090/api/v1/admin/product/addProduct', formData, { headers })
      .subscribe({
        next: () => this.router.navigate(['/managementProduct']),
        error: (err) => console.error('Error adding product:', err)
      });
  }

}
