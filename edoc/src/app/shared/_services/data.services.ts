import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonService } from './common.service';
import { } from './account.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';
import * as ExcelJS from "exceljs/dist/exceljs.min.js";
import * as FileSaver from "file-saver";

// import { } from './account.service';


@Injectable()
export class DataService {
  apiLoads = new Subject<boolean>();
  // errMsg = new Subject();
  PlantId = 1;
  // private errMsgs = {
  //   400: 'Request cannot be processed!',
  //   403: 'Record in use - Deletion not possible',
  //   404: 'Not Found!',
  //   409: 'Data Already Exists!',
  //   422: 'Please enter valid data!',
  //   500: 'Internal Server Error!',
  // };

  constructor(
    private http: HttpClient,
    // private dialog: MatDialog,
    private sb: SnackbarService,
    private cs: CommonService,
    private router: Router,
  ) { }

  getAll(query): Observable<any> {
    const url = this.router.routerState.snapshot.url;
    if (!!this.cs.searchValues[url]) {
      if (query && query.indexOf('search') === -1) {
        query += query.indexOf('?') > -1 ? '&' : '?';
        query += `search=${this.cs.searchValues[url]}`;
      }
    }
    if (query.indexOf('pageIndex') > 1) {
      query = query.indexOf('pageSize=1000') > 1 ? query : `${query}&pageSize=40`;
      // query = query.indexOf('pageSize=1000') > 1 ? query : `${query}&pageSize=${+window.localStorage.pageSize || 10}`;
    }

    return this.http.get(`${environment.apiUrl}${this.getUrlParams(query)}`, this.httpOptionsBearer());
  }

