import { NgFor, NgIf } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor,FormsModule,NgIf,RouterModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})


export class TableComponent {
  @Input() tableHeaders: string[] = [];
  @Input() tableData: any[] = [];

  @Input() headerKeys: string[] = [];
  @Input() actions:boolean = false;
  @Input() employeeId:string = '';

  currentPage: number = 1;
  rowsPerPage: number = 12;
  paginatedData: any[] = [];
  searchTerm: string = '';
  filteredData: any[] = [];

  constructor() { }

  ngOnChanges(): void {
    this.updateFilteredData();
  }

  updateFilteredData(): void {
    this.filteredData = this.tableData.filter((item) => {
      return this.headerKeys.some((key) => {
        const value = item[key];
        if (value !== undefined && value !== null) { 
          return value.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
        }
        return false; 
      });
    });
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  onSearch(): void {
    this.currentPage = 1; 
    this.updateFilteredData();
  }

  nextPage(): void {
    if ((this.currentPage * this.rowsPerPage) < this.tableData.length) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  hasNextPage(): boolean {
    return (this.currentPage * this.rowsPerPage) < this.tableData.length;
  }

  hasPrevPage(): boolean {
    return this.currentPage > 1;
  }
}
