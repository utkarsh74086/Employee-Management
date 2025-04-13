import { Injectable } from '@angular/core';
import { Employee } from '../../EmployeeModel';
import { AvatarService } from './avatar.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>([]);

  constructor(private avatarService: AvatarService) {}

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  addEmployee(employee: Omit<Employee, 'id' | 'avatar'>): void {
    const newEmployee: Employee = {
      ...employee,
      id: this.generateId(),
      avatar: this.avatarService.getRandomAvatar()
    };
    this.employees.push(newEmployee);
    this.employeesSubject.next([...this.employees]);
  }

  updateEmployee(id: string, updatedEmployee: Partial<Employee>): void {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees[index] = { ...this.employees[index], ...updatedEmployee };
      this.employeesSubject.next([...this.employees]);
    }
  }

  deleteEmployee(id: string): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.employeesSubject.next([...this.employees]);
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}