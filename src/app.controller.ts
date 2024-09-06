import { Controller, Post, Req, Res } from '@nestjs/common';
import * as zlib from 'zlib';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Post('upload-compressed')
  async handleCompressedData(@Req() req: Request, @Res() res: Response) {
    let buffer = [];

    req.on('data', (chunk) => {
      buffer.push(chunk);
    });

    req.on('end', () => {
      const compressedData = Buffer.concat(buffer);

      // Decompress the data
      zlib.unzip(compressedData, (err, decompressedData) => {
        if (err) {
          res.status(500).send('Failed to decompress data');
        } else {
          const jsonData = JSON.parse(decompressedData.toString());
          console.log('Decompressed Data:', jsonData);

          // Handle your data here
          res.status(200).send('Data received successfully');
        }
      });
    });
  }
}
