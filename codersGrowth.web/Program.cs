﻿using codersGrowth.Infra.Data;
using trabalho01.crud;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IRepositorio, RepositorioLinq2DB>();
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseDefaultFiles();
app.UseFileServer();
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.UseCors(options =>{
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});

app.MapControllers();

app.Run();
