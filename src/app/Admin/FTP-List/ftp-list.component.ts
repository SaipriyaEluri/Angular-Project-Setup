import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs';
import { FtpData, Pagination } from 'src/app/Services/InterfacesModels';


const DUMMY_DATA: FtpData[] = [
  { sno: 1, name: 'Server1', url: 'ftp://server1.com', port: 21, username: 'admin', folder: '/home', profiletype: 'Public', filename: 'file1.txt', createdbyuser: 'John', modifiedbyuser: 'Doe', createdat: '2024-04-01', modifiedat: '2024-04-02', assigned: true },
  { sno: 2, name: 'Server2', url: 'ftp://server2.com', port: 22, username: 'user2', folder: '/data', profiletype: 'Private', filename: 'file2.doc', createdbyuser: 'Alice', modifiedbyuser: 'Bob', createdat: '2024-04-05', modifiedat: '2024-04-06', assigned: false },
  { sno: 3, name: 'Server3', url: 'ftp://server3.com', port: 22, username: 'root', folder: '/secure', profiletype: 'Public', filename: 'secure.zip', createdbyuser: 'Charlie', modifiedbyuser: 'Eve', createdat: '2024-04-10', modifiedat: '2024-04-12', assigned: true },
  { sno: 4, name: 'Server4', url: 'ftp://server4.com', port: 21, username: 'ftpuser', folder: '/downloads', profiletype: 'Private', filename: 'backup.tar', createdbyuser: 'David', modifiedbyuser: 'Fiona', createdat: '2024-04-15', modifiedat: '2024-04-16', assigned: false },
  { sno: 5, name: 'Server1', url: 'ftp://server1.com', port: 21, username: 'admin', folder: '/home', profiletype: 'Public', filename: 'file1.txt', createdbyuser: 'John', modifiedbyuser: 'Doe', createdat: '2024-04-01', modifiedat: '2024-04-02', assigned: true },
  { sno: 6, name: 'Server2', url: 'ftp://server2.com', port: 22, username: 'user2', folder: '/data', profiletype: 'Private', filename: 'file2.doc', createdbyuser: 'Alice', modifiedbyuser: 'Bob', createdat: '2024-04-05', modifiedat: '2024-04-06', assigned: false },
  { sno: 7, name: 'Server3', url: 'ftp://server3.com', port: 22, username: 'root', folder: '/secure', profiletype: 'Public', filename: 'secure.zip', createdbyuser: 'Charlie', modifiedbyuser: 'Eve', createdat: '2024-04-10', modifiedat: '2024-04-12', assigned: true },
  { sno: 8, name: 'Server4', url: 'ftp://server4.com', port: 21, username: 'ftpuser', folder: '/downloads', profiletype: 'Private', filename: 'backup.tar', createdbyuser: 'David', modifiedbyuser: 'Fiona', createdat: '2024-04-15', modifiedat: '2024-04-16', assigned: false },
  { sno: 9, name: 'Server3', url: 'ftp://server3.com', port: 22, username: 'root', folder: '/secure', profiletype: 'Public', filename: 'secure.zip', createdbyuser: 'Charlie', modifiedbyuser: 'Eve', createdat: '2024-04-10', modifiedat: '2024-04-12', assigned: true },
  { sno: 10, name: 'Server4', url: 'ftp://server4.com', port: 21, username: 'ftpuser', folder: '/downloads', profiletype: 'Private', filename: 'backup.tar', createdbyuser: 'David', modifiedbyuser: 'Fiona', createdat: '2024-04-15', modifiedat: '2024-04-16', assigned: false }

];

@Component({
  selector: 'app-ftp-list',
  templateUrl: './ftp-list.component.html',
  styleUrls: ['./ftp-list.component.scss']
})
export class FtpListComponent {

  displayedColumns: string[] = ['select', 'sno', 'name', 'url', 'port', 'username', 'folder', 'profiletype', 'filename', 'createdbyuser', 'modifiedbyuser', 'createdat', 'modifiedat', 'assigned'];
  dataSource = new MatTableDataSource<any>(DUMMY_DATA);
  selection = new Set<number>();
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggleSelection(row: FtpData) {
    if (this.selection.has(row.sno)) {
      this.selection.delete(row.sno);
    } else {
      this.selection.add(row.sno);
    }
  }
  
}
