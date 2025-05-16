import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService, User } from '../services/admin.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true, // Mark as standalone
  imports: [CommonModule, ReactiveFormsModule], // Import necessary modules
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  isEditing: boolean = false;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [0],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.logCurrentUserRole(); // Log the current user's role
    this.loadUsers();
  }

  loadUsers(): void {
  this.adminService.getAllUsers().subscribe((data) => {
    this.users = data;
    console.log('Loaded users:', this.users); // Log all users
    this.users.forEach((user) => {
      console.log(`User ID: ${user.id}, Role: ${user.role}`); // Log each user's role
    });
  });
  }

  logCurrentUserRole(): void {
    const token = localStorage.getItem('token'); // Replace with your token storage logic
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log('Current user role:', decodedToken.roles); // Log the user's roles
    } else {
      console.log('No token found. User is not logged in.');
    }
  }

  addUser(): void {
  if (this.userForm.valid) {
    console.log('Adding user with role:', this.userForm.value.role); // Log the role
    this.adminService.addUser(this.userForm.value).subscribe(() => {
      this.loadUsers();
      this.resetForm();
    });
  }
  }

  editUser(user: User): void {
    this.userForm.patchValue(user);
    this.isEditing = true;
  }

  updateUser(): void {
    if (this.userForm.valid) {
      this.adminService.updateUser(this.userForm.value.id, this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.resetForm();
        this.isEditing = false;
      });
    }
  }

  deleteUser(id: number): void {
    this.adminService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  resetForm(): void {
    this.userForm.reset({
      id: 0,
      nom: '',
      prenom: '',
      email: '',
      role: '',
      password: '',
    });
    this.isEditing = false;
  }
}