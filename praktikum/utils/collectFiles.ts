import * as fs from 'fs';
import * as path from 'path';
import mime from 'mime-types';

export interface FileObject {
  name: string;
  content: string;
  language: string;
  selected: boolean;
  isBin: boolean;
  isDir: boolean;
}

function isImage(fileExtension: string): boolean {
  const mimeType = mime.lookup(fileExtension);

  return Boolean(mimeType && mimeType.startsWith('image/'));
}

const EXT_NAMES_MAP: Record<string, string> = {
  js: 'javascript',
  jpg: 'bin',
  png: 'bin',
  svg: 'html'
}
export function collectFilesAndFolders(directory: string): FileObject[] {
  const items = fs.readdirSync(directory);
  const files: FileObject[] = [];

  items.forEach((item) => {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);

    if (stats.isFile()) {
      const fileContent = fs.readFileSync(itemPath, 'utf8');
      const fileExtension = path.extname(item).substring(1);
      const isImageFile = isImage(fileExtension);
      const isSvg = fileExtension.toLowerCase() === 'svg'
      // if (isImageFile && !isSvg) {
      //   const base64 = Buffer.from(fileContent).toString('base64');

      //   const binary64 = Buffer.from(fileContent, 'binary').toString('base64');
      //   const binaryHex = Buffer.from(fileContent, 'binary').toString('hex');
      //   const binaryascii = Buffer.from(fileContent, 'binary').toString('ascii');
      //   const binaryutf = Buffer.from(fileContent, 'binary').toString('utf8');
      //   const binaryutf8 = Buffer.from(fileContent, 'binary').toString('utf-8');

      //   console.log('kek');
      // }

      // /9j/4AAQSkZJRgABAQEASABIAAD/4gIcSUNDX1BST0ZJTEUAAQEAAAIMbGNtcwIQAABtbnRyUkdCIFhZWiAH3AABABkAAwApADlhY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAA

      files.push({
        name: itemPath,
        content: (isImageFile && !isSvg) ? Buffer.from(Buffer.from(fileContent).toString('binary')).toString('base64') : fileContent,
        language: EXT_NAMES_MAP[fileExtension] || fileExtension,
        selected: false,
        isBin: isImageFile,
        isDir: false,
      });
      return;
    }

    if (stats.isDirectory()) {
      const subFiles = collectFilesAndFolders(itemPath);
      files.push(...subFiles);
    }
  });

  return files;
}

// console.log(collectFilesAndFolders('./src').map(({ name }) => name));

