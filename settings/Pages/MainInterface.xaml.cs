using System.Windows;
using System.Windows.Controls;

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
