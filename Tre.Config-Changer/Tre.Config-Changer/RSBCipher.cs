namespace Tre.Config_Changer
{
    public class Bundles
    {
        public bool enabled { get; set; }
        public bool bundle { get; set; }
        public string key { get; set; }
    }

    public class CipherJSON
    {
        public string target { get; set; }
        public string expand { get; set; }
        public Bundles bundles { get; set; }
    }
}
