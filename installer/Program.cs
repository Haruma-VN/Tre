using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using static Tre.Installer.Program;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.IO.Compression;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace Tre.Installer
{
    internal class Program
    {
        [DllImport("shell32.dll", CharSet = CharSet.Unicode)]
        protected static extern uint SHGetKnownFolderPath([MarshalAs(UnmanagedType.LPStruct)] Guid rfid, uint dwFlags, IntPtr hToken, out IntPtr pszPath);

        public class InformationJSON
        {
            public string save_directory { get; set; }
            public string version { get; set; }
        }

        public class Asset
        {
            public string url { get; set; }
            public int id { get; set; }
            public string node_id { get; set; }
            public string name { get; set; }
            public object label { get; set; }
            public Uploader uploader { get; set; }
            public string content_type { get; set; }
            public string state { get; set; }
            public int size { get; set; }
            public int download_count { get; set; }
            public DateTime created_at { get; set; }
            public DateTime updated_at { get; set; }
            public string browser_download_url { get; set; }
        }

        public class Author
        {
            public string login { get; set; }
            public int id { get; set; }
            public string node_id { get; set; }
            public string avatar_url { get; set; }
            public string gravatar_id { get; set; }
            public string url { get; set; }
            public string html_url { get; set; }
            public string followers_url { get; set; }
            public string following_url { get; set; }
            public string gists_url { get; set; }
            public string starred_url { get; set; }
            public string subscriptions_url { get; set; }
            public string organizations_url { get; set; }
            public string repos_url { get; set; }
            public string events_url { get; set; }
            public string received_events_url { get; set; }
            public string type { get; set; }
            public bool site_admin { get; set; }
        }

        public class GitHubReleases
        {
            public string url { get; set; }
            public string assets_url { get; set; }
            public string upload_url { get; set; }
            public string html_url { get; set; }
            public int id { get; set; }
            public Author author { get; set; }
            public string node_id { get; set; }
            public string tag_name { get; set; }
            public string target_commitish { get; set; }
            public string name { get; set; }
            public bool draft { get; set; }
            public bool prerelease { get; set; }
            public DateTime created_at { get; set; }
            public DateTime published_at { get; set; }
            public List<Asset> assets { get; set; }
            public string tarball_url { get; set; }
            public string zipball_url { get; set; }
            public string body { get; set; }
        }

        public class Uploader
        {
            public string login { get; set; }
            public int id { get; set; }
            public string node_id { get; set; }
            public string avatar_url { get; set; }
            public string gravatar_id { get; set; }
            public string url { get; set; }
            public string html_url { get; set; }
            public string followers_url { get; set; }
            public string following_url { get; set; }
            public string gists_url { get; set; }
            public string starred_url { get; set; }
            public string subscriptions_url { get; set; }
            public string organizations_url { get; set; }
            public string repos_url { get; set; }
            public string events_url { get; set; }
            public string received_events_url { get; set; }
            public string type { get; set; }
            public bool site_admin { get; set; }
        }



        public static GitHubReleases ParseJson(string json)
        {
            GitHubReleases gitHubRelease = JsonSerializer.Deserialize<GitHubReleases>(json);
            return gitHubRelease;
        }


        public static InformationJSON ParseInformation(string json)
        {
            InformationJSON json_str = JsonSerializer.Deserialize<InformationJSON>(json);
            return json_str;
        }

        public static async Task DownloadFileAsync(string url, string filePath)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Add("User-Agent", "Tre");

                try
                {
                    using (HttpResponseMessage response = await httpClient.GetAsync(url, HttpCompletionOption.ResponseHeadersRead))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            Progress<double> progress = new Progress<double>(ReportProgress);
                            await DownloadFileWithProgressAsync(response, filePath, progress);
                            Console.ForegroundColor = ConsoleColor.Green;
                            Console.Write($"\n◉ Execution downloaded:\n     ");
                            Console.ForegroundColor = ConsoleColor.White;
                            Console.Write($"{Path.GetFullPath(filePath)}\n");
                        }
                        else
                        {
                            Console.ForegroundColor = ConsoleColor.Red;
                            Console.WriteLine($"◉ Execution error: {response.StatusCode}");
                        }
                    }
                }
                catch (Exception e)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"◉ Execution error: {e.Message}");
                }
            }
        }

        private static async Task DownloadFileWithProgressAsync(HttpResponseMessage response, string filePath, IProgress<double> progress)
        {
            using (Stream contentStream = await response.Content.ReadAsStreamAsync(), fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None, bufferSize: 8192, useAsync: true))
            {
                long totalBytes = response.Content.Headers.ContentLength.HasValue ? response.Content.Headers.ContentLength.Value : -1L;
                int bufferSize = 8192;
                byte[] buffer = new byte[bufferSize];
                int bytesRead;
                long totalBytesRead = 0L;

                while ((bytesRead = await contentStream.ReadAsync(buffer, 0, bufferSize)) != 0)
                {
                    await fileStream.WriteAsync(buffer, 0, bytesRead);
                    totalBytesRead += bytesRead;

                    if (totalBytes > 0)
                    {
                        double progressPercentage = 100.0 * totalBytesRead / totalBytes;
                        progress.Report(progressPercentage);
                    }
                }
            }
        }

        private static void ReportProgress(double progressPercentage)
        {
            Console.CursorLeft = 0;
            Console.Write($"◉ Execution process: {progressPercentage:F1}%");
        }


        private static void WriteToFile(string filePath, string content)
        {
            File.WriteAllText(filePath, content);
        }

        public static async Task<string> SendGetRequestAsync(string url)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Add("User-Agent", "Tre");

                try
                {
                    HttpResponseMessage response = await httpClient.GetAsync(url);

                    if (response.IsSuccessStatusCode)
                    {
                        string content = await response.Content.ReadAsStringAsync();
                        return content;
                    }
                    else
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine($"◉ Execution error: {response.StatusCode}");
                        return null;
                    }
                }
                catch (Exception e)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"◉ Execution error: {e.Message}");
                    return null;
                }
            }
        }


        public static int input()
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.Write("◉ ");
            var user_input = Console.ReadLine();

            while (true)
            {
                int parsedValue;
                if (int.TryParse(user_input, out parsedValue) && (parsedValue == 0 || parsedValue == 1))
                {
                    return parsedValue;
                }
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("◉ Execution error: The input argument only accepts 0 or 1");
                Console.ForegroundColor = ConsoleColor.Cyan;
                Console.Write("◉ ");
                user_input = Console.ReadLine();
            }
        }


        public static void UncompressZip(string zipPath, string extractPath)
        {
            try
            {
                ZipFile.ExtractToDirectory(zipPath, extractPath);
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine($"◉ Execution status: Uncompressed zip");
            }
            catch (Exception e)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"◉ Execution error: {e.Message}");
            }
        }


        static void CreateShortcutOnDesktop(string filePath)
        {
            if (!File.Exists(filePath))
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"◉ Execution error: {filePath} does not exists");
                return;
            }

            string desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
            string shortcutName = Path.GetFileNameWithoutExtension(filePath) + ".lnk";
            string shortcutPath = Path.Combine(desktopPath, shortcutName);

            string script = $"$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('{shortcutPath}'); $s.TargetPath = '{filePath}'; $s.WorkingDirectory = '{Path.GetDirectoryName(filePath)}'; $s.Save()";

            ProcessStartInfo processStartInfo = new ProcessStartInfo
            {
                FileName = "powershell.exe",
                Arguments = $"-NoProfile -ExecutionPolicy Bypass -Command \"{script}\"",
                WindowStyle = ProcessWindowStyle.Hidden,
                CreateNoWindow = true,
                UseShellExecute = false,
                RedirectStandardOutput = true,
            };

            Process process = new Process { StartInfo = processStartInfo };
            process.Start();
            process.WaitForExit();
        }


        public static void DeleteZip(string filePath)
        {
            try
            {
                File.Delete(filePath);
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine($"◉ Execution status: Deleted zip");
            }
            catch (IOException e)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"◉ Execution error: {e.Message}");
            }
        }

        public static bool verify_path(string path)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"◉ Execution received:");
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine($"     {Path.GetFullPath(path)}");
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine($"◉ Execution argument: Verify path");
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"◉ Execution information: You need to verify if this is the right path");
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("      0. False, choose the path again");
            Console.WriteLine("      1. True, save this as default path");
            Console.ForegroundColor = ConsoleColor.Cyan;
            int result = input();
            return result == 1 ? true : false;
        }


        public static void create_folder(string path)
        {
            if (string.IsNullOrEmpty(path))
            {
                return;
            }

            string parentFolder = Path.GetDirectoryName(path);

            if (!Directory.Exists(parentFolder))
            {
                create_folder(parentFolder);
            }

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
        }

        public static string get_save()
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine($"◉ Execution argument: Save Directory");
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"◉ Execution information: Provide a directory path");
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.Write("◉ ");
            var outputDirectory = Console.ReadLine();

            while (true)
            {
                switch (outputDirectory)
                {
                    case "":
                    case "./":
                        bool result = verify_path("C:/Tre");
                        if (result)
                        {
                            return "C:/Tre";
                        }
                        Console.ForegroundColor = ConsoleColor.Cyan;
                        Console.Write("◉ ");
                        outputDirectory = Console.ReadLine();
                        break;
                    default:
                        // Moved the while loop condition to the switch case
                        if (!Directory.Exists(outputDirectory))
                        {
                            Console.ForegroundColor = ConsoleColor.Red;
                            Console.WriteLine($"◉ Execution error: {outputDirectory} is not a valid directory");
                            Console.ForegroundColor = ConsoleColor.Cyan;
                            Console.Write("◉ ");
                            outputDirectory = Console.ReadLine();
                        }
                        else
                        {
                            result = verify_path(outputDirectory);
                            if (result)
                            {
                                return outputDirectory;
                            }
                            else
                            {
                                Console.ForegroundColor = ConsoleColor.Red;
                                Console.WriteLine($"◉ Execution error: Cannot use {outputDirectory}");
                                Console.ForegroundColor = ConsoleColor.Cyan;
                                Console.Write("◉ ");
                                outputDirectory = Console.ReadLine();
                            }
                        }
                        break;
                }
            }
        }


        static void DeleteEverythingInFolder(string folderPath)
        {
            if (!Directory.Exists(folderPath))
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"◉ Execution error: {folderPath} is not exists");
                return;
            }

            DirectoryInfo directoryInfo = new DirectoryInfo(folderPath);
            foreach (FileInfo file in directoryInfo.GetFiles())
            {
                file.Delete();
            }
            foreach (DirectoryInfo subfolder in directoryInfo.GetDirectories())
            {
                subfolder.Delete(true);
            }
        }

        private static InformationJSON ReadInformation(string filepath)
        {
            if (!File.Exists(filepath))
            {
                return null;
            }
            string information_json = File.ReadAllText(filepath);
            return ParseInformation(information_json);
        }


        public static async Task Main()
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("◉ Execution start: Sending request to GitHub API");
            const string url = "https://api.github.com/repos/Haruma-VN/Tre/releases/latest";
            string json_github = await SendGetRequestAsync(url);
            InformationJSON information_json = ReadInformation("./information.json");
            if (json_github != null)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("◉ Execution status: Success");
            }
            Console.ForegroundColor = ConsoleColor.Green;
            string create_new_save_path = (information_json != null && information_json.save_directory != null) ? information_json.save_directory : get_save();
            if((information_json != null && information_json.save_directory != null))
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine($"◉ Installed directory from the previous save:");
                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine($"     {Path.GetFullPath(information_json.save_directory)}");
            }
            if (json_github == null)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"◉ Execution error: Failed to send request to {url}");
            }
            else
            {
                GitHubReleases github_api_json = ParseJson(json_github);
                if (github_api_json.assets != null && github_api_json.assets.Count > 0)
                {
                    if(information_json != null && information_json.version != null)
                    {
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.Write($"◉ Current version: ");
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.Write($"{information_json.version}\n");
                    }
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.Write($"◉ GitHub version: ");
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.Write($"{github_api_json.body}\n");
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.Write($"◉ Commits date: ");
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.Write($"{github_api_json.assets[0].updated_at}\n");
                    Console.ForegroundColor = ConsoleColor.Cyan;
                    Console.WriteLine("◉ Execution argument: Would you like to download the release?");
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.WriteLine("      0. Decline to download");
                    Console.WriteLine("      1. Accept to download");
                    Console.ForegroundColor = ConsoleColor.Cyan;
                    int download_checker = input();
                    if(download_checker == 0)
                    {
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("◉ Execution finish: Stopped command successfully.");
                    }
                    else
                    {
                        create_folder(create_new_save_path);
                        if (Directory.Exists(create_new_save_path))
                        {
                            DeleteEverythingInFolder(create_new_save_path);
                        }
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine($"◉ Execution status: Cleaned {create_new_save_path}");
                        string filePath = $"{create_new_save_path}/Tre.zip";
                        await DownloadFileAsync(github_api_json.assets[0].browser_download_url, filePath);
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("◉ Execution status: Successfully downloaded");
                        UncompressZip(filePath, create_new_save_path);
                        DeleteZip(filePath);
                        Console.ForegroundColor = ConsoleColor.Green;
                        CreateShortcutOnDesktop($"{create_new_save_path}/Tre.exe");
                        Console.WriteLine("◉ Execution status: Successfully created a shortcut on Desktop");
                        InformationJSON create_new_information = new InformationJSON();
                        create_new_information.save_directory = create_new_save_path;
                        create_new_information.version = github_api_json.body;
                        var options = new JsonSerializerOptions
                        {
                            WriteIndented = true,
                            Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                        };
                        string jsonString = JsonSerializer.Serialize(create_new_information, options);
                        jsonString = jsonString.Replace("  ", "\t");

                        WriteToFile("./information.json", jsonString);
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("◉ Execution status: \"Created information.json\"");
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("◉ Execution finish: Press any key to continue...");
                        Console.ReadKey();
                    }
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"◉ Execution error: No assets found");
                }
            }
        }

    }
}