import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { AvatarService } from './avatar.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let mockAvatarService: jasmine.SpyObj<AvatarService>;

  beforeEach(() => {
    mockAvatarService = jasmine.createSpyObj('AvatarService', ['getRandomAvatar']);
    mockAvatarService.getRandomAvatar.and.returnValue('test-avatar.png');

    TestBed.configureTestingModule({
      providers: [
        EmployeeService,
        { provide: AvatarService, useValue: mockAvatarService }
      ]
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an employee', () => {
    const employeeData = {
      name: 'Test Employee',
      companyName: 'Test Company',
      email: 'test@example.com',
      contactNo: '1234567890',
      designation: 'Developer'
    };

    service.addEmployee(employeeData);
    
    service.getEmployees().subscribe(employees => {
      expect(employees.length).toBe(1);
      expect(employees[0].name).toBe(employeeData.name);
      expect(employees[0].avatar).toBe('test-avatar.png');
    });
  });

  it('should update an employee', () => {
    const employeeData = {
      name: 'Test Employee',
      companyName: 'Test Company',
      email: 'test@example.com',
      contactNo: '1234567890',
      designation: 'Developer'
    };

    service.addEmployee(employeeData);
    
    let employeeId: string;
    service.getEmployees().subscribe(employees => {
      employeeId = employees[0].id;
      service.updateEmployee(employeeId, { name: 'Updated Name' });
    });

    service.getEmployees().subscribe(employees => {
      expect(employees[0].name).toBe('Updated Name');
    });
  });

  it('should delete an employee', () => {
    const employeeData = {
      name: 'Test Employee',
      companyName: 'Test Company',
      email: 'test@example.com',
      contactNo: '1234567890',
      designation: 'Developer'
    };

    service.addEmployee(employeeData);
    
    let employeeId: string;
    service.getEmployees().subscribe(employees => {
      employeeId = employees[0].id;
      service.deleteEmployee(employeeId);
    });

    service.getEmployees().subscribe(employees => {
      expect(employees.length).toBe(0);
    });
  });
});