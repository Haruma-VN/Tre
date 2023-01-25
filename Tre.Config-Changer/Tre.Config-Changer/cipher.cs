using System;
using System.Windows.Forms;
using Newtonsoft.Json;
using System.IO;

namespace Tre.Config_Changer
{
    public partial class cipher : Form
    {
        CipherJSON RSBCipherJSON = JsonConvert.DeserializeObject<CipherJSON>(File.ReadAllText("C:/Tre.Workspace/Tre.Extension/Tre.Config/RSBCipher.json"));
        public cipher()
        {
            InitializeComponent();
            if(RSBCipherJSON.bundles.enabled == true)
            {
                checkTerm.Checked = true;
            }
        }

        private void cipher_Load(object sender, EventArgs e)
        {

        }

        private void iconButton1_Click(object sender, EventArgs e)
        {
            
        }

        private void saveBtn_Click(object sender, EventArgs e)
        {
            File.WriteAllText("C:/Tre.Workspace/Tre.Extension/Tre.Config/RSBCipher.json", JsonConvert.SerializeObject(RSBCipherJSON));
            MessageBox.Show("Successfully changed config for RSB Cipher!");
        }

        private void checkTerm_CheckedChanged(object sender, EventArgs e)
        {
            if (checkTerm.Checked)
            {
                RSBCipherJSON.bundles.enabled = true;
            }
            else
            {
                RSBCipherJSON.bundles.enabled = false;
            }
        }
    }
}
