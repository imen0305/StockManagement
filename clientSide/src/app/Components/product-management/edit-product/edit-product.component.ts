import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  product: any = {
    name: '',
    description: '',
    quantity: null,
    price: null,
    image: null,
    id: null
  };
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
  }

  loadProduct(id: string): void {
    this.http.get(`http://localhost:9090/api/v1/admin/product/${id}`)
      .subscribe((data: any) => {
        this.product = data;
      });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.product.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProduct(form: NgForm): void {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('quantity', this.product.quantity);
    formData.append('price', this.product.price);
    formData.append('id', this.product.id);
    if (this.product.image) {
      formData.append('image', this.product.image);
    }

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    this.http.put('http://localhost:9090/api/v1/admin/product/updateProduct', formData, { headers })
      .subscribe(
        () => this.router.navigate(['/managementProduct']),
        error => console.error('Error updating product:', error)
      );
  }

}
