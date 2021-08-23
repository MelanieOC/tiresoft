import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private datePipe: DatePipe) { }

  downloadWithImage(name: string, header: { name: string; width: number, sheet: number }[], data: any, images: any[], sheets) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
    const fileName = name

    const workbook = new Workbook();
    /*let sheets = []
    if (vocero) {
      sheets = ['Campañas', 'Plataformas', 'Voceros']
    } else {
      sheets = ['Campañas', 'Plataformas']
    }*/

    sheets.forEach(sh => {
      const worksheet = workbook.addWorksheet(sh.name);

      const nameHeader = header.filter(h => h.sheet == sh.id).map(el => el.name)
      header.filter(h => h.sheet == sh.id).forEach((h, ind) => {
        worksheet.getColumn(ind + 1).width = h.width;
      })

      const init = 'A1:'
      const end = letters[header.filter(h => h.sheet == sh.id).length - 1] + '1'
      worksheet.autoFilter = init + end

      const headerRow = worksheet.addRow(nameHeader, '');

      headerRow.eachCell(cell => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF4F81BD' }
        };

        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      });

      data.data.filter(h => h.sheet == sh.id).forEach((d, index) => {
        const row = worksheet.addRow(d.rowData, '');

        row.getCell(1).alignment = { horizontal: 'left' };

        row.border = {
          top: { style: 'thin', color: { argb: 'FFDCE6F1' } },
          left: { style: 'thin', color: { argb: 'FFDCE6F1' } },
          bottom: { style: 'thin', color: { argb: 'FFDCE6F1' } },
          right: { style: 'thin', color: { argb: 'FFDCE6F1' } }
        };

        if (index % 2 === 0) {
          row.eachCell(cell => {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFDCE6F1' }
            };
          });
        }
      });

      const ttl = data.total.find(h => h.sheet == sh.id)
      if (!!ttl) {
        const totalRow = ['', 'TOTAL'].concat(ttl.data)
        const totrow = worksheet.addRow(totalRow, '');
        totrow.eachCell(cell => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF4F81BD' }
          };

          cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        });
      }

      // imagen
      const img = images.find(im => im.sheet == sh.id)
      if (img) {
        const height = data.data.filter(h => h.sheet == sh.id).length + 4
        const logo = workbook.addImage({
          base64: img.base,
          extension: 'png',
        });

        worksheet.addImage(logo, {
          tl: { col: 0, row: height },
          ext: { width: img.width, height: img.height }
        });
      }

    })

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fileName.replace('.', ''));
    });
  }

  downloadExel(name: string, header: { name: string; width?: number; stick: boolean }[], data: string[][]) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U']

    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet('Hoja1');

    const nameHeader = header.map(el => el.name)
    header.forEach((h, ind) => {
      worksheet.getColumn(ind + 1).width = h.width || 20;
      worksheet.getColumn(ind + 1).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

    })


    const headerRow = worksheet.addRow(nameHeader, '');

    headerRow.eachCell((cell, ind) => {
      if (header[ind - 1].stick) {
        cell.font = { bold: true, color: { argb: 'FFFF0000' } };
      } else {
        cell.font = { bold: true };
      }

    });

    data.forEach(d => {
      const row = worksheet.addRow(d, '');

      row.getCell(1).alignment = { horizontal: 'left' };

    });

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, name.replace('.', ''));
    });
  }

}