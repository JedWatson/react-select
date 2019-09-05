#tool "nuget:?package=Microsoft.TestPlatform&version=15.7.0"
#addin "Cake.Npm"

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release"); //Here you can configure if you want do debug or release

var install=Task("Install")
    .Does(() =>
{
    Information("Starting Install");
    NpmInstall();      
    Information("Ending Install");
});

var tests = Task("Tests")
	.Does(()=>
	{	
        Information("Starting Tests");
		//NpmRunScript(); //define test script. If you don't have, comment this line
        Information("Ending Tests");
	});

var package = Task("Package")
    .Does(()=>
    {
        Information("Starting Pack");
        CreateDirectory("./artifacts");
        MoveFileToDirectory(@"./package.json", @"./artifacts/");
        NpmPack(settings => settings.FromPath("./artifacts")); 
        MoveFileToDirectory(@"./artifacts/package.json", @""); 
        Information("Ending Pack");
    });

Task("Default")
    .IsDependentOn("Package");

RunTarget(target);