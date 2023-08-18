import { Injectable } from '@angular/core';
import { Company } from '../companys/company.model';
import { Vessel } from '../vessels/vessel.model';
import { Contact } from '../contacts/contact.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Company2Service {
  companyChanged = new Subject<Company[]>();
  
  isEditMode: boolean = false;
  private companys: Company[] ;
  // [
  //   new Company(
  //     1,
  //     'TechSolutions Inc.',
  //     'high',
  //     '2023-12-31T18:30:00.000Z',
  //     'TechSolutions Inc. is a forward-thinking and innovative technology company that specializes in providing cutting-edge software solutions for businesses of all sizes. With a dedicated team of skilled engineers, designers, and strategists, TechSolutions Inc. is at the forefront of digital transformation.',
  //     [
  //       new Contact(
  //         1,
  //         'People 1',
  //         'Junior Programmer',
  //         'people1@example.com',
  //         '601234567890',
  //         'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //       new Contact(
  //         2,
  //         'People 2',
  //         'Senior Programmer',
  //         'people2@example.com',
  //         '601234567891',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //     ],
  //     [
  //       new Vessel(
  //         1,
  //         'Vessel 1',
  //         '#V00001',
  //         '192.168.0.251',
  //         'Remote Desktop',
  //         'vessel@example.com',
  //         'The vessel, a majestic oceanic giant, navigates through azure waves, defying the horizon s embrace. Its towering mast dances with the winds rhythm, whispering tales of distant lands. A canvas of sails captures sunbeams, illuminating its voyage. '
  //       ),
  //     ]
  //   ),
  //   new Company(
  //     2,
  //     'StellarTech Solutions',
  //     'medium',
  //     '2023-12-31T18:30:00.000Z',
  //     'StellarTech Solutions is a cutting-edge technology company focused on revolutionizing the way businesses leverage digital solutions. ',
  //     [
  //       new Contact(
  //         1,
  //         'People 3',
  //         'Senior Programmer',
  //         'people3@example.com',
  //         '601234567892',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //       new Contact(
  //         2,
  //         'People 4',
  //         'Intership',
  //         'people4@example.com',
  //         '601234567894',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //       new Contact(
  //         3,
  //         'People 5',
  //         'Manager',
  //         'people5@example.com',
  //         '601234567895',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //     ],
  //     [
  //       new Vessel(
  //         1,
  //         'Vessel 2',
  //         '#V00002',
  //         '192.168.0.252',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //       new Vessel(
  //         2,
  //         'Vessel 3',
  //         '#V00003',
  //         '192.168.0.253',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel333, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //     ]
  //   ),
  //   new Company(
  //     3,
  //     'StellarTech Solutions',
  //     'low',
  //     '2023-12-31T18:30:00.000Z',
  //     'StellarTech Solutions is an innovative technology company specializing in developing cutting-edge software solutions for businesses across diverse sectors.',
  //     [
  //       new Contact(
  //         1,
  //         'People 6',
  //         'CEO',
  //         'people6@example.com',
  //         '601234567896',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //     ],
  //     [
  //       new Vessel(
  //         1,
  //         'Vessel 2',
  //         '#V00002',
  //         '192.168.0.252',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //       new Vessel(
  //         2,
  //         'Vessel 2',
  //         '#V00002',
  //         '192.168.0.252',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //       new Vessel(
  //         3,
  //         'Vessel 2',
  //         '#V00002',
  //         '192.168.0.252',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //     ]
  //   ),
  //   new Company(
  //     4,
  //     'TohSolutions Innovate',
  //     'medium',
  //     '2023-12-31T18:30:00.000Z',
  //     'TohSolutions Innovate is a cutting-edge technology company at the forefront of innovation. With a team of highly skilled engineers, designers, and developers, we are dedicated to pushing the boundaries.',
  //     [
  //       new Contact(
  //         1,
  //         'People 3',
  //         'Senior Programmer',
  //         'people3@example.com',
  //         '601234567892',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //       new Contact(
  //         2,
  //         'People 4',
  //         'Intership',
  //         'people4@example.com',
  //         '601234567894',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //       new Contact(
  //         3,
  //         'People 5',
  //         'Manager',
  //         'people5@example.com',
  //         '601234567895',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //     ],
  //     [
  //       new Vessel(
  //         1,
  //         'Vessel 2',
  //         '#V00002',
  //         '192.168.0.252',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //       new Vessel(
  //         2,
  //         'Vessel 3',
  //         '#V00003',
  //         '192.168.0.253',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel333, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //     ]
  //   ),
  //   new Company(
  //     5,
  //     'TechSynth Innovations',
  //     'high',
  //     '2023-12-31T18:30:00.000Z',
  //     'TechSynth Innovations is a dynamic and forward-thinking organization at the forefront of technological advancement. With a passion for innovation, we specialize in developing cutting-edge software solutions that redefine industries and enhance user experiences. ',
  //     [
  //       new Contact(
  //         1,
  //         'People 3',
  //         'Senior Programmer',
  //         'people3@example.com',
  //         '601234567892',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //       new Contact(
  //         2,
  //         'People 4',
  //         'Intership',
  //         'people4@example.com',
  //         '601234567894',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //       new Contact(
  //         3,
  //         'People 5',
  //         'Manager',
  //         'people5@example.com',
  //         '601234567895',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //     ],
  //     [
  //       new Vessel(
  //         1,
  //         'Vessel 2',
  //         '#V00002',
  //         '192.168.0.252',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //       new Vessel(
  //         2,
  //         'Vessel 3',
  //         '#V00003',
  //         '192.168.0.253',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel333, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //     ]
  //   ),
  //   new Company(
  //     6,
  //     'Anna Innovations',
  //     'high',
  //     '2023-12-31T18:30:00.000Z',
  //     'TechSynth Innovations is a dynamic and forward-thinking organization at the forefront of technological advancement. With a passion for innovation, we specialize in developing cutting-edge software solutions that redefine industries and enhance user experiences. ',
  //     [
  //       new Contact(
  //         1,
  //         'People 3',
  //         'Senior Programmer',
  //         'people3@example.com',
  //         '601234567892',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //       new Contact(
  //         2,
  //         'People 4',
  //         'Intership',
  //         'people4@example.com',
  //         '601234567894',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //       new Contact(
  //         3,
  //         'People 5',
  //         'Manager',
  //         'people5@example.com',
  //         '601234567895',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //     ],
  //     [
  //       new Vessel(
  //         1,
  //         'Vessel 2',
  //         '#V00002',
  //         '192.168.0.252',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //       new Vessel(
  //         2,
  //         'Vessel 3',
  //         '#V00003',
  //         '192.168.0.253',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel333, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //     ]
  //   ),
  //   new Company(
  //     7,
  //     'Benny Innovations',
  //     'low',
  //     '2023-12-31T18:30:00.000Z',
  //     'TechSynth Innovations is a dynamic and forward-thinking organization at the forefront of technological advancement. With a passion for innovation, we specialize in developing cutting-edge software solutions that redefine industries and enhance user experiences. ',
  //     [
  //       new Contact(
  //         1,
  //         'People 3',
  //         'Senior Programmer',
  //         'people3@example.com',
  //         '601234567892',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //       new Contact(
  //         2,
  //         'People 4',
  //         'Intership',
  //         'people4@example.com',
  //         '601234567894',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //       new Contact(
  //         3,
  //         'People 5',
  //         'Manager',
  //         'people5@example.com',
  //         '601234567895',
  //         'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  //       ),
  //     ],
  //     [
  //       new Vessel(
  //         1,
  //         'Vessel 2',
  //         '#V00002',
  //         '192.168.0.252',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //       new Vessel(
  //         2,
  //         'Vessel 3',
  //         '#V00003',
  //         '192.168.0.253',
  //         'TeamViewer',
  //         'vessel2@example.com',
  //         'The vessel333, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
  //       ),
  //     ]
    // ),
  // ];
  constructor(private http: HttpClient) {}

  getCompanys() {
    return this.companys.slice();
  }

  getCompanyById(id: number): Company | undefined {
    return this.companys.find((company) => company.id === id);
  }

  getCompany(index: number) {
    return this.companys[index - 1];
  }

  getCompanyList(): Observable<any> {
    return this.http.get(`http://localhost:3000/companys`);
  }

  addCompany(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/companys`, data);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/companys/${id}`);
  }

  updateCompany(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/companys/${id}`, data);
  }

}