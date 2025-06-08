using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class SubjectNameIsNotUniqueKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Question_SubjectName",
                table: "Question");

            migrationBuilder.CreateIndex(
                name: "IX_Question_SubjectName",
                table: "Question",
                column: "SubjectName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Question_SubjectName",
                table: "Question");

            migrationBuilder.CreateIndex(
                name: "IX_Question_SubjectName",
                table: "Question",
                column: "SubjectName",
                unique: true);
        }
    }
}
