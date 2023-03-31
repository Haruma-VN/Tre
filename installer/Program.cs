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
        public class Atlas
        {
            public CrossResolution cross_resolution { get; set; }
            public Pack pack { get; set; }
            public Split split { get; set; }
        }
        public class BeautifyOrder
        {
            public int slot { get; set; }
            public int id { get; set; }
            public int path { get; set; }
            public int type { get; set; }
            public int atlas { get; set; }
            public int width { get; set; }
            public int height { get; set; }
            public int parent { get; set; }
            public int ah { get; set; }
            public int aw { get; set; }
            public int ax { get; set; }
            public int ay { get; set; }
            public int cols { get; set; }
            public int x { get; set; }
            public int y { get; set; }
            public int srcpath { get; set; }
            public int runtime { get; set; }
            public int forceOriginalVectorSymbolSize { get; set; }
        }

        public class Cat
        {
            public bool fix_double_shadows { get; set; }
        }

        public class CrossResolution
        {
            public bool allow_384 { get; set; }
        }

        public class Debugger
        {
            public bool allow_tracking_bugs { get; set; }
        }

        public class Display
        {
            public bool disable_display_full_path_execution { get; set; }
        }

        public class Extension
        {
            public bool use_other_voids { get; set; }
        }

        public class Json
        {
            public bool strict_mode { get; set; }
            public bool allow_trailing_commas { get; set; }
            public string space { get; set; }
        }

        public class Pack
        {
            public bool smart { get; set; }
            public int smart_allowance_area { get; set; }
            public bool cut_unused_space { get; set; }
        }

        public class PopcapResourceStreamGroupUnpack
        {
            public Simple simple { get; set; }
        }

        public class PopcapRtonConversion
        {
            public Rton rton { get; set; }
        }

        public class Resources
        {
            public BeautifyOrder beautify_order { get; set; }
            public Split split { get; set; }
            public Cat cat { get; set; }
        }

        public class ToolkitJSON
        {
            public Atlas atlas { get; set; }
            public Display display { get; set; }
            public Extension extension { get; set; }
            public Json json { get; set; }
            public Debugger debugger { get; set; }
            public string language { get; set; }
            public PopcapRtonConversion popcap_rton_conversion { get; set; }
            public User user { get; set; }
            public PopcapResourceStreamGroupUnpack popcap_resource_stream_group_unpack { get; set; }
            public Resources resources { get; set; }
        }

        public class Rton
        {
            public string rton_cipher { get; set; }
        }

        public class Simple
        {
            public int pam_resolution { get; set; }
            public bool pam_to_xfl { get; set; }
        }

        public class Split
        {
            public bool notify_duplicate { get; set; }
            public bool repairDuplicateFolder { get; set; }
            public bool allow_atlas_info { get; set; }
            public bool beautify_res { get; set; }
            public bool remove_unused_info { get; set; }
        }

        public class User
        {
            public string using_extension_for_rsb_pack { get; set; }
            public bool progress_bar { get; set; }
        }



        [DllImport("shell32.dll", CharSet = CharSet.Unicode)]
        protected static extern uint SHGetKnownFolderPath([MarshalAs(UnmanagedType.LPStruct)] Guid rfid, uint dwFlags, IntPtr hToken, out IntPtr pszPath);

        public class InformationJSON
        {
            public string save_directory { get; set; }
            public string version { get; set; }

            public string language { get; set; }
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

        public static ToolkitJSON ParseToolKit(string json)
        {
            ToolkitJSON json_str = JsonSerializer.Deserialize<ToolkitJSON>(json);
            return json_str;
        }

        public static async Task DownloadFileAsync(string url, string filePath, string language)
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
                            Program.CustomProgress progress = new Program.CustomProgress(ReportProgress, language); ;
                            await Program.DownloadFileWithProgressAsync(response, filePath, progress);
                            System.Console.ForegroundColor = System.ConsoleColor.Green;
                            System.Console.Write($"\n◉ {Localization.get_json_property("execution_process", $"./localization/{language}.json")}:\n     ");
                            System.Console.ForegroundColor = System.ConsoleColor.White;
                            System.Console.Write($"{Path.GetFullPath(filePath)}\n");
                        }
                        else
                        {
                            System.Console.ForegroundColor = System.ConsoleColor.Red;
                            System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{language}.json")}: {response.StatusCode}");
                        }
                    }
                }
                catch (Exception e)
                {
                    System.Console.ForegroundColor = System.ConsoleColor.Red;
                    System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{language}.json")}: {e.Message}");
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

        private static void ReportProgress(double progressPercentage, string language)
        {
            System.Console.CursorLeft = 0;
            System.Console.Write($"◉ {Localization.get_json_property("execution_process", $"./localization/{language}.json")}: {progressPercentage:F1}%");
        }

        public class CustomProgress : IProgress<double>
        {
            private readonly Action<double, string> _reportAction;
            private readonly string _language;

            public CustomProgress(Action<double, string> reportAction, string language)
            {
                _reportAction = reportAction;
                _language = language;
            }

            public void Report(double value)
            {
                _reportAction(value, _language);
            }
        }



        private static void WriteToFile(string filePath, string content)
        {
            File.WriteAllText(filePath, content);
        }

        public static async Task<string> SendGetRequestAsync(string url, string language)
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
                        System.Console.ForegroundColor = System.ConsoleColor.Red;
                        System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{language}.json")}: {response.StatusCode}");
                        return null;
                    }
                }
                catch (Exception e)
                {
                    System.Console.ForegroundColor = System.ConsoleColor.Red;
                    System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{language}.json")}: {e.Message}");
                    return null;
                }
            }
        }


        public static int input(string language)
        {
            System.Console.ForegroundColor = System.ConsoleColor.Cyan;
            System.Console.Write("◉ ");
            var user_input = System.Console.ReadLine();

            while (true)
            {
                int parsedValue;
                if (int.TryParse(user_input, out parsedValue) && (parsedValue == 0 || parsedValue == 1))
                {
                    return parsedValue;
                }
                System.Console.ForegroundColor = System.ConsoleColor.Red;
                System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{language}.json")}: {Localization.get_json_property("the_input_argument_only_accept_zero_and_one", $"./localization/{language}.json")}");
                System.Console.ForegroundColor = System.ConsoleColor.Cyan;
                System.Console.Write("◉ ");
                user_input = System.Console.ReadLine();
            }
        }


        public static void UncompressZip(string zipPath, string extractPath, string language)
        {
            try
            {
                ZipFile.ExtractToDirectory(zipPath, extractPath);
                System.Console.ForegroundColor = System.ConsoleColor.Green;
                System.Console.WriteLine($"◉ {Localization.get_json_property("execution_status", $"./localization/{language}.json")}: {Localization.get_json_property("uncompressed_zip", $"./localization/{language}.json")}");
            }
            catch (Exception e)
            {
                System.Console.ForegroundColor = System.ConsoleColor.Red;
                System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{language}.json")}: {e.Message}");
            }
        }


        static void CreateShortcutOnDesktop(string filePath, string language)
        {
            if (!File.Exists(filePath))
            {
                System.Console.ForegroundColor = System.ConsoleColor.Red;
                System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{language}.json")}: {filePath} {Localization.get_json_property("does_not_exists", $"./localization/{language}.json")}");
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


        public static void DeleteZip(string filePath, string language)
        {
            try
            {
                File.Delete(filePath);
                System.Console.ForegroundColor = System.ConsoleColor.Green;
                System.Console.WriteLine($"◉ {Localization.get_json_property("execution_status", $"./localization/{language}.json")}: {Localization.get_json_property("deleted_downloaded_zip", $"./localization/{language}.json")}");
            }
            catch (IOException e)
            {
                System.Console.ForegroundColor = System.ConsoleColor.Red;
                System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{language}.json")}: {e.Message}");
            }
        }

        public static bool verify_path(string path, string language)
        {
            System.Console.ForegroundColor = System.ConsoleColor.Green;
            System.Console.WriteLine($"◉ {Localization.get_json_property("execution_received", $"./localization/{language}.json")}:");
            System.Console.ForegroundColor = System.ConsoleColor.White;
            System.Console.WriteLine($"     {Path.GetFullPath(path)}");
            System.Console.ForegroundColor = System.ConsoleColor.Cyan;
            System.Console.WriteLine($"◉ {Localization.get_json_property("execution_argument", $"./localization/{language}.json")}: {Localization.get_json_property("verify_file_path", $"./localization/{language}.json")}");
            System.Console.ForegroundColor = System.ConsoleColor.Green;
            System.Console.WriteLine($"◉ {Localization.get_json_property("execution_information", $"./localization/{language}.json")}: {Localization.get_json_property("verify_if_the_file_path_is_correct", $"./localization/{language}.json")}");
            System.Console.ForegroundColor = System.ConsoleColor.White;
            System.Console.WriteLine($"      0. {Localization.get_json_property("false_choose_folder_path_again", $"./localization/{language}.json")}");
            System.Console.WriteLine($"      1. {Localization.get_json_property("true_choose_this_folder_as_default_path", $"./localization/{language}.json")}");
            System.Console.ForegroundColor = System.ConsoleColor.Cyan;
            int result = Program.input(language);
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
                Program.create_folder(parentFolder);
            }

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
        }


        public static string get_save(string language)
        {
            System.Console.ForegroundColor = System.ConsoleColor.Cyan;
            System.Console.WriteLine($"◉ {Localization.get_json_property("execution_argument", $"./localization/{language}.json")}: {Localization.get_json_property("save_dir", $"./localization/{language}.json")}");
            System.Console.ForegroundColor = System.ConsoleColor.Green;
            System.Console.WriteLine($"◉ {Localization.get_json_property("execution_information", $"./localization/{language}.json")}: {Localization.get_json_property("provide_a_directory_path", $"./localization/{language}.json")}");
            System.Console.ForegroundColor = System.ConsoleColor.Cyan;
            System.Console.Write("◉ ");
            var outputDirectory = System.Console.ReadLine();

            while (true)
            {
                switch (outputDirectory)
                {
                    case "":
                    case "./":
                        bool result = Program.verify_path("C:/Tre", language);
                        if (result)
                        {
                            return "C:/Tre";
                        }
                        System.Console.ForegroundColor = System.ConsoleColor.Cyan;
                        System.Console.Write("◉ ");
                        outputDirectory = System.Console.ReadLine();
                        break;
                    default:
                        if (!Directory.Exists(outputDirectory))
                        {
                            System.Console.ForegroundColor = System.ConsoleColor.Red;
                            System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{language}.json")}: {outputDirectory} {Localization.get_json_property("is_not_a_valid_directory", $"./localization/{language}.json")}");
                            System.Console.ForegroundColor = System.ConsoleColor.Cyan;
                            System.Console.Write("◉ ");
                            outputDirectory = System.Console.ReadLine();
                        }
                        else
                        {
                            result = Program.verify_path(outputDirectory, language);
                            if (result)
                            {
                                return outputDirectory;
                            }
                            else
                            {
                                System.Console.ForegroundColor = System.ConsoleColor.Red;
                                System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{language}.json")}: {Localization.get_json_property("cannot_use", $"./localization/{language}.json")} {outputDirectory}");
                                System.Console.ForegroundColor = System.ConsoleColor.Cyan;
                                System.Console.Write("◉ ");
                                outputDirectory = System.Console.ReadLine();
                            }
                        }
                        break;
                }
            }
        }


        public static void DeleteEverythingInFolder(string folderPath, string language)
        {
            if (!Directory.Exists(folderPath))
            {
                System.Console.ForegroundColor = System.ConsoleColor.Red;
                System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{language}.json")}: {folderPath} {Localization.get_json_property("is_not_exists", $"./localization/{language}.json")}");
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
            return Program.ParseInformation(information_json);
        }


        private static ToolkitJSON ReadToolKit(string filepath)
        {
            if (!File.Exists(filepath))
            {
                return null;
            }
            string toolkit_json = File.ReadAllText(filepath);
            return Program.ParseToolKit(toolkit_json);
        }

        public static string input_int(int[] valid_data, string language)
        {
            System.Console.ForegroundColor = System.ConsoleColor.Cyan;
            System.Console.Write("◉ ");
             int min_val = valid_data.Min();
             int max_val = valid_data.Max();
             var user_input = System.Console.ReadLine();

            while (true)
            {
                int parsedValue;
                if (int.TryParse(user_input, out parsedValue) && (parsedValue >= min_val && parsedValue <= max_val))
                {
                    return Program.LanguageTrade(parsedValue);
                }
                System.Console.ForegroundColor = System.ConsoleColor.Red;
                System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{language}.json")}: {Localization.get_json_property("input_argument_should_be_in_range", $"./localization/{language}.json")} [{min_val}, {max_val}]");
                System.Console.ForegroundColor = System.ConsoleColor.Cyan;
                System.Console.Write("◉ ");
                user_input = System.Console.ReadLine();
            }
        }

        protected static string LanguageTrade(int lang_num)
        {
            switch (lang_num)
            {
                case 1:
                    return "English";
                case 2:
                    return "Vietnamese";
                case 3:
                    return "Chinese";
                default:
                    return null;
            }
        }

        public static readonly string[] available_languages = { "English", "Vietnamese", "Chinese" };

        public static readonly int[] available_languages_options = { 1, 2, 3 };

        public class language_class
        {
            public string language { get; set; }

            public int language_number { get; set; }

            public language_class(string language, int language_number)
            {
                this.language = language;
                this.language_number = language_number;
            }
        }

        public class render_function
        {
            private int func_number;
            private string name_func;
            public render_function(int func_number, string name_func)
            {
                this.func_number = func_number;
                this.name_func  = name_func;
            }

            public int get_function_number()
            {
                return this.func_number;
            }


            public string get_func_name()
            {
                return this.name_func;
            }

            public string func_display()
            {
                switch (this.func_number.ToString().Length)
                {
                    case 1:
                        return $"      {this.func_number}. {this.name_func}";
                    case 2:
                        return $"     {this.func_number}. {this.name_func}";
                    case 3:
                        return $"    {this.func_number}. {this.name_func}";
                    case 4:
                        return $"  {this.func_number}. {this.name_func}";
                    case 5:
                        return $" {this.func_number}. {this.name_func}";
                    default:
                        return $"{this.func_number}. {this.name_func}";
                }
            }

        }

        public static string language_toolkit_changer(render_function[] valid_functions, string language)
        {
            System.Console.ForegroundColor = System.ConsoleColor.Cyan;
            System.Console.WriteLine($"◉ {Localization.get_json_property("execution_argument", $"./localization/{language}.json")}: {Localization.get_json_property("change_language", $"./localization/{language}.json")}");
            foreach(render_function func in valid_functions)
            {
                System.Console.ForegroundColor = System.ConsoleColor.White;
                System.Console.WriteLine(func.func_display());
            }
            System.Console.ForegroundColor = System.ConsoleColor.Cyan;
            string language_changer = Program.input_int(available_languages_options, language);
            return language_changer;
        }

        public static async Task Main()
        {
            System.Console.OutputEncoding = System.Text.Encoding.UTF8;
            Program.InformationJSON information_json = Program.ReadInformation("./information.json");
            string installer_language = (information_json != null && information_json.language != null) ? information_json.language : "English";
            System.Console.ForegroundColor = System.ConsoleColor.Green;
            System.Console.WriteLine($"◉ {Localization.get_json_property("execution_start", $"./localization/{installer_language}.json")}: {Localization.get_json_property("sending_github_api", $"./localization/{installer_language}.json")}");
            const string url = "https://api.github.com/repos/Haruma-VN/Tre/releases/latest";
            string json_github = await Program.SendGetRequestAsync(url, installer_language);
            if (json_github != null)
            {
                System.Console.ForegroundColor = System.ConsoleColor.Green;
                System.Console.WriteLine($"◉ {Localization.get_json_property("execution_status", $"./localization/{installer_language}.json")}: {Localization.get_json_property("success", $"./localization/{installer_language}.json")}");
            }
            System.Console.ForegroundColor = System.ConsoleColor.Green;
            string create_new_save_path = (information_json != null && information_json.save_directory != null) ? information_json.save_directory : Program.get_save(installer_language);
            if((information_json != null && information_json.save_directory != null))
            {
                System.Console.ForegroundColor = System.ConsoleColor.Green;
                System.Console.WriteLine($"◉ {Localization.get_json_property("installed_directory_from_the_previous_save", $"./localization/{installer_language}.json")}:");
                System.Console.ForegroundColor = System.ConsoleColor.White;
                System.Console.WriteLine($"     {Path.GetFullPath(information_json.save_directory)}");
            }
            if (json_github == null)
            {
                System.Console.ForegroundColor = System.ConsoleColor.Red;
                System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{installer_language}.json")}: {Localization.get_json_property("failed_to_send_request_to_github_server", $"./localization/{installer_language}.json")} {url}");
            }
            else
            {
                Program.GitHubReleases github_api_json = Program.ParseJson(json_github);
                if (github_api_json.assets != null && github_api_json.assets.Count > 0)
                {
                    if(information_json != null && information_json.version != null)
                    {
                        System.Console.ForegroundColor = System.ConsoleColor.Green;
                        System.Console.Write($"◉ {Localization.get_json_property("current_version", $"./localization/{installer_language}.json")}: ");
                        System.Console.ForegroundColor = System.ConsoleColor.White;
                        System.Console.Write($"{information_json.version}\n");
                    }
                    System.Console.ForegroundColor = System.ConsoleColor.Green;
                    System.Console.Write($"◉ {Localization.get_json_property("github_version", $"./localization/{installer_language}.json")}: ");
                    System.Console.ForegroundColor = System.ConsoleColor.White;
                    System.Console.Write($"{github_api_json.body}\n");
                    System.Console.ForegroundColor = System.ConsoleColor.Green;
                    System.Console.Write($"◉ {Localization.get_json_property("commit_date", $"./localization/{installer_language}.json")}: ");
                    System.Console.ForegroundColor = System.ConsoleColor.White;
                    System.Console.Write($"{github_api_json.assets[0].updated_at}\n");
                    System.Console.ForegroundColor = System.ConsoleColor.Cyan;
                    System.Console.WriteLine($"◉ {Localization.get_json_property("execution_argument", $"./localization/{installer_language}.json")}: {Localization.get_json_property("download_release", $"./localization/{installer_language}.json")}");
                    System.Console.ForegroundColor = System.ConsoleColor.White;
                    System.Console.WriteLine($"      0. {Localization.get_json_property("refuse_to_download", $"./localization/{installer_language}.json")}");
                    System.Console.WriteLine($"      1. {Localization.get_json_property("agree_to_download", $"./localization/{installer_language}.json")}");
                    System.Console.ForegroundColor = System.ConsoleColor.Cyan;
                    int download_checker = Program.input(installer_language);
                    if(download_checker != 0)
                    {
                        Program.create_folder(create_new_save_path);
                        Program.language_class[] languages_available_in_this_tool = new Program.language_class[available_languages.Length];
                        for(int i = 0; i < available_languages.Length; i++)
                        {
                            languages_available_in_this_tool[i] = new Program.language_class(available_languages[i], available_languages_options[i]);
                        }
                        Program.render_function[] languages_bool = new Program.render_function[languages_available_in_this_tool.Length];
                        for(int i = 0; i < languages_available_in_this_tool.Length; i++)
                        {
                            languages_bool[i] = new Program.render_function(languages_available_in_this_tool[i].language_number, languages_available_in_this_tool[i].language);
                        }
                        string language_changer = (information_json != null && information_json.language != null) ? information_json.language : Program.language_toolkit_changer(languages_bool, installer_language);
                        if(information_json != null && information_json.language != null)
                        {
                            System.Console.ForegroundColor = System.ConsoleColor.Green;
                            System.Console.WriteLine($"◉ {Localization.get_json_property("execution_status", $"./localization/{installer_language}.json")}: {Localization.get_json_property("loaded", $"./localization/{installer_language}.json")} {language_changer}");
                        }
                        if (Directory.Exists(create_new_save_path))
                        {
                            Program.DeleteEverythingInFolder(create_new_save_path, installer_language);
                        }
                        System.Console.ForegroundColor = System.ConsoleColor.Green;
                        System.Console.WriteLine($"◉ {Localization.get_json_property("execution_status", $"./localization/{installer_language}.json")}: {Localization.get_json_property("deleted_everything_in", $"./localization/{installer_language}.json")} {create_new_save_path}");
                        string filePath = $"{create_new_save_path}/Tre.zip";
                        await Program.DownloadFileAsync(github_api_json.assets[0].browser_download_url, filePath, installer_language);
                        System.Console.ForegroundColor = System.ConsoleColor.Green;
                        System.Console.WriteLine($"◉ {Localization.get_json_property("execution_status", $"./localization/{installer_language}.json")}: {Localization.get_json_property("successfully_downloaded", $"./localization/{installer_language}.json")}");
                        Program.UncompressZip(filePath, create_new_save_path, installer_language);
                        Program.DeleteZip(filePath, installer_language);
                        System.Console.ForegroundColor = System.ConsoleColor.Green;
                        Program.CreateShortcutOnDesktop($"{create_new_save_path}/Tre.exe", installer_language);
                        System.Console.WriteLine($"◉ {Localization.get_json_property("execution_status", $"./localization/{installer_language}.json")}: {Localization.get_json_property("successfully_create_a_shortcut_on_desktop", $"./localization/{installer_language}.json")}");
                        Program.InformationJSON create_new_information = new Program.InformationJSON();
                        create_new_information.save_directory = create_new_save_path;
                        create_new_information.version = github_api_json.body;
                        create_new_information.language = language_changer;
                        var options = new JsonSerializerOptions
                        {
                            WriteIndented = true,
                            Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                        };
                        string jsonString = JsonSerializer.Serialize(create_new_information, options);
                        jsonString = jsonString.Replace("  ", "\t");
                        Program.WriteToFile("./information.json", jsonString);
                        System.Console.ForegroundColor = System.ConsoleColor.Green;
                        System.Console.WriteLine($"◉ {Localization.get_json_property("execution_status", $"./localization/{installer_language}.json")}: {Localization.get_json_property("created", $"./localization/{installer_language}.json")} \"information.json\"");
                        System.Console.ForegroundColor = System.ConsoleColor.Green;
                        if (language_changer != "English" && language_changer != null)
                        {
                            string toolkit_json_filepath = $"{create_new_save_path}/extension/settings/toolkit.json";
                            ToolkitJSON toolkit_json = ReadToolKit(toolkit_json_filepath);
                            toolkit_json.language = language_changer;
                            string toolkit_json_str = JsonSerializer.Serialize(toolkit_json, options);
                            toolkit_json_str = toolkit_json_str.Replace("  ", "\t");
                            Program.WriteToFile(toolkit_json_filepath, toolkit_json_str);
                            System.Console.WriteLine($"◉ {Localization.get_json_property("execution_status", $"./localization/{installer_language}.json")}: {Localization.get_json_property("changed_language_to", $"./localization/{installer_language}.json")} {language_changer}");
                        }
                    }
                }
                else
                {
                    System.Console.ForegroundColor = System.ConsoleColor.Red;
                    System.Console.WriteLine($"◉ {Localization.get_json_property("execution_error", $"./localization/{installer_language}.json")}: {Localization.get_json_property("no_assets_found", $"./localization/{installer_language}.json")}");
                }
            }
            System.Console.ForegroundColor = System.ConsoleColor.Green;
            System.Console.WriteLine($"◉ {Localization.get_json_property("execution_finish", $"./localization/{installer_language}.json")}: {Localization.get_json_property("press_any_key_to_exit", $"./localization/{installer_language}.json")}...");
            System.Console.ReadKey();
        }

    }
}