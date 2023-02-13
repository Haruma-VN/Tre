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

namespace Tre.Settings.Pages
{
    public partial class MainInterface : UserControl
    {
        private MainWindow window;
        public MainInterface()
        {
            InitializeComponent();
        }

        private void LoadWindow()
        {
            if(window == null)
            {
                window = Window.GetWindow(App.Current.MainWindow) as MainWindow;
            }
        }
        private void Element_Click_Setting(object sender, RoutedEventArgs e)
        {
            LoadWindow();
            window.ExecutePage(AppPages.Settings);
        }
        private void Element_Click_Language(object sender, RoutedEventArgs e)
        {
            LoadWindow();
            window.ExecutePage(AppPages.Language);
        }
        private void Element_Click_Help(object sender, RoutedEventArgs e)
        {
            LoadWindow();
            window.ExecutePage(AppPages.Introduce);
        }
        private void Element_Click_About(object sender, RoutedEventArgs e)
        {
            LoadWindow();
            window.ExecutePage(AppPages.About);
        }
    }
}
