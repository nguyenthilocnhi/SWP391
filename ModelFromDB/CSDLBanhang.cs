using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Web.ModelFromDB;

public partial class CSDLBanhang : DbContext
{
    public CSDLBanhang()
    {
    }

    public CSDLBanhang(DbContextOptions<CSDLBanhang> options)
        : base(options)
    {
    }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<BookingRecord> BookingRecords { get; set; }

    public virtual DbSet<Consultant> Consultants { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<MenstrualCycle> MenstrualCycles { get; set; }

    public virtual DbSet<Register> Registers { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<Slot> Slots { get; set; }

    public virtual DbSet<WebUser> WebUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=(local);Database=SWP;User Id=sa;Password=12345;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("PK__Booking__73951ACD7E38BC2A");

            entity.HasOne(d => d.Consultant).WithMany(p => p.Bookings)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Booking__Consult__403A8C7D");

            entity.HasOne(d => d.Customer).WithMany(p => p.Bookings)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Booking__Custome__3F466844");

            entity.HasOne(d => d.Service).WithMany(p => p.Bookings)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Booking__Service__412EB0B6");
        });

        modelBuilder.Entity<BookingRecord>(entity =>
        {
            entity.HasKey(e => e.BookingRecordId).HasName("PK__BookingR__1E41CAB6F6B32A6D");

            entity.Property(e => e.IsCompleted).HasDefaultValue(false);

            entity.HasOne(d => d.Booking).WithMany(p => p.BookingRecords)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__BookingRe__Booki__45F365D3");

            entity.HasOne(d => d.Service).WithMany(p => p.BookingRecords)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__BookingRe__Servi__46E78A0C");
        });

        modelBuilder.Entity<Consultant>(entity =>
        {
            entity.HasKey(e => e.ConsultantId).HasName("PK__Consulta__E5B83F3976C7570A");

            entity.Property(e => e.ConsultantId).ValueGeneratedNever();

            //entity.HasOne(d => d.ConsultantNavigation).WithOne(p => p.)
            //    .OnDelete(DeleteBehavior.ClientSetNull)
            //    .HasConstraintName("FK__Consultan__Consu__31EC6D26");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__Customer__A4AE64B881F89013");

            entity.Property(e => e.CustomerId).ValueGeneratedNever();

            //entity.HasOne(d => d.CustomerNavigation).WithOne(p => p.Customer)
            //    .OnDelete(DeleteBehavior.ClientSetNull)
            //    .HasConstraintName("FK__Customer__Custom__2E1BDC42");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__6A4BEDF674FA0DDE");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Booking).WithMany(p => p.Feedbacks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Feedback__Bookin__4BAC3F29");

            
        });

        modelBuilder.Entity<MenstrualCycle>(entity =>
        {
            entity.HasKey(e => e.CycleId).HasName("PK__Menstrua__077B24D9162FF366");

            entity.HasOne(d => d.Customer).WithMany(p => p.MenstrualCycles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Menstrual__Custo__4F7CD00D");
        });

        modelBuilder.Entity<Register>(entity =>
        {
            entity.HasKey(e => e.RegistId).HasName("PK__Register__8C2083BE6F290589");

            entity.HasOne(d => d.Consultant).WithMany(p => p.Registers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Register__Consul__37A5467C");

            entity.HasOne(d => d.Slot).WithMany(p => p.Registers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Register__SlotID__36B12243");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__8AFACE3A040C1A3D");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PK__Service__C51BB0EA514B0151");
        });

        modelBuilder.Entity<Slot>(entity =>
        {
            entity.HasKey(e => e.SlotId).HasName("PK__Slot__0A124A4F18AC9ECE");
        });

        modelBuilder.Entity<WebUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__WebUser__1788CCAC3956DC6D");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Role).WithMany(p => p.WebUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WebUser__RoleID__2B3F6F97");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
