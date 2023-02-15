using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Text.Json;
using System.IO;

namespace Tre.Settings.Pages
{
    public class Atlas
    {
        public Split split { get; set; }
        public Cat cat { get; set; }
    }

    public class Cat
    {
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
    }

    public class Root
    {
        public Json json { get; set; }
        public Display display { get; set; }
        public User user { get; set; }
        public Atlas atlas { get; set; }
        public Extension extension { get; set; }
    }

    public class Split
    {
        public bool repairDuplicateFolder { get; set; }
        public bool notify_duplicate { get; set; }
    }

    public class User
    {
        public int cpu_usage_for_images { get; set; }
    }
    public partial class Settings_Page : UserControl
    {
        public Settings_Page()
        {
            InitializeComponent();
            string jsonString = File.ReadAllText("C:/Tre.Vietnam/Tre.Extension/Tre.Settings/toolkit.json");
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            var jsonObject = JsonSerializer.Deserialize<Root>(jsonString, options);
            if (jsonObject.display.disable_display_full_path_execution == true)
            {
                DisableDisplayFullPath.IsChecked = true;
            }
            else
            {
                DisableDisplayFullPath.IsChecked = false;
            }
            if (jsonObject.atlas.split.repairDuplicateFolder == true)
            {
                RepairDuplicator.IsChecked = true;
            }
            else
            {
                RepairDuplicator.IsChecked = false;
            }
            if (jsonObject.atlas.split.notify_duplicate == true)
            {
                NotifyDuplicator.IsChecked = true;
            }
            else
            {
                NotifyDuplicator.IsChecked = false;
            }
            if (jsonObject.extension.use_other_voids == true)
            {
                UseOtherJavaScriptVoids.IsChecked = true;
            }
            else
            {
                UseOtherJavaScriptVoids.IsChecked = false;
            }
        }

        private void Apply_Change_For_JS_Shell(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("hello");
        }
    }
}
