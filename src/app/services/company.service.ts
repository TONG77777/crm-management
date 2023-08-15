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
      '8/15/2023',
      'TechSolutions Inc. is a forward-thinking and innovative technology company that specializes in providing cutting-edge software solutions for businesses of all sizes. With a dedicated team of skilled engineers, designers, and strategists, TechSolutions Inc. is at the forefront of digital transformation.'
    ),
    new Company(
      2,
      'StellarTech Solutions',
      'medium',
      '8/15/2023',
      'StellarTech Solutions is a cutting-edge technology company focused on revolutionizing the way businesses leverage digital solutions. '
    ),
    new Company(
      3,
      'StellarTech Solutions',
      'low',
      '8/15/2023',
      'StellarTech Solutions is an innovative technology company specializing in developing cutting-edge software solutions for businesses across diverse sectors.'
    ),
    new Company(
      4,
      'TohSolutions Innovate',
      'medium',
      '8/15/2023',
      'TohSolutions Innovate is a cutting-edge technology company at the forefront of innovation. With a team of highly skilled engineers, designers, and developers, we are dedicated to pushing the boundaries.'
    ),
    new Company(
      5,
      'TechSynth Innovations',
      'high',
      '8/15/2023',
      'TechSynth Innovations is a dynamic and forward-thinking organization at the forefront of technological advancement. With a passion for innovation, we specialize in developing cutting-edge software solutions that redefine industries and enhance user experiences. '
    ),
  ];
  constructor() {}

  addCompany(company: Company) {
    this.companys.push(company);
    this.companyChanged.emit(this.companys.slice());
  }

  getCompanys() {
    return this.companys.slice();
  }
}
