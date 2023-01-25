using System;
using System.Windows.Forms;
using Newtonsoft.Json;
using System.IO;

namespace Tre.Config_Changer
{
    public partial class update : Form
    {
        BundleUpdate ConfigJSON = JsonConvert.DeserializeObject<BundleUpdate>(File.ReadAllText(("C:/Tre.Workspace/Tre.Extension/Tre.Config/Version.json")));
        public update()
        {
            InitializeComponent();
            if (ConfigJSON.current_ver != null)
            {
                label2.Text = ConfigJSON.current_ver;
            }
        }
        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {
            
        }

        private void update_Load(object sender, EventArgs e)
        {

        }
    }
}
