(function () {
  Console.WriteLine("Drag me a directory");
  const srcDir = Console.ReadPath();
  const jsconfig = {
    compilerOptions: {
      target: 'esnext',
      module: 'esnext',
    },
    include: [],
    exclude: ['node_modules'],
  };
  function getDirectories(dir) {
    return read_dir(dir)
      .filter(dirent => !check_is_file(dirent))
      .map(dirent => path.join(dir, dirent.name));
  }
  function traverseDirectories(dir) {
    const directories = getDirectories(dir);
    directories.forEach(directory => {
      const includePath = directory.replace(srcDir, '').replace(/\\/g, '/').replace(/^\//, '');
      jsconfig.include.push(`${includePath}/**/*`);
      traverseDirectories(directory);
    });
  }
  traverseDirectories(srcDir);
  writejson(`${srcDir}/../jsconfig.json`, jsconfig)
}())