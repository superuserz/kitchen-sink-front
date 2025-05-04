import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = [];
  currentSortKey: keyof User | 'name' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private authService: AuthService) {}

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

}
