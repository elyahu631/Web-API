using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrempsDalProj
{
    public class Tremp
    {
        public int Id { get; set; }
        public bool Type { get; set; }
        public DateTime Time { get; set; }
        public string From_Root { get; set; }
        public string To_Root { get; set; }
    }
}