  get(query: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}${query}`, this.httpOptionsBearer());
  }

  update(query, data): Observable<any> {
    // data['CurrentUserId'] = +localStorage.getItem('currUserId');
    // data['PlantId'] = data.PlantId ? data.PlantId : this.cs.PlantId;
    // data = this.trimText(data);
    return this.http.put(`${environment.apiUrl}${query}`, data, this.httpOptionsBearer());
  }

  add(query, data): Observable<any> {
    const url = this.router.routerState.snapshot.url;
    if (this.cs.searchValues[url]) {
      delete this.cs.searchValues[url];
    }
    // data['CurrentUserId'] = +localStorage.getItem('currUserId');
    // data['PlantId'] = data.PlantId ? data.PlantId : this.cs.PlantId;
    // data = this.trimText(data);
    return this.http.post(`${environment.apiUrl}${query}`, data, this.httpOptionsBearer());
  }

  deleteData(query): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${query}`, this.httpOptionsBearer());
  }
  delete(query): Observable<any> {
    return this.http.put(`${environment.apiUrl}${query}`, null, this.httpOptionsBearer());
  }

  getAllTabs(MODId, MTModId): Observable<any> {
    const currMTModId = MTModId ?? '';
    const currMODId = MODId ?? '';
    // console.log(currMTModId, currMODId);
    return this.http.get(`${environment.apiUrl}/account/getTabs/${localStorage.userId}?MTModId=${currMTModId}&MODId=${currMODId}`)
  }
  getScreens(MODId):Observable<any>{
    const currMODId = MODId;
    return this.http.get(`${environment.apiUrl}/account/getSreens/${currMODId}?RLId=[1]`)
  }



  trimText(data) {
    for (const prop in data) {
      if (typeof data[prop] === 'string') {
        data[prop] = data[prop].trim();
      }
    }
    return data;
  }

  getBaseData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/basedata`, this.httpOptionsBearer());
  }

  addAttachment(query, data): Observable<any> {
    return this.http.post(`${environment.apiUrl}${query}`, data, this.httpOptionsAttachment());
  }

  getImage(query): Observable<any> {
    return this.http.get(`${environment.apiUrl}${query}`, this.httpOptionsImage());
  }

  downloadAttachment(query) {
    window.location.href = `${environment.apiUrl}${query}`;
  }

  downloadTmpl(query) {
    window.location.href = `${environment.apiUrl}/common/importexcel?name=${query}`;
  }

  downloadReport(query) {
    window.location.href = `${environment.apiUrl}${this.getUrlParams(query)}`;
  }

  impFrmXcel(evt, query, table) {
    const file = evt.target.files;
    const fileExt = evt.target.value;
    const validFile = (['.xlsx', '.xls', '.csv'].indexOf(fileExt.substring(fileExt.lastIndexOf('.')))) > -1;
    if (file && file.length && validFile) {
      const sendData = new FormData();
      sendData.append('file', file[0], file[0].name);
      evt.target.value = '';
      this.http.post(`${environment.apiUrl}${query}`, sendData, this.httpOptionsAttachment())
        .subscribe((res) => {
          if (res['path']) {
            // this.sb.open(`${res['message'] || res['message ']}, Please check downloaded file!`, 'bg-red');
            // this.dialog.open(ErrMsgComponent, {
            //   width: '500px',
            //   data: {
            //     message: `${res['message'] || res['message ']}<br><br>check the downloaded file!`
            //   }
            // });
            console.log('Error found!!!!');
            window.location.href = `${environment.apiUrl}/common/exportexcel?path=${res['path']}`;
          }
          else {
            this.sb.open('File Uploaded Successfully!', 'bg-green');
          }
          table.reloadTable(null);
        });
    }
    // else if (!validFile) {
    //   this.dialog.open(ErrMsgComponent, {
    //     width: '500px',
    //     data: {
    //       message: `The maximum file upload size is 10.00 MB.<br>To import records in bulk, you need to provide the data in a CSV file format. `
    //     }
    //   });
    //   evt.target.value = '';
    // }
  }

  getWorkFlowCongiguration(SCNId): Observable<any> {
    return this.http.get(`${environment.apiUrl}/workflows/getWorkFlowCongiguration?SCNId=${SCNId}&PLId=${localStorage.PLId}`, this.httpOptionsBearer());
  }

  getWorkStepsInfo(Id, WFHId, RevisionNo): Observable<any> {
    return this.http.get(`${environment.apiUrl}/workflows/getWorkStepsInfo?Id=${Id || 0}&PLId=${localStorage.PLId}&WFHId=${WFHId}&RevisionNo=${RevisionNo || 0}`, this.httpOptionsBearer());
  }

  requestWorkFlow(data): Observable<any> {
    let sendData = data;
    sendData['PLId'] = localStorage.PLId,
      sendData['EntityId'] = data.EntityId,
      sendData['SCNId'] = data.SCNId,
      sendData['ActionDate'] = this.cs.convertDate(data.ActionDate),
      sendData['PreparedId'] = +localStorage.RUId || 1,
      sendData['AssignedTo'] = data.AssignedTo || +localStorage.RUId,
      sendData['WSId'] = data.WSId,
      sendData['StatusId'] = data.StatusId || 1,
      sendData['createdBy'] = localStorage.userId
    return this.http.post(`${environment.apiUrl}/workflows/RequestWorkFlow`, sendData, this.httpOptionsBearer());
  }

  getUrlParams(query: string) {
    let urlParams = query.indexOf('?') > -1 ? query + '&' : query + '?';
    // let urlParams = query.indexOf('?') > -1 ? query + '&' : query + '/';
    // if (this.PlantId) {
    //   // urlParams += `PlantId=${this.PlantId}`;
    //   urlParams += `${this.PlantId}`;
    // }

    return urlParams;
  }

  // errorHandle(err, impExcel?) {
  //   let displayErr;
  //   if (impExcel) {
  //     if (err.status === 422 || err.status === 500) {
  //       displayErr = (err.error.error && err.error.error.details && err.error.error.details.length) ? err.error.error.details[0].context.label : this.errMsgs[err.status];
  //     } else {
  //       displayErr = this.errMsgs[err.status];
  //     }
  //   } else {
  //     displayErr = err.error['message '] === 'Deletion not possible/Record may be in use' ? 'Record may be in use, Cannot be deleted!' : (err.error['message'] || this.errMsgs[err.status]);
  //   }
  //   this.errMsg.next(displayErr || `${err.status || ''} Network Error!`);
  //   return throwError(err);
  // }
  httpOptionsBearer() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache, no-store',
        'Pragma': 'no-cache',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      })
    };
  }

  httpOptionsAttachment() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'mimeType': 'multipart/form-data',
        'Authorization': `bearer ${token}`
      })
    };
  }

  httpOptionsImage() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }),
      responseType: 'blob' as 'json'
    };
  }
  exportExcel(excelData) {

    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers
    const hwidths = excelData.hed_width;
    const data = excelData.data;
    const reportName = excelData.reportName;


    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(reportName);


    //Add Row and formatting
    worksheet.mergeCells('A1');
    let titleRow = worksheet.getCell('A1');
    titleRow.value = 'Organization Name'
    titleRow.font = {
      name: 'MS PGothic',
      size: 11,
      //bold: true
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'left' }

    // Date
    worksheet.mergeCells('B1');
    let d = new Date();
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    let dateCell = worksheet.getCell('B1');
    dateCell.value = localStorage.clientName;
    dateCell.font = {
      name: 'MS PGothic',
      size: 11,

      //bold: true,
      color: { argb: '0085A3' }
    }

    dateCell.alignment = { vertical: 'middle', horizontal: 'left' }

    //Add Row and formatting
    worksheet.mergeCells('G1');
    let titleRow1 = worksheet.getCell('G1');
    titleRow1.value = 'Data date'
    titleRow1.font = {
      name: 'MS PGothic',
      size: 11,
      //bold: true
    }
    titleRow1.alignment = { vertical: 'middle', horizontal: 'left' }

    // Date
    worksheet.mergeCells('H1');
    let d1 = new Date();
    let month1 = d1.getMonth() + 1;
    let date1 = d1.getDate() + '-' + month1 + '-' + d1.getFullYear();
    let dateCell1 = worksheet.getCell('H1');
    dateCell1.value = excelData.from + " " + 'to' + " " + excelData.to;
    dateCell1.font = {
      name: 'MS PGothic',
      size: 11,

      bold: true,
      color: { argb: '0085A3' }
    }
    dateCell1.alignment = { vertical: 'middle', horizontal: 'left' }

    //Adding Second Row

    //Add Row and formatting
    worksheet.mergeCells('A2');
    let titleRow2 = worksheet.getCell('A2');
    titleRow2.value = 'Report Name'
    titleRow2.font = {
      name: 'MS PGothic',
      size: 12,
      //bold: true
    }
    titleRow2.alignment = { vertical: 'middle', horizontal: 'left' }

    // Date
    worksheet.mergeCells('B2', 'D2');
    let d2 = new Date();
    let date2 = d2.getDate() + '-' + d2.getMonth() + '-' + d2.getFullYear();
    let dateCell2 = worksheet.getCell('B2');
    dateCell2.value = excelData.ReportName;
    //title;
    dateCell2.font = {
      name: 'MS PGothic',
      size: 14,

      bold: true,
      color: { argb: '0085A3' }
    }

    dateCell2.alignment = { vertical: 'middle', horizontal: 'left' }

    //Add Row and formatting
    worksheet.mergeCells('G2');
    let titleRow3 = worksheet.getCell('G2');
    titleRow3.value = 'Extracted date'
    titleRow3.font = {
      name: 'MS PGothic',
      size: 12,
      //bold: true
    }
    titleRow3.alignment = { vertical: 'middle', horizontal: 'left' }

    // Date
    worksheet.mergeCells('H2');
    let d3 = new Date();
    let month = d2.getMonth() + 1;
    let date3 = d3.getFullYear() + '-' + month + '-' + d3.getDate()
    date3 = new DatePipe('en-US').transform(date3, 'dd-MMM-yy')
    let dateCell3 = worksheet.getCell('H2');
    dateCell3.value = date3;
    dateCell3.font = {
      name: 'MS PGothic',
      size: 12,

      bold: true,
      color: { argb: '0085A3' }
    }
    dateCell3.alignment = { vertical: 'middle', horizontal: 'left' }
    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '00B050' },
        bgColor: { argb: '' }
      }
      cell.font = {
        name: 'MS PGothic',
        //bold: true,
        color: { argb: 'FFFFFF' },
        size: 12,

      }
    })


    worksheet.columns.forEach(function (column, i) {
      var maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 5;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength + 10;
    });

    // Adding Data with Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);
      row.font =
      {
        name: 'MS PGothic'
      }

      let sales = row.getCell(6);
      let color = 'FF99FF99';
      if (+sales.value < 200000) {
        color = 'FF9999'


      };


      // sales.fill = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: { argb: color }
      // }
    }
    );
    for (var i = 1; i <= hwidths.length; i++) {
      worksheet.getColumn(i).width = hwidths[i];
    }
    worksheet.addRow([]);

    // //Footer Row
    // let footerRow = worksheet.addRow(['Powered by Tenr Inventure Private Ltd']);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFB050' }
    // };

    // //Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    })

  }

  exportExcelForImport(excelData) {

    const header = excelData.headers
    const hwidths = excelData.hed_width;
    const data = '';
    const reportName = excelData.reportName;
    // const title = excelData.title;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(reportName);
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '00B050' },
        bgColor: { argb: '' }
      }
      cell.font = {
        name: 'MS PGothic',
        //bold: true,
        color: { argb: 'FFFFFF' },
        size: 12,

      }
    })


    worksheet.columns.forEach(function (column, i) {
      var maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 5;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength + 10;
    });
    for (var i = 1; i <= hwidths.length; i++) {
      worksheet.getColumn(i).width = hwidths[i];
    }
    worksheet.addRow([]);
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob,reportName + '.xlsx');
    })

  }

  public async exportAsExcelFile(workbookData: any[], excelFileName: string) {
    const workbook = new ExcelJS.Workbook();
    const hwidths = [30, 25, 30, 30, 30, 30, 30, 25, 30, 30, 30, 30, 30,30,30,30,30,30];
    workbookData.forEach(({ workSheet, rows }) => {
      const sheet = workbook.addWorksheet(workSheet);
      const uniqueHeaders = [
        ...new Set(
          rows.reduce((prev, next) => [...prev, ...Object.keys(next)], [])
        )
      ];
      // sheet.columns = uniqueHeaders.map(x => ({ header: x, key: x }));
      for (var i = 1; i <= hwidths.length; i++) {
        sheet.getColumn(i).width = hwidths[i];
      }
      let headerRow1 = sheet.addRow(uniqueHeaders);
      headerRow1.eachCell((cell, number) => {
       cell.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: '00B050' },
         bgColor: { argb: '' }
       }
       cell.font = {
         name: 'MS PGothic',
         //bold: true,
         color: { argb: 'FFFFFF' },
         size: 12,
 
       }
     })
      rows.forEach((jsonRow, i) => {
        let cellValues = { ...jsonRow };

        uniqueHeaders.forEach((header:any, j) => {
          if (Array.isArray(jsonRow[header])) {
            cellValues[header] = "";
          }
        });
        sheet.addRow(cellValues);
        uniqueHeaders.forEach((header:any, j) => {
          if (Array.isArray(jsonRow[header])) {
            const jsonDropdown = jsonRow[header];
            sheet.getCell(
              this.getSpreadSheetCellNumber(i + 1, j)
            ).dataValidation = {
              type: "list",
              formulae: [`"${jsonDropdown.join(",")}"`]
            };
          }
        });
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    this.saveAsExcelFile(buffer, excelFileName);
  }

  private getSpreadSheetCellNumber(row, column) {
    let result = "";

    // Get spreadsheet column letter
    let n = column;
    while (n >= 0) {
      result = String.fromCharCode((n % 26) + 65) + result;
      n = Math.floor(n / 26) - 1;
    }

    // Get spreadsheet row number
    result += `${row + 1}`;

    return result;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + " Import "  + EXCEL_EXTENSION
    );
  }
}

