import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
declare var bootstrap: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = [];
  currentSortKey: keyof User | 'name' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedUser: any = null;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      }
    });
  }

  sortBy(key: keyof User): void {
    if (this.currentSortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortKey = key;
      this.sortDirection = 'asc';
    }

    this.users.sort((a, b) => {
      const aVal = this.getComparableValue(a[key]);
      const bVal = this.getComparableValue(b[key]);

      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  private getComparableValue(value: any): any {
    if (Array.isArray(value)) return value.join(','); // for roles
    if (value instanceof Date) return value.getTime();
    if (typeof value === 'string' && !isNaN(Date.parse(value))) return Date.parse(value);
    return value;
  }

  isAdmin(roles: string[]): boolean {
    return roles.includes('ADMIN');
  }

  confirmDelete(user: any): void {

    this.selectedUser = user;
    const modalEl = document.getElementById('confirmDeleteModal');
    const modal = new bootstrap.Modal(modalEl, {
      backdrop: false  // ✅ disables grey overlay
    });
    modal.show();
  }

  deleteConfirmed(): void {
    console.log('Deleting user:', this.selectedUser);
    if (!this.selectedUser) return;

    this.userService.deleteUser(this.selectedUser.id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== this.selectedUser.id);
        const modalEl = document.getElementById('confirmDeleteModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
        this.selectedUser = null;
      },
      error: err => {
        console.error('Delete failed:', err);
      }
    });
  }
  

}
