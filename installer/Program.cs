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


namespace Tre.Installer
{
    internal class Program
    {

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
                            using (Stream contentStream = await response.Content.ReadAsStreamAsync(), fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None, bufferSize: 8192, useAsync: true))
                            {
                                await contentStream.CopyToAsync(fileStream);
                                Console.ForegroundColor = ConsoleColor.Green;
                                Console.Write($"◉ Execution downloaded:\n     ");
                                Console.ForegroundColor = ConsoleColor.White;
                                Console.Write($"{Path.GetFullPath(filePath)}\n");
                            }
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
                if(Convert.ToInt32(user_input) == 1 || Convert.ToInt32(user_input) == 0)
                {
                    return Convert.ToInt32(user_input) ;
                }
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("◉ Execution error: The input argument only accept 0 or 1");
                Console.ForegroundColor = ConsoleColor.Cyan;
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
            Console.ForegroundColor = ConsoleColor.White;
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
            bool result;
            while (true)
            {
                switch (outputDirectory)
                {
                    case "":
                    case "./":
                        result = verify_path("./Tre");
                        if (result)
                        {
                            return "./Tre";
                        }
                        Console.ForegroundColor = ConsoleColor.Cyan;
                        Console.Write("◉ ");
                        outputDirectory = Console.ReadLine();
                        break;
                    default:
                        while (!Directory.Exists(outputDirectory))
                        {
                            if (Directory.Exists(outputDirectory))
                            {
                                break;
                            }
                            Console.ForegroundColor = ConsoleColor.Red;
                            Console.WriteLine($"◉ Execution error: {outputDirectory} is not a valid directory");
                            Console.ForegroundColor = ConsoleColor.Cyan;
                            Console.Write("◉ ");
                            outputDirectory = Console.ReadLine();
                        }
                        result = verify_path(outputDirectory as string);
                        Console.ForegroundColor = ConsoleColor.Cyan;
                        outputDirectory = result ? outputDirectory : get_save();
                        return (outputDirectory != null) ? outputDirectory : "./";
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

        public static async Task Main()
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("◉ Execution start: Sending request to GitHub API");
            const string url = "https://api.github.com/repos/Haruma-VN/Tre/releases/latest";
            string json_github = await SendGetRequestAsync(url);
            if(json_github != null)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("◉ Execution status: Success");
            }
            Console.ForegroundColor = ConsoleColor.Green;
            string create_new_save_path = get_save();
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
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.Write($"◉ Execution date: ");
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
                        const string filePath = $"./tre.zip";
                        await DownloadFileAsync(github_api_json.assets[0].browser_download_url, filePath);
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("◉ Execution status: Successfully downloaded");
                        DeleteEverythingInFolder(create_new_save_path);
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine($"◉ Execution status: Cleaned {create_new_save_path}");
                        create_folder(create_new_save_path);
                        UncompressZip(filePath, create_new_save_path);
                        DeleteZip(filePath);
                        Console.ForegroundColor = ConsoleColor.Green;
                        CreateShortcutOnDesktop($"{create_new_save_path}/Tre.exe");
                        Console.WriteLine("◉ Execution status: Successfully created a shortcut on Desktop");
                        Console.WriteLine("◉ Execution finish: Press any key to continue...");
                        Console.ReadLine();
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