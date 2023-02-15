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
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Tre.Settings.UserControls
{
    public partial class UIButton : UserControl
    {
        public UIButton()
        {
            InitializeComponent();
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

        public object Content
        {
            get { return (object)GetValue(ContentProperty); }
            set { SetValue(ContentProperty, value); }
        }

        public static readonly DependencyProperty ContentProperty =
            DependencyProperty.Register("Content", typeof(object), typeof(UIButton), new UIPropertyMetadata(null));

        public static readonly RoutedEvent ClickEvent = EventManager.RegisterRoutedEvent(
        "Click",
        RoutingStrategy.Bubble,
        typeof(RoutedEventHandler),
        typeof(UIButton));

        public event RoutedEventHandler Click
        {
            add { AddHandler(ClickEvent, value); }
            remove { RemoveHandler(ClickEvent, value); }
        }

        public void RaiseClickEvent()
        {
            RoutedEventArgs newEventArgs = new RoutedEventArgs(UIButton.ClickEvent);
            RaiseEvent(newEventArgs);
        }
    }
}
