using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Prato
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public float Preco { get; set; }
        public int IdRestaurante { get; set; }
        public Restaurante Restaurante { get; set; }
    }
}
