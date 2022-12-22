import { join } from 'path';
import archiver from 'archiver';
import { createWriteStream } from 'fs';
import { formatBytes } from '../format-bytes';

export const zip = async (project_path: string) => {
  const filename = 'output.zip';
  const zipPath = join(project_path, filename);

  // create a file to stream archive data to.
  const output = createWriteStream(zipPath);

  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function() {
    console.log('> Compressed %s into "%s"!', formatBytes(archive.pointer()), filename);
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function() {
    console.log('Data has been drained');
  });

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  // append files from a glob pattern
  archive.glob('**/*', {
    ignore: [
      '**/node_modules/**'     // Ingoring node_modules
    ]
  });

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize();

  // create a promise that resolves when the 'close' event is emitted
  const createZipPromise = new Promise((resolve, reject) => {
    output.on('close', resolve);
    output.on('error', reject);
  });

  return { createZipPromise, zipPath };
};
