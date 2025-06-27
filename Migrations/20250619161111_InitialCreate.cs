using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConsultationType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    EstimatedTime = table.Column<int>(type: "int", nullable: true),
                    Fee = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Consulta__3214EC07AC7A5DF7", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContentPostType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ContentP__3214EC07159CE329", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FAQ",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Question = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Answer = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__FAQ__3214EC079BDDC914", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Role__3214EC07538083DC", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Service",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    EstimatedTime = table.Column<int>(type: "int", nullable: true),
                    Fee = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Room = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Service__3214EC075EF107C6", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Slot",
                columns: table => new
                {
                    Slot = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Slot__BC7BA94674B44102", x => x.Slot);
                });

            migrationBuilder.CreateTable(
                name: "Status",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Status__3214EC07FEF251D5", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    DateOfBirth = table.Column<DateOnly>(type: "date", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__User__3214EC070DE6B444", x => x.Id);
                    table.ForeignKey(
                        name: "FK__User__RoleId__276EDEB3",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Consultant",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Specialization = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ExperienceYears = table.Column<int>(type: "int", nullable: true),
                    ConsultantLicense = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ConsultantDescription = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Room = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Consulta__3214EC078050411D", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Consultant__Id__300424B4",
                        column: x => x.Id,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    MedicalHistory = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Customer__3214EC07053A9468", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Customer__Id__2D27B809",
                        column: x => x.Id,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConsultantId = table.Column<int>(type: "int", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Image = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PostedDate = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Post__3214EC0704BEE18B", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Post__Consultant__38996AB5",
                        column: x => x.ConsultantId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Staff",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    WorkType = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Staff__3214EC07765DC564", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Staff__Id__2A4B4B5E",
                        column: x => x.Id,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WorkSlot",
                columns: table => new
                {
                    SlotId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Slot = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__WorkSlot__0A124AAF2D75F149", x => x.SlotId);
                    table.ForeignKey(
                        name: "FK__WorkSlot__Slot__35BCFE0A",
                        column: x => x.Slot,
                        principalTable: "Slot",
                        principalColumn: "Slot");
                    table.ForeignKey(
                        name: "FK__WorkSlot__UserId__34C8D9D1",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ConsultationTypesOfConsultant",
                columns: table => new
                {
                    ConsultantId = table.Column<int>(type: "int", nullable: false),
                    ConsultationTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Consulta__502B7AAC0A232FF8", x => new { x.ConsultantId, x.ConsultationTypeId });
                    table.ForeignKey(
                        name: "FK__Consultat__Consu__46E78A0C",
                        column: x => x.ConsultantId,
                        principalTable: "Consultant",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Consultat__Consu__47DBAE45",
                        column: x => x.ConsultationTypeId,
                        principalTable: "ConsultationType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ConsultationBooking",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    ConsultantId = table.Column<int>(type: "int", nullable: true),
                    ConsultationTypeId = table.Column<int>(type: "int", nullable: true),
                    RegisterTime = table.Column<DateTime>(type: "datetime", nullable: true),
                    AppointmentTime = table.Column<DateTime>(type: "datetime", nullable: true),
                    StatusId = table.Column<int>(type: "int", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    PaymentMethod = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Consulta__3214EC074E8DAAB5", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Consultat__Consu__4F7CD00D",
                        column: x => x.ConsultantId,
                        principalTable: "Consultant",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Consultat__Consu__5070F446",
                        column: x => x.ConsultationTypeId,
                        principalTable: "ConsultationType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Consultat__Custo__4E88ABD4",
                        column: x => x.CustomerId,
                        principalTable: "Customer",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Consultat__Statu__5165187F",
                        column: x => x.StatusId,
                        principalTable: "Status",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ServiceBooking",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    ServiceId = table.Column<int>(type: "int", nullable: true),
                    RegisterTime = table.Column<DateTime>(type: "datetime", nullable: true),
                    AppointmentTime = table.Column<DateTime>(type: "datetime", nullable: true),
                    StatusId = table.Column<int>(type: "int", nullable: true),
                    Result = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    PaymentMethod = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ServiceB__3214EC0755A51DA2", x => x.Id);
                    table.ForeignKey(
                        name: "FK__ServiceBo__Custo__5441852A",
                        column: x => x.CustomerId,
                        principalTable: "Customer",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__ServiceBo__Servi__5535A963",
                        column: x => x.ServiceId,
                        principalTable: "Service",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__ServiceBo__Statu__5629CD9C",
                        column: x => x.StatusId,
                        principalTable: "Status",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ConsultationRelatedToPost",
                columns: table => new
                {
                    PostId = table.Column<int>(type: "int", nullable: false),
                    ConsultationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Consulta__3FC274B1200A7A13", x => new { x.PostId, x.ConsultationId });
                    table.ForeignKey(
                        name: "FK__Consultat__Consu__3E52440B",
                        column: x => x.ConsultationId,
                        principalTable: "ConsultationType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Consultat__PostI__3D5E1FD2",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PostDetail",
                columns: table => new
                {
                    PostDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    OrderIndex = table.Column<int>(type: "int", nullable: true),
                    TypeId = table.Column<int>(type: "int", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PostDeta__AE5570B9C2DEAA20", x => x.PostDetailId);
                    table.ForeignKey(
                        name: "FK__PostDetai__PostI__4316F928",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__PostDetai__TypeI__440B1D61",
                        column: x => x.TypeId,
                        principalTable: "ContentPostType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ConsultationFeedback",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConsultationBookingId = table.Column<int>(type: "int", nullable: true),
                    RatedTime = table.Column<DateTime>(type: "datetime", nullable: true),
                    RatedStar = table.Column<int>(type: "int", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Consulta__3214EC07E87A6B20", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Consultat__Consu__5BE2A6F2",
                        column: x => x.ConsultationBookingId,
                        principalTable: "ConsultationBooking",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ServiceFeedback",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ServiceBookingId = table.Column<int>(type: "int", nullable: true),
                    RatedTime = table.Column<DateTime>(type: "datetime", nullable: true),
                    RatedStar = table.Column<int>(type: "int", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ServiceF__3214EC07922C8F90", x => x.Id);
                    table.ForeignKey(
                        name: "FK__ServiceFe__Servi__59063A47",
                        column: x => x.ServiceBookingId,
                        principalTable: "ServiceBooking",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConsultationBooking_ConsultantId",
                table: "ConsultationBooking",
                column: "ConsultantId");

            migrationBuilder.CreateIndex(
                name: "IX_ConsultationBooking_ConsultationTypeId",
                table: "ConsultationBooking",
                column: "ConsultationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ConsultationBooking_CustomerId",
                table: "ConsultationBooking",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_ConsultationBooking_StatusId",
                table: "ConsultationBooking",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_ConsultationFeedback_ConsultationBookingId",
                table: "ConsultationFeedback",
                column: "ConsultationBookingId");

            migrationBuilder.CreateIndex(
                name: "IX_ConsultationRelatedToPost_ConsultationId",
                table: "ConsultationRelatedToPost",
                column: "ConsultationId");

            migrationBuilder.CreateIndex(
                name: "IX_ConsultationTypesOfConsultant_ConsultationTypeId",
                table: "ConsultationTypesOfConsultant",
                column: "ConsultationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_ConsultantId",
                table: "Post",
                column: "ConsultantId");

            migrationBuilder.CreateIndex(
                name: "IX_PostDetail_PostId",
                table: "PostDetail",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PostDetail_TypeId",
                table: "PostDetail",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceBooking_CustomerId",
                table: "ServiceBooking",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceBooking_ServiceId",
                table: "ServiceBooking",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceBooking_StatusId",
                table: "ServiceBooking",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceFeedback_ServiceBookingId",
                table: "ServiceFeedback",
                column: "ServiceBookingId");

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                table: "User",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "UQ__User__A9D1053468BF2D1B",
                table: "User",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkSlot_Slot",
                table: "WorkSlot",
                column: "Slot");

            migrationBuilder.CreateIndex(
                name: "IX_WorkSlot_UserId",
                table: "WorkSlot",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConsultationFeedback");

            migrationBuilder.DropTable(
                name: "ConsultationRelatedToPost");

            migrationBuilder.DropTable(
                name: "ConsultationTypesOfConsultant");

            migrationBuilder.DropTable(
                name: "FAQ");

            migrationBuilder.DropTable(
                name: "PostDetail");

            migrationBuilder.DropTable(
                name: "ServiceFeedback");

            migrationBuilder.DropTable(
                name: "Staff");

            migrationBuilder.DropTable(
                name: "WorkSlot");

            migrationBuilder.DropTable(
                name: "ConsultationBooking");

            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.DropTable(
                name: "ContentPostType");

            migrationBuilder.DropTable(
                name: "ServiceBooking");

            migrationBuilder.DropTable(
                name: "Slot");

            migrationBuilder.DropTable(
                name: "Consultant");

            migrationBuilder.DropTable(
                name: "ConsultationType");

            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropTable(
                name: "Service");

            migrationBuilder.DropTable(
                name: "Status");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
