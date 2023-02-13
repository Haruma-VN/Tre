using System.Windows;
using System.Windows.Input;
using Tre.Settings.Pages;

namespace Tre.Settings
{
    public enum AppPages
    {
        About, Settings, Introduce, MainInterface, Language
    }
    public partial class MainWindow : Window
    {
        private Pages.MainInterface mainInterface = new Pages.MainInterface();
        private Pages.About_Page aboutPage = new Pages.About_Page();
        private Pages.Settings_Page settingPage = new Pages.Settings_Page();
        private Pages.Introduce introducePage = new Pages.Introduce();
        private Pages.Language_Page languagePage = new Pages.Language_Page();

        public MainWindow()
        {
            InitializeComponent();
        }

        private bool IsMaximized = false;

        private void Border_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if(e.ClickCount == 2)
            {
                if (IsMaximized)
                {
                    this.WindowState = WindowState.Normal;
                    this.Width = 1280;
                    this.Height = 720;
                }
                else
                {
                    this.WindowState = WindowState.Maximized;
                    IsMaximized = true;
                }
            }
        }
        private void Border_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if(e.ChangedButton == MouseButton.Left)
            {
                this.DragMove();
            }
        }

        private void backButton_Click(object sender, RoutedEventArgs e)
        {
            container.Content = mainInterface;
            backButton.Visibility = Visibility.Collapsed;
            titleText.Text = "Tre.Settings";
        }

        public void ExecutePage(AppPages page)
        {
            backButton.Visibility = Visibility.Visible;
            switch (page)
            {
                case AppPages.About:
                    container.Content = aboutPage;
                    titleText.Text = "About";
                    break;
                case AppPages.Settings:
                    container.Content = settingPage;
                    titleText.Text = "Settings";
                    break;
                case AppPages.Introduce:
                    container.Content = introducePage;
                    titleText.Text = "Introduce";
                    break;
                case AppPages.MainInterface:
                    container.Content = mainInterface;
                    titleText.Text = "Tre.Settings";
                    break;
                case AppPages.Language:
                    container.Content = languagePage;
                    titleText.Text = "Language";
                    break;
                default:
                    break;
            }
        }
    }
}
