using System;
using System.Windows;
using System.Windows.Input;
using System.Windows.Threading;
using Tre.Settings.Pages;
using MahApps.Metro.IconPacks;
using System.Net.NetworkInformation;
using System.Windows.Media.Animation;
using Tre.Settings.UserControls;
using System.Linq;
using System.Windows.Controls;
using System.Windows.Media;
using System.Collections.Generic;

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


        private void UpdateTimeDisplay()
        {
            DateTime currentTime = DateTime.Now;
            string hour = currentTime.ToString("hh:mm");
            string dayOfWeek = currentTime.ToString("dddd");
            string date = currentTime.ToString("MMM, dd");

            //CurrentHourTextBlock.Text = hour;
            //CurrentDayInWeekTextBlock.Text = dayOfWeek;
            //CurrentDateTextBlock.Text = date;
        }

        private void Button_PreviewMouseDown(object sender, MouseButtonEventArgs e)
        {
            var button = (Button)sender;
            var newColor = (Color)ColorConverter.ConvertFromString("#005A9E");
            AnimateColorChange(button, newColor, TimeSpan.FromMilliseconds(100));
        }

        private void Button_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            var button = (Button)sender;
            var newColor = (Color)ColorConverter.ConvertFromString("#106EBE");
            AnimateColorChange(button, newColor, TimeSpan.FromMilliseconds(100));
        }

        private void AnimateColorChange(Button button, Color newColor, TimeSpan duration)
        {
            var colorAnimation = new ColorAnimation(newColor, duration);
            button.Background.BeginAnimation(SolidColorBrush.ColorProperty, colorAnimation);
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            UpdateTimeDisplay();

            //timer = new DispatcherTimer();
            //timer.Interval = TimeSpan.FromMinutes(1);
            //timer.Tick += Timer_Tick;
            //timer.Start();
        }

        private DispatcherTimer timer;


        //private void Timer_Tick(object sender, EventArgs e)
        //{
        //    UpdateTimeDisplay();
        //    UpdateWifiDisplay();
        //}

        public MainWindow()
        {
            InitializeComponent();
            //DispatcherTimer timer = new DispatcherTimer();
            //timer.Interval = TimeSpan.FromSeconds(1);
            //timer.Tick += Timer_Tick;
            //timer.Start();
        }

        //private void UpdateWifiDisplay()
        //{
        //    bool isWifiEnabled = CheckWifiStatus();
        //    if (isWifiEnabled)
        //    {
        //        CurrentWifiDisplayBlock.Kind = PackIconMaterialKind.Wifi;
        //    }
        //    else
        //    {
        //        CurrentWifiDisplayBlock.Kind = PackIconMaterialKind.WifiOff;
        //    }
        //}


        private void ExitButton_Click(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }
        private bool CheckWifiStatus()
        {
            try
            {
                NetworkInterface[] interfaces = NetworkInterface.GetAllNetworkInterfaces();
                foreach (NetworkInterface ni in interfaces)
                {
                    if (ni.NetworkInterfaceType == NetworkInterfaceType.Wireless80211 &&
                        ni.OperationalStatus == OperationalStatus.Up)
                    {
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error checking Wi-Fi status: " + ex.Message);
            }

            return false;
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

        private Stack<UIElement> _pageStack = new Stack<UIElement>();

        private void backButton_Click(object sender, RoutedEventArgs e)
        {
            if (_pageStack.Count > 0)
            {
                UIElement previousPage = _pageStack.Pop();
                AnimateTransitionFoward(previousPage);
                container.Content = previousPage;

                if (_pageStack.Count == 0)
                {
                    backButton.Visibility = Visibility.Visible;
                    backButton.IsEnabled = false;
                }
            }
        }

        public void ExecutePage(AppPages page)
        {
            backButton.Visibility = Visibility.Visible;
            backButton.IsEnabled = true;
            _pageStack.Push((UIElement)container.Content);
            switch (page)
            {
                case AppPages.About:
                    AnimateTransitionBackWard(aboutPage);
                    break;
                case AppPages.Settings:
                    AnimateTransitionBackWard(settingPage);
                    break;
                case AppPages.Introduce:
                    AnimateTransitionBackWard(introducePage);
                    break;
                case AppPages.MainInterface:
                    AnimateTransitionBackWard(mainInterface);
                    break;
                case AppPages.Language:
                    AnimateTransitionBackWard(languagePage);
                    break;
                default:
                    break;
            }
        }

        private void AnimateTransitionBackWard(UIElement newContent)
        {
            var sb = new Storyboard();
            var slideAnimation = new ThicknessAnimation
            {
                Duration = TimeSpan.FromMilliseconds(500),
                From = new Thickness(container.ActualWidth, 0, -container.ActualWidth, 0),
                To = new Thickness(0),
                DecelerationRatio = 0.9,
                EasingFunction = new CubicEase { EasingMode = EasingMode.EaseOut }
            };
            Storyboard.SetTarget(slideAnimation, container);
            Storyboard.SetTargetProperty(slideAnimation, new PropertyPath(MarginProperty));
            sb.Children.Add(slideAnimation);
            var opacityAnimation = new DoubleAnimation
            {
                Duration = TimeSpan.FromMilliseconds(500),
                From = 0,
                To = 1,
                DecelerationRatio = 0.9,
                EasingFunction = new CubicEase { EasingMode = EasingMode.EaseOut }
            };
            Storyboard.SetTarget(opacityAnimation, container);
            Storyboard.SetTargetProperty(opacityAnimation, new PropertyPath(OpacityProperty));
            sb.Children.Add(opacityAnimation);

            sb.Begin();

            container.Content = newContent;
        }

        private void AnimateTransitionFoward(UIElement newContent)
        {
            container.Content = newContent;
            var sb = new Storyboard();
            var slideAnimation = new ThicknessAnimation
            {
                Duration = TimeSpan.FromMilliseconds(500),
                From = new Thickness(-container.ActualWidth, 0, container.ActualWidth, 0),
                To = new Thickness(0),
                DecelerationRatio = 0.9,
                EasingFunction = new CubicEase { EasingMode = EasingMode.EaseOut }
            };
            Storyboard.SetTarget(slideAnimation, container);
            Storyboard.SetTargetProperty(slideAnimation, new PropertyPath(MarginProperty));
            sb.Children.Add(slideAnimation);
            var opacityAnimation = new DoubleAnimation
            {
                Duration = TimeSpan.FromMilliseconds(500),
                From = 0,
                To = 1,
                DecelerationRatio = 0.9,
                EasingFunction = new CubicEase { EasingMode = EasingMode.EaseOut }
            };
            Storyboard.SetTarget(opacityAnimation, container);
            Storyboard.SetTargetProperty(opacityAnimation, new PropertyPath(OpacityProperty));
            sb.Children.Add(opacityAnimation);

            sb.Begin();
        }
    }
}
