using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace database
{
    class Program{
        static void Main(string[] args){
            using(var db= new DBRestaurante()){
                db.Database.EnsureCreated();
            }
        }
    }
    public class DBRestaurante : DbContext
    {
        public DbSet<Restaurante> Restaurantes { get; set; }
        public DbSet<Prato> Pratos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Database=resta;Username=mathe;Integrated_Security=true");

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Restaurante>()
                .ToTable("Restaurante");
                modelBuilder.Entity<Prato>()
                .ToTable("Prato");
            modelBuilder.Entity<Restaurante>()
                .HasKey(p => p.Id);
                modelBuilder.Entity<Prato>()
                .HasKey(p => p.Id);
        }
    }
    public class Prato
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Preco { get; set; }
    }

    public class Restaurante
    {
        public int Id { get; set; }
        public string Nome { get; set; }
    }
}

