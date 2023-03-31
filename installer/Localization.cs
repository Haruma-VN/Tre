using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Text.Json;

namespace Tre.Installer
{
    public class Localization
    {
        public static string get_json_property(string property, string jsonFilePath = "./localization/English.json")
        {
            if(!File.Exists(jsonFilePath))
            {
                return property;
            }

            string jsonContent = File.ReadAllText(jsonFilePath);
            JsonDocument localeData = JsonDocument.Parse(jsonContent);

            if (localeData.RootElement.TryGetProperty(property, out JsonElement value))
            {
                return value.GetString();
            }
            else
            {
                return property;
            }
        }
    }
}
