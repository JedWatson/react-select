#tool "nuget:?package=Microsoft.TestPlatform&version=15.7.0"
#addin nuget:?package=Cake.Npm&version=0.17.0
#addin nuget:?package=Cake.Json&version=4.0.0
#addin nuget:?package=Newtonsoft.Json&version=9.0.1
using System;
using System.IO;
////////////////////////////////////////////////////////////////
// Use always this structure. If you don't need to run some   //
// task, comment the code inside it.                          //
////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release"); //Here you can configure if you want do debug or release

var install=Task("Install")
    .Does(() =>
{
    Information("Starting Install");
    NpmCi();     
    Information("Ending Install");
});

var build=Task("Build")
    .Does(() =>
{
    Information("Starting Build");
    var conf = ParseJsonFromFile("package.json");
    if(conf["scripts"]["build"]!=null)
        NpmRunScript("build");      
    Information("Ending Build");
});
var tests = Task("Tests")
	.Does(()=>
	{	
        Information("Starting Tests");
        var conf = ParseJsonFromFile("package.json");
        if(conf["scripts"]["test"]!=null)
            NpmRunScript("test");
        Information("Ending Tests");
	});

var package = Task("Package")
    .Does(()=>
    {
        Information("Starting Pack");
        CreateDirectory("./artifacts");
        Environment.CurrentDirectory =@".\artifacts";
        NpmPack(settings => settings.FromSource("./..")); 
        Information("Ending Pack");
    });
Task("Default")
    .IsDependentOn("Package");

RunTarget(target);
