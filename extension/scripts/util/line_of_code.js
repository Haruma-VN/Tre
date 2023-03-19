function countLinesInFile(filePath) {
  const fileContent = readfile(filePath, 'utf8');
  const lines = fileContent.split('\n');
  return lines.length;
}

function countLinesInDirectory(dirPath) {
  let totalLines = 0;
  const files = read_single_folder(dirPath);
  for (const file of files) {
    const filePath = `${dirPath}/${file}`;
    const stats = file_stats(filePath);
    if (stats.isDirectory()) {
      totalLines += countLinesInDirectory(filePath);
    } else if (stats.isFile() && filePath.endsWith('.ts')) {
      totalLines += countLinesInFile(filePath);
    }
  }
  return totalLines;
}
const directoryPath = Console.ReadPath();
const totalLines = countLinesInDirectory(directoryPath);
Console.WriteLine(`Total lines of TypeScript code: ${totalLines}`);
