import { Component } from '@angular/core';
import { SidebarServiceService } from '../../Services/sidebar-service.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  constructor(private authService: AuthenticationService, private router: Router, private sidebarService: SidebarServiceService) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
    
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
