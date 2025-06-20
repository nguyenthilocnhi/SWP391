using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

public partial class dbcontext : DbContext
{
    public dbcontext()
    {
    }

    public dbcontext(DbContextOptions<DbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Consultant> Consultants { get; set; }

    public virtual DbSet<ConsultationBooking> ConsultationBookings { get; set; }

    public virtual DbSet<ConsultationFeedback> ConsultationFeedbacks { get; set; }

    public virtual DbSet<ConsultationType> ConsultationTypes { get; set; }

    public virtual DbSet<ContentPostType> ContentPostTypes { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Faq> Faqs { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<PostDetail> PostDetails { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<ServiceBooking> ServiceBookings { get; set; }

    public virtual DbSet<ServiceFeedback> ServiceFeedbacks { get; set; }

    public virtual DbSet<Slot> Slots { get; set; }

    public virtual DbSet<Staff> Staff { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WorkSlot> WorkSlots { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=(local);Database=SWPver2;User Id=sa;Password=12345;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Consultant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Consulta__3214EC078050411D");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Consultant)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Consultant__Id__300424B4");

            entity.HasMany(d => d.ConsultationTypes).WithMany(p => p.Consultants)
                .UsingEntity<Dictionary<string, object>>(
                    "ConsultationTypesOfConsultant",
                    r => r.HasOne<ConsultationType>().WithMany()
                        .HasForeignKey("ConsultationTypeId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Consultat__Consu__47DBAE45"),
                    l => l.HasOne<Consultant>().WithMany()
                        .HasForeignKey("ConsultantId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Consultat__Consu__46E78A0C"),
                    j =>
                    {
                        j.HasKey("ConsultantId", "ConsultationTypeId").HasName("PK__Consulta__502B7AAC0A232FF8");
                        j.ToTable("ConsultationTypesOfConsultant");
                    });
        });

        modelBuilder.Entity<ConsultationBooking>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Consulta__3214EC074E8DAAB5");

            entity.HasOne(d => d.Consultant).WithMany(p => p.ConsultationBookings).HasConstraintName("FK__Consultat__Consu__4F7CD00D");

            entity.HasOne(d => d.ConsultationType).WithMany(p => p.ConsultationBookings).HasConstraintName("FK__Consultat__Consu__5070F446");

            entity.HasOne(d => d.Customer).WithMany(p => p.ConsultationBookings).HasConstraintName("FK__Consultat__Custo__4E88ABD4");

            entity.HasOne(d => d.Status).WithMany(p => p.ConsultationBookings).HasConstraintName("FK__Consultat__Statu__5165187F");
        });

        modelBuilder.Entity<ConsultationFeedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Consulta__3214EC07E87A6B20");

            entity.HasOne(d => d.ConsultationBooking).WithMany(p => p.ConsultationFeedbacks).HasConstraintName("FK__Consultat__Consu__5BE2A6F2");
        });

        modelBuilder.Entity<ConsultationType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Consulta__3214EC07AC7A5DF7");
        });

        modelBuilder.Entity<ContentPostType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ContentP__3214EC07159CE329");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Customer__3214EC07053A9468");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Customer)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Customer__Id__2D27B809");
        });

        modelBuilder.Entity<Faq>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__FAQ__3214EC079BDDC914");
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Post__3214EC0704BEE18B");

            entity.HasOne(d => d.Consultant).WithMany(p => p.Posts).HasConstraintName("FK__Post__Consultant__38996AB5");

            entity.HasMany(d => d.Consultations).WithMany(p => p.Posts)
                .UsingEntity<Dictionary<string, object>>(
                    "ConsultationRelatedToPost",
                    r => r.HasOne<ConsultationType>().WithMany()
                        .HasForeignKey("ConsultationId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Consultat__Consu__3E52440B"),
                    l => l.HasOne<Post>().WithMany()
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Consultat__PostI__3D5E1FD2"),
                    j =>
                    {
                        j.HasKey("PostId", "ConsultationId").HasName("PK__Consulta__3FC274B1200A7A13");
                        j.ToTable("ConsultationRelatedToPost");
                    });
        });

        modelBuilder.Entity<PostDetail>(entity =>
        {
            entity.HasKey(e => e.PostDetailId).HasName("PK__PostDeta__AE5570B9C2DEAA20");

            entity.HasOne(d => d.Post).WithMany(p => p.PostDetails)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PostDetai__PostI__4316F928");

            entity.HasOne(d => d.Type).WithMany(p => p.PostDetails).HasConstraintName("FK__PostDetai__TypeI__440B1D61");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Role__3214EC07538083DC");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Service__3214EC075EF107C6");
        });

        modelBuilder.Entity<ServiceBooking>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ServiceB__3214EC0755A51DA2");

            entity.HasOne(d => d.Customer).WithMany(p => p.ServiceBookings).HasConstraintName("FK__ServiceBo__Custo__5441852A");

            entity.HasOne(d => d.Service).WithMany(p => p.ServiceBookings).HasConstraintName("FK__ServiceBo__Servi__5535A963");

            entity.HasOne(d => d.Status).WithMany(p => p.ServiceBookings).HasConstraintName("FK__ServiceBo__Statu__5629CD9C");
        });

        modelBuilder.Entity<ServiceFeedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ServiceF__3214EC07922C8F90");

            entity.HasOne(d => d.ServiceBooking).WithMany(p => p.ServiceFeedbacks).HasConstraintName("FK__ServiceFe__Servi__59063A47");
        });

        modelBuilder.Entity<Slot>(entity =>
        {
            entity.HasKey(e => e.Slot1).HasName("PK__Slot__BC7BA94674B44102");
        });

        modelBuilder.Entity<Staff>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Staff__3214EC07765DC564");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Staff)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Staff__Id__2A4B4B5E");
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Status__3214EC07FEF251D5");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User__3214EC070DE6B444");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User__RoleId__276EDEB3");
        });

        modelBuilder.Entity<WorkSlot>(entity =>
        {
            entity.HasKey(e => e.SlotId).HasName("PK__WorkSlot__0A124AAF2D75F149");

            entity.HasOne(d => d.SlotNavigation).WithMany(p => p.WorkSlots)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WorkSlot__Slot__35BCFE0A");

            entity.HasOne(d => d.User).WithMany(p => p.WorkSlots)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WorkSlot__UserId__34C8D9D1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
