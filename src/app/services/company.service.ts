import { Injectable } from '@angular/core';
import { Company } from '../companys/company.model';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyChanged = new EventEmitter<Company[]>();
  private companys: Company[] = [
    new Company(
      1,
      'TechSolutions Inc.',
      'high',
      '2023-12-31T18:30:00.000Z',
      'TechSolutions Inc. is a forward-thinking and innovative technology company that specializes in providing cutting-edge software solutions for businesses of all sizes. With a dedicated team of skilled engineers, designers, and strategists, TechSolutions Inc. is at the forefront of digital transformation.'
    ),
    new Company(
      2,
      'StellarTech Solutions',
      'medium',
      '2023-12-31T18:30:00.000Z',
      'StellarTech Solutions is a cutting-edge technology company focused on revolutionizing the way businesses leverage digital solutions. '
    ),
    new Company(
      3,
      'StellarTech Solutions',
      'low',
      '2023-12-31T18:30:00.000Z',
      'StellarTech Solutions is an innovative technology company specializing in developing cutting-edge software solutions for businesses across diverse sectors.'
    ),
    new Company(
      4,
      'TohSolutions Innovate',
      'medium',
      '2023-12-31T18:30:00.000Z',
      'TohSolutions Innovate is a cutting-edge technology company at the forefront of innovation. With a team of highly skilled engineers, designers, and developers, we are dedicated to pushing the boundaries.'
    ),
    new Company(
      5,
      'TechSynth Innovations',
      'high',
      '2023-12-31T18:30:00.000Z',
      'TechSynth Innovations is a dynamic and forward-thinking organization at the forefront of technological advancement. With a passion for innovation, we specialize in developing cutting-edge software solutions that redefine industries and enhance user experiences. '
    ),
    new Company(
      6,
      'Anna Innovations',
      'high',
      '2023-12-31T18:30:00.000Z',
      'TechSynth Innovations is a dynamic and forward-thinking organization at the forefront of technological advancement. With a passion for innovation, we specialize in developing cutting-edge software solutions that redefine industries and enhance user experiences. '
    ),
    new Company(
      7,
      'Benny Innovations',
      'low',
      '2023-12-31T18:30:00.000Z',
      'TechSynth Innovations is a dynamic and forward-thinking organization at the forefront of technological advancement. With a passion for innovation, we specialize in developing cutting-edge software solutions that redefine industries and enhance user experiences. '
    ),
  ];
  constructor() {}

  addCompany(company: Company) {
    this.companys.push(company);
    this.companyChanged.emit(this.companys.slice());
    alert('Company successfully created.');
  }

  getCompanys() {
    return this.companys.slice();
  }

  getCompanyById(id: number): Company | undefined {
    return this.companys.find(company => company.id === id);
  }

  deleteCompany(id: number): void {
    const index = this.companys.findIndex(company => company.id === id);
    if (index !== -1) {
      this.companys.splice(index, 1);
      this.companyChanged.emit(this.companys.slice());
      alert('Company successfully deleted.');
    }
  }

  editCompany(editedCompany: Company): void {
    const index = this.companys.findIndex(company => company.id === editedCompany.id);
    if (index !== -1) {
      this.companys[index] = editedCompany;
      this.companyChanged.emit(this.companys.slice());
      alert('Company successfully edited.');
    }
  }  
  
}
