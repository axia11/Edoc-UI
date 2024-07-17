import { Component, OnInit, Input } from '@angular/core';
import bwipjs from 'bwip-js';

@Component({
  selector: 'app-gen-data-matrix',
  templateUrl: './gen-data-matrix.component.html',
  styleUrls: ['./gen-data-matrix.component.scss']
})
export class GenDataMatrixComponent implements OnInit {
  @Input() qrData: any;
  @Input() qrData1: any;
  dataMatUrl:any;
  constructor() { }

  ngOnInit(): void {
    this.genrateBarcodeImg();
    this.genrateBarcodeImg2();
  }

  genrateBarcodeImg(){
    let canvas = document.createElement('canvas');
      try {
          bwipjs.toCanvas(canvas, {
            bcid: 'gs1datamatrix',        // Barcode type
            text:this.qrData,   	  // Text to encode
            scale: 2,               // 3x scaling factor
            height: 10,             // Bar height, in millimeters
            width: 10,
            includetext: true,      // Show human-readable text
            textxalign: 'center',   // Always good to set this
          });
          this.dataMatUrl=canvas.toDataURL('image/png');
      } catch (e) {
         var msg = (''+e).trim()
      console.log("this is e:",e,'this is msg:',msg);
      }
  }
  genrateBarcodeImg2(){
    let canvas = document.createElement('canvas');
      try {
          bwipjs.toCanvas(canvas, {
            bcid: 'datamatrix',        // Barcode type
            text:JSON.stringify(this.qrData1),   	  // Text to encode
            scale: 2,               // 3x scaling factor
            height: 10,             // Bar height, in millimeters
            width: 10,
            includetext: true,      // Show human-readable text
            textxalign: 'center',   // Always good to set this
          });
          this.dataMatUrl=canvas.toDataURL('image/png');
      } catch (e) {
      console.log("this is e:",e);
      }
  }

  renderBarcode(qrValue): void {
    bwipjs('barcodeCanvas', {
      bcid: 'datamatrix',        // Barcode type
      text:'{"Part Name":"RawMaterial","Part Id":"123","Date/Shift":"01.12.2022/A","Batch No":"123/A/A","Machine Name":"NI_110","Machine Code":"0063_110","Tool Name":"Gen_Migarted","Tool No":"Gen_Migarted","RM Name":"Test","RM Grade":"UI Test 12","Sheet No":"1","PId":"10093"}',   	  // Text to encode
      scale: 2,               // 3x scaling factor
      height: 10,             // Bar height, in millimeters
      width: 10,
      includetext: true,      // Show human-readable text
      textxalign: 'center',   // Always good to set this
    }, (err, cvs) => {
      if (err) {
        //document.getElementById('err').innerText = 'Error occured. See browser log for more information';
        console.log(err);
      } else {
      }
    });
  }

}
