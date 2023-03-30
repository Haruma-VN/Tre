using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using static Tre.Installer.Program;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.IO.Compression;

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
                                Console.Write($"Execution out:\n     ");
                                Console.ForegroundColor = ConsoleColor.White;
                                Console.Write($"{Path.GetFullPath(filePath)}\n");
                            }
                        }
                        else
                        {
                            Console.ForegroundColor = ConsoleColor.Red;
                            Console.WriteLine($"Execution error: {response.StatusCode}");
                        }
                    }
                }
                catch (Exception e)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Execution error: {e.Message}");
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
                        Console.WriteLine($"Execution error: {response.StatusCode}");
                        return null;
                    }
                }
                catch (Exception e)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Execution error: {e.Message}");
                    return null;
                }
            }
        }


        public static int input()
        {
            var user_input = Console.ReadLine();
            while (true)
            {
                if(Convert.ToInt32(user_input) == 1 || Convert.ToInt32(user_input) == 0)
                {
                    return Convert.ToInt32(user_input);
                }
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Execution error: The input argument only accept 0 or 1");
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
                Console.WriteLine($"Execution status: Uncompressed zip");
            }
            catch (Exception e)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"Execution error: {e.Message}");
            }
        }


        public static void DeleteZip(string filePath)
        {
            try
            {
                File.Delete(filePath);
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine($"Execution status: Deleted zip");
            }
            catch (IOException e)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"Execution error: {e.Message}");
            }
        }


        public static async Task Main()
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Execution start: Sending Request to GitHub URL");
            const string url = "https://api.github.com/repos/Haruma-VN/Tre/releases/latest";
            string json_github = await SendGetRequestAsync(url);
            if (json_github == null)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"Execution error: Failed to send request to {url}");
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("Execution status: Success!");
                GitHubReleases github_api_json = ParseJson(json_github);
                if (github_api_json.assets != null && github_api_json.assets.Count > 0)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.Write($"Execution version: ");
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.Write($"{github_api_json.assets[0].updated_at}\n");
                    Console.ForegroundColor = ConsoleColor.Cyan;
                    Console.WriteLine("Execution argument: Would you like to download the update?");
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.WriteLine("      0. Decline to download the version");
                    Console.WriteLine("      1. Accept to download the version");
                    Console.ForegroundColor = ConsoleColor.Cyan;
                    int download_checker = input();
                    if(download_checker == 0)
                    {
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("Execution finish: Stopped command successfully.");
                    }
                    else
                    {
                        const string filePath = "./tre.zip";
                        await DownloadFileAsync(github_api_json.assets[0].browser_download_url, filePath);
                        UncompressZip(filePath, "./");
                        DeleteZip(filePath);
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("Execution status: Successfully downloaded Tre");
                        Console.WriteLine("Execution finish: Press any key to continue...");
                        Console.ReadLine();
                    }
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Execution error: No assets found");
                }
            }
        }

    }

}